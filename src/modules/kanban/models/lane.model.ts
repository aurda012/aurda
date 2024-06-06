import { Schema, model, models } from 'mongoose';
import { ITicketPopulated } from './ticket.model';

export interface ILane {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  order: number;
  color: string;
  board: string;
  user: string;
  tickets: string[];
}

export interface ILaneWithTicketsAndTags {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  order: number;
  color: string;
  board: string;
  user: string;
  tickets: ITicketPopulated[];
}

const LaneSchema = new Schema({
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  name: String,
  order: { type: Number, default: 0 },
  color: String,
  board: {
    type: Schema.Types.ObjectId,
    ref: 'Board',
    onDelete: 'cascade',
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    onDelete: 'cascade',
  },
  tickets: [{ type: Schema.Types.ObjectId, ref: 'Ticket' }],
});

const Lane = models.Lane || model('Lane', LaneSchema);

export default Lane;
