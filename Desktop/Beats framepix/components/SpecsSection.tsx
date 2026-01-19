'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SpecsSection() {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            // Title animation
            gsap.from('.specs-title', {
                scrollTrigger: {
                    trigger: '.specs-title',
                    start: 'top 80%',
                },
                opacity: 0,
                y: 50,
                duration: 1,
                ease: 'power3.out',
            });

            // Diagram reveal
            gsap.from('.tech-diagram', {
                scrollTrigger: {
                    trigger: '.specs-content',
                    start: 'top 70%',
                },
                opacity: 0,
                scale: 0.8,
                duration: 1,
                ease: 'power3.out',
            });

            // Infinite float for diagram
            gsap.to('.tech-diagram img', {
                y: -15,
                duration: 3,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
            });

            // Spec items with flip animation
            gsap.from('.spec-item', {
                scrollTrigger: {
                    trigger: '.specs-grid',
                    start: 'top 75%',
                    toggleActions: 'play none none reverse',
                },
                opacity: 0,
                rotateY: 90,
                stagger: 0.1,
                duration: 0.8,
                ease: 'back.out(1.4)',
            });

            // Box items
            gsap.from('.box-item', {
                scrollTrigger: {
                    trigger: '.box-section',
                    start: 'top 80%',
                },
                opacity: 0,
                x: -30,
                stagger: 0.08,
                duration: 0.6,
                ease: 'power2.out',
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const specs = [
        { label: 'Battery Life', value: 'Up to 40 hours', icon: '🔋' },
        { label: 'Fast Charging', value: '10 min = 3 hours', icon: '⚡' },
        { label: 'Connectivity', value: 'Bluetooth 5.0', icon: '📡' },
        { label: 'Weight', value: '260 grams', icon: '⚖️' },
        { label: 'Controls', value: 'Multi-function', icon: '🎛️' },
        { label: 'Compatibility', value: 'iOS & Android', icon: '📱' },
    ];

    return (
        <div ref={sectionRef} className="content-section bg-white overflow-hidden" id="specs">
            <div className="max-w-7xl mx-auto w-full px-6">
                <div className="specs-content flex flex-col md:flex-row items-center gap-12 mb-20">
                    <div className="md:w-1/2 flex justify-center">
                        <div className="tech-diagram relative p-8 max-w-md w-full">
                            <div className="absolute inset-0 bg-gradient-to-r from-beats-red/5 to-transparent rounded-full blur-3xl opacity-50"></div>
                            <img src="/images/tech-diagram.png" alt="Technical Schematics" className="relative z-10 w-full drop-shadow-2xl" />
                        </div>
                    </div>

                    <div className="md:w-1/2 text-left">
                        <h2 className="specs-title text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8">
                            Technical
                            <br />
                            <span className="text-gradient-beats">Excellence</span>
                        </h2>
                        <p className="text-xl text-gray-700 font-medium leading-relaxed">
                            Every millimeter engineered for perfection. From the custom-built drivers to the precision-balanced headband, the internals matter just as much as the iconic design.
                        </p>
                    </div>
                </div>

                <div className="specs-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    {specs.map((spec, index) => (
                        <div
                            key={index}
                            className="spec-item feature-card border border-gray-200 hover:border-beats-red transition-colors duration-300 text-center"
                        >
                            <div className="text-5xl mb-4">{spec.icon}</div>
                            <div className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">
                                {spec.label}
                            </div>
                            <div className="text-3xl font-bold text-black">
                                {spec.value}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="box-section p-10 bg-gradient-to-br from-gray-50 to-white rounded-3xl border-2 border-gray-200">
                    <h3 className="text-4xl font-bold mb-8 text-center">What's in the Box</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                            'Beats Studio Pro Headphones',
                            'Premium Carrying Case',
                            'USB-C Fast Charge Cable (1.2m)',
                            '3.5mm Audio Cable with RemoteTalk',
                            'Quick Start Guide',
                            '1-Year Limited Warranty Card',
                        ].map((item, i) => (
                            <div key={i} className="box-item flex items-center gap-4 text-lg">
                                <span className="text-beats-red text-2xl font-bold">✓</span>
                                <span className="text-gray-800 font-medium">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-12 text-center">
                    <p className="text-gray-600 text-lg">
                        <span className="font-bold text-black">Free 2-day shipping</span> • 30-day returns • AppleCare+ available
                    </p>
                </div>
            </div>
        </div>
    );
}
