import type { Metadata } from "next";
import { Schibsted_Grotesk } from "next/font/google";

import "./globals.css";
import { AuthProvider } from "@/components/AuthProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Frostwork Feed",
  description: "Keep up with the latest forecasting news",
};

export const fontSans = Schibsted_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "700"],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <AuthProvider session={session}>
      <html lang="en">
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable
          )}
        >
          {children}
        </body>
      </html>
    </AuthProvider>
  );
}
