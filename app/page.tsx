import Hero from "@/components/Hero";

export default function Home() {
  return (
    <div className="font-sans">
      <Hero />

      {/* Intro/Highlights Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-serif font-bold text-olive mb-4">A Taste of Pitlochry</h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-600 leading-relaxed mb-12">
            Jessie's Café & Pizza is your dog-friendly spot for delicious homemade food.
            From our famous pancake stacks to our Friday night pizzas, everything is made with love.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-cream rounded-lg shadow-sm hover:shadow-md transition-shadow border border-sand">
              <h3 className="text-xl font-bold text-brown mb-2 font-serif">Pancakes & Waffles</h3>
              <p className="text-gray-600">Fluffy, golden, and stacked high with your favorite toppings.</p>
            </div>
            <div className="p-6 bg-cream rounded-lg shadow-sm hover:shadow-md transition-shadow border border-sand">
              <h3 className="text-xl font-bold text-brown mb-2 font-serif">Friday Pizza Night</h3>
              <p className="text-gray-600">Hand-stretched stone-baked pizzas starting at 5pm. Pre-booking essential!</p>
            </div>
            <div className="p-6 bg-cream rounded-lg shadow-sm hover:shadow-md transition-shadow border border-sand">
              <h3 className="text-xl font-bold text-brown mb-2 font-serif">Artisan Coffee</h3>
              <p className="text-gray-600">Expertly roasted beans and beautiful latte art to warm your day.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
