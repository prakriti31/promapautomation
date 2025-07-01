import React, { lazy, Suspense } from 'react';
import CategoryNavbar from '../components/CategoryNavbar';
import InfoBlurb from '../components/InfoBlurb';
import SiteFooter from '../components/SiteFooter';

// Lazy-loaded components
const HeroCarousel = lazy(() => import('../components/HeroCarousel'));
const BrandSection = lazy(() => import('../components/BrandSection'));

/* ——— brand data ——— */
const brands = [
    {
        name:  'ABB',
        logo:  '/photos/ABB_logo.png',
        text:  `Certified ABB partner for PLCs, LV drives and safety relays.
            Stock of ACS-880 drives up to 110 kW.
            Field service and programming support available nationwide.`,
    },
    {
        name:  'AllenBradley',
        logo:  '/photos/AllenBradley_logo.png',
        text:  `Complete Allen-Bradley catalogue – MicroLogix, ControlLogix,
            Kinetix motion drives, PowerFlex inverters.
            UL-listed enclosure builds and panel retrofits offered on request.`,
    },
    {
        name:  'Siemens',
        logo:  '/photos/Siemens_logo.png',
        text:  `TIA-Portal ready SIMATIC S7-1200 / S7-1500 PLCs, SINAMICS G-series drives,
            and Smart MCC components always in stock.
            We also provide licensed STEP-7 programming services.`,
    },
    {
        name:  'Nord',
        logo:  '/photos/Nord_logo.png',
        text:  `Nord geared motors, Helical-Bevel and Parallel-Shaft options,
            torque range 10 Nm – 100 kNm. Custom flanges machined in-house.
            IE3 premium-efficiency motors ship within 48 hours.`,
    },
    {
        name:  'Schneider',
        logo:  '/photos/Schneider_logo.png',
        text:  `Schneider Modicon PLCs, Altivar drives and TeSys contactors.
            Green Premium components with full RoHS & REACH compliance.
            Panel-builder bundles and OEM tier pricing available.`,
    },
];

export default function Home() {
    return (
        <div className="min-h-screen overflow-x-hidden bg-primary-50 text-primary-900">
            <CategoryNavbar />

            {/* Animated brand stripe below carousel */}
            <div className="overflow-hidden py-6">
                <div className="animate-marquee flex w-max gap-16 px-6">
                    {brands.concat(brands).map((b, i) => (
                        <img
                            key={`${b.name}-${i}`}
                            src={b.logo}
                            alt={b.name}
                            className="h-12 w-auto object-contain opacity-90 hover:scale-110 transition-transform"
                        />
                    ))}
                </div>
            </div>

            <Suspense fallback={<div className="text-center py-8">Loading carousel...</div>}>
                <HeroCarousel />
            </Suspense>

            {/* Animated brand stripe below carousel */}
            <div className="overflow-hidden py-6">
                <div className="animate-marquee flex w-max gap-16 px-6">
                    {brands.concat(brands).map((b, i) => (
                        <img
                            key={`${b.name}-${i}`}
                            src={b.logo}
                            alt={b.name}
                            className="h-12 w-auto object-contain opacity-90 hover:scale-110 transition-transform"
                        />
                    ))}
                </div>
            </div>

            <h3 className="mt-6 mb-4 text-center text-2xl font-semibold text-primary-700">
                We deal with
            </h3>

            {/* Small animated brand logos for mobile */}
            <div className="mx-auto mb-10 flex max-w-full gap-6 overflow-x-auto px-6 sm:hidden scroll-smooth snap-x snap-mandatory">
                {brands.map((b) => (
                    <div
                        key={b.name}
                        className="snap-start flex-shrink-0 w-24 cursor-pointer transition-transform hover:scale-110"
                        aria-label={b.name}
                    >
                        <img
                            src={b.logo}
                            alt={`${b.name} logo`}
                            loading="lazy"
                            className="h-24 w-auto object-contain"
                        />
                    </div>
                ))}
            </div>

            {/* Larger brand sections hidden on small screens */}
            <div className="hidden sm:block">
                <h2 className="scroll-fade mx-auto mt-16 max-w-6xl px-6 text-center text-4xl font-extrabold">
                    Trusted Global Brands&nbsp;&nbsp;•&nbsp;&nbsp;Local Engineering Expertise
                </h2>

                <Suspense fallback={<div className="text-center py-8">Loading brands...</div>}>
                    {brands.map((b, idx) => (
                        <BrandSection
                            key={b.name}
                            brand={b.name}
                            logo={b.logo}
                            details={b.text}
                            flip={idx % 2 === 1}
                        />
                    ))}
                </Suspense>
            </div>

            <InfoBlurb
                title="Explore Our Complete Product Range"
                text={`From compact PLCs to 100 kNm geared-motor assemblies, PROMAP Automation
                   carries more than 2 000 catalogue items on the shelf. Our application
                   engineers help you choose, configure and commission the right gear
                   without the usual delays.`}
            />

            <InfoBlurb
                title="Quality & Reliability You Can Measure"
                text={`Every component that leaves our warehouse is test-logged, batch-tracked
                   and backed by a minimum 18-month warranty. We partner directly with OEMs
                   and tier-one factories—so you buy genuine parts, every single time.`}
                flip
            />

            <SiteFooter />
        </div>
    );
}
