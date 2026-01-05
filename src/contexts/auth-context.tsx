"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
    User,
    onAuthStateChanged,
    signInWithPopup,
    signInWithRedirect,
    getRedirectResult,
    GoogleAuthProvider,
    signOut
} from "firebase/auth";
import { doc, onSnapshot, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase/config";

// --- Types ---
interface AuthContextType {
    user: User | null;
    loading: boolean;
    isAuthenticating: boolean;
    userData: any | null; // The "Neural" Dashboard Data
    signInWithGoogle: () => Promise<void>;
    logout: () => Promise<void>;
}

// --- Context ---
const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    isAuthenticating: false,
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
    const [isAuthenticating, setIsAuthenticating] = useState(false);

    // Helper: Ensure User Doc exists
    const ensureUserDoc = async (user: User) => {
        const userDocRef = doc(db, "users", user.uid);
        const userDocSnapshot = await getDoc(userDocRef);

        if (!userDocSnapshot.exists()) {
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
    };

    // 1. Auth Listener & Redirect Result Handler
    useEffect(() => {
        setIsAuthenticating(true);
        console.log("Auth System: Checking for redirect result...");

        // Handle Redirect Result (Mobile Flow)
        getRedirectResult(auth).then(async (result) => {
            if (result?.user) {
                console.log("Auth System: Redirect success for", result.user.email);
                await ensureUserDoc(result.user);
            } else {
                console.log("Auth System: No redirect result found.");
            }
            setIsAuthenticating(false);
        }).catch((err) => {
            console.error("Auth System: Redirect Error:", err);
            setIsAuthenticating(false);
        });

        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            console.log("Auth System: State changed ->", currentUser ? "Logged In" : "Logged Out");
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

        // Listen to the Main User Document
        const dashboardRef = doc(db, "users", user.uid);

        const unsubscribeData = onSnapshot(dashboardRef, (doc) => {
            if (doc.exists()) {
                setUserData(doc.data());
            }
            setLoading(false);
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
            // Detect Mobile
            const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

            if (isMobile) {
                // Mobile: Use Redirect to avoid popup blockers
                await signInWithRedirect(auth, provider);
            } else {
                // Desktop: Popup is smoother UX
                const result = await signInWithPopup(auth, provider);
                if (result.user) {
                    await ensureUserDoc(result.user);
                }
            }
        } catch (error: any) {
            console.error("Auth Error:", error);
            // Don't throw if it's just a "cancelled" error
            if (error.code !== "auth/popup-closed-by-user" && error.code !== "auth/cancelled-by-user") {
                throw error;
            }
        }
    };

    const logout = async () => {
        await signOut(auth);
    };

    return (
        <AuthContext.Provider value={{ user, loading, isAuthenticating, userData, signInWithGoogle, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
