"use client";
import useIsMobile from "@/hooks/useIsMobile";
import useWindowSize from "@/hooks/useWindowSize";

const WindowSizePage = () => {
  const { width, height } = useWindowSize();
  const isMobile = useIsMobile();
  console.log({ width, height });
  return (
    <>
      <h1 className="mb-6 text-3xl font-bold">Window Size</h1>
      <p>
        Width: {width}px — Height: {height}px
      </p>
      {isMobile && <p className="text-xl">Is mobile size</p>}
    </>
  );
};

export default WindowSizePage;
