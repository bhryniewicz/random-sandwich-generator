"use client";

import { Navbar } from "@/components/Navbar";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <QueryClientProvider client={queryClient}>
        <body>
          <div className="flex gradient">
            <Navbar />
            {children}
          </div>
        </body>
      </QueryClientProvider>
    </html>
  );
}
