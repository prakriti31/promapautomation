import React from 'react';

const logos = [
    '/photos/ABB_logo.png',
    '/photos/AllenBradley_logo.png',
    '/photos/Siemens_logo.png',
    '/photos/Nord_logo.png',
    '/photos/Schneider_logo.png',
];

export default function ScrollingBrands() {
    return (
        <div className="overflow-hidden bg-primary-100 py-4">
            <div className="w-max animate-scroll-x flex gap-12">
                {[...logos, ...logos].map((src, i) => (
                    <img
                        key={i}
                        src={src}
                        alt={`scrolling-logo-${i}`}
                        className="h-12 w-auto object-contain"
                    />
                ))}
            </div>
        </div>
    );
}
