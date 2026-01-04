import { useEffect, useState } from "react";

export const useUpdateTime = () => {
  const [_, setTime] = useState(Date.now());
  useEffect(() => {
    const interval = setInterval(() => setTime(Date.now()), 10000);
    return () => clearInterval(interval);
  }, []);
};
