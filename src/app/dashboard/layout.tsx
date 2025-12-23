import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { AmbientBackground } from "@/components/layout/ambient-background";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen relative bg-[#0A0A0A]">
            {/* Unified Ambient Background for all dashboard pages */}
            <AmbientBackground />

            <Sidebar />

            <div className="flex-1 flex flex-col md:pl-64 transition-all duration-300 ease-in-out relative z-10">
                <Header />
                <main className="flex-1 p-6 overflow-x-hidden">
                    {children}
                </main>
            </div>
        </div>
    );
}
