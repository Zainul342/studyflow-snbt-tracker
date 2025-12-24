"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

interface AddTryoutDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function AddTryoutDialog({ open, onOpenChange }: AddTryoutDialogProps) {
    // Placeholder logic for now, just UI
    const [platform, setPlatform] = useState("");

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
                                <SelectItem value="ruangguru">Ruangguru</SelectItem>
                                <SelectItem value="pahamify">Pahamify</SelectItem>
                                <SelectItem value="zenius">Zenius</SelectItem>
                                <SelectItem value="brainacademy">Brain Academy</SelectItem>
                                <SelectItem value="others">Lainnya</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="date" className="text-zinc-400">Tanggal</Label>
                            <Input id="date" type="date" className="bg-zinc-900 border-zinc-700 text-zinc-300" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="score" className="text-zinc-400">Skor Akhir (IRT)</Label>
                            <Input id="score" type="number" placeholder="0 - 1000" className="bg-zinc-900 border-zinc-700 text-zinc-300" />
                        </div>
                    </div>

                    {/* Optional: Break down by subtes? Keeping it simple for now as requested (UX easiest) */}
                    {/* Expanding details could be a V2 feature */}
                </div>
                <div className="flex justify-end gap-3">
                    <Button variant="ghost" onClick={() => onOpenChange(false)} className="text-zinc-400 hover:text-white">Batal</Button>
                    <Button onClick={() => onOpenChange(false)} className="bg-[#BFFF0B] text-black hover:bg-[#BFFF0B]/90 font-bold">
                        Simpan Data
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
