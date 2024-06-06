import React from 'react';
import { redirect } from 'next/navigation';

import {
  getBoardDetails,
  getUserBoards,
} from '@/modules/kanban/actions/board.actions';
import {
  getLanesWithTicketsAndTags,
  updateLanesOrder,
  updateTicketsOrder,
} from '@/modules/kanban/actions/lane.actions';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BoardInfoBar from '@/modules/kanban/components/BoardInfoBar';
import BoardSettings from '@/modules/kanban/components/forms/BoardSettings';
import BoardView from '@/modules/kanban/components/BoardView';
import { createMetadata } from '@/config/site';
import { getUser } from '@/database/actions/user.actions';
import PageHeader from '@/app/shared/page-header';

const pageHeader = {
  title: 'Kanban',
  breadcrumb: [
    {
      href: '/',
      name: 'Home',
    },
    {
      name: 'Kanban',
    },
  ],
};

interface PipelineIdPageProps {
  params: {
    id: string | undefined;
  };
}

const BoardIdPage: React.FC<PipelineIdPageProps> = async ({ params }) => {
  const { id } = params;

  if (!id) redirect(`/kanban`);

  const boardDetails = await getBoardDetails(id);

  const user = await getUser();

  if (!boardDetails) {
    redirect(`/kanban`);
  }

  const allBoards = await getUserBoards();
  const lanes = await getLanesWithTicketsAndTags(id);

  return (
    <>
      <PageHeader
        title={pageHeader.title}
        breadcrumb={pageHeader.breadcrumb}
        className="!mb-2"
      />
      <Tabs defaultValue="view" className="w-full">
        <TabsList className="border-border mb-4 h-auto w-full flex-col gap-4 rounded-none border-b bg-transparent pb-4 sm:h-16 sm:flex-row sm:justify-between sm:gap-0 sm:pb-0">
          <BoardInfoBar boardId={id} boards={allBoards} />
          <div className="flex w-full items-center sm:w-auto">
            <TabsTrigger value="view" className="w-full sm:w-auto">
              Pipeline View
            </TabsTrigger>
            <TabsTrigger value="settings" className="w-full sm:w-auto">
              Settings
            </TabsTrigger>
          </div>
        </TabsList>
        <TabsContent value="view">
          <BoardView
            lanes={lanes}
            boardDetails={boardDetails}
            boardId={boardDetails._id}
            userId={user._id}
            updateLanesOrder={updateLanesOrder}
            updateTicketsOrder={updateTicketsOrder}
          />
        </TabsContent>
        <TabsContent value="settings">
          <BoardSettings boardId={id} boards={allBoards} />
        </TabsContent>
      </Tabs>
    </>
  );
};

export default BoardIdPage;

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
