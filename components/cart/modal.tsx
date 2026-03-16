"use client";

import clsx from "clsx";
import { Dialog, Transition } from "@headlessui/react";
import { ShoppingCartIcon, XMarkIcon, PencilIcon } from "@heroicons/react/24/outline";
import Price from "components/price";
import { DEFAULT_OPTION } from "lib/constants";
import { createUrl } from "lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { createCartAndSetCookie, redirectToCheckout } from "./actions";
import { useCart } from "./cart-context";
import { DeleteItemButton } from "./delete-item-button";
import { EditItemQuantityButton } from "./edit-item-quantity-button";
import OpenCart from "./open-cart";
import LoadingDots from "components/loading-dots";

type MerchandiseSearchParams = {
  [key: string]: string;
};

function CartItemEmail({ merchandiseId }: { merchandiseId: string }) {
  const [email, setEmail] = useState('');
  const [editing, setEditing] = useState(false);
  const [editValue, setEditValue] = useState('');

  useEffect(() => {
    const cartEmails = JSON.parse(localStorage.getItem('cartEmails') || '{}');
    if (cartEmails[merchandiseId]) {
      setEmail(cartEmails[merchandiseId]);
    }
  }, [merchandiseId]);

  const handleSave = () => {
    const cartEmails = JSON.parse(localStorage.getItem('cartEmails') || '{}');
    if (editValue.trim()) {
      cartEmails[merchandiseId] = editValue.trim();
      setEmail(editValue.trim());
    } else {
      delete cartEmails[merchandiseId];
      setEmail('');
    }
    localStorage.setItem('cartEmails', JSON.stringify(cartEmails));
    setEditing(false);
  };

  const handleDelete = () => {
    const cartEmails = JSON.parse(localStorage.getItem('cartEmails') || '{}');
    delete cartEmails[merchandiseId];
    localStorage.setItem('cartEmails', JSON.stringify(cartEmails));
    setEmail('');
    setEditing(false);
  };

  if (!email && !editing) return null;

  return (
    <div className="mt-1">
      {editing ? (
        <div className="flex items-center gap-1">
          <input
            type="email"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            placeholder="your@email.com"
            className="flex-1 border-b border-gray-300 bg-transparent py-1 px-0 text-xs focus:outline-none focus:border-black"
            autoFocus
          />
          <button
            onClick={handleSave}
            className="text-xs text-green-600 hover:text-green-800"
          >
            ✓
          </button>
          <button
            onClick={handleDelete}
            className="text-xs text-red-500 hover:text-red-700"
          >
            ✕
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-1">
          <span className="text-xs text-gray-500">📧 {email}</span>
          <button
            onClick={() => { setEditValue(email); setEditing(true); }}
            className="text-gray-400 hover:text-black"
          >
            <PencilIcon className="h-3 w-3" />
          </button>
        </div>
      )}
    </div>
  );
}

