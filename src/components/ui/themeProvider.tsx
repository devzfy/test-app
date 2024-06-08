import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type Theme = "dark" | "light" | "system";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  isActive: boolean;
  toggleClass: () => void;
  token: string | null;
  setToken: (token: string) => void;
  removeToken: ()=> void
};

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
  isActive: false,
  toggleClass: () => false,
  token: null,
  setToken: () => {},
  removeToken: ()=> {}
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => (localStorage.getItem(storageKey) as Theme) || defaultTheme);
  const [token, setTokenState] = useState<string | null>(() => localStorage.getItem('auth-token'));
  const navigate = useNavigate()

  const setToken = (token: string) => {
    localStorage.setItem('auth-token', token);
    setTokenState(token);
  };

  const removeToken = ()=>{
    localStorage.removeItem('auth-token');
    setTokenState(null);
    navigate('/')
  }

  //////

  const [isActive, setIsActive] = useState<boolean>(false);
  const toggleClass = () => {
    setIsActive(!isActive);
  };

  ////////

  useEffect(() => {
    const storedToken = localStorage.getItem('auth-token');
    if (storedToken) {
      setTokenState(storedToken);
    }
    const root = window.document.documentElement;

    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";

      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  ////////

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
    },
    isActive,
    toggleClass,
    token,
    setToken,
    removeToken
  };

  ///////

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (!context)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
