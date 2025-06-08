import React from 'react';
import CategoryNavbar from '../components/CategoryNavbar';
import HeroCarousel   from '../components/HeroCarousel';
import BrandSection   from '../components/BrandSection';
import InfoBlurb      from '../components/InfoBlurb';
import SiteFooter     from '../components/SiteFooter';

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
            <HeroCarousel />

            {/* catchy intro before brand list */}
            <h2 className="scroll-fade mx-auto mt-16 max-w-6xl px-6 text-center text-4xl font-extrabold">
                Trusted Global Brands&nbsp;&nbsp;•&nbsp;&nbsp;Local Engineering Expertise
            </h2>

            {/* brand sections */}
            {brands.map((b, idx) => (
                <BrandSection
                    key={b.name}
                    brand={b.name}
                    logo={b.logo}
                    details={b.text}
                    flip={idx % 2 === 1}
                />
            ))}

            {/* two informational blurbs */}
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
