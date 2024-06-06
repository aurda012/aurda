'use client';
import { MaskContainer } from './svg-mask-effect';

export function SVGMaskEffectDemo() {
  return (
    <div className="flex h-[40rem] w-full items-center justify-center  overflow-hidden">
      <MaskContainer
        revealText={
          <p className="mx-auto max-w-4xl text-center text-4xl  font-bold text-slate-800">
            The first rule of Fight Club is you do not talk about Fight Club.
            The second rule of Fight Club is you DO NOT talk about Fight Club.
          </p>
        }
        className="h-[40rem] rounded-md border"
      >
        The first rule of <span className="text-red-500">Fight Club</span> is
        you do not talk about Fight Club. The second rule of Fight Club is you
        DO NOT talk about <span className="text-red-500">Fight Club</span>.
      </MaskContainer>
    </div>
  );
}
