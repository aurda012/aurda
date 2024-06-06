'use client';

import { Controller, useFormContext } from 'react-hook-form';
import { AdvancedRadio, FieldError, RadioGroup } from 'rizzui';
import cn from '@/utils/class-names';

export default function GetSize({ sizes }: { sizes?: number[] }) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <Controller
        control={control}
        name="productSize"
        render={({ field: { value, onChange } }) => {
          console.log(value);
          return (
            <RadioGroup
              value={value}
              setValue={onChange}
              className="flex flex-wrap items-center gap-4"
            >
              {sizes?.map((size) => (
                <AdvancedRadio
                  key={size}
                  value={size}
                  contentClassName={cn(
                    'px-3 py-2 min-w-[unset] min-h-[unset] flex items-center justify-between content-classname',
                    String(size) === String(value) &&
                      'border-primary ring-primary ring-1'
                  )}
                >
                  {size}
                </AdvancedRadio>
              ))}
            </RadioGroup>
          );
        }}
      />
      {errors?.productSize && (
        <FieldError
          className="mt-1"
          error={errors?.productSize?.message as string}
        />
      )}
    </>
  );
}
