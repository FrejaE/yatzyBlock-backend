export type Player = {
  name: string;
  totalScore: number;
};

export type GameDto = {
  id: string;
  createdBy: string;
  players: Player[];
  createdAt: string;
};
