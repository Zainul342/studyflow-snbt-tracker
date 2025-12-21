"use client";

import { useEffect, useState } from "react";
import { StatsGrid } from "@/components/dashboard/stats-grid";
import { mockDB } from "@/lib/data/mock-db";

export default function DashboardPage() {
    const [userName, setUserName] = useState("Student");

    useEffect(() => {
        const profile = mockDB.getProfile();
        if (profile?.name) {
            // Get first name only
            const firstName = profile.name.split(" ")[0];
            setUserName(firstName);
        }
    }, []);

    return (
        <div className="flex flex-col gap-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-white">Command Center</h1>
                    <p className="text-zinc-400">Welcome back, {userName}. Ready to flex?</p>
                </div>
            </div>

            <StatsGrid />
        </div>
    );
}
