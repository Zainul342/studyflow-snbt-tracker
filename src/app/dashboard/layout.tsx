import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen flex-col">
            <Sidebar />
            <div className="flex flex-col md:pl-64 transition-all duration-300 ease-in-out">
                <Header />
                <main className="flex-1 overflow-y-auto bg-zinc-950/50 p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
