import React from 'react';
import CategoryNavbar from '../components/CategoryNavbar';
import SiteFooter     from '../components/SiteFooter';

export default function TermsOfUse() {
    return (
        <div className="min-h-screen bg-primary-50 text-primary-900">
            <CategoryNavbar />

            <main className="mx-auto max-w-5xl px-6 py-12 space-y-8">
                <h1 className="text-3xl font-extrabold text-center mb-8">
                    Terms of Use
                </h1>

                {/* 1. Scope */}
                <section>
                    <h2 className="text-xl font-bold mb-4">1. Scope</h2>

                    <p className="mb-2">
                        <strong>1.1&nbsp;</strong>
                        Any use of this web site provided by PROMAP Automation
                        (“<em>Promap Web Site</em>”) is subject to these Terms of Use.
                        Promap Automation may amend, modify, or replace these Terms at any
                        time. By accessing or using the Promap Web Site you agree to the
                        then-current version.
                    </p>

                    <p className="mb-2">
                        <strong>1.2&nbsp;</strong>
                        Where this site is aimed at companies or public enterprises, the
                        user represents such entity and warrants sufficient authority to
                        accept these Terms.
                    </p>

                    <p>
                        <strong>1.3&nbsp;</strong>
                        If you use this site as a business or administration customer,
                        consumer-protection provisions regarding distance contracts do not
                        apply.
                    </p>
                </section>

                {/* 2. Services */}
                <section>
                    <h2 className="text-xl font-bold mb-4">2. Services</h2>

                    <p className="mb-2">
                        <strong>2.1&nbsp;</strong>
                        This site contains information, software, and related
                        documentation for viewing or download.
                    </p>
                    <p>
                        <strong>2.2&nbsp;</strong>
                        Promap Automation may suspend or stop the site at any time. We do
                        not guarantee continuous availability.
                    </p>
                </section>

                {/* 3. Registration, Password */}
                <section>
                    <h2 className="text-xl font-bold mb-4">3. Registration, Password</h2>

                    <p className="mb-2">
                        <strong>3.1&nbsp;</strong>
                        Certain areas may be password-protected. We reserve the right to
                        deny or revoke registration without notice, especially if the user
                        provides false data or violates these Terms.
                    </p>

                    <p className="mb-2">
                        <strong>3.2&nbsp;</strong>
                        During registration you must provide accurate, up-to-date
                        information and keep your e-mail address current.
                    </p>

                    <p className="mb-2">
                        <strong>3.3&nbsp;</strong>
                        Upon first login change the initial password to one known only to
                        you.
                    </p>

                    <p className="mb-2">
                        <strong>3.4&nbsp;</strong>
                        Keep your credentials confidential; you are liable for all actions
                        taken using them.
                    </p>

                    <p>
                        <strong>3.5&nbsp;</strong>
                        If you suspect misuse, notify us immediately so we can block
                        access.
                    </p>
                </section>

                {/* 4. Right of Use */}
                <section>
                    <h2 className="text-xl font-bold mb-4">
                        4. Right of Use to Information, Software and Documentation
                    </h2>

                    <p className="mb-2">
                        <strong>4.1&nbsp;</strong>
                        Your use of any information, software, or documentation on this
                        site is governed by these Terms or, where applicable, separate
                        license terms.
                    </p>
                    <p className="mb-2">
                        <strong>4.2&nbsp;</strong>
                        Promap grants you a non-exclusive, non-transferable, non-sublicensable
                        license for the intended purpose.
                    </p>
                    <p className="mb-2">
                        <strong>4.3&nbsp;</strong>
                        Software is supplied in object code free of charge unless otherwise
                        agreed; source code is not provided except where required by open-source
                        licenses.
                    </p>
                    <p>
                        <strong>4.4&nbsp;</strong>
                        You may not distribute, rent, modify, reverse-engineer, or
                        decompile the software except as allowed by law.
                    </p>
                </section>

                {/* 5-10 (Intellectual Property, User Duties, etc.) */}
                <section>
                    <h2 className="text-xl font-bold mb-4">5. Intellectual Property</h2>
                    <p>
                        Unless expressly granted, no license or right is conferred by
                        implication or otherwise. Brand names, patents, and copyrights on
                        this web site remain the property of their respective owners.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold mb-4">6. Duties of the User</h2>
                    <p>
                        When using this site you must not harm others, violate laws, upload
                        malware, or distribute unsolicited advertising (“spam”).
                        Promap Automation may deny access for any breach.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold mb-4">7. Hyperlinks</h2>
                    <p>
                        External links are provided for convenience. Promap Automation is
                        not responsible for the content of external sites and uses them at
                        your own risk.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold mb-4">
                        8. Warranty and Liability
                    </h2>
                    <p>
                        Information is provided “as is” without warranty. Promap Automation
                        is liable only for willful misconduct, gross negligence, or where
                        required by law.
                    </p>
                </section>

                {/* Shortened 9-12 for brevity; expand as needed */}
                <section>
                    <h2 className="text-xl font-bold mb-4">9-12. Miscellaneous</h2>
                    <p>
                        Export control laws, data-privacy regulations, and German law apply.
                        Place of jurisdiction is Pune, India, unless otherwise required.
                    </p>
                </section>
            </main>

            <SiteFooter />
        </div>
    );
}
