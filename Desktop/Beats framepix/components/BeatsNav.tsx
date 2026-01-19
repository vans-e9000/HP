'use client';

import { useEffect, useState } from 'react';

export default function BeatsNav() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 100);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
                    ? 'glassmorphism-light border-b border-gray-200'
                    : 'bg-transparent'
                }`}
            style={{
                opacity: scrolled ? 1 : 0.3,
            }}
        >
            <div className="max-w-[1400px] mx-auto px-6 py-4 flex items-center justify-between">
                {/* Left: Logo */}
                <div className="flex items-center">
                    <span className="text-2xl font-bold tracking-tighter">
                        Beats by Dre
                    </span>
                </div>

                {/* Center: Navigation Links */}
                <div className="hidden md:flex items-center gap-8">
                    {['Overview', 'Sound', 'Design', 'Specs', 'Shop'].map((item) => (
                        <a
                            key={item}
                            href={`#${item.toLowerCase()}`}
                            className="text-sm font-medium text-gray-700 hover:text-beats-red transition-colors duration-300 relative group"
                        >
                            {item}
                            <span className="absolute left-0 right-0 bottom-0 h-[2px] bg-beats-red scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                        </a>
                    ))}
                </div>

                {/* Right: CTA Button */}
                <div>
                    <button className="px-6 py-2.5 bg-beats-red text-white font-semibold text-sm rounded-full hover:bg-[#c11529] transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-beats-red/30">
                        Shop Beats
                    </button>
                </div>
            </div>
        </nav>
    );
}
