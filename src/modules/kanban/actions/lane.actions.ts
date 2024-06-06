'use server';

import { auth } from '@clerk/nextjs/server';
import { connectToDatabase } from '@/database';
import Activity from '@/database/models/activity';
import User from '@/database/models/user.model';
import Lane, { ILane, ILaneWithTicketsAndTags } from '../models/lane.model';
import Board from '../models/board.model';
import Tag from '../models/tag.model';
import Ticket, { ITicketPopulated } from '../models/ticket.model';

export const getLanesWithTicketsAndTags = async (boardId: string) => {
  try {
    await connectToDatabase();

    const lane = await Lane.find({
      board: boardId,
    })
      .sort({ order: 'asc' })
      .populate({
        path: 'tickets',
        model: Ticket,
        options: {
          sort: { order: 1 },
        },
        populate: [{ path: 'tags', model: Tag }],
      });

    return JSON.parse(JSON.stringify(lane)) as ILaneWithTicketsAndTags[];
  } catch (error: any) {
    console.log(error.message);
    throw error;
  }
};

export const updateLanesOrder = async (lanes: ILaneWithTicketsAndTags[]) => {
  try {
    await connectToDatabase();

    await Promise.all(
      lanes.map(
        async (lane) =>
          await Lane.findByIdAndUpdate(lane._id, { order: lane.order })
      )
    );
  } catch (error: any) {
    console.log(error.message);
    throw error;
  }
};

export const updateTicketsOrder = async (
  tickets: ITicketPopulated[],
  originLane?: string,
  destinationLane?: string,
  ticket?: string
) => {
  try {
    const { userId } = auth();
    await connectToDatabase();
    const user = await User.findOne({ clerkId: userId });

    await Promise.all(
      tickets.map(
        async (ticket) =>
          await Ticket.findByIdAndUpdate(ticket._id, {
            order: ticket.order,
            lane: ticket.lane,
          })
      )
    );
    if (originLane && destinationLane && ticket) {
      await Lane.findByIdAndUpdate(originLane, {
        $pull: { tickets: ticket },
      });
      await Lane.findByIdAndUpdate(destinationLane, {
        $push: { tickets: ticket },
      });
      await Activity.create({
        message: `Updated Ticket`,
        operation: 'update',
        model: 'Ticket',
        user: user._id,
        objectId: ticket,
      });
    }
  } catch (error: any) {
    console.log(error.message);
    throw error;
  }
};

export const deleteLane = async (laneId: string) => {
  try {
    await connectToDatabase();
    const response = await Lane.findByIdAndDelete(laneId);

    await Activity.create({
      message: `Deleted Lane`,
      operation: 'delete',
      model: 'Lane',
      user: response.user,
      objectId: laneId,
    });

    return JSON.parse(JSON.stringify(response));
  } catch (error: any) {
    console.log(error.message);
    throw error;
  }
};

export const upsertLane = async (lane: Partial<ILane>, update: boolean) => {
  let order: number;

  try {
    const { userId } = auth();
    await connectToDatabase();
    const user = await User.findOne({ clerkId: userId });
    if (!lane.order) {
      const lanes = await Lane.find({
        board: lane.board,
      });

      order = lanes.length; // set last order by default
    } else {
      order = lane.order;
    }

    const response = await Lane.findOneAndUpdate(
      { _id: lane._id },
      {
        $set: {
          ...lane,
          order,
        },
      },
      { new: true, upsert: true }
    );

    await Board.findByIdAndUpdate(lane.board, {
      $addToSet: { lanes: response._id },
    });

    await Activity.create({
      message: `${update ? 'Updated' : 'Created'} Lane`,
      operation: update ? 'update' : 'create',
      model: 'Lane',
      user: user._id,
      objectId: response._id,
    });

    return JSON.parse(JSON.stringify(response)) as ILane;
  } catch (error: any) {
    console.log(error.message);
    throw error;
  }
};
