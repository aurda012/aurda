'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-hot-toast';

import { upsertLane } from '@/modules/kanban/actions/lane.actions';

import { useModal } from '@/hooks/use-modal';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '../../../../components/ui/input';
import { Button } from '../../../../components/ui/button';
import { ColorPicker } from '../../../../components/ui/color-picker';
import {
  type LaneDetailsSchema,
  LaneDetailsValidator,
} from '@/modules/kanban/validators/lane-details';
import {
  ILane,
  ILaneWithTicketsAndTags,
} from '@/modules/kanban/models/lane.model';
import { Types } from 'mongoose';
import { Text } from 'rizzui';
import { saveActivity } from '@/database/actions/activity.actions';

interface LaneDetailsProps {
  defaultData?: ILaneWithTicketsAndTags;
  boardId: string;
}

const LaneDetails: React.FC<LaneDetailsProps> = ({ defaultData, boardId }) => {
  const router = useRouter();

  const { setClose } = useModal();

  const form = useForm<LaneDetailsSchema>({
    mode: 'onChange',
    resolver: zodResolver(LaneDetailsValidator),
    defaultValues: {
      name: defaultData?.name || '',
      color:
        defaultData?.color ||
        'linear-gradient(to bottom right,#ff75c3,#ffa647,#ffe83f,#9fff5b,#70e2ff,#cd93ff)',
    },
  });

  React.useEffect(() => {
    if (defaultData) {
      form.reset({
        name: defaultData.name || '',
      });
    }
  }, [defaultData, form]);

  const onSubmit: SubmitHandler<LaneDetailsSchema> = async (values) => {
    if (!boardId) return;

    const laneId = defaultData?._id
      ? defaultData._id
      : new Types.ObjectId().toString();

    try {
      const update = defaultData?._id ? true : false;

      await upsertLane(
        {
          ...values,
          _id: laneId,
          board: boardId,
          order: defaultData?.order,
        },
        update
      );

      toast.success(<Text as="b">Board Details Saved!</Text>);

      router.refresh();
    } catch (error) {
      toast.error(
        <Text as="b">There was a problem saving board details.</Text>
      );
    }

    setClose();
  };

  const isLoading = form.formState.isLoading || form.formState.isSubmitting;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Lane Details</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              disabled={isLoading}
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lane name</FormLabel>
                  <FormControl>
                    <Input placeholder="Lane name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              disabled={isLoading}
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lane color</FormLabel>
                  <FormControl className="flex justify-center">
                    <ColorPicker
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end">
              <Button
                disabled={isLoading}
                isLoading={isLoading}
                type="submit"
                className="w-20"
              >
                Save
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default LaneDetails;
