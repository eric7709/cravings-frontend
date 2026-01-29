import { useEffect, useState } from "react";

export const useScreenWidth = () => {
  const [width, setWidth] = useState<undefined | number>(undefined);
  useEffect(() => {
    const handleSize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleSize);
    return () => window.removeEventListener("resize", handleSize);
  }, []);

  return width;
};
