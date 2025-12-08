import type { GameDto } from './GameDto.mjs';

export type UserDto = {
  id: string;
  username: string;
  email: string;
  games: GameDto[] | undefined;
};
