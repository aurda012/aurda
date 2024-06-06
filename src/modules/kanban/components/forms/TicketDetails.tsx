'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-hot-toast';

import { upsertTicket } from '@/modules/kanban/actions/ticket.actions';

import { useModal } from '@/hooks/use-modal';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../../../../components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../../../components/ui/form';
import { Button } from '../../../../components/ui/button';
import { Input } from '../../../../components/ui/input';
import { Textarea } from '../../../../components/ui/textarea';
import TagDetails from './TagDetails';

import {
  type TicketDetailsSchema,
  TicketDetailsValidator,
} from '@/modules/kanban/validators/ticket-details';
import { ITag } from '@/modules/kanban/models/tag.model';
import { ITicketPopulated } from '@/modules/kanban/models/ticket.model';
import { Types } from 'mongoose';
import { Text } from 'rizzui';

interface TicketDetailsProps {
  laneId: string;
  userId: string;
  getNewTicket: (ticket: ITicketPopulated) => void;
}

const TicketDetails: React.FC<TicketDetailsProps> = ({
  getNewTicket,
  laneId,
  userId,
}) => {
  const router = useRouter();
  const { data: defaultData, setClose } = useModal();

  const [tags, setTags] = React.useState<ITag[]>([]);

  const form = useForm<TicketDetailsSchema>({
    resolver: zodResolver(TicketDetailsValidator),
    mode: 'onChange',
    defaultValues: {
      name: defaultData.ticket?.name || '',
      description: defaultData.ticket?.description || '',
      value: String(defaultData.ticket?.value || 0),
    },
  });

  React.useEffect(() => {
    if (defaultData.ticket) {
      form.reset({
        name: defaultData.ticket.name || '',
        description: defaultData.ticket.description || '',
        value: String(defaultData.ticket.value || 0),
      });
    }
  }, [defaultData, form]);

  const onSubmit: SubmitHandler<TicketDetailsSchema> = async (values) => {
    if (!laneId) return;

    const ticketId = defaultData.ticket?._id || new Types.ObjectId().toString();

    try {
      const update = defaultData.ticket?._id ? true : false;

      const response = await upsertTicket(
        {
          value: Number(values.value),
          name: values.name,
          description: values.description,
          lane: laneId,
          _id: ticketId,
        },
        tags,
        update
      );

      toast.success(<Text as="b">Saved Ticket Details!</Text>);

      if (response) {
        getNewTicket(response);
        setClose();
      }

      router.refresh();
    } catch (error) {
      toast.error(
        <Text as="b">There was a problem saving ticket details.</Text>
      );
    }
  };

  const isLoading = form.formState.isLoading || form.formState.isSubmitting;

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>Ticket Details</CardTitle>
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
                  <FormLabel>Ticket name</FormLabel>
                  <FormControl>
                    <Input placeholder="Ticket name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              disabled={isLoading}
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ticket description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Ticket description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <h3 className="text-2xl font-semibold">Add tags</h3>
            <TagDetails
              userId={userId}
              getSelectedTags={setTags}
              defaultTags={(defaultData.ticket?.tags as ITag[]) || []}
            />
            <div className="flex justify-end">
              <Button
                className="mt-4 w-20"
                disabled={isLoading}
                isLoading={isLoading}
                type="submit"
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

export default TicketDetails;
