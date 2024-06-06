'use client';

import POSProductCategory from '@/app/shared/point-of-sale/pos-product-category';
import POSProductsFeed from '@/app/shared/point-of-sale/pos-product-feed';
import PostSidebar from './pos-sidebar';
import { useCart } from '@/store/quick-cart/cart.context';
import cn from '@/utils/class-names';

export default function POSPageView() {
  const { items, removeItemFromCart, clearItemFromCart } = useCart();

  return (
    <div className="grid grid-cols-12 gap-6 pb-10 @container xl:min-h-[745px]">
      <div
        className={cn(
          'col-span-full',
          !!items?.length && 'xl:col-span-8 2xl:col-span-9'
        )}
      >
        <div className="relative mb-6 flex items-center justify-between gap-3">
          <POSProductCategory />
        </div>
        <POSProductsFeed />
      </div>
      {!!items?.length && (
        <aside className="sticky hidden self-start rounded-lg border border-muted xl:top-24 xl:col-span-4 xl:block 2xl:top-[98px] 2xl:col-span-3">
          <PostSidebar
            removeItemFromCart={removeItemFromCart}
            clearItemFromCart={clearItemFromCart}
            orderedItems={items}
            simpleBarClassName="pe-3 xl:pe-7"
          />
        </aside>
      )}
    </div>
  );
}
