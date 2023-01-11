import { ReactNode, useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import { isTheme } from "../../contexts/AppOptionsContext";
import { useAppOptions } from "../../hooks/useAppOptions";
import { themes } from "../../styles/themes";

export default function CustomThemeProvider({ children }: any) {
  const AppOptions = useAppOptions();
  const [isDarkMode, setIsDarkMode] = useState<boolean>(
    window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  useEffect(() => {
    const modeMe = (e: any) => {
      setIsDarkMode(e.matches);
    };
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", modeMe);
    return window
      .matchMedia("(prefers-color-scheme: dark)")
      .removeEventListener("change", modeMe);
  }, []);

  return (
    <ThemeProvider
      theme={
        AppOptions.theme === "systemDefault"
          ? isDarkMode
            ? themes.dark
            : themes.light
          : isTheme(AppOptions.theme)
          ? themes[AppOptions.theme]
          : themes.light
      }
    >
      {children}
    </ThemeProvider>
  );
}
