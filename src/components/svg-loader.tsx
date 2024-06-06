import React from 'react';
import dynamic from 'next/dynamic';
import { Loader } from 'rizzui';

export default function SVGLoader({ fileName }: { fileName: string }) {
  const SvgComponent = dynamic(() => import(`./icons/${fileName}`));

  return (
    <React.Suspense fallback={<Loader variant="spinner" />}>
      <SvgComponent />
    </React.Suspense>
  );
}
