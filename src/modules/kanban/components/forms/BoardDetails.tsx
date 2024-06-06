'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-hot-toast';
import { SubmitHandler, useForm } from 'react-hook-form';

import {
  deleteBoard,
  upsertBoard,
} from '@/modules/kanban/actions/board.actions';

import { useModal } from '@/hooks/use-modal';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
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
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '../../../../components/ui/input';
import { Button } from '../../../../components/ui/button';

import {
  CreateBoardValidator,
  type CreateBoardSchema,
} from '@/modules/kanban/validators/create-board';
import { Types } from 'mongoose';
import { IBoard } from '@/modules/kanban/models/board.model';
import { Text } from 'rizzui';
import { saveActivity } from '@/database/actions/activity.actions';

interface BoardDetailsProps {
  defaultData?: IBoard;
  boardId: string;
}

const BoardDetails: React.FC<BoardDetailsProps> = ({
  defaultData,
  boardId,
}) => {
  const { data, isOpen, setOpen, setClose } = useModal();
  const router = useRouter();
  const form = useForm<CreateBoardSchema>({
    mode: 'onChange',
    resolver: zodResolver(CreateBoardValidator),
    defaultValues: {
      name: defaultData?.name || '',
    },
  });

  React.useEffect(() => {
    if (defaultData) {
      form.reset({
        name: defaultData.name || '',
      });
    }
  }, [defaultData, form]);

  const isLoading = form.formState.isLoading;

  const handleDelete = async () => {
    try {
      const response = await deleteBoard(boardId);

      await saveActivity({
        message: 'Deleted Board',
        operation: 'delete',
        model: 'Board',
        objectId: boardId,
      });

      toast.success(<Text as="b">Board deleted!</Text>);

      router.push(`/kanban`);
    } catch (error) {
      toast.error(<Text as="b">There was a problem deleting the board.</Text>);
    }
  };

  const onSubmit: SubmitHandler<CreateBoardSchema> = async (values) => {
    const _id = defaultData?._id || new Types.ObjectId().toString();

    try {
      const update = defaultData?._id ? true : false;

      const response = await upsertBoard(
        {
          ...values,
          _id: _id,
        },
        update
      );

      toast.success(<Text as="b">Saved board details.</Text>);

      router.refresh();
    } catch (error) {
      toast.error(<Text as="b">Could not save baord details.</Text>);
    }

    setClose();
  };

  return (
    <Card className="mx-auto w-full max-w-xl">
      <CardHeader>
        <CardTitle>Pipeline Details</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              disabled={isLoading}
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pipeline Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="mt-4 flex items-center justify-between gap-2">
              <Button
                className="w-20"
                disabled={isLoading}
                isLoading={isLoading}
                type="submit"
              >
                Save
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive">Delete Pipeline</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      thiss pipeline and all related records.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter className="items-center">
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      className="bg-destructive hover:bg-destructive"
                      onClick={handleDelete}
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default BoardDetails;
