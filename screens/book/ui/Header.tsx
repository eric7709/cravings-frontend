"use client";

import { useEffect, useState } from "react";
import HeaderTopBar from "./HeaderTopBar";
import HeaderSearch from "./HeaderSearch";
import HeaderCategory from "./HeaderCategory";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`
        sticky top-0 z-40
        transition-all duration-300
        border-gray-200
        ${scrolled ? "border-b bg-white/30 backdrop-blur-xl" : "bg-transparent"}
      `}
    >
      <HeaderTopBar />
      <HeaderSearch />
      <HeaderCategory />
    </div>
  );
}
