"use client";

import { Flex } from "@radix-ui/themes";
import { ServerLogCard } from "@/components/ServerLogCard";

export default function ServerLogs() {

    const defaultGap: string = "4";

    return (
        <Flex direction="column" gap={defaultGap}>
            <ServerLogCard />
        </Flex>
    )
}   