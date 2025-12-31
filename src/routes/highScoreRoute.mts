import express from "express";
import { getHighScore } from "../controllers/highScoreController.mjs";

// TODO :
// /highscore/global
// /highscore/me
// /highscore/friends

export const highScoreRouter = express.Router();

highScoreRouter.get("/", async (req, res) => {
  try {
    const result = await getHighScore();
    res.status(200).json(result);
  } catch (err) {
    console.error("Failed to fetch highscore:", err);
    res.status(500).send("Error while fetching highscore");
  }
});
