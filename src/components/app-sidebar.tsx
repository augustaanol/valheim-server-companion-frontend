"use client";

import Link from "next/link"
import { usePathname } from "next/navigation"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  useSidebar
} from "@/components/ui/sidebar"
import { Separator } from "./ui/separator";

import { useServerStore } from "@/store/serverStore";

import { Text, Flex, IconButton, Tooltip } from "@radix-ui/themes"
import { NavbarUserAvatar } from "./NavbarUserAvatar";
import { useUserStore } from "@/store/useUserStore";
import { LayoutDashboard, PanelLeft, ChartColumn, Terminal, Server, Package, Settings, Wrench, ListCheck, ChartNoAxesColumn, Map } from "lucide-react";

const navData = [
    {
      title: "Home",
      onlyAdminVisible: false,
      serverOfflineVisible: true,
      items: [
        {
          title: "Dashboard",
          url: "/",
          icon: LayoutDashboard,
          onlyAdminVisible: false,
          serverOfflineVisible: true,
        },
      ],
    },
    {
    title: "To do",
    onlyAdminVisible: false,
    serverOfflineVisible: true,
    items: [
    {
        title: "Columns",
        url: "/todo",
        icon: ListCheck,
        onlyAdminVisible: false,
        serverOfflineVisible: true,
    },
    ],
    },
    {
      title: "Game",
      onlyAdminVisible: false,
      serverOfflineVisible: true,
      items: [
        {
          title: "Stats",
          url: "/stats",
          icon: ChartColumn,
          onlyAdminVisible: false,
          serverOfflineVisible: true,
        },
        {
          title: "Map",
          url: "/map",
          icon: Map,
          onlyAdminVisible: false,
          serverOfflineVisible: false,
        },
        {
          title: "Commands",
          url: "/commands",
          icon: Terminal,
          onlyAdminVisible: false,
          serverOfflineVisible: false,
        },
      ],
    },
    {
      title: "Server",
      onlyAdminVisible: false,
      serverOfflineVisible: true,
      items: [
        {
          title: "Logs",
          url: "/server_logs",
          icon: Server,
          onlyAdminVisible: false,
          serverOfflineVisible: false,
        },
        {
          title: "Resources",
          url: "/server_resources",
          icon: ChartNoAxesColumn,
          onlyAdminVisible: false,
          serverOfflineVisible: false,
        },
        {
          title: "Mods",
          url: "/mods",
          icon: Package,
          onlyAdminVisible: false,
          serverOfflineVisible: true,
        },
      ],
    },
    {
    title: "Admin",
    onlyAdminVisible: true,
    serverOfflineVisible: true,
    items: [
    {
        title: "Settings",
        url: "#",
        icon: Wrench,
        onlyAdminVisible: true,
        serverOfflineVisible: true,
    },
    ],
    },
  ]


export function AppSidebar() {

  const pathname = usePathname()

  const appVersion = process.env.NEXT_PUBLIC_APP_VERSION;

  const { serverActive } = useServerStore();
  
  const {
      state,
      toggleSidebar,
  } = useSidebar()

  const { currentUser } = useUserStore();

  const isCollapsed = state === "collapsed";

  const filteredNav = navData
      .filter(section => serverActive || section.serverOfflineVisible)
      .map(section => ({
      ...section,
      items: section.items.filter(
          item => serverActive || item.serverOfflineVisible
      )
      }))
      .filter(section => section.items.length > 0); // usuń puste sekcje


  return (
      <Sidebar collapsible="icon" className="shrink-0 h-screen rounded-none">
      
      {/* HEADER */}
      <SidebarHeader className={!isCollapsed ? "" : "px-0"}>
          <Flex width={"full"} align={"center"} justify={!isCollapsed ? "between" : "center"} className={!isCollapsed ? "p-1 pt-2" : "pb-1 pt-2 px-0"}>
            { !isCollapsed && (
              <IconButton
                  variant="ghost"
                  radius="large"
              >
                  <Settings size={18} strokeWidth={1} className="text-zinc-100" />
              </IconButton>
            )}
            { !isCollapsed && (
            <Text size={"1"} className="text-zinc-400">{appVersion}</Text>
            )}
            <div className="hidden md:block">
            <IconButton
                variant="ghost"
                onClick={toggleSidebar}
                radius="large"
            >
                <PanelLeft size={22} strokeWidth={1}/>
            </IconButton>
            </div>
          </Flex>
          <Separator />
      </SidebarHeader>

      {/* CONTENT */}
      <SidebarContent className={!isCollapsed ? "px-3 gap-0" : "px-0 gap-0 items-center"}>
          {filteredNav.map(section => (
          <SidebarGroup key={section.title} className={!isCollapsed ? "pt-0" : "p-0 m-0 items-center"}>
              
              {!isCollapsed && (
              <Text
                  size="2"
                  weight="light"
                  className="pb-1 pt-1 text-zinc-300"
              >
                  {section.title}
              </Text>
              )}

              <Flex direction="column" className="px-0">
              {section.items.map(item => {
                const isActive = pathname === item.url
                return (
                  <Link key={item.title} href={item.url}>    
                      {!isCollapsed ? (
                        <Flex className={isActive ? "items-center px-4 gap-3 py-2 md:py-[0.3em] md:my-0.5 rounded-xl bg-white/10 transition" : "items-center md:my-0.5 px-4 gap-3 py-2 md:py-[0.3em] rounded-xl hover:bg-white/10 transition"}>
                          <item.icon size={12} className="text-zinc-100" />
                          <Text size="2" className="text-zinc-100">{item.title}</Text>
                        </Flex>
                      ) : (
                        <Tooltip content={item.title}>
                          <Flex className={isActive ? "items-center gap-3 p-2 my-0.5 rounded-xl bg-white/20 transition" : "items-center gap-3 p-2 my-0.5 rounded-xl hover:bg-white/20 transition"}>
                            <item.icon size={18} className="text-slate-200"/>
                          </Flex>
                        </Tooltip>
                      )}
                  </Link>
              )})}
              </Flex>

          </SidebarGroup>
          ))}
      </SidebarContent>

      {/* FOOTER */}
      <SidebarFooter>
          <Flex gap="3" align="center" className={!isCollapsed ? "px-3 py-3" : "py-3 px-0 justify-center m-0"}>
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