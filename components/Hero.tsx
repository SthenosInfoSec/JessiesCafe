import Link from "next/link";
import Image from "next/image";

export default function Hero() {
    return (
        <div className="relative bg-cream overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="relative z-10 pb-8 bg-cream sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32 min-h-[600px] flex flex-col justify-center">
                    <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                        <div className="sm:text-center lg:text-left">
                            <h1 className="text-4xl tracking-tight font-extrabold text-olive sm:text-5xl md:text-6xl font-serif">
                                <span className="block xl:inline">Warm & Welcoming</span>{" "}
                                <span className="block text-brown xl:inline">Hub in Pitlochry</span>
                            </h1>
                            <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                                Home of homemade pancakes, stone-baked pizzas, and warming bowls of soup.
                                Award-winning café serving breakfast, lunch, and sweet treats in a cozy atmosphere.
                            </p>
                            <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                                <div className="rounded-md shadow">
                                    <Link
                                        href="/menu"
                                        className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-cream bg-olive hover:bg-brown md:py-4 md:text-lg transition-colors"
                                    >
                                        View Menu
                                    </Link>
                                </div>
                                <div className="mt-3 sm:mt-0 sm:ml-3">
                                    <Link
                                        href="/contact"
                                        className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-olive bg-sand/30 hover:bg-sand/50 md:py-4 md:text-lg transition-colors"
                                    >
                                        Book a Table
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
            <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
                <div className="h-56 w-full sm:h-72 md:h-96 lg:w-full lg:h-full relative">
                    <Image
                        src="/images/pancakes.jpg"
                        alt="Stack of homemade pancakes with syrup"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-olive/10 mix-blend-multiply"></div>
                </div>
            </div>
        </div>
    );
}
