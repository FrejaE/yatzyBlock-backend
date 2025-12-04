import { model, Schema } from 'mongoose';
import Game from './gameSchema.mjs';

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  games: [{ type: Schema.Types.ObjectId, ref: 'Game' }],
});

const User = model('user', userSchema);
export default User;
