"use client";

import Image from "next/image";

interface ServiceItem {
  title: string;
  icon: string;
}

const servicesData: ServiceItem[] = [
  {
    title: "3D Industrial Design",
    icon: "/icon/box.svg",
  },
  {
    title: "E-commerce Website Development",
    icon: "/icon/webhook.svg",
  },
  {
    title: "Email Marketing",
    icon: "/icon/mail.svg",
  },
  {
    title: "Press Releases",
    icon: "/icon/file.svg",
  },
  {
    title: "Logo Design",
    icon: "/icon/wand.svg",
  },
];

export default function GoToServices() {
  return (
    <section className="container py-12">
      <h2 className="mb-6 text-xl font-bold text-gray-800">
        Vontélle&apos;s go-to services
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {servicesData.map((service, index) => (
          <div
            key={index}
            className="flex flex-col items-center rounded-lg border bg-white p-6 shadow-sm"
          >
            <div className="relative h-16 w-16">
              <Image
                src={service.icon}
                alt={service.title}
                fill
                className="object-contain"
              />
            </div>
            <p className="mt-4 text-center text-sm font-medium text-gray-700">
              {service.title}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
