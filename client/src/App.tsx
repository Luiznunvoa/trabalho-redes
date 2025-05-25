import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from './styles/globals'
import { theme } from "./styles/theme";
import { BrowserRouter } from "./router";

export const queryClient = new QueryClient();

export function App() {
  return (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme}>
        <BrowserRouter />
        <GlobalStyle />
    </ThemeProvider>
  </QueryClientProvider>
  );
}
