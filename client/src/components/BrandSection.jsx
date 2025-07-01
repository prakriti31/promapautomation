import React, { useRef } from 'react';
import useReveal from '../hooks/useReveal';

function BrandCarousel({ brand }) {
    const pics = Array.from({ length: 5 }, (_, i) => `/photos/${brand}_${i + 1}.jpg`);
    const delay = 15_000 / pics.length;

    return (
        <div className="relative h-60 w-full overflow-hidden rounded-xl shadow-md">
            {pics.map((src, i) => (
                <img
                    key={src}
                    src={src}
                    alt=""
                    loading="lazy"
                    style={{ animationDelay: `${i * delay}ms` }}
                    className="absolute inset-0 h-full w-full object-cover opacity-0 animate-slideshow"
                />
            ))}
        </div>
    );
}

export default function BrandSection({ brand, logo, details, flip = false }) {
    const ref = useRef(null);
    useReveal(ref);

    const content = (
        <>
            <div className="flex-1">
                <BrandCarousel brand={brand} />
            </div>

            <div className="flex-1 space-y-4 px-6">
                <img
                    src={logo}
                    alt={`${brand} logo`}
                    loading="lazy"
                    className="mx-auto h-14 object-contain"
                />
                <p className="text-sm leading-relaxed md:text-base">{details}</p>
            </div>
        </>
    );

    return (
        <section ref={ref} className="scroll-fade mx-auto max-w-6xl py-14 px-6">
            <div
                className={`flex flex-col md:flex-row items-center gap-8 ${
                    flip ? 'md:flex-row-reverse' : ''
                }`}
            >
                {content}
            </div>
        </section>
    );
}
