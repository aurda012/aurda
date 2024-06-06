'use client';

import { Input } from 'rizzui';
import { PiMagnifyingGlassBold } from 'react-icons/pi';
import { atom, useAtom } from 'jotai';

export const posFilterValue = atom('');

function PosSearch() {
  const [searchText, setSearchText] = useAtom(posFilterValue);

  return (
    <Input
      value={searchText}
      onChange={(e) => setSearchText(() => e.target.value)}
      placeholder={`Search Products...`}
      className="mt-4 w-full @lg:mt-0 @lg:max-w-sm @lg:flex-1 @lg:ps-12 @xl:ps-0"
      inputClassName="shadow-sm"
      prefix={<PiMagnifyingGlassBold className="h-auto w-4" />}
      clearable
      onClear={() => setSearchText('')}
    />
  );
}

export default PosSearch;
