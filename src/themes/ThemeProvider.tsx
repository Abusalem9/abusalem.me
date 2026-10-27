"use client";

import { createContext, useCallback, useContext, useSyncExternalStore } from "react";
import {
  DEFAULT_THEME,
  THEME_STORAGE_KEY,
  themes,
  type Theme,
  type ThemeId,
} from "./index";

const EVENT = "themechange";

function subscribe(onChange: () => void) {
  window.addEventListener(EVENT, onChange);
  return () => window.removeEventListener(EVENT, onChange);
}

function getSnapshot(): ThemeId {
  return DEFAULT_THEME;
}

const getServerSnapshot = (): ThemeId => DEFAULT_THEME;

type Ctx = { theme: Theme; themeId: ThemeId; setTheme: (id: ThemeId) => void };

const ThemeContext = createContext<Ctx>({
  theme: themes[DEFAULT_THEME],
  themeId: DEFAULT_THEME,
  setTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const themeId = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setTheme = useCallback((id: ThemeId) => {
    document.documentElement.dataset.theme = id;
    try {
      localStorage.setItem(THEME_STORAGE_KEY, id);
    } catch {
      // private mode
    }
    window.dispatchEvent(new Event(EVENT));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme: themes[themeId], themeId, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const themeInitScript = `
(function(){
  document.documentElement.dataset.theme = "spider";
})();
`;
