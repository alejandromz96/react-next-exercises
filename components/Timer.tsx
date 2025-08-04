"use client"
import { type ReactNode, type FC, useState, useEffect } from "react";

type TimerProps = {
  render: (seconds: number) => ReactNode;
};

const Timer = ({ render }: TimerProps) => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setSeconds((count) => count + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  return <>{render(seconds)}</>;
};

export default Timer;
