import React, { useRef } from 'react';
import CategoryNavbar from '../components/CategoryNavbar';
import HeroCarousel   from '../components/HeroCarousel';
import useReveal      from '../hooks/useReveal';
import { Link }       from 'react-router-dom';

export default function Home() {
    const featureRef = useRef(null);
    const gridRef    = useRef(null);
    useReveal(featureRef);
    useReveal(gridRef);

    /* quick helper for category pills */
    const cats = [
        { cat: 'PLC',          subs: ['Siemens PLC', 'ABB PLC', 'Schneider PLC', 'Allen Bradley PLC'] },
        { cat: 'Drives',       subs: ['Siemens', 'ABB'] },
        { cat: 'Motors',       subs: ['Nord', 'Siemens'] },
        { cat: 'Power Items',  subs: ['MCCB', 'MCB'] },
        { cat: 'Cables',       subs: [] },
    ];
    const link = (c, s='All') => `/products/${encodeURIComponent(c)}/${encodeURIComponent(s)}`;

    return (
        <div className="min-h-screen overflow-x-hidden bg-primary-50 text-primary-900">
            <CategoryNavbar />

            {/* hero slideshow */}
            <HeroCarousel />

            {/* “why us” strip */}
            <section ref={featureRef} className="mx-auto max-w-6xl px-6 py-16 lg:flex lg:items-center lg:gap-12">
                <div className="mb-10 flex-1 lg:mb-0">
                    <h2 className="mb-4 text-3xl font-bold lg:text-4xl">
                        Your One-Stop Shop for Industrial Automation
                    </h2>
                    <p className="text-gray-700 lg:text-lg">
                        PROMAP Automation brings together the world’s leading brands under one roof,
                        delivering genuine products, expert support, and rapid fulfillment &mdash;
                        so you can focus on keeping your plant running.
                    </p>
                </div>
                <ul className="flex-1 space-y-3 text-sm lg:text-base">
                    <li>✔️  Authorised distributor partnerships</li>
                    <li>✔️  24-hour dispatch on in-stock items</li>
                    <li>✔️  Technical assistance from certified engineers</li>
                    <li>✔️  Bulk pricing for OEMs and integrators</li>
                </ul>
            </section>

            {/* product grid */}
            <section ref={gridRef} className="bg-white py-16">
                <h3 className="mb-8 text-center text-2xl font-semibold">Browse by Category</h3>
                <div className="mx-auto grid max-w-6xl gap-6 px-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                    {cats.map(({ cat, subs }) => (
                        <Link
                            key={cat}
                            to={link(cat)}
                            className="group relative overflow-hidden rounded-xl border bg-gradient-to-br from-primary-200 to-primary-100 p-6 shadow-md transition-transform hover:-translate-y-1"
                        >
                            <h4 className="mb-2 text-lg font-bold">{cat}</h4>
                            {subs.length ? (
                                <ul className="text-xs leading-snug text-primary-800">
                                    {subs.slice(0, 3).map(s => (
                                        <li key={s}>{s}</li>
                                    ))}
                                    {subs.length > 3 && <li>…</li>}
                                </ul>
                            ) : (
                                <p className="text-xs text-primary-800">Multiple gauges &amp; specs</p>
                            )}

                            {/* subtle zoom bg */}
                            <div className="absolute inset-0 -z-10 scale-110 bg-[url('/photos/pic1.jpg')] opacity-0 transition-opacity duration-700 group-hover:opacity-25" />
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
}
