import Image from "next/image";

export default function Page() {
  const menus = [
    { title: "Drinks Menu", src: "/images/menus/DrinkMenu.jpg" },
    { title: "Wine List", src: "/images/menus/WineMenu.jpg" },
    { title: "Vegan Options", src: "/images/menus/VeganMenu.jpg" },
    { title: "Gluten Free", src: "/images/menus/GFMenu.jpg" },
  ];

  return (
    <div className="py-20 px-4 max-w-7xl mx-auto min-h-[50vh]">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-serif font-bold text-olive mb-4">Our Menus</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Explore our wide range of delicious options, from warming coffees to stone-baked pizzas.
          We cater for everyone with dedicated Vegan and Gluten Free menus.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {menus.map((menu) => (
          <div key={menu.src} className="space-y-4">
            <h2 className="text-2xl font-serif font-bold text-brown border-b-2 border-sand pb-2">{menu.title}</h2>
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow bg-cream border border-sand">
              <Image
                src={menu.src}
                alt={`${menu.title} - Jessie's Café`}
                fill
                className="object-contain"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
