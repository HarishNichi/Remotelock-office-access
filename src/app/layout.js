import React from "react";
import Providers from "./providers";
import "./globals.css";

export const metadata = {
  title: "Access Admin | RemoteLOCK",
  description: "Office Access Management System Mockup",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body className="antialiased selection:bg-blue-100 selection:text-blue-900">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
