import type { Player } from "../models/GameDto.mjs";
import { getAllGames } from "./gameController.mjs";

export const getHighScore = async () => {
  const allGames = await getAllGames();

  let highscore: Player[] = [];

  allGames.forEach((game) => {
    highscore.push(...game.players);
  });
  highscore.sort((a, b) => b.totalScore - a.totalScore);
  return highscore.splice(3);
};
