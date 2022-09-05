import { Document } from 'mongoose';

export default interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: number;
  tokenHash: String | null;
  tokenExpiration: String | null;
}
