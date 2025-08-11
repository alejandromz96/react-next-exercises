"use client";

import { useRef } from "react";
import useOnScreen from "@/hooks/useOnScreen";

const OnScreenPage = () => {
  const boxRef = useRef<HTMLDivElement>(null);
  const isVisible = useOnScreen({ ref: boxRef, options: { threshold: 0.5 } });

  return (
    <main className="min-h-screen p-8">
      <h1 className="mb-6 text-4xl font-bold">On Screen</h1>
      <p className="mb-10 text-zinc-400">
        Scroll down to see the box enter the screen. The visibility status is tracked in real time.
      </p>

      <div className="h-[200vh] bg-gradient-to-b from-zinc-900 to-zinc-700 flex flex-col items-center justify-center">
        <div
          ref={boxRef}
          className={`h-48 w-48 transition-colors duration-300 ${
            isVisible ? "bg-green-500" : "bg-red-500"
          }`}
        ></div>

        <p className="mt-4 text-xl">
          Box is {isVisible ? "on screen ✅" : "off screen ❌"}
        </p>
      </div>
    </main>
  );
};

export default OnScreenPage;