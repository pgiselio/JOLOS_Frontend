import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "styled-components";
import { Header } from "../../components/header/header";
import { SidebarList } from "../../components/sidebar/sidebar-list";
import { useAppOptions } from "../../hooks/useAppOptions";
import { GlobalStyle } from "../../styles/global";
import { SysGlobalStyle } from "../../styles/sys";
import { darkTheme, lightTheme, darkGrayTheme } from "../../styles/themes";

export default function SystemLayout() {
  const AppOptions = useAppOptions();
  const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)");
  return (
    <>
      
      <ThemeProvider theme={AppOptions.theme === "light" ? lightTheme : AppOptions.theme === "dark" ? darkTheme : AppOptions.theme === "darkGray" ? darkGrayTheme : prefersDarkMode.matches ? darkTheme : lightTheme}>
        <GlobalStyle />
        <SysGlobalStyle />
        <ToastContainer
          position="top-right"
          style={{marginTop: "var(--top-bar-height)"}}
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Header/>
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
