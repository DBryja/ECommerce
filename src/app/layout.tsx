import type { Metadata } from "next";
import "./globals.css";
import Header from "@/app/components/header";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={"bg-gray-600 w-full h-full vsc-initialized"}>
        <Header/>
        {children}
      </body>
    </html>
  );
}
