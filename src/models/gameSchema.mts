import { Schema, model, type HydratedDocument } from "mongoose";

const gameSchema = new Schema({
  createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  players: [
    {
      name: { type: String, required: true },
      totalScore: { type: Number, required: true },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

export type GameDocument = HydratedDocument<{
  createdBy: Schema.Types.ObjectId;
  players: { name: string; totalScore: number }[];
  createdAt: Date;
}>;

const Game = model("Game", gameSchema);
export default Game;
