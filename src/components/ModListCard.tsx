"use client";

import { useEffect, useState, useCallback } from "react";
import { Card, ScrollArea, Heading, Text, Flex, Button, Tooltip } from "@radix-ui/themes";
import { DownloadIcon, SymbolIcon } from "@radix-ui/react-icons";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

type Mod = {
  dll_name: string;
  matched: boolean;
  mod_name: string;
  author: string;
  latest_version: string;
  url: string;
  download_url: string;
};

export default function ModListCard() {
  const [modsList, setModsList] = useState<Mod[]>([]);
  const [loading, setLoading] = useState(false);

  const BACKEND_URL =
    process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

  const fetchMods = useCallback(async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/mods/`);
      if (!response.ok) return;
      const data = await response.json();
      setModsList(data);
    } catch (e) {
      console.error(e);
    }
  }, [BACKEND_URL]);

  const handleRefresh = async () => {
    try {
      setLoading(true);

      await fetch(`${BACKEND_URL}/api/mods/refresh`, {
        method: "POST",
      });

      await fetchMods(); // po odświeżeniu ściągamy nowe dane
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMods();
    const interval = setInterval(fetchMods, 60000);
    return () => clearInterval(interval);
  }, [fetchMods]);

  return (
    <Card>
      <Flex className="w-full p-3" direction={"column"} gap={"3"}>
        <Flex justify={"between"} className="pr-3">
          <Heading as="h2">Installed mods</Heading>
          <Tooltip content="Aktualizuje bazę modów z Thunderstore oraz listę modów na serwerze">
            <Button
              variant="ghost"
              onClick={handleRefresh}
              disabled={loading}
            >
              <SymbolIcon
                className={loading ? "animate-spin" : ""}
              />
            </Button>
          </Tooltip>
        </Flex>
        
        <ScrollArea type="always" scrollbars="vertical" style={{ height: "65vh" }}>
            <Flex direction="column" gap="0">
                {modsList ? (
                    modsList.map((mod, index) => (
                        <Flex key={index} gap={"2"} width={"95%"} align={"center"}>
                            {mod.matched ? (
                                <Flex gap={"2"} justify={"between"} align={"center"} className="hover:bg-gray-600 rounded-2xl px-5 py-2 w-full">
                                    
                                    <Text className="font-medium">{mod.mod_name} <span className="text-gray-400 font-light text-sm"> by {mod.author}</span></Text>
                                    
                                    <Flex gap={"3"}>
                                      <Link href={mod.url} target="_blank" className="hover:bg-slate-800 rounded-2xl p-2"><ExternalLink className="w-4 h-4" /></Link>
                                      <Link href={mod.download_url} target="_blank" className="hover:bg-slate-800 rounded-2xl p-2"><DownloadIcon className="w-4 h-4" /></Link>
                                    </Flex>
                                    
                                </Flex>
                            ) : (
                                <Flex align={"center"} className="hover:bg-gray-600 rounded-2xl px-3 py-2 w-full">
                                    <Text>{mod.dll_name}</Text>
                                </Flex>
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
