"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Import Sections
import { Header } from "./sections/header";
import { MobileMenu } from "./sections/mobile-menu";
import { MarqueeBanner } from "./sections/marquee-banner";
import { HeroSection } from "./sections/hero-section";
import { ShowcaseSection } from "./sections/showcase-section";
import { VideoSection } from "./sections/video-section";

// Import Middle & Bottom Sections (Grouped)
import {
    CreatorsSection,
    SuccessStoriesSection,
    PlatformSection,
    ProductsSection,
    BenefitsSection
} from "./sections/middle-sections";

import {
    TestimonialsSection,
    PricingSection,
    ShowcaseGallery,
    FinalCTA,
    Footer
} from "./sections/bottom-sections";

// Register GSAP plugins
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function OsmoStudyFlowLanding() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [menuOpen, setMenuOpen] = useState(false);

    // Smooth scroll setup
    useEffect(() => {
        // Detect mobile/touch
        const isMobile = window.matchMedia("(max-width: 1024px)").matches;

        if (isMobile) return;

        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
        });

        // Connect Lenis with GSAP ScrollTrigger
        const updateScrolltrigger = () => ScrollTrigger.update();
        lenis.on('scroll', updateScrolltrigger);

        const tickerUpdate = (time: number) => {
            lenis.raf(time * 1000);
        };
        gsap.ticker.add(tickerUpdate);

        gsap.ticker.lagSmoothing(0);

        return () => {
            lenis.destroy();
            lenis.off('scroll', updateScrolltrigger);
            gsap.ticker.remove(tickerUpdate);
        };
    }, []);

    return (
        <div ref={containerRef} className="relative bg-background text-foreground overflow-x-hidden selection:bg-primary selection:text-black">

            {/* HEADER */}
            <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

            {/* MOBILE MENU OVERLAY */}
            <AnimatePresence>
                {menuOpen && (
                    <MobileMenu onClose={() => setMenuOpen(false)} />
                )}
            </AnimatePresence>

            {/* MARQUEE BANNER */}
            <MarqueeBanner />

            {/* HERO SECTION */}
            <HeroSection />

            {/* ANIMATED CARDS SHOWCASE */}
            <ShowcaseSection />

            {/* VIDEO SECTION */}
            <VideoSection />

            {/* CREATORS SECTION */}
            <CreatorsSection />

            {/* SUCCESS STORIES (TRUST) */}
            <SuccessStoriesSection />

            {/* PLATFORM OVERVIEW */}
            <PlatformSection />

            {/* PRODUCTS CAROUSEL */}
            <ProductsSection />

            {/* BENEFITS */}
            <BenefitsSection />

            {/* TESTIMONIALS */}
            <TestimonialsSection />

            {/* PRICING */}
            <PricingSection />

            {/* SHOWCASE GALLERY */}
            <ShowcaseGallery />

            {/* FINAL CTA */}
            <FinalCTA />

            {/* FOOTER */}
            <Footer />
        </div>
    );
}
