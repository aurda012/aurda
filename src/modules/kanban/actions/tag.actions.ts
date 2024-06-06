'use server';

import { connectToDatabase } from '@/database';
import Activity from '@/database/models/activity';
import Tag, { ITag } from '../models/tag.model';

export const upsertTag = async (tag: ITag) => {
  try {
    await connectToDatabase();
    const response = await Tag.findOneAndUpdate(
      {
        _id: tag._id,
      },
      {
        $set: {
          ...tag,
        },
      },
      { new: true, upsert: true }
    );
    await Activity.create({
      message: 'Created Tag',
      operation: 'create',
      model: 'Tag',
      user: tag.user,
      objectId: tag._id,
    });
    return JSON.parse(JSON.stringify(response)) as ITag;
  } catch (error: any) {
    console.log(error.message);
    throw error;
  }
};

export const getTagsForUser = async (userId: string) => {
  try {
    await connectToDatabase();
    const response = await Tag.find({
      user: userId,
    });

    return JSON.parse(JSON.stringify(response)) as ITag[];
  } catch (error: any) {
    console.log(error.message);
    throw error;
  }
};

export const deleteTag = async (tagId: string) => {
  try {
    await connectToDatabase();
    const response = await Tag.findByIdAndDelete(tagId);

    await Activity.create({
      message: 'Deleted Tag',
      operation: 'delete',
      model: 'Tag',
      user: response.user,
      objectId: tagId,
    });
    return JSON.parse(JSON.stringify(response)) as ITag;
  } catch (error: any) {
    console.log(error.message);
    throw error;
  }
};
