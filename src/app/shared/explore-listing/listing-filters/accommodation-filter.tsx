import { Button, Title, Text, AdvancedRadio, Checkbox } from 'rizzui';
import cn from '@/utils/class-names';
import { useMedia } from '@/hooks/use-media';
import { useEffect, useState } from 'react';
import { InitialStateType } from '@/app/shared/explore-listing/listing-filters/filter-utils';

const advanceRadioStyles = {
  className:
    'bg-transparent py-0 duration-100 [&_.rizzui-advanced-radio:hover]:border-0 [&_.rizzui-advanced-radio:hover]:bg-primary [&_.rizzui-advanced-radio:hover]:text-gray-0 dark:[&_.rizzui-advanced-radio:hover]:text-gray-900 [&_.rizzui-advanced-radio]:min-h-[unset] [&_.rizzui-advanced-radio]:min-w-[unset] [&_.rizzui-advanced-radio]:rounded-none [&_.rizzui-advanced-radio]:border-0 [&_.rizzui-advanced-radio]:bg-transparent [&_.rizzui-advanced-radio]:text-center [&_.rizzui-advanced-radio]:text-gray-900 [&_.rizzui-advanced-radio]:px-1 [&_.rizzui-advanced-radio]:duration-100 [&_input:checked~.rizzui-advanced-radio]:bg-primary [&_input:checked~.rizzui-advanced-radio]:text-gray-0 dark:[&_input:checked~.rizzui-advanced-radio]:text-gray-900',
  inputClassName:
    '[&:checked~.rizzui-advanced-radio]:border-0 [&:checked~.rizzui-advanced-radio]:ring-0',
};

export default function AccommodationFilter({
  state,
  applyFilter,
  setOpen,
}: {
  state: InitialStateType;
  applyFilter: (query: string, value: any) => void;
  setOpen?: any;
}) {
  const [bedBaths, setBedBaths] = useState<string[]>(['1+', 'any']);
  const isWide = useMedia('(min-width: 1537px)', false);

  useEffect(() => {
    if (typeof state.bed_and_baths === 'string')
      setBedBaths(state.bed_and_baths.split(','));
  }, [state.bed_and_baths]);

  return (
    <>
      <div>
        <Text
          className={cn(
            'mb-3 text-start text-sm font-medium text-gray-700',
            !isWide && 'mb-5 2xl:text-base'
          )}
        >
          Bedrooms
        </Text>
        <div className="grid grid-cols-6 items-center gap-[1px] rounded-md border border-gray-300 [&>label:last-of-type>span]:border-0">
          {Array.from(['Any', '1+', '2+', '3+', '4+', '5+'], (x, index) => (
            <AdvancedRadio
              onChange={({ target }) => {
                setBedBaths((prev) => [target.value, bedBaths[1]]);
                !isWide &&
                  applyFilter('bed_and_baths', [target.value, bedBaths[1]]);
              }}
              key={`bedrooms-${index}`}
              name="bedrooms"
              value={x.toLowerCase()}
              checked={x.toLowerCase() === bedBaths[0]}
              {...advanceRadioStyles}
            >
              {x}
            </AdvancedRadio>
          ))}
        </div>
        <Checkbox
          label="Use exact match"
          className="mt-3"
          labelClassName="text-gray-800"
          size="sm"
        />
      </div>
      <div className="mt-3">
        <Title
          as="h4"
          className="mb-2 py-3 text-start text-sm font-semibold capitalize text-gray-600"
        >
          Number of Bathrooms
        </Title>
        <Text className="mb-3 text-start text-sm font-medium text-gray-700">
          Bathrooms
        </Text>

        <div className="grid grid-cols-6 items-center gap-[1px] rounded-md border border-gray-300 [&>label:last-of-type>span]:border-0">
          {Array.from(['Any', '1+', '2+', '3+', '4+', '5+'], (x, index) => (
            <AdvancedRadio
              onChange={({ target }) => {
                setBedBaths((prev) => [bedBaths[0], target.value]);
                !isWide &&
                  applyFilter('bed_and_baths', [bedBaths[0], target.value]);
              }}
              key={`bathrooms-${index}`}
              name="bathrooms"
              value={x.toLowerCase()}
              checked={x.toLowerCase() === bedBaths[1]}
              {...advanceRadioStyles}
            >
              {x}
            </AdvancedRadio>
          ))}
        </div>
      </div>
      {isWide && (
        <Button
          onClick={() => {
            setOpen(false);
            applyFilter('bed_and_baths', bedBaths);
          }}
          className="mt-5 w-full rounded-md dark:bg-gray-50 dark:text-white"
        >
          Apply
        </Button>
      )}
    </>
  );
}
