"use client";

import { useRouter } from "next/navigation";
import { SearchBar } from "./SearchBar";

const companies = [
  { name: "Meta", logo: "/icon/meta.svg" },
  { name: "Google", logo: "/icon/google.svg" },
  { name: "Netflix", logo: "/icon/netflix.svg" },
  { name: "P&G", logo: "/img/pg-seeklogo.png" },
  { name: "PayPal", logo: "/icon/paypal.svg" },
  { name: "Payoneer", logo: "/icon/payoneer.svg" },
];

const FreelancerHero: React.FC = () => {
  const router = useRouter();

  const handleSearch = (query: string) => {
    router.push(`/search?query=${encodeURIComponent(query)}`);
  };

  return (
    <div className="container mt-24 relative bg-green-900 text-white py-16">
      <div className="relative z-10 text-center">
        <h1 className="text-3xl md:text-5xl font-bold">
          Scale your professional workforce with <i>freelancers</i>
        </h1>
        <div className="mt-6 flex justify-center">
          <div className="w-full max-w-lg text-black">
            <SearchBar
              placeholder="Search for any service..."
              onSearch={handleSearch}
            />
          </div>
        </div>
      </div>
      <div className="mt-10 flex flex-wrap justify-center gap-4 opacity-75">
        <p>Trust by:</p>
        {companies.map((company, index) => (
          <img
            key={index}
            src={company.logo}
            alt={company.name}
            className="h-6 md:h-8"
          />
        ))}
      </div>
    </div>
  );
};

export default FreelancerHero;
