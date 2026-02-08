"use client";

import { useEffect, useState } from "react";
import { Card, ScrollArea, Heading, Text, Flex } from "@radix-ui/themes";
import Link from "next/link";

type Mod = {
  dll_name: string;
  matched: boolean;
  mod_name: string;
  author: string;
  latest_version: string;
  url: string;
};

export default function ModListCard() {
  const [modsList, setModsList] = useState<Mod[]>([]);

  const BACKEND_URL =
    process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

  useEffect(() => {
    const fetchMods = async () => {
      try {
        const response = await fetch(
          `${BACKEND_URL}/api/mods-list`
        );
        if (!response.ok) return;

        const data = await response.json();
        setModsList(data);
      } catch (e) {
        console.error(e);
      }
    };

    fetchMods();
    const interval = setInterval(fetchMods, 3600000);
    return () => clearInterval(interval);
  }, [BACKEND_URL]);

  return (
    <Card>
      <Flex className="w-full p-3" direction={"column"} gap={"3"}>
        <Heading as="h2">Lista modów</Heading>
        <ScrollArea type="always" scrollbars="vertical" style={{ height: 180 }}>
            <Flex direction="column" gap="0">
                {modsList ? (
                    modsList.map((mod, index) => (
                        <Flex key={index} gap={"2"} width={"90%"} align={"center"} className="hover:bg-gray-600 rounded-2xl px-3 py-2">
                            {mod.matched ? (
                                <Link href={mod.url} target="_blank" className="w-full">
                                <Text className="font-medium">{mod.mod_name} <span className="text-gray-400 font-light text-sm"> by {mod.author}</span></Text>
                                </Link>
                            ) : (
                                <Text>{mod.dll_name}</Text>
                            )}
                        </Flex>
                    ))
                ) : (
                    <Text>Ładowanie...</Text>
                )}
            </Flex>
        </ScrollArea>
      </Flex>
    </Card>
  );
}
