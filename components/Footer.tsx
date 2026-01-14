import Link from "next/link";
import { Facebook, Instagram, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-olive text-cream pt-12 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {/* Brand Section */}
                    <div className="space-y-4">
                        <h3 className="text-2xl font-serif font-bold text-cream">Jessie's Café & Pizza</h3>
                        <p className="text-sand/90 leading-relaxed">
                            A warm and welcoming hub for breakfast, lunch, coffee and sweet treats.
                            Home of the best pancakes and pizza in Pitlochry.
                        </p>
                        <div className="flex space-x-4 pt-2">
                            <a href="https://www.facebook.com/jessiespitlochry" target="_blank" rel="noopener noreferrer" className="hover:text-brown transition-colors">
                                <Facebook size={24} />
                            </a>
                            <a href="https://www.instagram.com/jessies.cafe" target="_blank" rel="noopener noreferrer" className="hover:text-brown transition-colors">
                                <Instagram size={24} />
                            </a>
                            <a href="https://tiktok.com/@jessies.cafe" target="_blank" rel="noopener noreferrer" className="hover:text-brown transition-colors">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="lucide lucide-tiktok"
                                >
                                    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-xl font-serif font-semibold mb-4 text-cream">Explore</h4>
                        <ul className="space-y-2">
                            <li><Link href="/menu" className="hover:text-sand transition-colors">Full Menu</Link></li>
                            <li><Link href="/specials" className="hover:text-sand transition-colors">Specials & Events</Link></li>
                            <li><Link href="/gallery" className="hover:text-sand transition-colors">Gallery</Link></li>
                            <li><Link href="/about" className="hover:text-sand transition-colors">Our Story</Link></li>
                            <li><Link href="/admin" className="hover:text-sand transition-colors text-sm opacity-50">Admin Login</Link></li>
                        </ul>
                    </div>

                    {/* Contact & Hours */}
                    <div>
                        <h4 className="text-xl font-serif font-semibold mb-4 text-cream">Visit Us</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <MapPin className="flex-shrink-0 w-5 h-5 text-brown" />
                                <span>3a Atholl Road, Pitlochry<br />Scotland, PH16 5BX</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="w-5 h-5 text-brown" />
                                <span>01796 470000</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-brown" />
                                <span>hello@jessiescafe.co.uk</span>
                            </li>
                        </ul>
                        <div className="mt-6 pt-6 border-t border-cream/20">
                            <p className="text-sm">Open 6 days a week (Closed Tue)</p>
                            <p className="text-sm">Pizza Nights: Friday 5pm - 8pm</p>
                        </div>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-cream/20 text-center text-sm text-sand/70">
                    © {new Date().getFullYear()} Jessie's Café & Pizza. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
