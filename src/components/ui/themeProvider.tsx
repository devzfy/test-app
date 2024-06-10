import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

type Theme = 'dark' | 'light' | 'system';

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}

interface ThemeProviderState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  isActive: boolean;
  toggleClass: () => void;
  token: string | null;
  setToken: (token: string) => void;
  removeToken: () => void;
}

const initialState: ThemeProviderState = {
  theme: 'system',
  setTheme: () => null,
  isActive: false,
  toggleClass: () => {},
  token: null,
  setToken: () => {},
  removeToken: () => {},
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export const ThemeProvider = ({
  children,
  defaultTheme = 'system',
  storageKey = 'vite-ui-theme',
}: ThemeProviderProps) => {
  const [theme, setThemeState] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  );
  const [token, setTokenState] = useState<string | null>(
    () => localStorage.getItem('auth-token')
  );
  const [isActive, setIsActive] = useState<boolean>(false);
  const navigate = useNavigate();

  const setTheme = (theme: Theme) => {
    localStorage.setItem(storageKey, theme);
    setThemeState(theme);
  };

  const setToken = (token: string) => {
    localStorage.setItem('auth-token', token);
    setTokenState(token);
  };

  const removeToken = () => {
    localStorage.removeItem('auth-token');
    setTokenState(null);
    navigate('/');
  };

  const toggleClass = () => {
    setIsActive(!isActive);
  };

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('light', 'dark');

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }
  }, [theme]);

  const value = {
    theme,
    setTheme,
    isActive,
    toggleClass,
    token,
    setToken,
    removeToken,
  };

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
};

export const useTheme = (): ThemeProviderState => {
  const context = useContext(ThemeProviderContext);
  if (!context) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
};
