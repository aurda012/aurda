import { Controller, useFormContext } from 'react-hook-form';
import { RadioGroup, AdvancedRadio } from 'rizzui';
import { PiCheckCircleFill } from 'react-icons/pi';

const availability = [
  {
    value: 'online',
    name: 'Only available online.',
  },
  {
    value: 'coming-soon',
    name: 'Coming soon',
  },
  {
    value: 'offline',
    name: 'Only available offline.',
  },
];

export default function ProductAvailability() {
  const { control } = useFormContext();

  return (
    <Controller
      name="productAvailability"
      control={control}
      render={({ field: { value, onChange } }) => (
        <RadioGroup
          value={value}
          setValue={onChange}
          className="col-span-full grid gap-4 @2xl:grid-cols-3 @4xl:gap-6"
        >
          {availability.map((item) => (
            <AdvancedRadio
              key={item.value}
              value={item.value}
              contentClassName="px-4 py-6 flex items-center justify-between"
              inputClassName="[&~span]:border-0 [&~span]:ring-1 [&~span]:ring-gray-200 [&~span:hover]:ring-primary [&:checked~span:hover]:ring-primary [&:checked~span]:border-1 [&:checked~.rizzui-advanced-checkbox]:ring-2 [&~span>.icon]:opacity-0 [&:checked~span>.icon]:opacity-100"
            >
              <span>{item.name}</span>
              <PiCheckCircleFill className="icon h-5 min-w-[1.25rem] text-primary" />
            </AdvancedRadio>
          ))}
        </RadioGroup>
      )}
    />
  );
}
