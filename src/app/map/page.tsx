"use client";

import { Flex, Card } from "@radix-ui/themes";

export default function Map() {

    const defaultGap: string = "4";

    return (
        <Flex direction="column" gap={defaultGap}> 
            <Card>    
            <iframe src="https://valheim-map.world/index.html?seed=WHDP6669JP&ver=0.221.4&offset=0%2C0&zoom=0.6" className="w-full h-[80vh] 2xl:h-[85vh]"></iframe>
            </Card>  
        </Flex>
    )
}   