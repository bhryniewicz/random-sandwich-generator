"use client";

import { Navbar } from "@/components/Navbar";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Luckiest_Guy, Roboto } from "next/font/google";

const luckiest_guy = Luckiest_Guy({
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
  variable: "--font-luckiest",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-roboto",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();

  return (
    <html lang="en" className={`${luckiest_guy.variable} ${roboto.variable}`}>
      <body>
        <QueryClientProvider client={queryClient}>
          <div className="flex gradient">
            <Navbar />
            {children}
          </div>
        </QueryClientProvider>
      </body>
    </html>
  );
}
