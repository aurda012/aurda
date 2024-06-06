'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { useCart } from '@/store/quick-cart/cart.context';
import FloatingCartButton from '@/app/shared/floating-cart-button';
import CartDrawerView from '@/app/shared/ecommerce/cart/cart-drawer-view';
import { useParams, usePathname } from 'next/navigation';
import { routes } from '@/config/routes';

const Drawer = dynamic(() => import('rizzui').then((module) => module.Drawer), {
  ssr: false,
});

export default function CartDrawer() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const pathname = usePathname();
  const params = useParams();

  // list of included pages
  const includedPaths: string[] = [
    routes.eCommerce.shop,
    routes.eCommerce.productDetails(params?.slug as string),
  ];

  const isPathIncluded = includedPaths.some((path) => pathname === path);

  const {
    totalItems,
    items,
    removeItemFromCart,
    clearItemFromCart,
    total,
    addItemToCart,
  } = useCart();
  return (
    <>
      {isPathIncluded ? (
        <FloatingCartButton
          onClick={() => setOpenDrawer(true)}
          className="top-1/2 -translate-y-1/2 bg-primary dark:bg-primary"
          totalItems={totalItems}
        />
      ) : null}
      <Drawer
        isOpen={openDrawer ?? false}
        onClose={() => setOpenDrawer(false)}
        overlayClassName="dark:bg-opacity-40 dark:backdrop-blur-md"
        containerClassName="dark:bg-gray-100"
        className="z-[9999]"
      >
        <CartDrawerView
          setOpenDrawer={setOpenDrawer}
          clearItemFromCart={clearItemFromCart}
          removeItemFromCart={removeItemFromCart}
          addItemToCart={addItemToCart}
          items={items}
          total={total}
        />
      </Drawer>
    </>
  );
}
