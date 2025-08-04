import {
  createContext,
  useContext,
  PropsWithChildren,
  useState,
  useMemo,
  useCallback,
  useEffect,
} from "react";

const THEME_KEY = "storaged-theme";

type ThemeTypes = "dark" | "light";
const isThemeType = (value: string | null): value is ThemeTypes => {
  return value === "dark" || value === "light";
};

type ThemeContextType = {
  theme: ThemeTypes;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    throw new Error("useTheme must be used within ThemeContext.Provider");
  }

  return themeContext;
};

const ThemeProvider = ({ children }: PropsWithChildren) => {
  const [theme, setTheme] = useState<ThemeTypes>("dark");

  useEffect(() => {
    const storagedTheme = localStorage.getItem(THEME_KEY);
    if (isThemeType(storagedTheme)) setTheme(storagedTheme);
  }, [isThemeType]);

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === THEME_KEY && isThemeType(event.newValue)) {
        setTheme(event.newValue);
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [isThemeType]);

  const toggleTheme = useCallback(() => {
    setTheme((currentTheme) => {
      const newTheme = currentTheme === "dark" ? "light" : "dark";
      localStorage.setItem(THEME_KEY, newTheme);
      return newTheme;
    });
  }, []);

  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export default ThemeProvider;
