import { AllPlayersList } from "@/types/playersTypes";

export function getPlayerName(
    steamId: string,
    AllPlayersList: AllPlayersList[]
): string | null {
    

    const player = AllPlayersList.find(
        (p) => p.steam_id === steamId
    );

    return player?.name ?? null;
}