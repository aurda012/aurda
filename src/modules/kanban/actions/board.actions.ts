'use server';

import { auth } from '@clerk/nextjs/server';
import { connectToDatabase } from '@/database/index';
import Activity from '@/database/models/activity';
import User from '@/database/models/user.model';
import Board, { IBoard } from '../models/board.model';

export async function createBoard(name: string) {
  try {
    const { userId } = auth();
    await connectToDatabase();
    const user = await User.findOne({ clerkId: userId });
    const board = await Board.create({ name, user: user._id });
    await Activity.create({
      message: `Created Board`,
      operation: 'create',
      model: 'Board',
      user: user._id,
      objectId: board._id,
    });
    return JSON.parse(JSON.stringify(board)) as IBoard;
  } catch (error: any) {
    console.log(error.message);
    throw error;
  }
}

export async function getBoardDetails(id: string) {
  try {
    await connectToDatabase();
    const board = await Board.findById(id);
    return JSON.parse(JSON.stringify(board)) as IBoard;
  } catch (error: any) {
    console.log(error.message);
    throw error;
  }
}

export async function getUserBoards() {
  try {
    const { userId } = auth();
    await connectToDatabase();
    const user = await User.findOne({ clerkId: userId });
    const boards = await Board.find({ user: user._id });
    return JSON.parse(JSON.stringify(boards)) as IBoard[];
  } catch (error: any) {
    console.log(error.message);
    throw error;
  }
}

export const upsertBoard = async (board: Partial<IBoard>, update: boolean) => {
  try {
    const { userId } = auth();
    await connectToDatabase();
    const user = await User.findOne({ clerkId: userId });
    const response = await Board.findOneAndUpdate(
      { _id: board._id },
      {
        $set: {
          ...board,
          user: user._id,
        },
      },
      { new: true, upsert: true }
    );
    await Activity.create({
      message: `${update ? 'Updated' : 'Created'} Board`,
      operation: update ? 'update' : 'create',
      model: 'Board',
      user: user._id,
      objectId: response._id,
    });
    return JSON.parse(JSON.stringify(response));
  } catch (error: any) {
    console.log(error.message);
    throw error;
  }
};

export const deleteBoard = async (id: string) => {
  try {
    await connectToDatabase();
    const board = await Board.findByIdAndDelete(id);
    await Activity.create({
      message: 'Deleted Board',
      operation: 'delete',
      model: 'Board',
      user: board.user,
      objectId: id,
    });
    return JSON.parse(JSON.stringify(board));
  } catch (error: any) {
    console.log(error.message);
    throw error;
  }
};
