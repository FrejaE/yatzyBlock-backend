import type { UserDto } from '../models/UserDto.mjs';
import type { UserDocument } from '../models/userSchema.mjs';
import User from '../models/userSchema.mjs';
import { convertGameDbToGameDto } from './gameController.mjs';

//TODO : shitload of anys

export const convertUserDbToUserDto = (userFromDb: UserDocument): UserDto => {
  return {
    id: userFromDb._id.toString(),
    username: userFromDb.username,
    email: userFromDb.email,
    games: (userFromDb.games || []).map((g) =>
      convertGameDbToGameDto(g as any)
    ),
  } satisfies UserDto;
};

//CREATE User
export const createUser = async (
  username: string,
  email: string,
  password: string
): Promise<UserDto> => {
  const newUser = await User.create({
    username: username,
    email: email,
    password: password,
  });
  return convertUserDbToUserDto(newUser as any);
};

//GET all users
export const getAllUsers = async (): Promise<UserDto[]> => {
  const users = await User.find().populate('games').exec();
  return users.map(convertUserDbToUserDto as any);
};

// GET user
export const getUserById = async (id: string): Promise<UserDto | null> => {
  const user = await User.findById(id).populate('games').exec();
  return user ? convertUserDbToUserDto(user as any) : null;
};

// UPDATE user
export const updateUser = async (
  id: string,
  updates: Partial<{ username: string; email: string; password: string }>
): Promise<UserDto | null> => {
  const user = await User.findByIdAndUpdate(id, updates, { new: true });
  return user ? convertUserDbToUserDto(user as any) : null;
};

// DELETE user
export const deleteUser = async (id: string): Promise<UserDto | null> => {
  const user = await User.findByIdAndDelete(id);
  return user ? convertUserDbToUserDto(user as any) : null;
};
