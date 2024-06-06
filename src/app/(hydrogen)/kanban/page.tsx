import React from 'react';
import { redirect } from 'next/navigation';

import {
  createBoard,
  getUserBoards,
} from '@/modules/kanban/actions/board.actions';
import { createMetadata } from '@/config/site';

interface PipelinesPageProps {
  params: {
    subaccountId: string | undefined;
  };
}

const KanbanPage: React.FC<PipelinesPageProps> = async ({ params }) => {
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
