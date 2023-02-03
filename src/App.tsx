import React from "react";

import { AuthProvider } from "./contexts/AuthContext";

import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./styles/global";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./AppRoutes";
import ScrollToTop from "./utils/scrollToTop";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./services/queryClient";

import "@reach/dialog/styles.css";

import "./styles/reach-ui.css";
import "react-toastify/dist/ReactToastify.min.css";
import { AppOptionsProvider } from "./contexts/AppOptionsContext";
import { themes } from "./styles/themes";
function App() {
  return (
    <>
      <ThemeProvider theme={themes.light}>
        <GlobalStyle />
        <BrowserRouter>
          <AuthProvider>
            <QueryClientProvider client={queryClient}>
              <AppOptionsProvider>
                <>
                  <ScrollToTop />
                  <AppRoutes />
                </>
              </AppOptionsProvider>
            </QueryClientProvider>
          </AuthProvider>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
