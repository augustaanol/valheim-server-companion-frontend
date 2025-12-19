"use client";

import {
  Avatar,
  DropdownMenu,
  Flex,
  Text,
} from "@radix-ui/themes";
import { useServerStore } from "@/store/serverStore";
import { useUserStore } from "@/store/useUserStore";

export function NavbarUserAvatar() {
  const { AllPlayersList } = useServerStore();
  const { currentUser, setCurrentUser } = useUserStore();

  const fallbackLetter =
    currentUser?.name?.charAt(0).toUpperCase() ?? "?";

  return (
    <DropdownMenu.Root>
      {/* AVATAR JAKO TRIGGER */}
      <DropdownMenu.Trigger>
        <div
          role="button"
          aria-label="Wybierz użytkownika"
          className="cursor-pointer"
        >
          <Avatar
            size="2"
            radius="full"
            fallback={fallbackLetter}
            color="gray"
          />
        </div>
      </DropdownMenu.Trigger>

      {/* DROPDOWN */}
      <DropdownMenu.Content align="end">
        {AllPlayersList.length === 0 && (
          <DropdownMenu.Item disabled>
            Brak graczy
          </DropdownMenu.Item>
        )}

        {AllPlayersList.map((player) => (
          <DropdownMenu.Item
            key={player.steam_id}
            onSelect={() =>
              setCurrentUser({
                steam_id: player.steam_id,
                name: player.name,
              })
            }
          >
            <Flex align="center" gap="2">
              <Avatar
                size="1"
                radius="full"
                fallback={player.name.charAt(0).toUpperCase()}
              />
              <Text>{player.name}</Text>
            </Flex>
          </DropdownMenu.Item>
        ))}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
