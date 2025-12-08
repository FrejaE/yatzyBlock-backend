import { model, Schema, type HydratedDocument } from 'mongoose';

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  games: [{ type: Schema.Types.ObjectId, ref: 'Game', default: [] }],
});

export type UserDocument = HydratedDocument<{
  username: string;
  email: string;
  password: string;
  games: Schema.Types.ObjectId[];
}>;

const User = model('user', userSchema);
export default User;
