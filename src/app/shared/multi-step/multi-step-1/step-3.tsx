'use client';

import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { AdvancedRadio, RadioGroup } from 'rizzui';
import {
  formDataAtom,
  useStepperOne,
} from '@/app/shared/multi-step/multi-step-1';
import HouseIcon from '@/components/icons/house';
import FormSummary from '@/app/shared/multi-step/multi-step-1/form-summary';
import RoomSharedIconColor from '@/components/icons/room-shared-color';
import RoomSingleIconColor from '@/components/icons/room-single-color';
import {
  placeTypeSchema,
  PlaceTypeSchema,
} from '@/utils/validators/multistep-form.schema';

const places: {
  value: string;
  name: string;
  description: string;
  icon: React.ReactNode;
}[] = [
  {
    value: '1',
    name: 'An Entire Place',
    description: 'Guests have the whole place to themselves',
    icon: <HouseIcon />,
  },
  {
    value: '2',
    name: 'Single Room',
    description: `Guests have their own room in a home, plus access to shared spaces.`,
    icon: <RoomSingleIconColor />,
  },
  {
    value: '3',
    name: 'A Shared Room',
    description: `Guests sleep in a room or common area that may be shared with you or others.`,
    icon: <RoomSharedIconColor />,
  },
];

export default function StepTwo() {
  const { step, gotoNextStep } = useStepperOne();
  const [formData, setFormData] = useAtom(formDataAtom);

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<PlaceTypeSchema>({
    resolver: zodResolver(placeTypeSchema),
    defaultValues: {
      placeType: formData.placeType,
    },
  });

  useEffect(() => {
    if (errors.placeType) {
      toast.error(errors.placeType.message as string);
    }
  }, [errors]);

  const onSubmit: SubmitHandler<PlaceTypeSchema> = (data) => {
    console.log('data', data);
    setFormData((prev) => ({
      ...prev,
      placeType: data.placeType,
    }));
    gotoNextStep();
  };

  return (
    <>
      <div className="col-span-full flex flex-col justify-center @5xl:col-span-5">
        <FormSummary
          className="@7xl:me-24"
          title="What type of place will guests have?"
          description="Sharing a little about your guests helps us go beyond the ordinary and curate an unforgettable experience. Here's what you can help us with!"
        />
      </div>

      <div className="col-span-full flex items-center justify-center @5xl:col-span-7">
        <form
          id={`rhf-${step.toString()}`}
          onSubmit={handleSubmit(onSubmit)}
          className="flex-grow rounded-lg bg-white p-5 @4xl:p-7 dark:bg-gray-0"
        >
          <>
            <Controller
              name="placeType"
              control={control}
              render={({ field: { value, onChange } }) => (
                <RadioGroup
                  value={value}
                  setValue={onChange}
                  className="col-span-full grid gap-4 @4xl:gap-6"
                >
                  {places.map((place) => (
                    <AdvancedRadio
                      key={place.value}
                      value={place.value}
                      className=" [&_.rizzui-advanced-radio]:flex [&_.rizzui-advanced-radio]:justify-between [&_.rizzui-advanced-radio]:gap-7 [&_.rizzui-advanced-radio]:px-6 [&_.rizzui-advanced-radio]:py-6"
                      inputClassName="[&~span]:border-0 [&~span]:ring-1 [&~span]:ring-gray-200 [&~span:hover]:ring-primary [&:checked~span:hover]:ring-primary [&:checked~span]:border-1 [&:checked~.rizzui-advanced-radio]:ring-2 [&~span_.icon]:opacity-0 [&:checked~span_.icon]:opacity-100"
                    >
                      <article>
                        <h4 className="text-sm font-semibold @5xl:text-base">
                          {place.name}
                        </h4>
                        <p>{place.description}</p>
                      </article>
                      <span className="h-8 min-w-[32px] [&_svg]:w-8">
                        {place.icon}
                      </span>
                    </AdvancedRadio>
                  ))}
                </RadioGroup>
              )}
            />
          </>
        </form>
      </div>
    </>
  );
}
