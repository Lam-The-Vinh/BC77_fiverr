"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import NavDes from "../component/nav/NavDes";
import NavMobile from "../component/nav/NavMobile";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md transition-all duration-300 z-50">
      <div className="container py-3">

        <div className="hidden md:flex">
          <NavDes isScrolled={isScrolled} />
        </div>

        <div className="flex justify-between md:hidden">
          <Link href="/" className="text-2xl font-bold text-gray-800">
            fiverr<span className="text-green-500">.</span>
          </Link>
          <button className="text-gray-700" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isOpen && <NavMobile />}
    </header>
  );
};

export default Header;
