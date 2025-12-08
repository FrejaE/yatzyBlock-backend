import type { InferSchemaType } from 'mongoose';
import Game from '../models/gameSchema.mjs';
import type { GameDto } from '../models/GameDto.mjs';
import type { GameDocument } from '../models/gameSchema.mjs';

type GameType = InferSchemaType<typeof Game.schema>;

// TODO : Mer anu problem

export const convertGameDbToGameDto = (gameFromDb: GameDocument): GameDto => {
  return {
    id: gameFromDb._id.toString(),
    totalScore: gameFromDb.totalScore,
    createdBy: gameFromDb.createdBy.toString(),
    players: gameFromDb.players.map((p) => ({
      name: p.name!,
      score: p.score!,
    })),
    createdAt: gameFromDb.createdAt.toISOString(),
  };
};

// CREATE
export const createGame = async (
  totalScore: number,
  createdBy: string,
  players: { name: string; score: number }[]
): Promise<GameDto> => {
  const game = await Game.create({
    totalScore,
    createdBy,
    players,
  });
  return convertGameDbToGameDto(game as any);
};

// ALL games
export const getAllGames = async (): Promise<GameDto[]> => {
  const games = await Game.find().exec();
  return games.map(convertGameDbToGameDto as any);
};

// ONE game
export const getGameById = async (id: string): Promise<GameDto | null> => {
  const game = await Game.findById(id).exec();
  return game ? convertGameDbToGameDto(game as any) : null;
};

// UPDATE
export const updateGame = async (
  id: string,
  updates: Partial<{ totalScore: number; players: any }>
): Promise<GameDto | null> => {
  const game = await Game.findByIdAndUpdate(id, updates, { new: true });
  return game ? convertGameDbToGameDto(game as any) : null;
};

// DELETE
export const deleteGame = async (id: string): Promise<GameDto | null> => {
  const game = await Game.findByIdAndDelete(id);
  return game ? convertGameDbToGameDto(game as any) : null;
};
