"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ExternalLink } from "lucide-react";

export function TryoutHistory({ data }: { data?: any[] }) {
    if (!data || data.length === 0) {
        return (
            <div className="rounded-sm border border-zinc-800 p-8 text-center bg-zinc-900/50">
                <p className="text-zinc-500 text-sm">Belum ada riwayat tryout.</p>
            </div>
        );
    }

    // reverse for history (newest first)
    const historyData = [...data].reverse();

    return (
        <div className="rounded-sm border border-zinc-800 overflow-hidden">
            <Table>
                <TableHeader className="bg-zinc-900/50">
                    <TableRow className="border-zinc-800 hover:bg-transparent">
                        <TableHead className="w-[100px] text-zinc-500 font-bold uppercase text-[10px]">Tanggal</TableHead>
                        <TableHead className="text-zinc-500 font-bold uppercase text-[10px]">Platform</TableHead>
                        {/* <TableHead className="text-zinc-500 font-bold uppercase text-[10px]">Judul TO</TableHead> */}
                        <TableHead className="text-right text-zinc-500 font-bold uppercase text-[10px]">Skor Akhir</TableHead>
                        <TableHead className="text-right text-zinc-500 font-bold uppercase text-[10px]">Detail</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {historyData.map((item, i) => (
                        <TableRow key={i} className="border-zinc-800 hover:bg-zinc-900/50 group transition-colors">
                            <TableCell className="font-mono text-xs text-zinc-400">
                                {item.date ? new Date(item.date).toLocaleDateString("id-ID", { day: 'numeric', month: 'short', year: 'numeric' }) : "-"}
                            </TableCell>
                            <TableCell className="font-medium text-white">{item.platform}</TableCell>
                            {/* <TableCell className="text-zinc-400">TO UTBK #1 - Gelombang 1</TableCell> */}
                            <TableCell className="text-right font-black text-[#BFFF0B] text-base">{item.score}</TableCell>
                            <TableCell className="text-right">
                                <button className="text-zinc-600 hover:text-white transition-colors">
                                    <ExternalLink className="w-4 h-4 ml-auto" />
                                </button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
