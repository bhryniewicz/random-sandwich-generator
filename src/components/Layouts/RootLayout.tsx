"use client";

import { Navbar } from "@/components/Navbar";
import "@/app/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Lato, Luckiest_Guy } from "next/font/google";
import { SandwichFiltersProvider } from "@/contexts/sandwichFIltersContext";

const luckiest_guy = Luckiest_Guy({
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
  variable: "--font-luckiest",
});

const roboto = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  display: "swap",
  variable: "--font-roboto",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();

  return (
    <html lang="en" className={`${luckiest_guy.variable} ${roboto.variable}`}>
      <body>
        <QueryClientProvider client={queryClient}>
          <SandwichFiltersProvider>
            <div className="flex flex-col ">
              <Navbar />
              <div className="flex items-center justify-center w-full">
                {children}
              </div>
            </div>
          </SandwichFiltersProvider>
          <ReactQueryDevtools />
        </QueryClientProvider>
      </body>
    </html>
  );
}
