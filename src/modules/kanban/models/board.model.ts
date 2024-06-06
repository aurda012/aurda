import { Schema, model, models, Types } from 'mongoose';
import { ILaneWithTicketsAndTags } from './lane.model';

export interface IBoard {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  user: string;
  lanes: string[]; // Array of references to the Lane model
}

export interface IBoardPopulated {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  user: string;
  lanes: ILaneWithTicketsAndTags[]; // Array of references to the Lane model
}

const BoardSchema = new Schema({
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  name: String,
  user: {
    type: Types.ObjectId,
    ref: 'User', // reference to the SubAccount model
    required: true,
  },
  lanes: [{ type: Types.ObjectId, ref: 'Lane' }], // Array of references to the Lane model
});

const Board = models.Board || model('Board', BoardSchema);

export default Board;
