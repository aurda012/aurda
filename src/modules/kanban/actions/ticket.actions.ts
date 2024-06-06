'use server';

import { auth } from '@clerk/nextjs/server';
import { connectToDatabase } from '@/database';
import Activity from '@/database/models/activity';
import User from '@/database/models/user.model';
import Ticket, { ITicket, ITicketPopulated } from '../models/ticket.model';
import Lane from '../models/lane.model';
import Tag, { ITag } from '../models/tag.model';

export const getTicketsWithTags = async (boardId: string) => {
  try {
    await connectToDatabase();
    const lanes = await Lane.find({ board: boardId }, '_id');
    const tickets = await Promise.all(
      lanes.map(async (lane) => {
        return await Ticket.find({
          lane: lane._id,
        }).populate({ path: 'tags', model: Tag });
      })
    );
    return JSON.parse(JSON.stringify(tickets));
  } catch (error: any) {
    console.log(error.message);
    throw error;
  }
};

export const getTicketDetails = async (laneId: string) => {
  try {
    await connectToDatabase();
    const response = await Ticket.find({
      lane: laneId,
    })
      .populate({ path: 'lane', model: Lane })
      .populate({ path: 'tags', model: Tag });

    return JSON.parse(JSON.stringify(response)) as ITicketPopulated;
  } catch (error: any) {
    console.log(error.message);
    throw error;
  }
};

export const upsertTicket = async (
  ticket: Partial<ITicket>,
  tags: ITag[],
  update: boolean
) => {
  let order: number;
  try {
    const { userId } = auth();
    await connectToDatabase();
    const user = await User.findOne({ clerkId: userId });

    if (!ticket.order) {
      const tickets = await Ticket.find({
        lane: ticket.lane,
      });

      order = tickets.length;
    } else {
      order = ticket.order;
    }

    const tagIds = tags.map((tag) => tag._id);

    const response = await Ticket.findByIdAndUpdate(
      ticket._id,
      {
        $set: {
          ...ticket,
          order,
          user: user._id,
        },
        $addToSet: {
          tags: {
            $each: tagIds,
          },
        },
      },
      { new: true, upsert: true }
    );

    await Promise.all(
      tagIds.map(async (tagId) => {
        await Tag.findByIdAndUpdate(tagId, {
          $addToSet: {
            tickets: response._id,
          },
        });
      })
    );

    await Lane.findByIdAndUpdate(response.lane._id, {
      $addToSet: {
        tickets: response._id,
      },
    });

    await Activity.create({
      message: `${update ? 'Updated' : 'Created'} Ticket`,
      operation: update ? 'update' : 'create',
      model: 'Ticket',
      user: user._id,
      objectId: response._id,
    });

    return JSON.parse(JSON.stringify(response)) as ITicketPopulated;
  } catch (error: any) {
    console.log(error.message);
    throw error;
  }
};

export const deleteTicket = async (ticketId: string) => {
  try {
    await connectToDatabase();
    const response = await Ticket.findByIdAndDelete(ticketId);

    await Activity.create({
      message: `Deleted Ticket`,
      operation: 'delete',
      model: 'Ticket',
      user: response.user,
      objectId: ticketId,
    });

    return JSON.parse(JSON.stringify(response));
  } catch (error: any) {
    console.log(error.message);
    throw error;
  }
};
