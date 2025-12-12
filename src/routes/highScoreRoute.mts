import express from "express";
import { getAllGames } from "../controllers/gameController.mjs";
import type { GameDto, Player } from "../models/GameDto.mjs";

export const highScoreRouter = express.Router();

highScoreRouter.get("/", async (req, res) => {
  const allGames = await getAllGames();
  let highscore: Player[] = [];
  allGames.forEach((game) => {
    highscore.push(...game.players);
  });
  highscore.sort((a, b) => b.totalScore - a.totalScore);
  highscore.splice(3);
  res.send(highscore);
});
