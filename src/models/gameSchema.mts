import { Schema, model, type HydratedDocument } from 'mongoose';

const gameSchema = new Schema({
  totalScore: { type: Number, required: true },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  players: [
    {
      name: { type: String, required: true },
      score: { type: Number, required: true },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

export type GameDocument = HydratedDocument<{
  totalScore: number;
  createdBy: Schema.Types.ObjectId;
  players: { name: string; score: number }[];
  createdAt: Date;
}>;

const Game = model('Game', gameSchema);
export default Game;
