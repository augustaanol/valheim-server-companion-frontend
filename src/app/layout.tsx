import type { Metadata } from "next";
import React from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "@radix-ui/themes/styles.css";
import { Theme, Flex } from "@radix-ui/themes";
import Navbar from "@/components/navbar";
import ServerPoller from "@/components/ServerPoller";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

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
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
        <ServerPoller />
        <Theme 
          appearance="dark" 
          accentColor="gray" 
          radius="full" 
          grayColor="mauve"
          >
            <SidebarProvider>
              <AppSidebar />
              <main 
                className="flex-1 transition-all duration-300"
                style={{
                  backgroundImage: "url('/images/background.jpg')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  minHeight: "100vh",
                }}
              >
                <div className="mx-auto 2xl:w-4/5 xl:w-9/10 w-[92%] flex flex-col min-h-screen mb-8">
                  <Navbar titleText="ADiheim server companion"/>
                  {children}
                </div>
              </main>
            </SidebarProvider>
        </Theme>
      </body>
    </html>
  );
}
