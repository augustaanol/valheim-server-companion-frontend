import type { Metadata } from "next";
import React from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import Navbar from "@/components/navbar";
import ServerPoller from "@/components/ServerPoller";
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Flex } from "@radix-ui/themes";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "ADiheim",
  description: "valheim server control",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased bg-cover bg-center bg-no-repeat`}
          style={{ backgroundImage: "url('/images/background.webp')" }}
        >
        <ServerPoller />
        <Theme 
          appearance="dark" 
          accentColor="gray" 
          radius="full" 
          grayColor="mauve"
          style={{ background: "transparent" }}
          >
            <SidebarProvider>
              <Flex className="w-full h-screen">
              <AppSidebar />
              <main 
                className="flex-1 transition-all duration-300"
              >
                <div className="mx-auto xl:w-19/20 w-[92%] flex flex-col mb-8">
                  <Navbar titleText="ADiheim server companion" titleTextMobile="ADiheim SC" />
                  {children}
                </div>
              </main>
              </Flex>
            </SidebarProvider>
        </Theme>
      </body>
    </html>
  );
}
