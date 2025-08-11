import { useEffect, useState } from "react";

import { debounce } from "@/utils/performance";

type WindowSizeType = {
  width: number;
  height: number;
};

const useWindowSize = (): WindowSizeType => {
  const [windowSize, setWindowSize] = useState<WindowSizeType>({ width: 0, height: 0 });

  useEffect(() => {
    if (window === undefined) return;
    const handleResize = debounce(
      () => setWindowSize({ width: window.innerWidth, height: window.innerHeight }),
      300
    );
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
};

export default useWindowSize;
