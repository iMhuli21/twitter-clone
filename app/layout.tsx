import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Twitter | It's whats happening.",
  description: "It's whats happening.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dark">
      <body className="font-inter">{children}</body>
    </html>
  );
}
