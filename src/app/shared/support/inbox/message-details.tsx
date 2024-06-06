'use client';

import { useAtomValue } from 'jotai';
import { z } from 'zod';
import { LuReply } from 'react-icons/lu';
import { useState, useEffect } from 'react';
import { PiCaretDownBold } from 'react-icons/pi';
import {
  Title,
  Text,
  Badge,
  Button,
  Avatar,
  Empty,
  Select,
  Loader,
} from 'rizzui';
import cn from '@/utils/class-names';
import {
  dataAtom,
  messageIdAtom,
} from '@/app/shared/support/inbox/message-list';
import { SubmitHandler, Controller } from 'react-hook-form';
import { Form } from '@/components/ui/form/form';
import ActionDropdown from '@/app/shared/support/inbox/action-dropdown';
import MessageBody from '@/app/shared/support/inbox/message-body';
import SimpleBar from '@/components/ui/simplebar';
import { useElementSize } from '@/hooks/use-element-size';
import { useMedia } from '@/hooks/use-media';
import dynamic from 'next/dynamic';
import { SupportType, supportTypes } from '@/data/support-inbox';

const QuillEditor = dynamic(() => import('@/components/ui/quill-editor'), {
  ssr: false,
});

const FormSchema = z.object({
  message: z.string({ required_error: 'Invalid email address' }),
});

type FormValues = {
  message: string;
};

const priorityOptions = [
  {
    value: 'Low',
    label: 'Low',
  },
  {
    value: 'Medium',
    label: 'Medium',
  },
  {
    value: 'High',
    label: 'High',
  },
];

const agentsOptions = [
  {
    value: 1,
    label: 'Isabel Larson',
    avatar:
      'https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-10.webp',
  },
  {
    value: 2,
    label: 'Elias Pouros',
    avatar:
      'https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-11.webp',
  },
  {
    value: 3,
    label: 'Rose Powlowski-Paucek',
    avatar:
      'https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-13.webp',
  },
  {
    value: 4,
    label: 'Milton Leannon',
    avatar:
      'https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-04.webp',
  },
];

const contactStatuses = [
  {
    value: 'New',
    label: 'New',
  },
  {
    value: 'Waiting on contact',
    label: 'Waiting on contact',
  },
  {
    value: 'Waiting on us',
    label: 'Waiting on us',
  },
  {
    value: 'Closed',
    label: 'Closed',
  },
];

const supportOptionTypes = [
  {
    value: supportTypes.Chat,
    label: supportTypes.Chat,
  },
  {
    value: supportTypes.Email,
    label: supportTypes.Email,
  },
];

