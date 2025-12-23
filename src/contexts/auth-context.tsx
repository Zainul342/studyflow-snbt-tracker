"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
    User,
    onAuthStateChanged,
    signInWithPopup,
    GoogleAuthProvider,
    signOut
} from "firebase/auth";
import { doc, onSnapshot, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase/config";

// --- Types ---
interface AuthContextType {
    user: User | null;
    loading: boolean;
    userData: any | null; // The "Neural" Dashboard Data
    signInWithGoogle: () => Promise<void>;
    logout: () => Promise<void>;
}

// --- Context ---
const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    userData: null,
    signInWithGoogle: async () => { },
    logout: async () => { },
});

export const useAuth = () => useContext(AuthContext);

// --- Provider ---
export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [userData, setUserData] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);

    // 1. Auth Listener
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            if (!currentUser) {
                setUserData(null);
                setLoading(false);
            }
        });
        return () => unsubscribe();
    }, []);

    // 2. Neural Data Listener (Hot Path)
    useEffect(() => {
        if (!user) return;

        // Listen to the Main User Document (MVP Strategy: Direct connection until Cloud Functions are ready)
        const dashboardRef = doc(db, "users", user.uid);

        // Real-time "Neural" Synapse
        const unsubscribeData = onSnapshot(dashboardRef, (doc) => {
            if (doc.exists()) {
                setUserData(doc.data());
            } else {
                // If doc doesn't exist yet (New User), we'll handle creation later.
                console.log("Neural Link: No Dashboard View found (New User?)");
            }
            setLoading(false); // Data or no data, we are ready
        }, (err) => {
            console.error("Neural Link Broken:", err);
            setLoading(false);
        });

        return () => unsubscribeData();
    }, [user]);

    // Actions
    const signInWithGoogle = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            // Check if user doc exists
            const userDocRef = doc(db, "users", user.uid);
            const userDocSnapshot = await getDoc(userDocRef);

            if (!userDocSnapshot.exists()) {
                // Create new user doc
                await setDoc(userDocRef, {
                    uid: user.uid,
                    email: user.email,
                    displayName: user.displayName,
                    photoURL: user.photoURL,
                    createdAt: Date.now(),
                    role: "student",
                    stats: {
                        level: 1,
                        xp: 0,
                        streak: 0
                    },
                    targetPTN: null,
                    targetMajor: null
                });
            }
        } catch (error) {
            console.error("Auth Error:", error);
            throw error;
        }
    };

    const logout = async () => {
        await signOut(auth);
    };

    return (
        <AuthContext.Provider value={{ user, loading, userData, signInWithGoogle, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
