"use client";

// import type { Metadata } from "next";
import Providers from "@/components/Providers";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import { Provider } from "react-redux";

import theme from "../../theme";

import "../globals.css";
import "../normalize.css";

import { store } from "../../store";

// export const metadata: Metadata = {
//   title: "Autopasst",
//   description: "Sell Cars",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <Providers>
              <Provider store={store}>{children}</Provider>
            </Providers>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
