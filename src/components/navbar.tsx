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
};

export default function Navbar({ titleText }: NavbarProps) {

    return (
        <>
        <Flex align={"center"} justify={"between"} direction={"row"} display={{ initial: "none", sm: "flex" }} className="px-6 pt-4 pb-3 mb-7 gap-6 sticky top-0 bg-zinc-900/40 backdrop-blur-xl border-b border-gray-600">
            <Flex align={"center"} gap={"5"}>
                <Image alt="logo" src="/images/valheim_logo_large.webp" width={130} height={70} className="sm:w-14 md:w-24 h-auto" />
                <Heading 
                    as="h1" 
                    size={{initial: "6",md: "6"}} 
                    style={{ fontFamily: pirataOne.style.fontFamily }}
                    >
                    {titleText}
                </Heading>
            </Flex>
        </Flex>

        <Flex align={"center"} justify={"between"} display={{ initial: "flex", sm: "none" }} className="py-2 px-4 mb-6 sticky top-0 bg-zinc-900/40 backdrop-blur-xl border-b border-gray-600">
            <Flex gap={"3"} align="center">
                <Image alt="logo" src="/images/valheim_logo_large.webp" width={160} height={100} className="w-24" />
                <Heading 
                    as="h1" 
                    size={"4"} 
                    style={{ fontFamily: pirataOne.style.fontFamily }}
                    >
                    {titleText}
                </Heading>
            </Flex>
            <SidebarTrigger className="md:hidden" />
        </Flex>

        </>
    )
}