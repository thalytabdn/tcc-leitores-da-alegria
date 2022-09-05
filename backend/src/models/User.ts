import mongoose, { Schema } from 'mongoose';
import ROLES from './interfaces/roles';
import IUser from './interfaces/user';

const UserSchema: Schema = new Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, unique: true, lowercase: true },
  role: { type: Number, default: ROLES.EDITOR },
  password: { type: String, required: true, minLength: 8 },
  tokenHash: { type: String },
  tokenExpiration: { type: String }
});

export default mongoose.model<IUser>('User', UserSchema);
