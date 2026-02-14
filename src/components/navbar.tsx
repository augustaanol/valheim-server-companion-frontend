"use client";

import { Flex, Heading } from "@radix-ui/themes";
import Image from "next/image";
import { Pirata_One } from "next/font/google";
import { SidebarTrigger } from "@/components/ui/sidebar"



const pirataOne = Pirata_One({
        weight: "400",
        subsets: ["latin"],
    });

type NavbarProps = {
  titleText: string;
  titleTextMobile: string;
};

export default function Navbar({ titleText, titleTextMobile }: NavbarProps) {

    return (
        <>
        <Flex align={"center"} justify={"between"} direction={"row"} display={{ initial: "none", sm: "flex" }} className="pt-8 mb-8 gap-6 sticky top-0">
            <Flex align={"center"} gap={"5"}>
                <Image alt="logo" src="/images/valheim_logo_large.webp" width={160} height={100} className="sm:w-14 md:w-40 h-auto" />
                <Heading 
                    as="h1" 
                    size={{initial: "6",md: "8"}} 
                    style={{ fontFamily: pirataOne.style.fontFamily }}
                    >
                    {titleText}
                </Heading>
            </Flex>
        </Flex>

        <Flex align={"center"} justify={"between"} display={{ initial: "flex", sm: "none" }} className="pt-6 pb-6 px-1 md:pb-12 sticky top-0">
            <Flex gap={"3"} align="center">
                <Image alt="logo" src="/images/valheim_logo_large.webp" width={160} height={100} className="w-28" />
                <Heading 
                    as="h1" 
                    size={"7"} 
                    style={{ fontFamily: pirataOne.style.fontFamily }}
                    >
                    {titleTextMobile}
                </Heading>
            </Flex>
            <SidebarTrigger className="md:hidden" />
        </Flex>

        </>
    )
}