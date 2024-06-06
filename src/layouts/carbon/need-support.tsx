'use client';

import { Title, Text } from 'rizzui';
import cn from '@/utils/class-names';
import { PiXBold } from 'react-icons/pi';
import useSessionStorage from 'react-use/lib/useSessionStorage';

interface SupportProps {
  className?: string;
  suffixIcon?: React.ReactNode;
  prefixIcon?: React.ReactNode;
  title: string;
  text?: string;
}

export default function NeedSupport({
  className,
  title,
  text,
  suffixIcon,
  prefixIcon,
}: SupportProps) {
  const [value, setValue] = useSessionStorage('need-support', true);

  if (!value) {
    return null;
  }

  return (
    <div
      className={cn(
        'flex flex-col gap-2 rounded-lg bg-gray-100 px-4 py-3.5',
        className
      )}
    >
      <div className="flex items-center justify-between gap-2.5">
        <div className="flex items-center gap-2.5">
          {prefixIcon}
          <Title as="h6" className="text-sm font-semibold text-gray-900">
            {title}
          </Title>
        </div>
        <PiXBold
          className="h-5 w-5 cursor-pointer text-gray-400 transition-all hover:text-gray-900"
          onClick={() => setValue(false)}
        />
      </div>
      {text && (
        <div>
          <Text>{text}</Text>
        </div>
      )}
    </div>
  );
}
