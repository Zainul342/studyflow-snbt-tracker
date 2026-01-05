"use client";

import { motion } from "framer-motion";
import { Sidebar } from "@/components/layout/sidebar";
import {
    User,
    Mail,
    AtSign,
    Target,
    GraduationCap,
    Trophy,
    Bell,
    LogOut,
    Save,
    MapPin,
    Shield,
    Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/auth-context";
import { useState, useEffect } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { useRouter } from "next/navigation";
import Image from "next/image";

// --- Types ---
interface FormData {
    displayName: string;
    targetPTN: string;
    targetMajor: string;
    targetScore: string;
    dailyReminders: boolean;
}

export default function SettingsPage() {
    const { user, userData, logout, loading } = useAuth();
    const router = useRouter();
    const [isSaving, setIsSaving] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);

    const [formData, setFormData] = useState<FormData>({
        displayName: '',
        targetPTN: '',
        targetMajor: '',
        targetScore: '700+',
        dailyReminders: true,
    });

    // Sync form with userData when loaded
    useEffect(() => {
        if (userData) {
            setFormData({
                displayName: userData.displayName || user?.displayName || '',
                targetPTN: userData.targetPTN || '',
                targetMajor: userData.targetMajor || '',
                targetScore: userData.targetScore || '700+',
                dailyReminders: userData.preferences?.dailyReminders ?? true,
            });
        }
    }, [userData, user]);

    // Get initials from display name
    const getInitials = (name: string) => {
        if (!name) return "??";
        const parts = name.trim().split(" ");
        if (parts.length >= 2) {
            return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
        }
        return name.slice(0, 2).toUpperCase();
    };

    // Handle input changes
    const handleInputChange = (field: keyof FormData, value: string | boolean) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        setSaveSuccess(false);
    };

    // Save to Firestore
    const handleSave = async () => {
        if (!user) return;

        setIsSaving(true);
        try {
            await updateDoc(doc(db, "users", user.uid), {
                displayName: formData.displayName,
                targetPTN: formData.targetPTN,
                targetMajor: formData.targetMajor,
                targetScore: formData.targetScore,
                "preferences.dailyReminders": formData.dailyReminders,
            });
            setSaveSuccess(true);
            setTimeout(() => setSaveSuccess(false), 2000);
        } catch (error) {
            console.error("Failed to save settings:", error);
        } finally {
            setIsSaving(false);
        }
    };

    // Handle logout
    const handleLogout = async () => {
        await logout();
        router.push("/login");
    };

    // Calculate member since year
    const getMemberSince = () => {
        if (userData?.createdAt) {
            const date = new Date(userData.createdAt);
            return date.getFullYear();
        }
        return new Date().getFullYear();
    };

    // Split display name into first/last
    const nameParts = formData.displayName.trim().split(" ");
    const firstName = nameParts[0] || "";
    const lastName = nameParts.slice(1).join(" ") || "";

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-[#BFFF0B] animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0A0A0A] text-white font-sans selection:bg-[#BFFF0B] selection:text-black overflow-x-hidden">
            <Sidebar />

            {/* Main Content Wrapper */}
            <main className="pl-0 md:pl-64 min-h-screen relative">

                {/* Osmo Ambient Background & Grid */}
                <div className="absolute inset-0 pointer-events-none z-0">
                    <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:50px_50px]" />
                    {/* Ambient Glows */}
                    <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-purple-900/10 blur-[120px] rounded-full mix-blend-screen" />
                    <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-900/10 blur-[100px] rounded-full mix-blend-screen" />
                </div>

                <div className="relative z-10 max-w-5xl mx-auto p-6 md:p-12 lg:py-16">

                    {/* Header */}
                    <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-2"
                        >
                            <div className="flex items-center gap-3">
                                <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase">
                                    Account<br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-500 to-zinc-700">Settings</span>
                                </h1>
                            </div>
                            <p className="text-zinc-500 font-medium max-w-md border-l-2 border-[#BFFF0B] pl-4">
                                Manage your identity and study goals.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.1 }}
                        >
                            <span className="px-4 py-2 rounded-sm bg-zinc-900/50 border border-white/10 text-xs font-bold uppercase tracking-widest text-[#BFFF0B] shadow-[0_0_20px_rgba(191,255,11,0.1)]">
                                Member Since {getMemberSince()}
                            </span>
                        </motion.div>
                    </header>

                    {/* Bento Grid Layout */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

                        {/* LEFT COLUMN: Identity (Span 7) */}
                        <div className="md:col-span-7 space-y-6">

                            {/* Profile Card */}
                            <SettingsSection delay={0.2} title="Identity">
                                <div className="flex flex-col sm:flex-row gap-8 items-start">
                                    {/* Avatar */}
                                    <div className="relative group shrink-0">
                                        <div className="w-32 h-32 rounded-sm bg-gradient-to-br from-zinc-800 to-zinc-900 border border-white/10 flex items-center justify-center overflow-hidden">
                                            {user?.photoURL ? (
                                                <Image
                                                    src={user.photoURL}
                                                    alt="Profile"
                                                    width={128}
                                                    height={128}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <span className="text-4xl font-black text-white/20">
                                                    {getInitials(formData.displayName)}
                                                </span>
                                            )}
                                        </div>
                                        <button
                                            className="absolute bottom-2 right-2 p-2 rounded-sm bg-[#BFFF0B] text-black hover:bg-white transition-colors shadow-lg cursor-not-allowed opacity-60"
                                            title="Profile image upload coming soon"
                                            disabled
                                        >
                                            <User className="w-4 h-4" />
                                        </button>
                                    </div>

                                    {/* Inputs */}
                                    <div className="flex-1 w-full space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <SettingsInput
                                                label="First Name"
                                                value={firstName}
                                                onChange={(val) => handleInputChange('displayName', `${val} ${lastName}`.trim())}
                                                icon={User}
                                            />
                                            <SettingsInput
                                                label="Last Name"
                                                value={lastName}
                                                onChange={(val) => handleInputChange('displayName', `${firstName} ${val}`.trim())}
                                                icon={User}
                                            />
                                        </div>
                                        <SettingsInput
                                            label="Username"
                                            value={userData?.handle || `@${user?.email?.split('@')[0] || 'user'}`}
                                            icon={AtSign}
                                            disabled
                                        />
                                        <SettingsInput
                                            label="Email Address"
                                            value={user?.email || ''}
                                            icon={Mail}
                                            disabled
                                        />
                                    </div>
                                </div>
                            </SettingsSection>

                            {/* Preferences */}
                            <SettingsSection delay={0.4} title="Preferences">
                                <div className="space-y-4">
                                    <div
                                        className="flex items-center justify-between p-4 rounded-sm bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors group cursor-pointer"
                                        onClick={() => handleInputChange('dailyReminders', !formData.dailyReminders)}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="p-2 rounded-sm bg-purple-500/10 text-purple-400 group-hover:text-purple-300 transition-colors">
                                                <Bell className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-bold text-white uppercase tracking-wide">Daily Reminders</h4>
                                                <p className="text-xs text-zinc-500">Get notified for daily study missions</p>
                                            </div>
                                        </div>
                                        <button
                                            className={cn(
                                                "w-10 h-5 rounded-sm relative transition-colors",
                                                formData.dailyReminders ? "bg-[#BFFF0B]" : "bg-zinc-800"
                                            )}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleInputChange('dailyReminders', !formData.dailyReminders);
                                            }}
                                        >
                                            <div className={cn(
                                                "absolute top-1 w-3 h-3 bg-black rounded-sm shadow-sm transition-all",
                                                formData.dailyReminders ? "right-1" : "left-1"
                                            )} />
                                        </button>
                                    </div>

                                    <div className="flex items-center justify-between p-4 rounded-sm bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors group cursor-not-allowed opacity-60">
                                        <div className="flex items-center gap-4">
                                            <div className="p-2 rounded-sm bg-blue-500/10 text-blue-400">
                                                <Shield className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-bold text-white uppercase tracking-wide">Public Profile</h4>
                                                <p className="text-xs text-zinc-500">Allow others to see your progress (Soon)</p>
                                            </div>
                                        </div>
                                        <div className="w-10 h-5 rounded-sm bg-zinc-800 relative">
                                            <div className="absolute top-1 left-1 w-3 h-3 bg-zinc-600 rounded-sm" />
                                        </div>
                                    </div>
                                </div>
                            </SettingsSection>

                        </div>

                        {/* RIGHT COLUMN: Dream Target (Span 5) */}
                        <div className="md:col-span-5 space-y-6">

                            <SettingsSection
                                delay={0.3}
                                title="Dream Target"
                                className="border-[#BFFF0B]/20 bg-gradient-to-br from-[#BFFF0B]/[0.02] to-transparent relative overflow-hidden"
                            >
                                {/* Glow Effect */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-[#BFFF0B]/10 blur-[60px] rounded-full pointer-events-none" />

                                <div className="space-y-6 relative z-10">
                                    <div className="p-4 rounded-sm bg-[#0A0A0A] border border-[#BFFF0B]/20 flex items-center gap-4 mb-6">
                                        <div className="w-12 h-12 rounded-sm bg-[#BFFF0B] flex items-center justify-center shrink-0">
                                            <Target className="w-6 h-6 text-black" />
                                        </div>
                                        <div>
                                            <h4 className="text-xs font-black text-[#BFFF0B] uppercase tracking-widest mb-1">Current Goal</h4>
                                            <p className="text-white font-bold text-sm">Masuk PTN Impian 2026</p>
                                        </div>
                                    </div>

                                    <SettingsInput
                                        label="Target University (PTN)"
                                        value={formData.targetPTN}
                                        onChange={(val) => handleInputChange('targetPTN', val)}
                                        placeholder="e.g., Institut Teknologi Bandung"
                                        icon={MapPin}
                                        className="bg-[#0A0A0A]/50 border-white/10 focus:border-[#BFFF0B]/50"
                                    />
                                    <SettingsInput
                                        label="Dream Major (Jurusan)"
                                        value={formData.targetMajor}
                                        onChange={(val) => handleInputChange('targetMajor', val)}
                                        placeholder="e.g., Teknik Informatika"
                                        icon={GraduationCap}
                                        className="bg-[#0A0A0A]/50 border-white/10 focus:border-[#BFFF0B]/50"
                                    />
                                    <div className="grid grid-cols-2 gap-4">
                                        <SettingsInput
                                            label="Target Score"
                                            value={formData.targetScore}
                                            onChange={(val) => handleInputChange('targetScore', val)}
                                            icon={Trophy}
                                            className="bg-[#0A0A0A]/50 border-white/10 focus:border-[#BFFF0B]/50 font-mono text-[#BFFF0B]"
                                        />
                                        <div className="flex items-end">
                                            <Button
                                                className={cn(
                                                    "w-full h-10 rounded-sm uppercase tracking-wide text-xs font-bold transition-all",
                                                    saveSuccess
                                                        ? "bg-green-500 hover:bg-green-600 text-white"
                                                        : "bg-[#BFFF0B] hover:bg-[#BFFF0B]/90 text-black"
                                                )}
                                                onClick={handleSave}
                                                disabled={isSaving}
                                            >
                                                {isSaving ? (
                                                    <Loader2 className="w-4 h-4 animate-spin" />
                                                ) : saveSuccess ? (
                                                    "Saved!"
                                                ) : (
                                                    <>
                                                        <Save className="w-4 h-4 mr-2" />
                                                        Save
                                                    </>
                                                )}
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </SettingsSection>

                            {/* Danger Zone */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.6 }}
                            >
                                <div className="p-6 rounded-sm border border-red-900/20 bg-red-900/[0.05] hover:bg-red-900/[0.1] transition-colors">
                                    <h3 className="text-red-500 font-bold text-xs uppercase tracking-widest mb-4 flex items-center gap-2">
                                        Danger Zone
                                    </h3>
                                    <div className="flex items-center justify-between">
                                        <p className="text-xs text-red-500/60">Log out from your current session</p>
                                        <Button
                                            variant="outline"
                                            className="border-red-500/20 text-red-500 hover:bg-red-500 hover:text-white rounded-sm h-8 text-xs font-bold uppercase tracking-wide bg-transparent"
                                            onClick={handleLogout}
                                        >
                                            <LogOut className="w-3 h-3 mr-2" />
                                            Log Out
                                        </Button>
                                    </div>
                                </div>
                            </motion.div>

                        </div>

                    </div>
                </div>
            </main>
        </div>
    );
}

