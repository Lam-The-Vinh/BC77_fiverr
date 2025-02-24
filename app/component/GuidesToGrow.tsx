import Image from "next/image";
import Link from "next/link";

interface GuideItem {
  title: string;
  imageSrc: string;
  href: string;
}

const guideItems: GuideItem[] = [
  {
    title: "Start a side business",
    imageSrc: "/img/side-hustle.png",
    href: "#",
  },
  {
    title: "Ecommerce business ideas",
    imageSrc: "/img/ecommerce.png",
    href: "#",
  },
  {
    title: "Start an online business and work from home",
    imageSrc: "/img/online-business.png",
    href: "#",
  },
];

export default function GuidesToGrow() {
  return (
    <section className="container py-8">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">
          Guides to help you grow
        </h2>
        <Link
          href="#"
          className="text-sm font-medium text-blue-600 hover:underline"
        >
          See more
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {guideItems.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className="group block overflow-hidden rounded-lg border bg-white shadow-sm transition-transform hover:scale-[1.01]"
          >
            <div className="relative h-48 w-full">
              <Image
                src={item.imageSrc}
                alt={item.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <p className="text-base font-semibold text-gray-800 group-hover:text-blue-600">
                {item.title}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
