import React from 'react';

/* assumes 15 pics in public/photos named pic1-pic15.(jpg|png) */
const pics = Array.from({ length: 15 }, (_ , i) => `/photos/pic${i + 1}.jpg`);
const durationPer = 20_000 / pics.length; // 20 s total loop

export default function HeroCarousel() {
    return (
        <div className="relative h-[65vh] w-full overflow-hidden bg-black">
            {pics.map((src, i) => (
                <img
                    key={src}
                    src={src}
                    loading="lazy"
                    alt=""
                    style={{ animationDelay: `${i * durationPer}ms` }}
                    className="absolute inset-0 h-full w-full object-cover opacity-0 animate-slideshow"
                />
            ))}

            {/* overlay gradient + headline */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-white/10" />
            <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white">
                <h1 className="text-4xl font-extrabold tracking-wide drop-shadow-md lg:text-6xl">
                    Industrial Automation Made Easy
                </h1>
                <p className="mt-4 max-w-xl px-6 text-lg font-light lg:text-2xl">
                    PLCs • Drives • Motors • Power Gear • Cables
                </p>
            </div>
        </div>
    );
}