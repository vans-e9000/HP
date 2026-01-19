'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SoundSection() {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            // Split text animation for title
            const titleChars = document.querySelectorAll('.sound-title .char');
            gsap.from(titleChars, {
                scrollTrigger: {
                    trigger: '.sound-title',
                    start: 'top 80%',
                    end: 'top 50%',
                },
                opacity: 0,
                y: 50,
                rotateX: -90,
                stagger: 0.02,
                duration: 0.8,
                ease: 'back.out(1.7)',
            });

            // Feature cards with stagger
            gsap.from('.sound-feature', {
                scrollTrigger: {
                    trigger: '.sound-features',
                    start: 'top 85%',
                    toggleActions: 'play none none reverse',
                },
                opacity: 0,
                y: 60,
                scale: 0.9,
                stagger: 0.15,
                duration: 1,
                ease: 'power3.out',
            });

            // Image cards animation
            gsap.from('.sound-image-card', {
                scrollTrigger: {
                    trigger: '.sound-images',
                    start: 'top 80%',
                },
                y: 100,
                opacity: 0,
                stagger: 0.2,
                duration: 1.2,
                ease: 'power3.out',
            });

            // Parallax effect on icons
            gsap.to('.feature-icon', {
                scrollTrigger: {
                    trigger: '.sound-features',
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1,
                },
                y: -30,
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Calculate tilt
        const rotateX = ((y - centerY) / centerY) * -10; // Max 10 deg tilt
        const rotateY = ((x - centerX) / centerX) * 10;

        gsap.to(card, {
            rotateX: rotateX,
            rotateY: rotateY,
            duration: 0.5,
            ease: 'power2.out',
            transformPerspective: 1000,
            transformStyle: 'preserve-3d',
        });
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
        gsap.to(e.currentTarget, {
            rotateX: 0,
            rotateY: 0,
            duration: 0.5,
            ease: 'power2.out',
        });
    };

    const splitText = (text: string) => {
        return text.split('').map((char, i) => (
            <span key={i} className="char inline-block">
                {char === ' ' ? '\u00A0' : char}
            </span>
        ));
    };

    return (
        <div ref={sectionRef} className="content-section bg-gradient-to-b from-white via-gray-50 to-white overflow-hidden" id="sound">
            <div className="max-w-7xl mx-auto w-full px-6">
                <div className="flex flex-col lg:flex-row items-center gap-16 mb-24">
                    <div className="lg:w-1/2 text-left">
                        <h2 className="sound-title text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight mb-8 leading-[0.9]">
                            {splitText('Legendary')}
                            <br />
                            <span className="text-gradient-beats">{splitText('Sound')}</span>
                        </h2>
                        <p className="text-xl md:text-2xl text-gray-700 font-medium leading-relaxed max-w-xl">
                            Immerse yourself in premium acoustics engineered for pure, powerful audio that moves your soul.
                        </p>
                    </div>

                    <div className="sound-images lg:w-1/2 flex gap-6 relative justify-center lg:justify-start">
                        <div
                            className="sound-image-card relative w-64 h-80 rounded-3xl overflow-hidden shadow-2xl cursor-pointer bg-white"
                            onMouseMove={handleMouseMove}
                            onMouseLeave={handleMouseLeave}
                        >
                            <img src="/images/sound-drivers.png" alt="Beats Driver Technology" className="w-full h-full object-cover scale-110 hover:scale-100 transition-transform duration-700" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent p-6 flex items-end">
                                <span className="text-white font-bold text-lg">Precision Drivers</span>
                            </div>
                        </div>

                        <div
                            className="sound-image-card relative w-64 h-80 rounded-3xl overflow-hidden shadow-2xl mt-12 cursor-pointer bg-white"
                            style={{ transform: 'translateY(40px)' }}
                            onMouseMove={handleMouseMove}
                            onMouseLeave={handleMouseLeave}
                        >
                            <img src="/images/sound-waves.png" alt="Acoustic Visualization" className="w-full h-full object-cover scale-110 hover:scale-100 transition-transform duration-700" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent p-6 flex items-end">
                                <span className="text-white font-bold text-lg">Acoustic Purity</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="sound-features grid grid-cols-1 md:grid-cols-3 gap-10">
                    {[
                        {
                            title: 'Deep, Punchy Bass',
                            description: 'Fine-tuned acoustic design delivers powerful, immersive bass that you can feel in your chest. Every beat hits exactly as the artist intended.',
                            icon: '🎵',
                            details: ['40mm drivers', 'Enhanced low-frequency response', 'Zero distortion'],
                        },
                        {
                            title: 'Crystal Clarity',
                            description: 'Advanced drivers produce pristine highs and balanced mids for studio-quality sound. Hear every detail, every nuance, every emotion.',
                            icon: '💎',
                            details: ['Hi-res audio certified', 'Wide soundstage', 'Precision tuning'],
                        },
                        {
                            title: 'Active Noise Cancelling',
                            description: 'Adaptive ANC technology blocks out the world so you can focus on what matters. Real-time environmental adjustment for perfect isolation.',
                            icon: '🎧',
                            details: ['Dual-mode ANC', 'Transparency mode', 'Wind noise reduction'],
                        },
                    ].map((feature, index) => (
                        <div key={index} className="sound-feature feature-card text-center group hover:border-beats-red border-2 border-transparent">
                            <div className="feature-icon text-7xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                                {feature.icon}
                            </div>
                            <h3 className="text-3xl font-bold mb-4">{feature.title}</h3>
                            <p className="text-gray-700 leading-relaxed mb-6 text-lg">{feature.description}</p>
                            <ul className="text-left space-y-2">
                                {feature.details.map((detail, i) => (
                                    <li key={i} className="flex items-center gap-2 text-gray-600">
                                        <span className="text-beats-red">✓</span>
                                        <span className="font-medium">{detail}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <button className="magnetic-btn px-12 py-5 bg-beats-red text-white font-bold text-xl rounded-full hover:bg-[#c11529] transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-beats-red/40">
                        Experience the Sound
                    </button>
                </div>
            </div>
        </div>
    );
}
