import React, { useRef } from 'react';
import useReveal from '../hooks/useReveal';

export default function InfoBlurb({ title, text, flip = false }) {
    const ref = useRef(null);
    useReveal(ref);

    return (
        <section
            ref={ref}
            className="scroll-fade mx-auto max-w-6xl py-14 px-6 transition-all duration-700 ease-in-out"
        >
            <div
                className={`flex flex-col items-center gap-8 md:flex-row ${
                    flip ? 'md:flex-row-reverse' : ''
                }`}
            >
                <h3 className="w-full text-center text-3xl font-extrabold text-primary-800 md:w-1/3 md:text-left md:text-4xl leading-tight">
                    {title}
                </h3>
                <p className="w-full text-primary-900 md:w-2/3 md:text-lg text-base leading-relaxed">
                    {text}
                </p>
            </div>
        </section>
    );
}
