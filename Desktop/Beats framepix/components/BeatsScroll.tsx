'use client';

import { useEffect, useRef, useState } from 'react';

const TOTAL_FRAMES = 120;
const FRAME_PATH = '/beats-frames/frame_';

export default function BeatsScroll() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const [loadProgress, setLoadProgress] = useState(0);
    const imagesRef = useRef<HTMLImageElement[]>([]);

    // Preload images
    useEffect(() => {
        const loadImages = async () => {
            const images: HTMLImageElement[] = [];
            let loaded = 0;

            // Using every other frame from the 240 available (1, 3, 5, 7... up to 239)
            for (let i = 0; i < TOTAL_FRAMES; i++) {
                const frameNumber = (i * 2) + 1; // Maps to 1, 3, 5, 7, ..., 239
                const img = new Image();
                const paddedNumber = String(frameNumber).padStart(3, '0');

                img.src = `${FRAME_PATH}${paddedNumber}.jpg`;

                img.onload = () => {
                    loaded++;
                    setLoadProgress(Math.floor((loaded / TOTAL_FRAMES) * 100));

                    if (loaded === TOTAL_FRAMES) {
                        setImagesLoaded(true);
                    }
                };

                images.push(img);
            }

            imagesRef.current = images;
        };

        loadImages();
    }, []);

    // Handle scroll and render frames
    useEffect(() => {
        if (!imagesLoaded) return;

        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        const context = canvas.getContext('2d');
        if (!context) return;

        // Set canvas size with device pixel ratio for crisp rendering
        const setCanvasSize = () => {
            const dpr = window.devicePixelRatio || 1;
            const rect = canvas.getBoundingClientRect();

            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;

            context.scale(dpr, dpr);
            canvas.style.width = rect.width + 'px';
            canvas.style.height = rect.height + 'px';
        };

        setCanvasSize();
        window.addEventListener('resize', setCanvasSize);

        const render = () => {
            const scrollTop = window.scrollY;
            const containerTop = container.offsetTop;
            const containerHeight = container.offsetHeight;
            const windowHeight = window.innerHeight;

            // Calculate scroll progress through the container
            const scrollProgress = Math.max(
                0,
                Math.min(
                    1,
                    (scrollTop - containerTop) / (containerHeight - windowHeight)
                )
            );

            // Map scroll progress to frame index
            const frameIndex = Math.min(
                TOTAL_FRAMES - 1,
                Math.floor(scrollProgress * TOTAL_FRAMES)
            );

            const img = imagesRef.current[frameIndex];
            if (!img) return;

            // Clear canvas
            const canvasWidth = canvas.getBoundingClientRect().width;
            const canvasHeight = canvas.getBoundingClientRect().height;
            context.clearRect(0, 0, canvasWidth, canvasHeight);

            // Draw image centered and fitted
            const scale = Math.max(
                canvasWidth / img.width,
                canvasHeight / img.height
            );

            const x = (canvasWidth - img.width * scale) / 2;
            const y = (canvasHeight - img.height * scale) / 2;

            context.drawImage(
                img,
                x,
                y,
                img.width * scale,
                img.height * scale
            );
        };

        // Render on scroll
        window.addEventListener('scroll', render);
        render(); // Initial render

        return () => {
            window.removeEventListener('scroll', render);
            window.removeEventListener('resize', setCanvasSize);
        };
    }, [imagesLoaded]);

    return (
        <div
            ref={containerRef}
            className="relative"
            style={{ height: '400vh' }}
        >
            {/* Loading indicator */}
            {!imagesLoaded && (
                <div className="fixed inset-0 z-40 flex items-center justify-center bg-white">
                    <div className="text-center">
                        <div className="w-64 h-1 bg-gray-200 rounded-full overflow-hidden mb-4">
                            <div
                                className="h-full bg-beats-red transition-all duration-300"
                                style={{ width: `${loadProgress}%` }}
                            />
                        </div>
                        <p className="text-sm font-medium text-gray-600">
                            Loading experience... {loadProgress}%
                        </p>
                    </div>
                </div>
            )}

            {/* Sticky canvas */}
            <div className="sticky top-0 left-0 w-full h-screen">
                <canvas
                    ref={canvasRef}
                    className="w-full h-full"
                    style={{ objectFit: 'contain' }}
                />
            </div>
        </div>
    );
}
