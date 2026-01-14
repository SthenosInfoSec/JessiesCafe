import Image from "next/image";

export default function Page() {
  const images = [
    "/images/gallery/SnapInsta.to_610633606_17939410659110563_4951758223204596238_n.jpg", // Pancakes
    "/images/gallery/SnapInsta.to_609851835_17939173944110563_6150559073592264937_n.jpg", // Exterior
    "/images/gallery/SnapInsta.to_526782534_17919965673110563_7839795212627312673_n.jpg", // Pizza
    "/images/gallery/SnapInsta.to_500523317_17911184199110563_635830043242985650_n.jpg", // Coffee
    "/images/gallery/SnapInsta.to_427971475_405292975384401_4748608960885963152_n.jpg", // Logo/Detail
    "/images/gallery/SnapInsta.to_525279087_17919965661110563_8746375003010060124_n.jpg",
    "/images/gallery/SnapInsta.to_602832873_17937311985110563_6067627265331843496_n.jpg",
    "/images/gallery/SnapInsta.to_604038359_17937876723110563_3755762970271324557_n.jpg"
  ];

  return (
    <div className="py-20 px-4 max-w-7xl mx-auto min-h-[50vh]">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-serif font-bold text-olive mb-4">Gallery</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          A glimpse into daily life at Jessie's Café. Good food, great coffee, and even better company.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((src, index) => (
          <div key={index} className="relative aspect-square w-full overflow-hidden rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 group">
            <Image
              src={src}
              alt={`Jessie's Café Gallery Image ${index + 1}`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
