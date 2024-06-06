'use client';

import Image from 'next/image';
import { useFormContext, useWatch } from 'react-hook-form';
import { PiCheckCircleFill, PiQuestionFill } from 'react-icons/pi';
import { shippingMethodData, shippingSpeedData } from '@/data/checkout-data';
import { AdvancedRadio, FieldError, Title, Text } from 'rizzui';
import cn from '@/utils/class-names';

export default function ShippingMethod({ className }: { className?: string }) {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  const shippingMethod = useWatch({
    control,
    name: 'shippingMethod',
  });

  return (
    <>
      <div className={cn(className)}>
        <Title as="h4" className="mb-3.5 font-semibold @2xl:mb-5">
          Shipping Method
        </Title>
        <div className="rounded-lg border border-muted">
          <div className="p-4 @xs:p-6 @2xl:flex @2xl:items-start @2xl:justify-between @2xl:gap-6">
            <div className="block @5xl:pe-8">
              <Title as="h4" className="mb-2.5 text-base font-medium">
                Standard Shipping
              </Title>
              <Text as="p">
                Estimated delivery in 3-5 business days after order is shipped.
              </Text>
            </div>
            <div className="-m-1 mt-2 flex shrink-0 @xs:mt-4 @md:gap-3 @2xl:mt-0 [&_label]:m-1">
              {shippingMethodData.map((item) => (
                <AdvancedRadio
                  key={item.id}
                  value={item.value}
                  {...register('shippingMethod')}
                  className="flex shrink-0 items-center rounded border-muted/80 hover:cursor-pointer peer-checked:ring-[0.5px] [&_.rizzui-advanced-checkbox:hover]:border-primary [&_.rizzui-advanced-checkbox]:min-w-[unset] [&_.rizzui-advanced-checkbox]:p-0 [&_img]:h-[45px] [&_img]:w-[60px] [&_img]:rounded-md [&_input:checked~.rizzui-advanced-checkbox]:border-primary [&_input:checked~.rizzui-advanced-checkbox]:ring-primary"
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    height={45}
                    width={60}
                  />
                </AdvancedRadio>
              ))}
            </div>
          </div>

          {shippingMethod && (
            <div className="w-full flex-grow border-t border-muted p-4  @xs:p-6 ">
              <Text className="flex items-center gap-1">
                Select your shipping speed
                <PiQuestionFill className="w-4" />
              </Text>
              <div className="grid grid-cols-1 gap-3 pt-4 @xl:grid-cols-2 @xl:gap-4">
                {shippingSpeedData.map((item) => (
                  <AdvancedRadio
                    key={item.id}
                    value={item.speed}
                    defaultChecked={item.checked}
                    {...register('shippingSpeed')}
                    className=" [&_.rizzui-advanced-checkbox]:!px-5 [&_.rizzui-advanced-checkbox]:!py-4"
                    inputClassName="[&~span]:border-0 [&~span]:ring-1 [&~span]:ring-gray-200 [&~span:hover]:ring-primary [&:checked~span:hover]:ring-primary [&:checked~span]:border-1 [&:checked~.rizzui-advanced-checkbox]:ring-2 [&~span>.icon]:opacity-0 [&:checked~span>.icon]:opacity-100"
                  >
                    <span className="block">
                      <Title
                        as="h6"
                        className="mb-1 block font-lexend text-sm font-medium"
                      >
                        {item.title}
                      </Title>
                      <Text
                        as="span"
                        className="block pe-8 font-normal leading-[1.85]"
                      >
                        {item.description}
                      </Text>
                    </span>
                    <PiCheckCircleFill className="icon absolute right-4 top-4 h-6 w-6 text-primary duration-300 @2xl:right-6 @2xl:top-6 rtl:left-4 rtl:right-auto @xs:rtl:left-6" />
                  </AdvancedRadio>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {errors?.shippingMethod && (
        <FieldError error={errors?.shippingMethod.message as string} />
      )}
    </>
  );
}
