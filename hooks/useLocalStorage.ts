import { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";

const useLocalStorage = <T>(
  key: string,
  initialValue: T,
  validator?: (value: unknown) => value is T
): [T, (value: T) => void] => {
    
  const getParsedValue = useCallback(
    (rawValue: string | null) => {
      if (rawValue) {
        try {
          const parsedValue = JSON.parse(rawValue) as unknown;
          if (!validator) {
            return parsedValue as T;
          } else if (validator(parsedValue)) {
            return parsedValue;
          }
        } catch (error) {
          const { stack, message } = error as Error;
          console.error(`Error in useLocalStorage: ${stack ?? message}`);
        }
      }
      return initialValue;
    },
    [key, validator]
  );

  const [value, setValue] = useState<T>(() => {
    if (typeof window === "undefined") return initialValue;
    const rawValue = localStorage.getItem(key);
    return getParsedValue(rawValue);
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key) {
        setValue(getParsedValue(e.newValue));
      }
    };
    window.addEventListener("storage", handleStorageChange);

    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const changeValue: Dispatch<SetStateAction<T>> = (newValue) => {
    const valueToStore = newValue instanceof Function ? newValue(value) : newValue;
    if (typeof window === "undefined") return;
    localStorage.setItem(key, JSON.stringify(valueToStore));
    setValue(valueToStore);
  };

  return [value, changeValue];
};

export default useLocalStorage;
