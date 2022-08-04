import { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "styled-components";
import { Header } from "../../components/header/header";
import { SidebarList } from "../../components/sidebar/sidebar-list";
import { isTheme } from "../../contexts/AppOptionsContext";
import { useAppOptions } from "../../hooks/useAppOptions";
import { GlobalStyle } from "../../styles/global";
import { SysGlobalStyle } from "../../styles/sys";
import { themes } from "../../styles/themes";

export default function SystemLayout() {
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
    <>
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
        <GlobalStyle />
        <SysGlobalStyle />
        <ToastContainer
          position="top-right"
          style={{ marginTop: "var(--top-bar-height)" }}
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Header />
        <div className="sys-grid-container">
          <SidebarList />
          <div className="main">
            <div className="main-container">
              <main>
                <Outlet />
              </main>
              <footer></footer>
            </div>
          </div>
        </div>
      </ThemeProvider>
    </>
  );
}
