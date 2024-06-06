'use client';

import { ActionIcon, Title, Button } from 'rizzui';
import { useDrawer } from '@/app/shared/drawer-views/use-drawer';
import RatingFilter from '@/app/shared/ecommerce/shop/shop-filters/rating-filter';
import PriceFilter from '@/app/shared/ecommerce/shop/shop-filters/price-filter';
import GenderSpecificFilter from '@/app/shared/ecommerce/shop/shop-filters/gender-specific-filter';
import { useFilterControls } from '@/hooks/use-filter-control';
import {
  initialState,
  categoriesData,
  brandsData,
  colorsData,
} from '@/app/shared/ecommerce/shop/shop-filters/filter-utils';
import FilterWithSearch from '@/components/filter-with-search';
import { PiXBold } from 'react-icons/pi';
import hasSearchedParams from '@/utils/has-searched-params';

export default function ShopFilters() {
  const { state, applyFilter, clearFilter, reset } = useFilterControls<
    typeof initialState,
    any
  >(initialState);

  const { closeDrawer } = useDrawer();

  return (
    <>
      <div className="flex items-center justify-between border-b border-muted px-5 py-3.5">
        <Title as="h5" className="font-semibold">
          Filters
        </Title>
        <ActionIcon
          variant="outline"
          onClick={() => closeDrawer()}
          className="border-0 p-0"
        >
          <PiXBold className="h-auto w-5" />
        </ActionIcon>
      </div>

      <div className="custom-scrollbar h-[calc(100vh-136px)] space-y-9 overflow-y-auto px-5 py-6">
        <GenderSpecificFilter state={state} applyFilter={applyFilter} />
        <FilterWithSearch
          title="Category"
          name="categories"
          data={categoriesData}
          state={state}
          applyFilter={applyFilter}
          clearFilter={clearFilter}
        />
        <FilterWithSearch
          title="Brand"
          name="brands"
          data={brandsData}
          state={state}
          applyFilter={applyFilter}
          clearFilter={clearFilter}
        />
        <FilterWithSearch
          title="Color"
          name="colors"
          data={colorsData}
          state={state}
          applyFilter={applyFilter}
          clearFilter={clearFilter}
        />
        <PriceFilter state={state} applyFilter={applyFilter} />
        <RatingFilter state={state} applyFilter={applyFilter} />
      </div>

      <div className="flex h-16 flex-shrink-0 items-center justify-center gap-3 bg-white px-5 py-3 dark:bg-gray-100">
        {hasSearchedParams() ? (
          <Button
            size="lg"
            variant="outline"
            className="w-full"
            onClick={() => {
              reset();
              closeDrawer();
            }}
          >
            Reset All
          </Button>
        ) : null}
        <Button size="lg" onClick={() => closeDrawer()} className="w-full">
          Show results
        </Button>
      </div>
    </>
  );
}
