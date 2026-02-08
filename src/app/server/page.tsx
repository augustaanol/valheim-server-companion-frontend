"use client";

import { Flex } from "@radix-ui/themes";
import { ServerLogCard } from "@/components/ServerLogCard";
import ServerResourcesCard from "@/components/ServerResourcesCard";
import ModListCard from "@/components/ModListCard";

export default function Server() {

    const defaultGap: string = "4";

    return (
        <Flex direction="column" gap={defaultGap}>
            <Flex direction={{initial: "column", md: "row"}} gap={defaultGap} className="items-stretch">
                <Flex direction={"column"} className="w-full md:w-1/2 lg:w-1/3">
                    <ServerResourcesCard />
                </Flex>
                <Flex direction={"column"} className="w-full md:w-1/2 lg:w-2/3">
                    <ModListCard />
                </Flex>
            </Flex>
            <ServerLogCard />
        </Flex>
    )
}   