"use client";

import { Flex } from "@radix-ui/themes";
import ModListCard from "@/components/ModListCard";

export default function Mods() {

    const defaultGap: string = "4";

    return (
        <Flex direction="column" gap={defaultGap}>       
            <Flex direction={"column"} className="w-full">
                <ModListCard />
            </Flex>
        </Flex>
    )
}   