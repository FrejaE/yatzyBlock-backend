import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { authRouter } from "./routes/authRoute.mjs";
import { gameRouter } from "./routes/gameRoute.mjs";
import { highScoreRouter } from "./routes/highScoreRoute.mjs";
import cors from "cors";

dotenv.config();
const port = process.env.PORT || 3000;
const dbUrl = process.env.MONGO_URL;

if (!dbUrl) {
  throw Error("No MONGO_URL in the .env file");
}

const app = express();
app.use(express.json());
app.use(cors());

app.use((req, _, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

//Mappen som styr att hemsidan syns
app.use(express.static("hemsida"));

app.get("/ping", (_, res) => {
  res.json({ status: "ok" });
});

app.use("/auth", authRouter);
app.use("/games", gameRouter);
app.use("/highscore", highScoreRouter);

app.listen(port, async (error) => {
  await mongoose.connect(dbUrl);
  console.log("API is alive, connected to database");
  if (error) {
    console.log("ERROR", error);
  }
});
