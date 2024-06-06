'use client';

import { useState } from 'react';
import { Text, Avatar, Select, type SelectOption } from 'rizzui';
import cn from '@/utils/class-names';

const customOptions: SelectOption[] = [
  {
    label: 'REDQ',
    value: 'redq@redq.io',
    avatar: 'https://s3.envato.com/files/368170631/REDQ.png',
  },
  {
    label: 'Apple',
    value: 'Apple@apple.com',
    avatar:
      'https://1.bp.blogspot.com/-IHIprxC2Za0/UBg14NttLLI/AAAAAAAAA28/nyBH-GeEX7Y/s1600/white-apple-logo-wallpaper.jpg',
  },
  {
    label: 'Microsoft',
    value: 'microsoft@microsoft.com',
    avatar:
      'https://ca16c2df-cdn.agilitycms.cloud/Attachments/NewItems/MS-thumbnail_20230620211556_0.jpg',
  },
  {
    label: 'Google',
    value: 'google@google.com',
    avatar: 'https://wallpapercave.com/wp/wp2860498.jpg',
  },
];

export default function WorkSpaceSwitcher({
  className,
  selectClassName,
  dropdownClassName,
  suffixClassName,
}: {
  className?: string;
  selectClassName?: string;
  dropdownClassName?: string;
  suffixClassName?: string;
}) {
  const [value, setValue] = useState(customOptions[0]);
  return (
    <Select
      options={customOptions}
      value={value}
      onChange={setValue}
      displayValue={(value: SelectOption) => renderDisplayValue(value)}
      getOptionDisplayValue={(option) => renderOptionDisplayValue(option)}
      selectClassName={cn(
        'h-16 outline-0 border-2 ring-0 border-gray-100 hover:!border-gray-100 hover:!ring-0 focus:border-gray-100 focus:!ring-0',
        selectClassName
      )}
      className={cn(className)}
      dropdownClassName={cn('z-[9999] max-w-[250px]', dropdownClassName)}
      suffixClassName={suffixClassName}
      optionClassName={cn('dark:hover:bg-gray-300')}
    />
  );
}

function renderDisplayValue(value: SelectOption) {
  return (
    <div className="flex items-center gap-3">
      <Avatar name={value?.label} src={value?.avatar} size="sm" />
      <div>
        <Text fontWeight="medium" className="text-gray-900">
          {value.label}
        </Text>
        <Text className="text-gray-500">Select Workspace</Text>
      </div>
    </div>
  );
}

function renderOptionDisplayValue(option: SelectOption) {
  return (
    <div className="flex items-center gap-3">
      <Avatar name={option.label} src={option.avatar} size="sm" />
      <div>
        <Text fontWeight="medium">{option.label}</Text>
        <Text>{option.value}</Text>
      </div>
    </div>
  );
}
