import React from 'react';
import useReveal from '../hooks/useReveal';
import { useRef } from 'react';

const brands = [
    {
        key: 'ABB',
        products: [
            'High-efficiency Drives',
            'PLC & Safety Relays',
            'Industrial Robots (spares)',
        ],
    },
    {
        key: 'AllenBradley',
        products: [
            'CompactLogix PLCs',
            'PowerFlex Drives',
            'PanelView HMIs',
        ],
    },
    {
        key: 'Siemens',
        products: [
            'S7-1200 / 1500 PLC',
            'SINAMICS G120 Drives',
            'SIMOTICS Motors',
        ],
    },
    {
        key: 'Nord',
        products: [
            'Gearbox & Gear-motors',
            'IE3 / IE4 Motors',
            'Frequency Inverters',
        ],
    },
    {
        key: 'Schneider',
        products: [
            'Modicon PLCs',
            'Altivar Drives',
            'Compact NSX MCCB',
        ],
    },
];

export default function BrandShowcase() {
    const sectionRef = useRef(null);
    useReveal(sectionRef);

    return (
        <section ref={sectionRef} className="scroll-fade bg-primary-50 py-16">
            <h3 className="mb-12 text-center text-3xl font-bold">
                Authorised Brands
            </h3>

            <div className="space-y-12">
                {brands.map(({ key, products }, idx) => (
                    <div
                        key={key}
                        className="mx-auto flex max-w-6xl flex-col items-center gap-8 px-6 lg:flex-row"
                    >
                        {/* logo */}
                        <img
                            src={`/photos/${key}_logo.png`}
                            alt={`${key} logo`}
                            className="h-24 w-auto object-contain"
                        />

                        {/* mini carousel */}
                        <div className="relative h-48 w-full overflow-hidden rounded-lg shadow-md lg:flex-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <img
                                    key={i}
                                    src={`/photos/${key}_${i + 1}.jpg`}
                                    alt=""
                                    style={{ animationDelay: `${i * 4}s` }} /* 20 s total loop */
                                    className="absolute inset-0 h-full w-full animate-slideshow object-cover opacity-0"
                                />
                            ))}
                            <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
                        </div>

                        {/* product lines */}
                        <ul className="w-full max-w-xs space-y-1 text-sm lg:w-72">
                            {products.map(p => (
                                <li key={p}>✔️ {p}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </section>
    );
}
