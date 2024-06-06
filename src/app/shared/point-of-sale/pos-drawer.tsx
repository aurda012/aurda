'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { useCart } from '@/store/quick-cart/cart.context';
import FloatingCartButton from '@/app/shared/floating-cart-button';
import POSDrawerView from '@/app/shared/point-of-sale/pos-drawer-view';
const Drawer = dynamic(() => import('rizzui').then((module) => module.Drawer), {
  ssr: false,
});

type PosDrawerProps = {
  className?: string;
};

export default function POSDrawer({ className }: PosDrawerProps) {
  const [openDrawer, setOpenDrawer] = useState(false);
  const { totalItems, items, removeItemFromCart, clearItemFromCart } =
    useCart();

  return (
    <>
      <FloatingCartButton
        onClick={() => setOpenDrawer(true)}
        className={className}
        totalItems={totalItems}
      />

      <Drawer
        isOpen={openDrawer ?? false}
        onClose={() => setOpenDrawer(false)}
        overlayClassName="dark:bg-opacity-40 dark:backdrop-blur-md"
        containerClassName="dark:bg-gray-100"
        className="z-[9999]"
      >
        <POSDrawerView
          removeItemFromCart={removeItemFromCart}
          clearItemFromCart={clearItemFromCart}
          onOrderSuccess={() => setOpenDrawer(false)}
          orderedItems={items}
          className="h-screen border-none"
          simpleBarClassName="h-[calc(100vh_-_350px)] sm:h-[calc(100vh_-_365px)]"
        />
      </Drawer>
    </>
  );
}
