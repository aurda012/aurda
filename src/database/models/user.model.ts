import { Document, Schema, model, models } from 'mongoose';

export interface IUser {
  _id: string;
  clerkId: string;
  name: string;
  username: string;
  email: string;
  picture: string;
  joinedAt: Date;
}

const UserSchema = new Schema({
  clerkId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  picture: { type: String, required: true },
  joinedAt: { type: Date, default: Date.now },
});

const User = models.User || model('User', UserSchema);

export default User;
