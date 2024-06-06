import { Schema, model, models, Types } from 'mongoose';

export interface ITag {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  color: string;
  user: string; // reference to the SubAccount model
}

const TagSchema = new Schema({
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  name: String,
  color: String,
  user: {
    type: Types.ObjectId,
    ref: 'User', // reference to the SubAccount model
    required: true,
  },
});

const Tag = models.Tag || model('Tag', TagSchema);

export default Tag;
