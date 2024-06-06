'use client';

import {
  ActionIcon,
  AdvancedRadio,
  Button,
  Input,
  RadioGroup,
  Text,
  Textarea,
  Title,
} from 'rizzui';
import ScheduleLightIcon from '@/components/icons/schedule-light';
import Calendar from 'react-calendar';

import { PiArrowLeft, PiArrowRight, PiXBold } from 'react-icons/pi';
import { useModal } from '@/app/shared/modal-views/use-modal';
import SimpleBar from 'simplebar-react';
import cn from '@/utils/class-names';
import { useState } from 'react';

const appointmentTimes = [
  {
    value: '10.00 AM',
    label: '10.00 AM',
  },
  {
    value: '10.30 AM',
    label: '10.30 AM',
  },
  {
    value: '11.00 AM',
    label: '11.00 AM',
  },
  {
    value: '11.30 AM',
    label: '11.30 AM',
  },
  {
    value: '12.00 PM',
    label: '12.00 PM',
  },
  {
    value: '12.30 PM',
    label: '12.30 PM',
  },
  {
    value: '01.00 PM',
    label: '01.00 PM',
  },
  {
    value: '01.30 PM',
    label: '01.30 PM',
  },
  {
    value: '02.00 PM',
    label: '02.00 PM',
  },
  {
    value: '02.30 PM',
    label: '02.30 PM',
  },
  {
    value: '03.00 PM',
    label: '03.00 PM',
  },
  {
    value: '03.30 PM',
    label: '03.30 PM',
  },
  {
    value: '04.00 PM',
    label: '04.00 PM',
  },
  {
    value: '04.30 PM',
    label: '04.30 PM',
  },
  {
    value: '05.00 PM',
    label: '05.00 PM',
  },
  {
    value: '05.30 PM',
    label: '05.30 PM',
  },
  {
    value: '06.00 PM',
    label: '06.00 PM',
  },
  {
    value: '06.30 PM',
    label: '06.30 PM',
  },
  {
    value: '07.00 PM',
    label: '07.00 PM',
  },
];

export default function ScheduleModal() {
  const { closeModal } = useModal();
  const [timeState, setTimeState] = useState('10.30 AM');
  return (
    <div className="relative">
      <ActionIcon
        size="sm"
        variant="text"
        onClick={() => closeModal()}
        className="absolute end-3.5 top-3.5 p-0 text-gray-500 hover:!text-gray-900 md:end-7 md:top-7"
      >
        <PiXBold className="h-5 w-5" />
      </ActionIcon>
      <div className=" mx-auto flex max-w-md flex-col items-center gap-2.5 px-5 pb-7 pt-8 text-center md:px-7 md:pb-10 md:pt-12">
        <ScheduleLightIcon className="w-12 text-gray-400" />
        <Title
          as="h3"
          className="text-lg font-semibold text-gray-900 md:text-2xl"
        >
          Add New Schedule
        </Title>
        <Text className="leading-relaxed text-gray-500 md:pt-0.5">
          By becoming a part of our platform, you are opening the door to a
          world of incredible opportunities:
        </Text>
      </div>
      <div className="space-y-5 px-5 pb-5 md:px-7 md:pb-7">
        <Input label="Schedule Title" placeholder="Write your meeting title" />
        <div>
          <Text className="mb-1.5 font-medium">Schedule Date & Time</Text>
          <div className="flex flex-col rounded-lg border border-gray-300 md:flex-row">
            <Calendar
              prev2Label={false}
              next2Label={false}
              selectRange={false}
              className="job-schedule-calendar rounded-lg pt-2 md:pt-5 [&_.react-calendar\_\_month-view\_\_weekdays\_\_weekday]:p-0"
              nextLabel={<PiArrowRight className="size-4" />}
              prevLabel={<PiArrowLeft className="size-4" />}
            />

            <div className="w-full shrink-0 border-gray-300 md:w-72 md:border-s">
              <Title
                as="h4"
                className="px-5 pb-3 pt-2 text-base font-semibold text-gray-800 md:pt-5"
              >
                Time
              </Title>
              <SimpleBar className="mb-5 h-[320px] px-5">
                <RadioGroup
                  value={timeState}
                  setValue={setTimeState}
                  className="space-y-2 py-0.5"
                >
                  {appointmentTimes.map((item) => (
                    <AdvancedRadio
                      key={item.label}
                      name="time"
                      value={item.value}
                      checked={item.value === timeState}
                      className="[&_.rizzui-advanced-radio-input:checked+span]:ring-primary"
                      contentClassName={cn(
                        'bg-gray-100 text-gray-900 text-center',
                        item.value === timeState ? 'bg-primary text-white' : ''
                      )}
                    >
                      {item.label}
                    </AdvancedRadio>
                  ))}
                </RadioGroup>
              </SimpleBar>
            </div>
          </div>
        </div>
        <Textarea
          label="Description"
          placeholder="What is this meeting about"
          textareaClassName="resize-none"
        />
      </div>
      <div className="flex w-full justify-between gap-3 px-5 pb-5 md:px-7 md:pb-7">
        <Button variant="text" onClick={() => closeModal()}>
          Cancel
        </Button>
        <Button onClick={() => closeModal()}>Save</Button>
      </div>
    </div>
  );
}