export default function MessageDetails({ className }: { className?: string }) {
  const data = useAtomValue(dataAtom);
  const [agent, setAgent] = useState();
  const [priority, setPriority] = useState('');
  const messageId = useAtomValue(messageIdAtom);
  const [isLoading, setIsLoading] = useState(true);
  const [supportType, setSupportType] = useState<SupportType>();
  const [contactStatus, setContactStatus] = useState(contactStatuses[0].value);
  const [ref, { width }] = useElementSize();
  const isWide = useMedia('(min-width: 1280px) and (max-width: 1440px)', false);

  function formWidth() {
    if (isWide) return width - 64;
    return width - 44;
  }

  const message = data.find((m) => m.id === messageId) ?? data[0];
  const initials = `${message?.firstName.charAt(0)}${message?.lastName.charAt(
    0
  )}`;

  // set default selected message when render complete
  useEffect(() => {
    // setFormWidth(width);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500); // 500 milliseconds
    return () => clearTimeout(timer);
  }, []);

  // set active message id
  useEffect(() => {
    setSupportType(message?.supportType);
  }, [message]);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
  };

  if (isLoading) {
    return (
      <div
        className={cn(
          '!grid h-full min-h-[128px] flex-grow place-content-center items-center justify-center',
          className
        )}
      >
        <Loader variant="spinner" size="xl" />
      </div>
    );
  }

  if (!message) {
    return (
      <div
        className={cn(
          '!grid h-full min-h-[128px] flex-grow place-content-center items-center justify-center',
          className
        )}
      >
        <Empty
          text="No conversations selected"
          textClassName="mt-4 text-base text-gray-500"
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        'relative pt-6 lg:rounded-lg lg:border lg:border-muted lg:px-4 lg:py-7 xl:px-5 xl:py-5 2xl:pb-7 2xl:pt-6',
        className
      )}
    >
      <div>
        <header className="flex flex-col justify-between gap-4 border-b border-muted pb-5 3xl:flex-row 3xl:items-center">
          <div className="flex flex-col items-start justify-between gap-3 xs:flex-row xs:items-center xs:gap-6 lg:justify-normal">
            <Title as="h4" className="font-semibold">
              {message?.title}
            </Title>
            <Badge variant="outline" color="danger" size="sm">
              Product Issue
            </Badge>
          </div>

          <div className="jus flex flex-wrap items-center gap-2.5 sm:justify-end">
            <Select
              value={agent}
              variant="text"
              options={agentsOptions}
              onChange={setAgent}
              placeholder="Select Agent"
              placement="bottom-end"
              displayValue={(value: AvatarOptionTypes) =>
                renderAvatarOptionDisplayValue(value)
              }
              getOptionDisplayValue={(option) =>
                renderAvatarOptionDisplayValue(option)
              }
              dropdownClassName="!w-60 p-2 gap-1 grid !z-0"
              suffix={<PiCaretDownBold className="h-3 w-3" />}
              className={'w-auto'}
            />
            <Select
              variant="text"
              value={contactStatus}
              options={contactStatuses}
              onChange={setContactStatus}
              placeholder="Select Status"
              placement="bottom-end"
              selectClassName="text-xs sm:text-sm"
              optionClassName="text-xs sm:text-sm"
              dropdownClassName="!w-48 p-2 gap-1 grid !z-0"
              suffix={<PiCaretDownBold className="h-3 w-3" />}
              className={'w-auto'}
            />
            <Select
              variant="text"
              value={priority}
              onChange={setPriority}
              options={priorityOptions}
              placeholder="Set Priority"
              placement="bottom-end"
              dropdownClassName="!w-32 p-2 gap-1 grid !z-0"
              getOptionValue={(option) => option.value}
              getOptionDisplayValue={(option) =>
                renderPriorityOptionDisplayValue(option.value as string)
              }
              displayValue={(selected: string) =>
                renderPriorityOptionDisplayValue(selected)
              }
              suffix={<PiCaretDownBold className="h-3 w-3" />}
              className={'w-auto'}
            />
            <ActionDropdown className="ml-auto sm:ml-[unset]" />
          </div>
        </header>

        <div className="[&_.simplebar-content]:grid [&_.simplebar-content]:gap-8 [&_.simplebar-content]:py-5">
          <SimpleBar className="@3xl:max-h-[calc(100dvh-34rem)] @4xl:max-h-[calc(100dvh-32rem)] @7xl:max-h-[calc(100dvh-31rem)]">
            <MessageBody />
            <MessageBody />
            <MessageBody />
            <MessageBody />
          </SimpleBar>
        </div>

        <div
          ref={ref}
          className="grid grid-cols-[32px_1fr] items-start gap-3 rounded-b-lg bg-white @3xl:pt-4 dark:bg-transparent lg:gap-4 lg:pl-0 dark:lg:pt-0 xl:grid-cols-[48px_1fr]"
        >
          <figure className="dark:mt-4">
            <Avatar
              name="John Doe"
              initials={initials}
              src="https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-14.png"
              className="!h-8 !w-8 bg-[#70C5E0] font-medium text-white xl:!h-12 xl:!w-12"
            />
          </figure>
          <div
            className="relative rounded-lg border border-muted bg-gray-50 p-4 2xl:p-5"
            style={{
              maxWidth: formWidth(),
            }}
          >
            <Form<FormValues> onSubmit={onSubmit} validationSchema={FormSchema}>
              {({ control, watch, formState: { errors } }) => {
                return (
                  <>
                    <div className="relative mb-2.5 flex items-center justify-between">
                      <Select
                        size="sm"
                        variant="outline"
                        value={supportType}
                        options={supportOptionTypes}
                        onChange={setSupportType}
                        getOptionValue={(option) => option.value}
                        displayValue={(selected: string) => selected}
                        suffix={<PiCaretDownBold className="ml-1 h-3 w-3" />}
                        placement="bottom-start"
                        dropdownClassName="p-2 gap-1 grid !w-20 !z-0"
                        selectClassName="bg-gray-0 dark:bg-gray-50"
                        className={'w-auto'}
                      />
                      <Button
                        type="submit"
                        className="dark:bg-gray-200 dark:text-white"
                      >
                        Send
                      </Button>
                    </div>
                    {supportType === supportTypes.Email && (
                      <div className="mb-2.5 flex items-center gap-2">
                        <LuReply />
                        <span className="rounded border border-muted px-1.5 py-1 lowercase">
                          {message?.email}
                        </span>
                      </div>
                    )}

                    <Controller
                      control={control}
                      name="message"
                      render={({ field: { onChange, value } }) => (
                        <QuillEditor
                          value={value}
                          onChange={onChange}
                          className="rounded-md bg-gray-0 dark:bg-gray-50 [&>.ql-container_.ql-editor]:min-h-[100px]"
                        />
                      )}
                    />
                  </>
                );
              }}
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export function DotSeparator({ ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="4"
      height="4"
      viewBox="0 0 4 4"
      fill="none"
      {...props}
    >
      <circle cx="2" cy="2" r="2" fill="#D9D9D9" />
    </svg>
  );
}

type AvatarOptionTypes = {
  avatar: string;
  label: string;
  [key: string]: any;
};

function renderAvatarOptionDisplayValue(option: AvatarOptionTypes) {
  return (
    <div className="flex items-center gap-2">
      <Avatar
        src={option.avatar}
        name={option.label}
        className="!h-6 !w-6 rounded-full"
      />
      <span className="whitespace-nowrap text-xs sm:text-sm">
        {option.label}
      </span>
    </div>
  );
}

function renderPriorityOptionDisplayValue(value: string) {
  switch (value) {
    case 'Medium':
      return (
        <div className="flex items-center">
          <Badge color="warning" renderAsDot />
          <Text className="ms-2 font-medium capitalize text-orange-dark">
            {value}
          </Text>
        </div>
      );
    case 'Low':
      return (
        <div className="flex items-center">
          <Badge color="success" renderAsDot />
          <Text className="ms-2 font-medium capitalize text-green-dark">
            {value}
          </Text>
        </div>
      );
    case 'High':
      return (
        <div className="flex items-center">
          <Badge color="danger" renderAsDot />
          <Text className="ms-2 font-medium capitalize text-red-dark">
            {value}
          </Text>
        </div>
      );
    default:
      return (
        <div className="flex items-center">
          <Badge renderAsDot className="bg-gray-400" />
          <Text className="ms-2 font-medium capitalize text-gray-600">
            {value}
          </Text>
        </div>
      );
  }
}