export default function CartModal() {
  const { cart, updateCartItem } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const quantityRef = useRef(cart?.totalQuantity);
  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  useEffect(() => {
    if (!cart) {
      createCartAndSetCookie();
    }
  }, [cart]);

  useEffect(() => {
    if (
      cart?.totalQuantity &&
      cart?.totalQuantity !== quantityRef.current &&
      cart?.totalQuantity > 0
    ) {
      if (!isOpen) {
        setIsOpen(true);
      }
      quantityRef.current = cart?.totalQuantity;
    }
  }, [isOpen, cart?.totalQuantity, quantityRef]);

  return (
    <>
      <button aria-label="Open cart" onClick={openCart}>
        <OpenCart quantity={cart?.totalQuantity} />
      </button>
      <Transition show={isOpen}>
        <Dialog onClose={closeCart} className="relative z-50">
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="opacity-0 backdrop-blur-none"
            enterTo="opacity-100 backdrop-blur-[.5px]"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="opacity-100 backdrop-blur-[.5px]"
            leaveTo="opacity-0 backdrop-blur-none"
          >
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <Dialog.Panel className="fixed bottom-0 right-0 top-0 flex h-full w-full flex-col border-l border-neutral-200 bg-white/80 p-6 text-black backdrop-blur-xl md:w-[390px] dark:border-neutral-700 dark:bg-black/80 dark:text-white">
              <div className="flex items-center justify-between">
                <p className="text-lg font-semibold">My Cart</p>
                <button aria-label="Close cart" onClick={closeCart}>
                  <CloseCart />
                </button>
              </div>

              {!cart || cart.lines.length === 0 ? (
                <div className="mt-20 flex w-full flex-col items-center justify-center overflow-hidden px-4">
                  <ShoppingCartIcon className="h-16 text-gray-400" />
                  <p className="mt-6 text-center text-2xl font-bold">
                    Your cart is empty
                  </p>
                  <p className="mt-2 text-center text-sm text-gray-600">
                    Add some products to get started
                  </p>
                  <button
                    onClick={() => {
                      closeCart();
                      window.location.href = '/search';
                    }}
                    className="mt-6 bg-[var(--color-airbnb-red)] text-white py-2 px-6 rounded-lg font-semibold hover:opacity-90 transition-opacity"
                  >
                    Browse Products
                  </button>
                </div>
              ) : (
                <div className="flex h-full flex-col justify-between overflow-hidden p-1">
                  <ul className="grow overflow-auto py-4">
                    {cart.lines
                      .sort((a, b) =>
                        a.merchandise.product.title.localeCompare(
                          b.merchandise.product.title,
                        ),
                      )
                      .map((item, i) => {
                        const merchandiseSearchParams =
                          {} as MerchandiseSearchParams;

                        item.merchandise.selectedOptions.forEach(
                          ({ name, value }) => {
                            if (value !== DEFAULT_OPTION) {
                              merchandiseSearchParams[name.toLowerCase()] =
                                value;
                            }
                          },
                        );

                        const merchandiseUrl = createUrl(
                          `/product/${item.merchandise.product.handle}`,
                          new URLSearchParams(merchandiseSearchParams),
                        );

                        return (
                          <li
                            key={i}
                            className="flex w-full flex-col border-b border-neutral-300 dark:border-neutral-700"
                          >
                            <div className="relative flex w-full flex-row justify-between px-1 py-4">
                              <div className="absolute z-40 -ml-1 -mt-2">
                                <DeleteItemButton
                                  item={item}
                                  optimisticUpdate={updateCartItem}
                                />
                              </div>
                              <div className="flex flex-row">
                                <div className="relative h-16 w-16 overflow-hidden rounded-md border border-neutral-300 bg-neutral-300 dark:border-neutral-700 dark:bg-neutral-900 dark:hover:bg-neutral-800">
                                  <Image
                                    className="h-full w-full object-cover"
                                    width={64}
                                    height={64}
                                    alt={
                                      item.merchandise.product.featuredImage
                                        .altText ||
                                      item.merchandise.product.title
                                    }
                                    src={
                                      item.merchandise.product.featuredImage.url
                                    }
                                  />
                                </div>
                                <div className="z-30 ml-2 flex flex-col">
                                  <Link
                                    href={merchandiseUrl}
                                    onClick={closeCart}
                                    className="flex flex-row space-x-4"
                                  >
                                    <div className="flex flex-1 flex-col text-base">
                                      <span className="leading-tight">
                                        {item.merchandise.product.title}
                                      </span>
                                      {item.merchandise.title !==
                                      DEFAULT_OPTION ? (
                                        <p className="text-sm text-neutral-500 dark:text-neutral-400">
                                          {item.merchandise.title}
                                        </p>
                                      ) : null}
                                    </div>
                                  </Link>
                                  {/* Email display */}
                                  <CartItemEmail merchandiseId={item.merchandise.id} />
                                </div>
                              </div>
                              <div className="flex h-16 flex-col justify-between">
                                <Price
                                  className="flex justify-end space-y-2 text-right text-sm"
                                  amount={item.cost.totalAmount.amount}
                                  currencyCode={
                                    item.cost.totalAmount.currencyCode
                                  }
                                />
                                <div className="ml-auto flex h-9 flex-row items-center rounded-full border border-neutral-200 dark:border-neutral-700">
                                  <EditItemQuantityButton
                                    item={item}
                                    type="minus"
                                    optimisticUpdate={updateCartItem}
                                  />
                                  <p className="w-6 text-center">
                                    <span className="w-full text-sm">
                                      {item.quantity}
                                    </span>
                                  </p>
                                  <EditItemQuantityButton
                                    item={item}
                                    type="plus"
                                    optimisticUpdate={updateCartItem}
                                  />
                                </div>
                              </div>
                            </div>
                          </li>
                        );
                      })}
                  </ul>
                  <div className="py-4 text-sm text-neutral-500 dark:text-neutral-400">
                    <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 dark:border-neutral-700">
                      <p>Total</p>
                      <Price
                        className="text-right text-base text-black dark:text-white"
                        amount={cart.cost.totalAmount.amount}
                        currencyCode={cart.cost.totalAmount.currencyCode}
                      />
                    </div>
                  </div>
                  <Link
                    href="/checkout"
                    onClick={closeCart}
                    className="block w-full rounded-full bg-[var(--color-airbnb-red)] p-3 text-center text-sm font-medium text-white opacity-90 hover:opacity-100"
                  >
                    Proceed to Checkout
                  </Link>
                </div>
              )}
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
}

function CloseCart({ className }: { className?: string }) {
  return (
    <div className="relative flex h-11 w-11 items-center justify-center rounded-md border border-neutral-200 text-black transition-colors dark:border-neutral-700 dark:text-white">
      <XMarkIcon
        className={clsx(
          "h-6 transition-all ease-in-out hover:scale-110",
          className,
        )}
      />
    </div>
  );
}
