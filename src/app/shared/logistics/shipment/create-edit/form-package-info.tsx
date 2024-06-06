import { Controller, useFormContext } from 'react-hook-form';
import { Input, Textarea, RadioGroup, AdvancedRadio } from 'rizzui';
import cn from '@/utils/class-names';
import FormGroup from '@/app/shared/form-group';
import { PiCheckCircleFill, PiGift } from 'react-icons/pi';
import { toCurrency } from '@/utils/to-currency';
import UploadZone from '@/components/ui/file-upload/upload-zone';

interface FormPackageInfoProps {
  className?: string;
}

export default function FormPackageInfo({ className }: FormPackageInfoProps) {
  const {
    register,
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext();
  // const [uploadedImage, setUploadedImage] = useState<File | null>(null);

  // console.log('uploadedImage', uploadedImage);

  return (
    <FormGroup
      title="Package Information"
      description="Add Package information here"
      className={cn(className)}
    >
      <Input
        label="Amount"
        placeholder="0"
        className="col-span-full"
        labelClassName="font-medium text-gray-900"
        {...register('packageAmount')}
        error={errors.packageAmount?.message as string}
      />
      <div className="col-span-full grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Input
          label="Width"
          placeholder="0"
          labelClassName="font-medium text-gray-900"
          {...register('packageWidth')}
          error={errors.packageWidth?.message as string}
        />
        <Input
          label="Height"
          placeholder="0"
          labelClassName="font-medium text-gray-900"
          {...register('packageHeight')}
          error={errors.packageHeight?.message as string}
        />
        <Input
          label="Length"
          placeholder="0"
          labelClassName="font-medium text-gray-900"
          {...register('packageLength')}
          error={errors.packageLength?.message as string}
        />
        <Input
          label="Weight"
          placeholder="0"
          labelClassName="font-medium text-gray-900"
          {...register('packageWeight')}
          error={errors.packageWeight?.message as string}
        />
      </div>
      <Textarea
        label="Package Description"
        labelClassName="font-medium text-gray-900"
        placeholder="Full | Mischievous dramedy featuring accordion, tuba & pizzica..."
        className="col-span-full"
        {...register('packageDescription')}
        error={errors.packageDescription?.message as string}
      />
      <UploadZone
        name="packageInfoAttachment"
        className="col-span-full"
        getValues={getValues}
        setValue={setValue}
        error={errors?.packageInfoAttachment?.message as string}
      />
      <div className="mt-3">
        <h4 className="flex items-center gap-1 text-base font-bold text-gray-900 @7xl:text-lg">
          <PiGift className="h-6 w-6" />
          ADD GIFT OPTION
        </h4>
        <p className="mt-1">Personalize with a message and/or gift wrapping.</p>
      </div>
      <Controller
        name="giftType"
        control={control}
        render={({ field: { value, onChange } }) => (
          <RadioGroup
            value={value}
            setValue={onChange}
            className="col-span-full grid gap-4 @lg:grid-cols-2"
          >
            <AdvancedRadio
              value="giftWrap"
              className=" [&_.rizzui-advanced-checkbox]:!px-5 [&_.rizzui-advanced-checkbox]:!py-4"
              inputClassName="[&~span]:border-0 [&~span]:ring-1 [&~span]:ring-gray-200 [&~span:hover]:ring-primary [&:checked~span:hover]:ring-primary [&:checked~span]:border-1 [&:checked~.rizzui-advanced-checkbox]:ring-2 [&~span_.icon]:opacity-0 [&:checked~span_.icon]:opacity-100"
            >
              <div className="flex justify-between">
                <span className="font-medium text-gray-900">Gift Wrap</span>
                <PiCheckCircleFill className="icon h-5 w-5 text-primary" />
              </div>
              <p className="text-gray-500">{toCurrency(5)}</p>
            </AdvancedRadio>
            <AdvancedRadio
              value="free"
              className=" [&_.rizzui-advanced-checkbox]:!px-5 [&_.rizzui-advanced-checkbox]:!py-4"
              inputClassName="[&~span]:border-0 [&~span]:ring-1 [&~span]:ring-gray-200 [&~span:hover]:ring-primary [&:checked~span:hover]:ring-primary [&:checked~span]:border-1 [&:checked~.rizzui-advanced-checkbox]:ring-2 [&~span_.icon]:opacity-0 [&:checked~span_.icon]:opacity-100"
            >
              <div className="flex justify-between">
                <span className="font-medium text-gray-900">
                  Write A Message
                </span>
                <PiCheckCircleFill className="icon h-5 w-5 text-primary" />
              </div>
              <p className="text-gray-500">Free</p>
            </AdvancedRadio>
          </RadioGroup>
        )}
      />
      <Input
        label="From"
        placeholder="Jerome Bell"
        labelClassName="font-medium text-gray-900"
        {...register('giftFrom')}
        error={errors.giftFrom?.message as string}
      />
      <Input
        label="To"
        placeholder="Ronald Richards"
        labelClassName="font-medium text-gray-900"
        {...register('giftTo')}
        error={errors.giftTo?.message as string}
      />
      <Textarea
        {...register('giftMessage')}
        label="Message"
        className="col-span-full"
        labelClassName="font-medium text-gray-900"
        placeholder="Write your gifting message..."
        error={errors.giftMessage?.message as string}
      />
    </FormGroup>
  );
}
