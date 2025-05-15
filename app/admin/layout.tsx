"use client";

// import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import ukLocale from "date-fns/locale/uk";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import theme from "../../theme";

import "../globals.css";
import "../normalize.css";

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
        <LocalizationProvider
          dateAdapter={AdapterDateFns}
          adapterLocale={ukLocale}
        >
          <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
          </AppRouterCacheProvider>
        </LocalizationProvider>
      </body>
    </html>
  );
}
