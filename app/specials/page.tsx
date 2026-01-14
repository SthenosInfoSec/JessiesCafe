import Image from "next/image";
import Link from "next/link";

export default function Page() {
  const events = [
    {
      id: "pizza-night",
      title: "Friday Pizza Nights",
      date: "Every Friday",
      time: "5:00 PM - 8:00 PM",
      description: "Join us for our famous stone-baked pizzas! Sit in or takeaway. We have a great selection of beer, wine, and cold drinks to accompany your meal. Good vibes guaranteed!",
      image: "/images/specials/pizza_night.jpg",
      price: null,
      cta: "Call to Book"
    },
    {
      id: "wreath-making",
      title: "Wreath Making Workshop",
      date: "9th & 16th December",
      time: "6:30 PM - 8:30 PM",
      description: "Get festive with our creative workshop! Create your own beautiful wreath while enjoying Prosecco and nibbles. Limited availability, so book early!",
      image: "/images/specials/wreath_workshop.jpg",
      price: "£55 per person",
      cta: "Message to Book"
    }
  ];

  return (
    <div className="py-20 px-4 max-w-7xl mx-auto min-h-[50vh]">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-serif font-bold text-olive mb-4">Specials & Events</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          From weekly traditions to seasonal celebrations, there's always something happening at Jessie's.
        </p>
      </div>

      <div className="space-y-16">
        {events.map((event, index) => (
          <div key={event.id} className={`flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-12 items-center`}>
            {/* Image Section */}
            <div className="w-full md:w-1/2 relative aspect-[4/5] md:aspect-square rounded-xl overflow-hidden shadow-lg border-4 border-white">
              <Image
                src={event.image}
                alt={event.title}
                fill
                className="object-cover"
              />
            </div>

            {/* Content Section */}
            <div className="w-full md:w-1/2 space-y-6">
              <div className="inline-block bg-sand/30 px-4 py-1 rounded-full text-olive font-semibold mb-2">
                {event.date} • {event.time}
              </div>
              <h2 className="text-3xl font-serif font-bold text-brown">{event.title}</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                {event.description}
              </p>

              {event.price && (
                <div className="text-xl font-bold text-olive">
                  {event.price}
                  <span className="block text-sm font-normal text-gray-500 mt-1">Includes Prosecco & Nibbles</span>
                </div>
              )}

              <div className="pt-4">
                <Link
                  href="/contact"
                  className="inline-block bg-olive text-cream px-8 py-3 rounded-md hover:bg-brown transition-colors font-medium text-lg shadow-md"
                >
                  {event.cta}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
