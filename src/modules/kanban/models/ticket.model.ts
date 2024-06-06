import { Schema, model, models, Types } from 'mongoose';
import { ITag } from './tag.model';

export interface ITicket {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  order: number;
  value: number;
  description: string;
  lane: string;
  user: string;
  tags: string[];
}

export interface ITicketPopulated {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  order: number;
  value: number;
  description: string;
  lane: string;
  user: string;
  tags: ITag[];
}

const TicketSchema = new Schema({
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  name: String,
  order: { type: Number, default: 0 },
  value: { type: Number, default: null },
  description: String,
  lane: { type: Types.ObjectId, ref: 'Lane', onDelete: 'cascade' },
  tags: [{ type: Types.ObjectId, ref: 'Tag' }],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    onDelete: 'cascade',
  },
});

const Ticket = models.Ticket || model('Ticket', TicketSchema);

export default Ticket;
