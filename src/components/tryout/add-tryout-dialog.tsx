"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import { db } from "@/lib/firebase/config";
import { collection, addDoc, serverTimestamp, doc, updateDoc, getDocs } from "firebase/firestore";

interface AddTryoutDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function AddTryoutDialog({ open, onOpenChange }: AddTryoutDialogProps) {
    const { user } = useAuth();
    const [platform, setPlatform] = useState("");
    const [date, setDate] = useState("");
    const [score, setScore] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSave = async () => {
        if (!user || !platform || !date || !score) return;

        try {
            setLoading(true);
            const scoreNum = parseInt(score);

            // 1. Save to Subcollection
            await addDoc(collection(db, "users", user.uid, "tryouts"), {
                platform,
                date: new Date(date).toISOString(), // ISO String for easier sorting
                score: scoreNum,
                createdAt: serverTimestamp()
            });

            // 2. Recalculate Average (Accurate Method)
            // Fetch all tryouts to calculate new average. 
            // Optimization: Maintain a running average in user doc if scale > 1000 docs, but for <100 docs, simple fetch is fine.
            const snapshot = await getDocs(collection(db, "users", user.uid, "tryouts"));
            let total = 0;
            let count = 0;
            snapshot.forEach(doc => {
                const data = doc.data();
                if (data.score) {
                    total += data.score;
                    count++;
                }
            });
            const newAverage = count > 0 ? Math.round(total / count) : 0;

            // 3. Update Main User Doc
            const userRef = doc(db, "users", user.uid);
            await updateDoc(userRef, {
                "stats.averageTO": newAverage
            });

            setLoading(false);
            onOpenChange(false);
        } catch (error) {
            console.error("Failed to save tryout:", error);
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="bg-[#09090b] border-zinc-800 text-white sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-xl font-black uppercase text-white">Input Nilai Tryout</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="platform" className="text-zinc-400">Platform TO</Label>
                        <Select onValueChange={setPlatform}>
                            <SelectTrigger className="bg-zinc-900 border-zinc-700 text-zinc-300">
                                <SelectValue placeholder="Pilih Platform" />
                            </SelectTrigger>
                            <SelectContent className="bg-zinc-900 border-zinc-800 text-zinc-300">
                                <SelectItem value="Ruangguru">Ruangguru</SelectItem>
                                <SelectItem value="Pahamify">Pahamify</SelectItem>
                                <SelectItem value="Zenius">Zenius</SelectItem>
                                <SelectItem value="Brain Academy">Brain Academy</SelectItem>
                                <SelectItem value="Lainnya">Lainnya</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="date" className="text-zinc-400">Tanggal</Label>
                            <Input
                                id="date"
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="bg-zinc-900 border-zinc-700 text-zinc-300"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="score" className="text-zinc-400">Skor Akhir (IRT)</Label>
                            <Input
                                id="score"
                                type="number"
                                placeholder="0 - 1000"
                                value={score}
                                onChange={(e) => setScore(e.target.value)}
                                className="bg-zinc-900 border-zinc-700 text-zinc-300"
                            />
                        </div>
                    </div>
                </div>
                <div className="flex justify-end gap-3">
                    <Button variant="ghost" onClick={() => onOpenChange(false)} className="text-zinc-400 hover:text-white">Batal</Button>
                    <Button onClick={handleSave} disabled={loading} className="bg-[#BFFF0B] text-black hover:bg-[#BFFF0B]/90 font-bold">
                        {loading ? "Menyimpan..." : "Simpan Data"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
