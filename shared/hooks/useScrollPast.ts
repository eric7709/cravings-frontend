"use client";

import { useEffect, useState } from "react";

export function useScrollPast(value: number = 90) {
  const [past, setPast] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setPast(window.scrollY > value);
    };

    onScroll();
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [value]);

  return past;
}
