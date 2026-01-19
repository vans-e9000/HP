'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ShopSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [selectedColor, setSelectedColor] = useState(0);

    useEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            gsap.from('.shop-title', {
                scrollTrigger: {
                    trigger: '.shop-title',
                    start: 'top 80%',
                },
                opacity: 0,
                scale: 0.9,
                duration: 1,
                ease: 'back.out(1.4)',
            });

            gsap.from('.lifestyle-aspect', {
                scrollTrigger: {
                    trigger: '.shop-layout',
                    start: 'top 70%',
                },
                x: 50,
                opacity: 0,
                duration: 1,
                delay: 0.2,
            });

            gsap.from('.color-option', {
                scrollTrigger: {
                    trigger: '.color-options',
                    start: 'top 90%',
                    toggleActions: 'play none none reverse',
                },
                opacity: 0,
                y: 40,
                stagger: 0.1,
                duration: 0.8,
                ease: 'power2.out',
            });

            gsap.from('.shop-cta', {
                scrollTrigger: {
                    trigger: '.shop-cta',
                    start: 'top 85%',
                    toggleActions: 'play none none reverse',
                },
                opacity: 0,
                scale: 0.95,
                duration: 1,
                ease: 'back.out(1.2)',
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const colors = [
        { name: 'Matte Black', color: '#1A1A1A', available: true, popular: true, image: '/images/lifestyle-black.png' },
        { name: 'Sunset Red', color: '#E21836', available: true, popular: false, image: '/images/lifestyle-red.png' },
        { name: 'Pure White', color: '#FFFFFF', available: true, popular: false, image: '/images/lifestyle-black.png' }, // Fallback
        { name: 'Midnight Blue', color: '#1E3A8A', available: false, popular: false, image: '/images/lifestyle-black.png' }, // Fallback
    ];

    return (
        <div ref={sectionRef} className="content-section bg-gradient-to-b from-gray-50 to-white overflow-hidden" id="shop">
            <div className="max-w-7xl mx-auto w-full px-6">
                <div className="shop-layout flex flex-col md:flex-row items-center gap-12 mb-16">
                    <div className="md:w-1/2">
                        <div className="text-left mb-10">
                            <h2 className="shop-title text-7xl md:text-8xl font-bold tracking-tight mb-6 leading-tight">
                                Choose Your
                                <br />
                                <span className="text-gradient-beats">Vibe</span>
                            </h2>
                            <p className="text-xl text-gray-700 font-medium">
                                Available in stunning colors that match your personality and style.
                            </p>
                        </div>

                        <div className="color-options grid grid-cols-2 gap-6">
                            {colors.map((color, index) => (
                                <div
                                    key={index}
                                    onClick={() => color.available && setSelectedColor(index)}
                                    className={`color-option feature-card text-center cursor-pointer relative transition-all duration-300 ${selectedColor === index ? 'ring-2 ring-beats-red scale-105' : 'hover:scale-105'
                                        } ${!color.available ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    {color.popular && (
                                        <div className="absolute -top-3 -right-3 bg-beats-red text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
                                            Popular
                                        </div>
                                    )}
                                    <div
                                        className="w-16 h-16 rounded-full mx-auto mb-4 border-2 border-gray-100 shadow-inner"
                                        style={{ backgroundColor: color.color }}
                                    />
                                    <h3 className="font-bold text-lg mb-1">{color.name}</h3>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="lifestyle-aspect md:w-1/2 relative h-[600px] w-full bg-gray-100 rounded-3xl overflow-hidden shadow-2xl group">
                        {colors.map((color, index) => (
                            <img
                                key={index}
                                src={color.image}
                                alt={`${color.name} Lifestyle`}
                                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${selectedColor === index ? 'opacity-100 scale-105' : 'opacity-0 scale-100'}`}
                            />
                        ))}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-8">
                            <p className="text-white text-3xl font-bold italic tracking-tighter">"{colors[selectedColor].name} fits my flow."</p>
                        </div>
                    </div>
                </div>

                <div className="shop-cta bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white rounded-3xl p-12 text-center shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-beats-red blur-[100px] opacity-20 rounded-full pointer-events-none"></div>
                    <h3 className="text-5xl md:text-6xl font-bold mb-6 relative z-10">
                        Ready to experience Beats?
                    </h3>
                    <p className="text-2xl text-gray-300 mb-4 font-medium relative z-10">
                        {colors[selectedColor].name}
                    </p>
                    <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto relative z-10">
                        Free shipping and returns • 1-year warranty included • AppleCare+ available
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center relative z-10">
                        <button className="magnetic-btn px-14 py-6 bg-beats-red text-white font-bold text-2xl rounded-full hover:bg-[#c11529] transition-all duration-300 hover:scale-105 shadow-2xl hover:shadow-beats-red/60">
                            Buy Now - $349
                        </button>
                        <button className="magnetic-btn px-14 py-6 bg-white text-black font-bold text-2xl rounded-full hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-xl">
                            Try in Store
                        </button>
                    </div>
                    <div className="mt-10 flex flex-wrap justify-center gap-8 text-sm text-gray-400 relative z-10">
                        <span className="flex items-center gap-2">
                            <span className="text-beats-red">✓</span> 30-day money-back guarantee
                        </span>
                        <span className="flex items-center gap-2">
                            <span className="text-beats-red">✓</span> Free 2-day shipping
                        </span>
                        <span className="flex items-center gap-2">
                            <span className="text-beats-red">✓</span> Student discount available
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