// ----------------------------------------------------------------------
// SUB-COMPONENTS (Local for now to keep things simple)
// ----------------------------------------------------------------------

function SettingsSection({
    children,
    title,
    delay = 0,
    className = ""
}: {
    children: React.ReactNode,
    title: string,
    delay?: number,
    className?: string
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay }}
            className={cn(
                "group relative p-6 md:p-8 rounded-sm bg-white/[0.02] backdrop-blur-md border border-white/5 hover:border-white/10 transition-all duration-300",
                className
            )}
        >
            <h2 className="text-xl font-black text-white uppercase tracking-tight mb-8 flex items-center gap-3">
                {title}
                <div className="h-[1px] flex-1 bg-white/5 group-hover:bg-white/10 transition-colors" />
            </h2>
            {children}
        </motion.div>
    );
}

function SettingsInput({
    label,
    value,
    onChange,
    placeholder,
    icon: Icon,
    disabled = false,
    className = ""
}: {
    label: string,
    value?: string,
    onChange?: (value: string) => void,
    placeholder?: string,
    icon?: React.ComponentType<{ className?: string }>,
    disabled?: boolean,
    className?: string
}) {
    return (
        <div className="space-y-2 group/input">
            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest group-hover/input:text-zinc-300 transition-colors">
                {label}
            </label>
            <div className="relative">
                {Icon && (
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within/input:text-white transition-colors">
                        <Icon className="w-4 h-4" />
                    </div>
                )}
                <input
                    type="text"
                    value={value || ''}
                    onChange={(e) => onChange?.(e.target.value)}
                    placeholder={placeholder}
                    disabled={disabled}
                    className={cn(
                        "w-full bg-black/20 border border-white/10 rounded-sm py-2.5 px-4 text-sm font-medium text-white transition-all focus:outline-none focus:border-[#BFFF0B] focus:bg-black/40 placeholder:text-zinc-700",
                        Icon && "pl-10",
                        disabled && "opacity-50 cursor-not-allowed bg-white/[0.02]",
                        className
                    )}
                />
            </div>
        </div>
    );
}
