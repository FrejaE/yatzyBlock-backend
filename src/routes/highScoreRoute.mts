import express from "express";

export const highScoreRouter = express.Router();

highScoreRouter.get("/", async (req, res) => {
  try {
    const result = await getHighscore();
    res.status(200).json(result);
  } catch (err) {
    console.error("Failed to fetch highscore:", err);
    res.status(500).send("Error while fetching highscore");
  }
});
function getHighscore() {
  throw new Error("Function not implemented.");
}
