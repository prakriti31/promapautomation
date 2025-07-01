import React, { useRef } from 'react';
import useReveal from '../hooks/useReveal';

/* one slideshow per brand (5 images named Brand_1…Brand_5 in /public/photos) */
function BrandCarousel({ brand }) {
    const pics = Array.from({ length: 5 }, (_, i) => `/photos/${brand}_${i + 1}.jpg`);
    const delay = 15_000 / pics.length;

    return (
        <div className="relative h-[50vh] md:h-60 w-full overflow-hidden rounded-xl shadow-md">
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

    return (
        <section
            ref={ref}
            className="scroll-fade mx-auto max-w-full overflow-hidden py-14 px-4 sm:px-6"
        >
            <div
                className={`flex flex-col md:flex-row items-center md:items-start gap-8 ${
                    flip ? 'md:flex-row-reverse' : ''
                }`}
            >
                {/* Carousel section */}
                <div className="w-full md:w-1/2">
                    <BrandCarousel brand={brand} />
                </div>

                {/* Text section */}
                <div className="w-full md:w-1/2 space-y-4 px-2 text-center md:text-left">
                    <img
                        src={logo}
                        alt={`${brand} logo`}
                        loading="lazy"
                        className="mx-auto h-14 object-contain"
                    />
                    <p className="text-sm leading-relaxed md:text-base">{details}</p>
                </div>
            </div>
        </section>
    );
}
