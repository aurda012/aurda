import React from 'react';
import { redirect } from 'next/navigation';

import {
  createBoard,
  getUserBoards,
} from '@/modules/kanban/actions/board.actions';
import { createMetadata } from '@/config/site';
import { getUser } from '@/database/actions/user.actions';
import { auth, currentUser } from '@clerk/nextjs/server';

interface PipelinesPageProps {
  params: {
    subaccountId: string | undefined;
  };
}

const KanbanPage: React.FC<PipelinesPageProps> = async ({ params }) => {
  const { userId } = auth();

  if (!userId) {
    redirect('/');
  }

  const user = await getUser();

  if (!user) {
    redirect('/');
  }

  const boardsExist = await getUserBoards();

  if (!!boardsExist.length) {
    redirect(`/kanban/${boardsExist[0]._id}`);
  }

  const board = await createBoard('Development');

  redirect(`/kanban/${board._id}`);
};

export default KanbanPage;

export const metadata = createMetadata(
  'Kanban | dashfusion',
  'Kanban board for managing your projects, pipelines and tasks',
  [
    'kanban',
    'dashfusion',
    'projects',
    'pipelines',
    'tasks',
    'management',
    'boards',
  ]
);
