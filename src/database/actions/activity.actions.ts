'use server';

import { connectToDatabase } from '../index';
import { auth } from '@clerk/nextjs/server';
import Activity, { IActivity } from '../models/activity';
import User from '../models/user.model';

export async function saveActivity(activity: Partial<IActivity>) {
  try {
    const { userId } = auth();
    await connectToDatabase();
    const user = await User.findOne({ clerkId: userId });
    await Activity.create({ ...activity, user: user._id });
  } catch (error: any) {
    console.log(error.message);
    throw error;
  }
}

export async function getUserActivity() {
  try {
    const { userId } = auth();
    await connectToDatabase();
    const user = await User.findOne({ clerkId: userId });
    const activity = await Activity.find({ user: user._id });
    return JSON.parse(JSON.stringify(activity)) as IActivity[];
  } catch (error: any) {
    console.log(error.message);
    throw error;
  }
}
