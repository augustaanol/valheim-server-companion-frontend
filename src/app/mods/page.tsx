"use client";

import { Flex } from "@radix-ui/themes";
import ModListCard from "@/components/ModListCard";

export default function Server() {

    const defaultGap: string = "4";

    return (
        <Flex direction="column" gap={defaultGap}>       
            <Flex direction={"column"} className="w-full md:w-1/2 lg:w-2/3">
                <ModListCard />
            </Flex>
        </Flex>
    )
}   