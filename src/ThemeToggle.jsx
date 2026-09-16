import { useEffect, useState } from "react";

const storageKey = "shoaib-agency-theme";

function savedTheme() {
  return window.localStorage.getItem(storageKey) === "dark" ? "dark" : "light";
}

export function ThemeToggle() {
  const [theme, setTheme] = useState(savedTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem(storageKey, theme);
  }, [theme]);

  const isDark = theme === "dark";

  return (
    <button
      className={`theme-toggle${isDark ? " is-dark" : ""}`}
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      aria-pressed={isDark}
    >
      <span className="theme-toggle-track" aria-hidden="true"><span className="theme-toggle-knob" /></span>
      <span className="theme-toggle-label">{isDark ? "Dark" : "Light"}</span>
    </button>
  );
}
