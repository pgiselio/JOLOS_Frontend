import { Button } from "../../../../components/button";
import { useAppOptions } from "../../../../hooks/useAppOptions";
import { Container } from "./styles";

export function SettingThemesPage() {
  const AppOptions = useAppOptions();
  const toggleTheme = (themeName: string) => {
    window.localStorage.setItem("theme", themeName);
    AppOptions.setTheme(themeName);
  };
  return (
    <Container>
      <button
        className={`theme-option ${
          AppOptions.theme === "systemDefault" ? "active" : ""
        }`}
        onClick={() => toggleTheme("systemDefault")}
      >
        Padrão do seu sistema ({window.matchMedia("(prefers-color-scheme: dark)").matches ? "Escuro" : "Claro"})
        <span></span>
      </button>
      <button
        className={`theme-option ${
          AppOptions.theme === "light" ? "active" : ""
        }`}
        onClick={() => toggleTheme("light")}
      >
        Claro
        <span></span>
      </button>
      <button
        className={`theme-option ${
          AppOptions.theme === "dark" ? "active" : ""
        }`}
        onClick={() => toggleTheme("dark")}
      >
        Escuro 
        <span></span>
      </button>
      <button
        className={`theme-option ${
          AppOptions.theme === "darkGray" ? "active" : ""
        }`}
        onClick={() => toggleTheme("darkGray")}
      >
        Escuro acinzentado
        <span></span>
      </button>
    </Container>
  );
}
