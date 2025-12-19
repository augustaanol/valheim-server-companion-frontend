export type ActivePlayersList = {
  name: string;
  hp: [number, number] | null;
  steam_id: string;
  position: [number, number, number] | null;
};

export type AllPlayersList = {
  name: string;
  steam_id: string;
};