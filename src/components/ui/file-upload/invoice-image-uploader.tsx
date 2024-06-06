import { Text } from 'rizzui';
import Image from 'next/image';
import cn from '@/utils/class-names';
import UploadIcon from '@/components/shape/upload';
import React, { ChangeEvent, useState } from 'react';
import { PiPencilBold, PiTrashBold } from 'react-icons/pi';

interface InvoiceImageUploaderProps {
  name: string;
  setValue: any;
  className?: string;
  imageClassName?: string;
  dropZoneClassName?: string;
  uploaderText?: React.ReactNode;
}

export default function InvoiceImageUploader({
  name,
  setValue,
  className,
  imageClassName,
  dropZoneClassName,
  uploaderText = <>Upload Logo Recommended size 100x100 </>,
}: InvoiceImageUploaderProps) {
  const inputRef = React.createRef<HTMLInputElement>();
  const [file, setFile] = useState<string | null>(null);

  function handleFileSelect(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const base64Data = reader.result as string;
      setFile(() => base64Data);
      setValue(name, base64Data);
    };
    reader.readAsDataURL(file);
  }

  function handleClearFile() {
    setFile(() => null);
    setValue(name, '');
  }

  return (
    <div className={className}>
      <label
        className={cn(
          'flex h-32 w-40 cursor-pointer flex-col items-center justify-center rounded-md border-[1.8px] p-2 hover:border-primary dark:border-gray-700 dark:hover:border-primary',
          file && 'hidden',
          dropZoneClassName
        )}
      >
        <UploadIcon className="mx-auto size-12 -translate-x-1" />
        <Text className="text-center text-xs">{uploaderText}</Text>

        <input
          type="file"
          ref={inputRef}
          accept="image/*"
          className="hidden"
          onChange={handleFileSelect}
        />
      </label>

      {/* preview  */}
      {file && (
        <div
          className={cn(
            'group relative h-32 w-40 rounded-md border-[1.8px] border-transparent p-2 hover:border-muted dark:hover:border-gray-700',
            imageClassName
          )}
        >
          <Image
            src={file}
            alt="logo"
            width={80}
            height={80}
            className="h-full w-full object-contain"
          />
          <div className="absolute end-0 top-1 hidden translate-x-full group-hover:block">
            <div className="translate-x-1 overflow-hidden rounded-md border bg-white shadow-[0px_1px_4px_rgba(0,0,0,0.16)] dark:border-muted/20">
              <ActionButton onClick={() => inputRef.current?.click()}>
                <PiPencilBold className="size-4" />
              </ActionButton>
              <ActionButton onClick={handleClearFile}>
                <PiTrashBold className="size-4 text-red-dark dark:text-red" />
              </ActionButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ActionButton({
  onClick,
  children,
  className,
}: {
  className?: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      className={cn(
        'flex size-7 items-center justify-center text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800',
        className
      )}
      onClick={onClick}
    >
      {children}
      <span className="sr-only">icon</span>
    </button>
  );
}
