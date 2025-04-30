import type {Metadata} from "next";
import {Spline_Sans} from "next/font/google";
import "./globals.css";
import GlobalProvider from "./globalProvider";
const splineSans = Spline_Sans({
  variable: "--font-spline-sans",
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: "Student Management System",
  description: "A modern student management system built with Next.js",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={`${splineSans.variable} antialiased`}>
        <GlobalProvider>{children}</GlobalProvider>
      </body>
    </html>
  );
}
