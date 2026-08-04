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

/**
 * The `data-theme` attribute on <html> is the source of truth — a script in
 * <head> sets it before first paint, so there's no flash on load. React
 * subscribes to it rather than owning a second copy of the same state.
 */
function subscribe(onChange: () => void) {
  window.addEventListener(EVENT, onChange);
  return () => window.removeEventListener(EVENT, onChange);
}

function getSnapshot(): ThemeId {
  const id = document.documentElement.dataset.theme as ThemeId | undefined;
  return id && id in themes ? id : DEFAULT_THEME;
}

const getServerSnapshot = (): ThemeId => DEFAULT_THEME;

type Ctx = { theme: Theme; themeId: ThemeId; setTheme: (id: ThemeId) => void };

const ThemeContext = createContext<Ctx>({
  theme: themes[DEFAULT_THEME],
  themeId: DEFAULT_THEME,
  setTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

/**
 * Colours live in CSS (`:root[data-theme=...]`), so switching is just an
 * attribute flip — no re-render for the palette. React state exists only for
 * what CSS can't express: the cursor mode, corner ornaments and flavour text.
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const themeId = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setTheme = useCallback((id: ThemeId) => {
    document.documentElement.dataset.theme = id;
    try {
      localStorage.setItem(THEME_STORAGE_KEY, id);
    } catch {
      // private mode — the choice just won't survive a reload
    }
    window.dispatchEvent(new Event(EVENT));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme: themes[themeId], themeId, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * Runs before first paint so a saved theme never flashes the default first.
 * Injected as a raw <script> in the layout <head>.
 */
export const themeInitScript = `
(function(){
  try {
    var t = localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)});
    document.documentElement.dataset.theme =
      (t === "spider" || t === "panda" || t === "minion") ? t : ${JSON.stringify(DEFAULT_THEME)};
  } catch (e) {
    document.documentElement.dataset.theme = ${JSON.stringify(DEFAULT_THEME)};
  }
})();
`;
