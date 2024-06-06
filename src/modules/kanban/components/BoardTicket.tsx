import React from 'react';
import { useRouter } from 'next/navigation';
import { Draggable } from 'react-beautiful-dnd';
import { Edit, MoreHorizontal, Trash } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'react-hot-toast';

import { deleteTicket } from '@/modules/kanban/actions/ticket.actions';

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
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tag } from '@/components/ui/tag';
import CustomModal from '@/components/common/CustomModal';
import TicketDetails from '@/modules/kanban/components/forms/TicketDetails';

import { ITicketPopulated } from '@/modules/kanban/models/ticket.model';
import { ITag } from '@/modules/kanban/models/tag.model';
import { Text } from 'rizzui';

interface BoardTicketProps {
  setAllTickets: React.Dispatch<React.SetStateAction<ITicketPopulated[]>>;
  allTickets: ITicketPopulated[];
  ticket: ITicketPopulated;
  index: number;
  userId: string;
}

const BoardTicket: React.FC<BoardTicketProps> = ({
  allTickets,
  index,
  setAllTickets,
  ticket,
  userId,
}) => {
  const router = useRouter();
  const { setOpen } = useModal();

  const editNewTicket = (ticket: ITicketPopulated) => {
    setAllTickets(() => {
      return allTickets.map((t: ITicketPopulated) => {
        if (t._id === ticket._id) {
          return ticket;
        }

        return t;
      });
    });
  };

  const handleClickEdit = async () => {
    setOpen(
      <CustomModal title="Update Ticket Details">
        <TicketDetails
          getNewTicket={editNewTicket}
          laneId={ticket.lane}
          userId={userId}
        />
      </CustomModal>,
      async () => {
        // async just for typescript
        return { ticket: ticket };
      }
    );
  };

  const handleDeleteTicket = async () => {
    try {
      setAllTickets((tickets: ITicketPopulated[]) =>
        tickets.filter((t) => t._id !== ticket._id)
      );

      await deleteTicket(ticket._id);

      toast.success(<Text as="b">Deleted Ticket from Lane!</Text>);

      router.refresh();
    } catch (error) {
      toast.error(<Text as="b">There was a problem deleting the ticket.</Text>);
    }
  };

  return (
    <Draggable draggableId={ticket._id} index={index}>
      {(provided, snapshot) => {
        if (snapshot.isDragging) {
          const offset = { x: 0, y: 10 };
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
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <AlertDialog>
              <DropdownMenu>
                <Card className="my-4 bg-white shadow-none transition-all dark:bg-background">
                  <CardHeader className="p-3">
                    <CardTitle className="flex items-center justify-between">
                      <span className="w-full text-lg">{ticket.name}</span>
                      <DropdownMenuTrigger>
                        <MoreHorizontal className="text-muted-foreground" />
                      </DropdownMenuTrigger>
                    </CardTitle>
                    <span className="text-xs text-muted-foreground">
                      {format(new Date(ticket.createdAt), 'dd/MM/yyyy hh:mm')}
                    </span>
                    <div className="flex flex-wrap items-center gap-2">
                      {ticket.tags.map((tag) => {
                        const tagData = tag as ITag;
                        return (
                          <Tag
                            key={tagData._id}
                            title={tagData.name}
                            colorName={tagData.color}
                          />
                        );
                      })}
                    </div>
                    <CardDescription className="w-full">
                      {ticket.description}
                    </CardDescription>
                  </CardHeader>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Options</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="flex items-center gap-2"
                      onClick={handleClickEdit}
                    >
                      <Edit className="h-4 w-4" />
                      Edit Ticket
                    </DropdownMenuItem>
                    <AlertDialogTrigger>
                      <DropdownMenuItem className="text-destructive flex items-center gap-2">
                        <Trash className="h-4 w-4" />
                        Delete Ticket
                      </DropdownMenuItem>
                    </AlertDialogTrigger>
                  </DropdownMenuContent>
                </Card>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      the ticket and remove it from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter className="flex items-center">
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      className="bg-destructive"
                      onClick={handleDeleteTicket}
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

export default BoardTicket;
