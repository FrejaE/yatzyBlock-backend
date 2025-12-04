import { Schema, model } from 'mongoose';
import User from './userSchema.mjs';

const gameSchema = new Schema({
  totalScore: { type: Number, required: true },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  players: [
    {
      name: String,
      score: Number,
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

const Game = model('game', gameSchema);
export default Game;
