'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { Edit, MoreVertical, PlusCircleIcon, Trash } from 'lucide-react';

import { deleteLane } from '@/modules/kanban/actions/lane.actions';

import { useModal } from '@/hooks/use-modal';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import BoardTicket from './BoardTicket';
import LaneDetails from '@/modules/kanban/components/forms/LaneDetails';
import TicketDetails from '@/modules/kanban/components/forms/TicketDetails';
import CustomModal from '@/components/common/CustomModal';

import { cn } from '@/lib/utils';
import { toast } from 'react-hot-toast';
import { ILaneWithTicketsAndTags } from '@/modules/kanban/models/lane.model';
import { ITicketPopulated } from '@/modules/kanban/models/ticket.model';
import { Text } from 'rizzui';

interface BoardLaneProps {
  setAllTickets: React.Dispatch<React.SetStateAction<ITicketPopulated[]>>;
  allTickets: ITicketPopulated[];
  tickets: ITicketPopulated[];
  boardId: string;
  laneDetails: ILaneWithTicketsAndTags;
  userId: string;
  index: number;
}

const BoardLane: React.FC<BoardLaneProps> = ({
  setAllTickets,
  tickets,
  boardId,
  laneDetails,
  userId,
  allTickets,
  index,
}) => {
  const router = useRouter();
  const { setOpen } = useModal();

  const laneAmt = React.useMemo(() => {
    return tickets.reduce(
      (sum, ticket) => sum + (Number(ticket?.value) || 0),
      0
    );
  }, [tickets]);

  const addNewTicket = (ticket: ITicketPopulated) => {
    setAllTickets([...allTickets, ticket]);
  };

  const handleCreateTicket = () => {
    setOpen(
      <CustomModal
        title="Create A Ticket"
        subTitle="Tickets are a great way to keep track of tasks"
      >
        <TicketDetails
          getNewTicket={addNewTicket}
          laneId={laneDetails._id}
          userId={userId}
        />
      </CustomModal>
    );
  };

  const handleEditLane = () => {
    setOpen(
      <CustomModal title="Edit Lane Details" scrollShadow={false}>
        <LaneDetails boardId={boardId} defaultData={laneDetails} />
      </CustomModal>
    );
  };

  const handleDeleteLane = async () => {
    try {
      const response = await deleteLane(laneDetails._id);

      toast.success(<Text as="b">Lane deleted!</Text>);

      router.refresh();
    } catch (error) {
      toast.error(<Text as="b">There was a problem deleting the lane.</Text>);
    }
  };

  return (
    <Draggable
      draggableId={laneDetails._id}
      index={index}
      key={laneDetails._id}
    >
      {(provided, snapshot) => {
        if (snapshot.isDragging) {
          const offset = { x: 0, y: 0 };
          //@ts-ignore
          const x = provided.draggableProps.style?.left - offset.x;
          //@ts-ignore
          const y = provided.draggableProps.style?.top - offset.y;
          //@ts-ignore
          provided.draggableProps.style = {
            ...provided.draggableProps.style,
            top: y,
            left: x,
          };
        }

        return (
          <div
            {...provided.draggableProps}
            ref={provided.innerRef}
            className="h-full rounded-md dark:border-[1px] dark:border-foreground"
          >
            <AlertDialog>
              <DropdownMenu>
                <div className="relative h-[700px] w-[300px] flex-shrink-0 overflow-visible rounded-md bg-slate-200/30 px-4 dark:bg-background/20">
                  <div
                    {...provided.dragHandleProps}
                    className=" absolute left-0 right-0 top-0 z-10 h-14 rounded-md bg-slate-200/60 backdrop-blur-lg dark:bg-background/40"
                  >
                    <div className="flex h-full cursor-grab items-center justify-between border-b-[1px] p-4 pr-2">
                      {/* {laneDetails.order} */}
                      <div className="flex w-full items-center gap-2">
                        <div
                          className={cn('h-4 w-4 rounded-full')}
                          style={{ background: laneDetails.color }}
                        />
                        <span className="text-sm font-bold">
                          {laneDetails.name}
                        </span>
                      </div>
                      <div className="flex flex-row items-center gap-1">
                        <DropdownMenuTrigger>
                          <MoreVertical className="h-5 w-5 cursor-pointer text-muted-foreground" />
                        </DropdownMenuTrigger>
                      </div>
                    </div>
                  </div>

                  <Droppable
                    droppableId={laneDetails._id.toString()}
                    key={laneDetails._id}
                    type="ticket"
                    isDropDisabled={false}
                  >
                    {(provided, snapshot) => {
                      if (snapshot.isDraggingOver) {
                        console.log(provided.droppableProps);
                      }
                      return (
                        <div
                          className="scrollbar scrollbar-thumb-muted-foreground/20 scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-medium z-[99999] h-full max-h-[700px] w-full overflow-auto pt-12"
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                        >
                          {tickets.map(
                            (ticket: ITicketPopulated, index: number) => (
                              <BoardTicket
                                allTickets={allTickets}
                                setAllTickets={setAllTickets}
                                userId={userId}
                                ticket={ticket}
                                key={ticket._id.toString()}
                                index={index}
                              />
                            )
                          )}
                          {provided.placeholder}
                        </div>
                      );
                    }}
                  </Droppable>

                  <DropdownMenuContent className="bg-background">
                    <DropdownMenuLabel>Options</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="flex w-full cursor-pointer items-center gap-2"
                      onClick={handleEditLane}
                    >
                      <Edit className="h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="flex w-full cursor-pointer items-center gap-2"
                      onClick={handleCreateTicket}
                    >
                      <PlusCircleIcon className="h-4 w-4" />
                      Create Ticket
                    </DropdownMenuItem>
                    <AlertDialogTrigger className="w-full">
                      <DropdownMenuItem className="text-destructive flex w-full cursor-pointer items-center gap-2">
                        <Trash className="h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </AlertDialogTrigger>
                  </DropdownMenuContent>
                </div>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      your account and remove your data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter className="flex items-center">
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      className="bg-destructive"
                      onClick={handleDeleteLane}
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </DropdownMenu>
            </AlertDialog>
          </div>
        );
      }}
    </Draggable>
  );
};

export default BoardLane;
