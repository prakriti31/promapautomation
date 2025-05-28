// Ensure you've run: npm install lucide-react
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const categories = [
    { name: 'PLC',      options: ['Siemens PLC', 'ABB PLC', 'Schneider PLC', 'Allen Bradley'] },
    { name: 'Drives',   options: ['Siemens', 'ABB'] },
    { name: 'Motors',   options: ['Nord', 'Siemens'] },
    { name: 'Power Items', options: ['MCCB', 'MCB'] },
    { name: 'Cables',   options: [] },
];

export default function CategoryNavbar() {
    const [openCategory, setOpenCategory] = useState(null);
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <div className="bg-primary-800 text-white">
            <div className="max-w-6xl mx-auto px-4">
                {/* Desktop */}
                <div className="hidden md:flex items-center h-12 space-x-4">
                    {categories.map((cat) => (
                        <div key={cat.name} className="relative group">
                            <button className="px-3 py-2 hover:bg-primary-700 rounded inline-flex items-center">
                                <span>{cat.name}</span>
                                {cat.options.length > 0 && <ChevronDown className="ml-1 w-4 h-4" />}
                            </button>
                            {cat.options.length > 0 && (
                                <div className="absolute left-0 mt-1 bg-white text-black rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                    {cat.options.map((opt) => (
                                        <a key={opt} href="#" className="block px-4 py-2 hover:bg-gray-100">
                                            {opt}
                                        </a>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                {/* Mobile */}
                <div className="md:hidden flex items-center justify-between h-12">
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="px-3 py-2 hover:bg-primary-700 rounded inline-flex items-center"
                    >
                        <span>Products</span>
                        <ChevronDown className="ml-1 w-4 h-4" />
                    </button>
                </div>
            </div>
            {/* Mobile dropdown */}
            {mobileOpen && (
                <div className="md:hidden bg-primary-700 px-4 pb-4 space-y-2">
                    {categories.map((cat) => (
                        <div key={cat.name}>
                            <button
                                onClick={() => setOpenCategory(openCategory === cat.name ? null : cat.name)}
                                className="w-full text-left px-3 py-2 hover:bg-primary-600 rounded flex justify-between items-center"
                            >
                                <span className="text-white">{cat.name}</span>
                                {cat.options.length > 0 && <ChevronDown className="w-4 h-4 text-white" />}
                            </button>
                            {openCategory === cat.name && cat.options.length > 0 && (
                                <div className="pl-4 pt-1 space-y-1">
                                    {cat.options.map((opt) => (
                                        <a key={opt} href="#" className="block py-1 text-white">
                                            {opt}
                                        </a>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}