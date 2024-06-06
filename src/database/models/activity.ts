import { Schema, model, models } from 'mongoose';

export interface IActivity {
  _id: string;
  createdAt: Date;
  message: string;
  operation: 'create' | 'update' | 'delete';
  model: string;
  objectId: string;
  user: string;
}

const ActivitySchema = new Schema({
  createdAt: { type: Date, default: Date.now },
  message: String,
  operation: String,
  model: String,
  objectId: {
    type: Schema.Types.ObjectId,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    onDelete: 'cascade',
  },
});

const Activity = models.Activity || model('Activity', ActivitySchema);

export default Activity;
