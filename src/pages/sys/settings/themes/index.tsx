import { isTheme } from "../../../../contexts/AppOptionsContext";
import { useAppOptions } from "../../../../hooks/useAppOptions";
import { themes } from "../../../../styles/themes";
import { Container } from "./styles";

export function SettingThemesPage() {
  const AppOptions = useAppOptions();
  const toggleTheme = (themeName: keyof typeof themes) => {
    window.localStorage.setItem("theme", themeName);
    AppOptions.setTheme(themeName);
  };
  const themeKeys = Object.keys(themes);

  return (
    <Container>
      <>
        {themeKeys.length > 0 &&
          themeKeys.map((theme) => 
            isTheme(theme) && (
              <button
                key={theme}
                className={`theme-option ${
                  AppOptions.theme === theme ? "active" : ""
                }`}
                onClick={() => toggleTheme(theme)}
              >
                {themes[theme].name}<span></span>
              </button>
            )
          )}
      </>
    </Container>
  );
}
