"use client";

import Link from "next/link"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  useSidebar
} from "@/components/ui/sidebar"

import { useServerStore } from "@/store/serverStore";

import { Text, Flex, IconButton } from "@radix-ui/themes"
import { NavbarUserAvatar } from "./NavbarUserAvatar";
import { useUserStore } from "@/store/useUserStore";
import { HamburgerMenuIcon } from "@radix-ui/react-icons"

const navData = [
    {
      title: "Home",
      alwaysVisible: true,
      items: [
        {
          title: "Dashboard",
          url: "/",
          alwaysVisible: true,
        },
      ],
    },
    {
      title: "Game",
      alwaysVisible: true,
      items: [
        {
          title: "Stats",
          url: "/stats",
          alwaysVisible: true,
        },
        {
          title: "Commands",
          url: "commands",
          alwaysVisible: false,
        },
      ],
    },
    {
      title: "Server",
      alwaysVisible: false,
      items: [
        {
          title: "Server",
          url: "/server",
          alwaysVisible: false,
        },
        {
          title: "Mods",
          url: "/server",
          alwaysVisible: false,
        },
      ],
    },
    {
    title: "To do",
    alwaysVisible: true,
    items: [
    {
        title: "To do",
        url: "/todo",
        alwaysVisible: true,
    },
    ],
    },
  ]

export function AppSidebar() {

    const { serverActive } = useServerStore();
    
    const {
        state,
        open,
        setOpen,
        openMobile,
        setOpenMobile,
        isMobile,
        toggleSidebar,
    } = useSidebar()

    const { currentUser } = useUserStore();

    const isCollapsed = state === "collapsed"

    const filteredNav = navData
        .filter(section => serverActive || section.alwaysVisible)
        .map(section => ({
        ...section,
        items: section.items.filter(
            item => serverActive || item.alwaysVisible
        )
        }))
        .filter(section => section.items.length > 0) // usuń puste sekcje

  
    return (
        <Sidebar collapsible="icon" className="shrink-0">
        
        {/* HEADER */}
        <SidebarHeader>
            <Flex justify="end" align="center" width="100%">
            <IconButton
                variant="surface"
                onClick={toggleSidebar}
                radius="large"
            >
                <HamburgerMenuIcon />
            </IconButton>
            </Flex>
        </SidebarHeader>

        {/* CONTENT */}
        <SidebarContent>
            {filteredNav.map(section => (
            <SidebarGroup key={section.title}>
                
                {!isCollapsed && (
                <Text
                    size="3"
                    weight="bold"
                    className="px-3 pb-2"
                >
                    {section.title}
                </Text>
                )}

                <Flex direction="column" className="px-5">
                {section.items.map(item => (
                    <Link key={item.title} href={item.url}>
                    <div className="px-3 py-2 rounded-xl hover:bg-white/10 transition">
                        {!isCollapsed ? (
                        <Text size="3">{item.title}</Text>
                        ) : (
                        <Text size="3">
                            {item.title.charAt(0)}
                        </Text>
                        )}
                    </div>
                    </Link>
                ))}
                </Flex>

            </SidebarGroup>
            ))}
        </SidebarContent>

        {/* FOOTER */}
        <SidebarFooter>
            <Flex gap="3" align="center" className="px-3 py-3">
            <NavbarUserAvatar />
            {!isCollapsed && currentUser && (
                <Text size="4" weight="medium">
                {currentUser.name}
                </Text>
            )}
            </Flex>
        </SidebarFooter>
        </Sidebar>
    )
    }