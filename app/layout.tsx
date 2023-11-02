import "./globals.css";
import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import { authOptions } from "./utils/Auth";
import { getServerSession } from "next-auth";
import SessionProvider from "./components/SessionProvider";

export const metadata: Metadata = {
  title: "Twitter | It's whats happening.",
  description: "It's whats happening.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en" data-theme="dark">
      <body className="font-inter">
        <SessionProvider session={session}>
          {children}
          <Toaster />
        </SessionProvider>
      </body>
    </html>
  );
}
