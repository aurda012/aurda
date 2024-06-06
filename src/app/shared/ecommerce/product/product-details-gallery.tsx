import Image from 'next/image';

const productGallery = [
  'https://isomorphic-furyroad.s3.amazonaws.com/public/products/details/1.jpg',
  'https://isomorphic-furyroad.s3.amazonaws.com/public/products/details/2.jpg',
  'https://isomorphic-furyroad.s3.amazonaws.com/public/products/details/3.jpg',
  'https://isomorphic-furyroad.s3.amazonaws.com/public/products/details/4.jpg',
];

export default function ProductDetailsGallery() {
  return (
    <div className="grid grid-cols-2 gap-3 @md:gap-4 @xl:gap-5 @2xl:gap-7">
      {productGallery.map((image, idx) => (
        <div
          key={`product-gallery-${idx}`}
          className="relative mx-auto aspect-[4/4.65] w-full overflow-hidden rounded bg-gray-100 @xl:rounded-md"
        >
          <Image
            fill
            priority
            src={image}
            alt={'Product Gallery'}
            sizes="(max-width: 768px) 100vw"
            className="h-full w-full object-cover"
          />
        </div>
      ))}
    </div>
  );
}
