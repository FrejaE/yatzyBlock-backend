export type GameDto = {
  id: string;
  totalScore: number;
  createdBy: string;
  players: {
    name: string;
    score: number;
  }[];
  createdAt: string;
};
