"use client";

import Link from "next/link";

import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Menu", href: "/menu" },
        { name: "Specials", href: "/specials" },
        { name: "About", href: "/about" },
        { name: "Gallery", href: "/gallery" },
        { name: "Contact", href: "/contact" },
    ];

    return (
        <nav className="bg-cream shadow-sm sticky top-0 z-50 border-b border-sand/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20">
                    {/* Logo Section */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link href="/" className="flex items-center gap-2">
                            {/* Simple Daisy Icon (SVG) */}
                            <div className="h-10 w-10 text-olive">
                                <svg viewBox="0 0 100 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M50 35C50 35 35 15 20 25C5 35 15 50 15 50C15 50 5 65 20 75C35 85 50 65 50 65C50 65 65 85 80 75C95 65 85 50 85 50C85 50 95 35 80 25C65 15 50 35 50 35Z" fill="#F5F0E6" stroke="currentColor" strokeWidth="4" />
                                    <circle cx="50" cy="50" r="10" fill="currentColor" />
                                </svg>
                            </div>
                            <div className="text-2xl font-serif font-bold text-olive tracking-wide">
                                Jessie's <span className="text-brown">Café</span>
                            </div>
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-olive hover:text-brown transition-colors font-medium text-lg font-serif"
                            >
                                {link.name}
                            </Link>
                        ))}
                        <Link
                            href="/contact"
                            className="bg-olive text-cream px-5 py-2 rounded-full hover:bg-brown transition-colors font-medium shadow-md"
                        >
                            Book Table
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex md:hidden items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-olive hover:text-brown focus:outline-none"
                        >
                            {isOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-cream border-t border-sand">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="block px-3 py-2 rounded-md text-base font-medium text-olive hover:text-brown hover:bg-sand/30"
                                onClick={() => setIsOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <div className="pt-4 pb-2">
                            <Link
                                href="/contact"
                                className="block w-full text-center bg-olive text-cream px-5 py-3 rounded-md hover:bg-brown transition-colors font-medium"
                                onClick={() => setIsOpen(false)}
                            >
                                Book a Table
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
