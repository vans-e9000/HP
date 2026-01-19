'use client';

import { useEffect, useState } from 'react';

export default function BeatsTextOverlays() {
    const [scrollProgress, setScrollProgress] = useState(0);
    const [showOverlays, setShowOverlays] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const windowHeight = window.innerHeight;

            // The scrollytelling section is 400vh tall
            const scrollSectionHeight = windowHeight * 4;

            // Calculate progress within the scrollytelling section only (0 to 1)
            const progress = Math.min(scrollTop / scrollSectionHeight, 1);
            setScrollProgress(progress);

            // Hide overlays after scrollytelling section (when scrollTop > 95% of 400vh)
            setShowOverlays(scrollTop < scrollSectionHeight * 0.95);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial calculation

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Calculate visibility for each section
    const getOpacity = (start: number, end: number) => {
        if (!showOverlays) return 0; // Force hide all if not in scrollytelling section
        if (scrollProgress < start) return 0;
        if (scrollProgress > end) return 0;

        const fadeInEnd = start + 0.05;
        const fadeOutStart = end - 0.05;

        if (scrollProgress < fadeInEnd) {
            return (scrollProgress - start) / 0.05;
        }
        if (scrollProgress > fadeOutStart) {
            return (end - scrollProgress) / 0.05;
        }
        return 1;
    };

    if (!showOverlays) return null; // Don't render at all when outside scrollytelling section

    return (
        <div className="fixed inset-0 z-30 pointer-events-none">
            {/* Hero Section (0-15%) */}
            <div
                className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
                style={{
                    opacity: getOpacity(0, 0.15),
                    transform: `translateY(${(1 - getOpacity(0, 0.15)) * 20}px)`,
                }}
            >
                <div className="bg-white/90 backdrop-blur-md rounded-3xl px-12 py-10 shadow-2xl">
                    <h1 className="text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-tight mb-6 text-black">
                        Beats by Dre
                    </h1>
                    <p className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
                        Feel your music.
                    </p>
                    <p className="text-lg md:text-xl text-gray-700 max-w-2xl font-medium">
                        Premium wireless headphones engineered for incredible sound and iconic style.
                    </p>
                </div>
            </div>

            {/* Engineering/Design Section (15-40%) */}
            <div
                className="absolute left-[5%] top-1/2 -translate-y-1/2 max-w-xl px-6"
                style={{
                    opacity: getOpacity(0.15, 0.4),
                    transform: `translateX(${(1 - getOpacity(0.15, 0.4)) * -50}px)`,
                }}
            >
                <div className="bg-white/90 backdrop-blur-lg rounded-3xl p-10 shadow-2xl">
                    <h2 className="text-5xl md:text-6xl font-bold tracking-tighter leading-tight mb-6 text-black">
                        Designed for
                        <br />
                        <span className="text-beats-red">perfection.</span>
                    </h2>
                    <p className="text-xl md:text-2xl text-gray-800 mb-4 font-semibold">
                        Every curve. Every detail.
                    </p>
                    <p className="text-lg text-gray-700 leading-relaxed font-medium">
                        Precision-engineered components work in perfect harmony, delivering comfort that lasts all day and sound that moves you.
                    </p>
                </div>
            </div>

            {/* Sound/Bass Section (40-65%) */}
            <div
                className="absolute right-[5%] top-1/2 -translate-y-1/2 max-w-xl px-6 text-right"
                style={{
                    opacity: getOpacity(0.4, 0.65),
                    transform: `translateX(${(1 - getOpacity(0.4, 0.65)) * 50}px)`,
                }}
            >
                <div className="bg-white/90 backdrop-blur-lg rounded-3xl p-10 shadow-2xl">
                    <h2 className="text-5xl md:text-6xl font-bold tracking-tighter leading-tight mb-6 text-black">
                        Bass you
                        <br />
                        <span className="text-beats-red">can feel.</span>
                    </h2>
                    <div className="space-y-3 text-lg md:text-xl text-gray-800">
                        <p className="font-semibold">Powerful, immersive audio.</p>
                        <p className="font-semibold">Crystal-clear highs and deep, punchy lows.</p>
                        <p className="font-semibold">Your music, exactly as it was meant to sound.</p>
                    </div>
                </div>
            </div>

            {/* Innovation Section (65-85%) */}
            <div
                className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
                style={{
                    opacity: getOpacity(0.65, 0.85),
                    transform: `translateY(${(1 - getOpacity(0.65, 0.85)) * 20}px)`,
                }}
            >
                <div className="bg-white/90 backdrop-blur-lg rounded-3xl px-12 py-10 shadow-2xl">
                    <h2 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-tight mb-6 text-black">
                        Power.
                        <br />
                        Performance.
                        <br />
                        <span className="text-beats-red">Beats.</span>
                    </h2>
                    <p className="text-xl md:text-2xl text-gray-800 max-w-3xl font-semibold">
                        Advanced technology meets iconic design. Experience audio innovation that sets the standard.
                    </p>
                </div>
            </div>

            {/* Final CTA Section (85-100%) */}
            <div
                className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
                style={{
                    opacity: getOpacity(0.85, 1),
                    transform: `scale(${0.95 + getOpacity(0.85, 1) * 0.05})`,
                }}
            >
                <div className="bg-white backdrop-blur-lg rounded-3xl px-12 py-12 shadow-2xl">
                    <h2 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-tight mb-6 text-black">
                        Make them
                        <br />
                        <span className="text-beats-red">yours.</span>
                    </h2>
                    <p className="text-2xl md:text-3xl text-gray-800 mb-8 font-bold">
                        Beats by Dre. Sound like no other.
                    </p>
                    <div className="flex gap-4 pointer-events-auto">
                        <button className="px-8 py-4 bg-beats-red text-white font-semibold text-lg rounded-full hover:bg-[#c11529] transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-beats-red/40">
                            Shop Beats
                        </button>
                        <button className="px-8 py-4 border-2 border-black bg-white text-black font-semibold text-lg rounded-full hover:bg-black hover:text-white transition-all duration-300 hover:scale-105">
                            See Specs
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
