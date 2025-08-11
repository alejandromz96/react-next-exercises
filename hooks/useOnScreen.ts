import { useEffect, useState, type RefObject } from "react";

type UseOnScreenProps = {
  ref: RefObject<Element | null>;
  options?: IntersectionObserverInit;
};

const useOnScreen = ({ ref, options }: UseOnScreenProps): boolean => {
  const [onScreen, setOnScreen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !ref.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      setOnScreen(entry.isIntersecting);
    }, options);

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [ref, options]);

  return onScreen;
};

export default useOnScreen;
