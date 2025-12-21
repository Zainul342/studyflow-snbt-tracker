"use client";

import Link from "next/link";
import { Menu, Search, Video } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"; // Note: Sheet needs to be added via shadcn if not present

// For now, simple header without Sheet (mobile menu will be added later if needed or via Sheet)
// Assuming we added Sheet via shadcn, if not we will use partial implementation

export function Header() {
    return (
        <header className="flex h-14 items-center gap-4 border-b bg-zinc-950/50 backdrop-blur-xl px-6 lg:h-[60px] sticky top-0 z-20">
            <div className="w-full flex-1">
                <form>
                    <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500" />
                        <Input
                            type="search"
                            placeholder="Search concepts, tasks..."
                            className="w-full bg-zinc-900/50 border-zinc-800 pl-8 md:w-[200px] lg:w-[300px] text-zinc-200 focus:ring-blue-500"
                        />
                    </div>
                </form>
            </div>
            <div className="flex items-center gap-2">
                {/* Top Actions */}
                <Button size="sm" variant="outline" className="h-8 border-zinc-700 bg-zinc-900 text-zinc-300 hover:text-white">
                    <Video className="mr-2 h-3 w-3" />
                    Watch Tutorial
                </Button>
            </div>
        </header>
    );
}
