import { Flex } from "@radix-ui/themes";
import { getAllChangelogs } from "@/lib/changelog"
import ChangelogCard from "@/components/changelog/ChangelogCard"

export default function DevInfoPage() {

    const defaultGap: string = "4";

    const entries = getAllChangelogs()

    return (
        <Flex direction="column" gap={defaultGap}>
            <Flex direction={"column"} className="w-full md:w-2/3">
                <ChangelogCard entries={entries} />
            </Flex>
            <Flex direction={"column"} className="w-full md:w-1/3">
            
            </Flex>
        </Flex>
    )
}   