import { DefaultTheme, ThemeProvider } from "styled-components";
import GlobalStyle from "../styles/global";
import usePersistedState from "../utils/usePersistedState";
import light from "../styles/themes/light";
import dark from "../styles/themes/dark";
import { ToastContainer } from "react-toastify";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { Toaster } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const [theme, setTheme] = usePersistedState<DefaultTheme>("theme", dark);

  const toggleTheme = () => {
    setTheme(theme.title === "light" ? dark : light);
  };

  return (
    <SessionProvider session={session}>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} toggleTheme={toggleTheme} />
        <ToastContainer />
        <GlobalStyle />
      </ThemeProvider>
      <Toaster position="top-right" />
    </SessionProvider>
  );
}

export default MyApp;
