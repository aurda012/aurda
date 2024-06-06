import { useState } from 'react';
import { shuffle } from 'lodash';
import { Button } from 'rizzui';
import hasSearchedParams from '@/utils/has-searched-params';
import FlightBookingCard from '@/components/cards/flight-booking-card';
import { Tags } from '@/app/shared/explore-flight/listing-filters/tags';
import { flightListingData } from '@/data/flight-filter-data';

let countPerPage = 6;

export default function FlightFeed() {
  const [isLoading, setLoading] = useState(false);
  const [nextPage, setNextPage] = useState(countPerPage);

  function handleLoadMore() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setNextPage(nextPage + countPerPage);
    }, 600);
  }

  const filteredData = hasSearchedParams()
    ? shuffle(flightListingData)
    : flightListingData;

  return (
    <div className="col-span-full @5xl:col-span-8 @7xl:col-span-9">
      <Tags />
      <div>
        <div className="mt-5 flex flex-col gap-7">
          {filteredData
            ?.slice(0, nextPage)
            ?.map((flight, index) => (
              <FlightBookingCard key={index} data={flight} />
            ))}
        </div>

        {nextPage < flightListingData?.length && (
          <div className="mb-4 mt-5 flex flex-col items-center xs:pt-6 sm:pt-8">
            <Button isLoading={isLoading} onClick={() => handleLoadMore()}>
              Load More
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
