'use client';

import NewCardButton from './NewCardButton';
import { MommySparkles } from './sparkles';
import { cardData } from '../data';
import { useState } from 'react';
import { CardTitle } from './CardTitle';
import { ContainerScroll } from './scroll-animation';
import Image from 'next/image';

const MothersDayCard = () => {
  const [index, setIndex] = useState(0);
  const [card, setCard] = useState(cardData[0]);

  const handleNewCard = () => {
    if (index < cardData.length - 1) {
      setIndex(() => index + 1);
      setCard(cardData[index]);
    } else {
      setIndex(() => 0);
      setCard(cardData[index]);
    }
  };

  return (
    <div className="h- flex  w-full flex-col items-center justify-center rounded-md bg-slate-950">
      <MommySparkles />
      <NewCardButton handleNewCard={handleNewCard} />
      <CardTitle title={card.title} />
      <div className="max-w-[950px] font-bold">
        <div className="mt-4">
          <div className=" text-center text-2xl leading-snug tracking-wide text-white/90">
            {card.description}
          </div>
        </div>
      </div>
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="mb-16 text-4xl font-semibold text-white">
              {`Here's your present :)`} <br />
              <span className="mt-1 text-4xl font-bold leading-none text-transparent md:text-[6rem]">
                Scroll Animations
              </span>
            </h1>
          </>
        }
      >
        <Image
          src={card.image}
          alt="hero"
          height={720}
          width={1400}
          className="mx-auto h-full rounded-2xl object-cover object-left-top"
          draggable={false}
        />
      </ContainerScroll>
    </div>
  );
};
export default MothersDayCard;
