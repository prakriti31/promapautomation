import React, { useRef } from 'react';
import useReveal         from '../hooks/useReveal';

export default function InfoBlurb({ title, text, flip = false }) {
    const ref = useRef(null);
    useReveal(ref);

    return (
        <section ref={ref} className="scroll-fade mx-auto max-w-6xl py-14 px-6">
            <div
                className={`flex flex-col items-center gap-8 md:flex-row ${
                    flip ? 'md:flex-row-reverse' : ''
                }`}
            >
                <h3 className="w-full text-center text-3xl font-bold md:w-1/3 md:text-left">
                    {title}
                </h3>
                <p className="w-full text-gray-700 md:w-2/3 md:text-lg leading-relaxed">
                    {text}
                </p>
            </div>
        </section>
    );
}
