"use client";

import { Dialog, Transition } from "@headlessui/react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Fragment, useEffect, useState } from "react";

import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Menu } from "lib/shopify/types";

export default function MobileMenu({ menu }: { menu: Menu[] }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const openMobileMenu = () => setIsOpen(true);
  const closeMobileMenu = () => setIsOpen(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname, searchParams]);

  return (
    <>
      <button
        onClick={openMobileMenu}
        aria-label="Open mobile menu"
        className="flex h-11 w-11 items-center justify-center rounded-full border border-neutral-200/80 bg-white/90 text-black shadow-sm backdrop-blur-sm transition-colors md:hidden dark:border-neutral-700 dark:bg-black/80 dark:text-white"
      >
        <Bars3Icon className="h-4" />
      </button>
      <Transition show={isOpen}>
        <Dialog onClose={closeMobileMenu} className="relative z-50 md:hidden">
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-all ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/70 backdrop-blur-xl" aria-hidden="true" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="transition-all ease-out duration-300"
            enterFrom="opacity-0 scale-[0.98]"
            enterTo="opacity-100 scale-100"
            leave="transition-all ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-[0.98]"
          >
            <Dialog.Panel className="fixed inset-0 flex min-h-screen flex-col px-5 pt-5 pb-8 text-white">
              <div className="flex items-center justify-between">
                <span className="text-[10px] tracking-[0.35em] text-white/45 font-mono">
                  MENU
                </span>
                <button
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition-colors hover:bg-white/15"
                  onClick={closeMobileMenu}
                  aria-label="Close mobile menu"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>

              <div className="flex flex-1 flex-col items-center justify-center">
                {menu.length ? (
                  <ul className="flex w-full max-w-sm flex-col items-center gap-4 text-center">
                    {menu.map((item: Menu, index) => (
                      <li key={item.title} className="w-full overflow-hidden">
                        <Transition.Child
                          as={Fragment}
                          enter="transition-all ease-out duration-300"
                          enterFrom="opacity-0 translate-y-3"
                          enterTo="opacity-100 translate-y-0"
                          leave="transition-all ease-in duration-200"
                          leaveFrom="opacity-100 translate-y-0"
                          leaveTo="opacity-0 translate-y-2"
                        >
                          <Link
                            href={item.path}
                            prefetch={true}
                            onClick={closeMobileMenu}
                            className="block text-[clamp(1.8rem,7vw,2.5rem)] font-semibold tracking-[-0.03em] text-white/92 transition-all duration-300 hover:text-white"
                            style={{ transitionDelay: `${index * 40}ms` }}
                          >
                            {item.title}
                          </Link>
                        </Transition.Child>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>

              <div className="flex items-center justify-center pt-8 pr-2">
                <span className="text-[10px] tracking-[0.28em] text-white/35 font-mono translate-x-3">
                  CHENXUE BRANNY
                </span>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
}
