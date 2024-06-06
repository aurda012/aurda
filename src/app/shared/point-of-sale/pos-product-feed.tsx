'use client';

import { useState } from 'react';
import { Empty, SearchNotFoundIcon, Button } from 'rizzui';
import ProductClassicCard from '@/components/cards/product-classic-card';
import { posFilterValue } from '@/app/shared/point-of-sale/pos-search';
import { useAtomValue } from 'jotai';
import { posData } from '@/data/pos-data';
import hasSearchedParams from '@/utils/has-searched-params';
import shuffle from 'lodash/shuffle';

const PER_PAGE = 12;

export default function POSProductsFeed() {
  const [isLoading, setLoading] = useState(false);
  const [nextPage, setNextPage] = useState(PER_PAGE);
  const searchText = useAtomValue(posFilterValue);

  let productItemsFiltered = [...posData].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  if (searchText.length > 0) {
    productItemsFiltered = posData.filter((item: any) => {
      const label = item.name;
      return (
        label.match(searchText.toLowerCase()) ||
        (label.toLowerCase().match(searchText.toLowerCase()) && label)
      );
    });
  }

  productItemsFiltered = hasSearchedParams()
    ? shuffle(productItemsFiltered)
    : productItemsFiltered;

  function handleLoadMore() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setNextPage(nextPage + PER_PAGE);
    }, 600);
  }

  return (
    <>
      {productItemsFiltered?.length ? (
        <div className="grid  grid-cols-2 gap-x-4 gap-y-6 @md:grid-cols-[repeat(auto-fill,minmax(210px,1fr))] @xl:gap-x-6 @xl:gap-y-12 @4xl:grid-cols-[repeat(auto-fill,minmax(270px,1fr))] ">
          {productItemsFiltered
            ?.slice(0, nextPage)
            ?.map((product) => (
              <ProductClassicCard key={product.id} product={product} />
            ))}
        </div>
      ) : (
        <Empty
          image={<SearchNotFoundIcon />}
          text="No Result Found"
          className="h-full justify-center"
        />
      )}

      {nextPage < productItemsFiltered?.length ? (
        <div className="mb-4 mt-5 flex flex-col items-center xs:pt-6 sm:pt-8">
          <Button isLoading={isLoading} onClick={() => handleLoadMore()}>
            Load More
          </Button>
        </div>
      ) : null}
    </>
  );
}
