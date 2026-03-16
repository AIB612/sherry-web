"use client";

import type {
  Cart,
  CartItem,
  Product,
  ProductVariant,
} from "lib/shopify/types";
import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  useCallback,
} from "react";

type UpdateType = "plus" | "minus" | "delete";

type CartContextType = {
  cart: Cart;
  updateCartItem: (merchandiseId: string, updateType: UpdateType) => void;
  addCartItem: (variant: ProductVariant, product: Product) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

function calculateItemCost(quantity: number, price: string): string {
  return (Number(price) * quantity).toString();
}

function createEmptyCart(): Cart {
  return {
    id: undefined,
    checkoutUrl: "",
    totalQuantity: 0,
    lines: [],
    cost: {
      subtotalAmount: { amount: "0", currencyCode: "CHF" },
      totalAmount: { amount: "0", currencyCode: "CHF" },
      totalTaxAmount: { amount: "0", currencyCode: "CHF" },
    },
  };
}

function updateCartTotals(lines: CartItem[]): Pick<Cart, "totalQuantity" | "cost"> {
  const totalQuantity = lines.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = lines.reduce(
    (sum, item) => sum + Number(item.cost.totalAmount.amount),
    0,
  );
  const currencyCode = lines[0]?.cost.totalAmount.currencyCode ?? "CHF";

  return {
    totalQuantity,
    cost: {
      subtotalAmount: { amount: totalAmount.toString(), currencyCode },
      totalAmount: { amount: totalAmount.toString(), currencyCode },
      totalTaxAmount: { amount: "0", currencyCode },
    },
  };
}

export function CartProvider({
  children,
  cartPromise,
}: {
  children: React.ReactNode;
  cartPromise: Promise<Cart | undefined>;
}) {
  // Load cart from localStorage on mount
  const [cart, setCart] = useState<Cart>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('cart');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error('Failed to parse cart from localStorage:', e);
        }
      }
    }
    return createEmptyCart();
  });

  // Save cart to localStorage whenever it changes
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart]);

  const updateCartItem = useCallback((merchandiseId: string, updateType: UpdateType) => {
    setCart((currentCart) => {
      const updatedLines = currentCart.lines
        .map((item) => {
          if (item.merchandise.id !== merchandiseId) return item;
          
          if (updateType === "delete") return null;
          
          const newQuantity = updateType === "plus" ? item.quantity + 1 : item.quantity - 1;
          if (newQuantity === 0) return null;
          
          const singleItemAmount = Number(item.cost.totalAmount.amount) / item.quantity;
          return {
            ...item,
            quantity: newQuantity,
            cost: {
              ...item.cost,
              totalAmount: {
                ...item.cost.totalAmount,
                amount: (singleItemAmount * newQuantity).toString(),
              },
            },
          };
        })
        .filter(Boolean) as CartItem[];

      if (updatedLines.length === 0) {
        return createEmptyCart();
      }

      return {
        ...currentCart,
        ...updateCartTotals(updatedLines),
        lines: updatedLines,
      };
    });
  }, []);

  const addCartItem = useCallback((variant: ProductVariant, product: Product) => {
    setCart((currentCart) => {
      const existingItem = currentCart.lines.find(
        (item) => item.merchandise.id === variant.id,
      );

      const quantity = existingItem ? existingItem.quantity + 1 : 1;
      const totalAmount = calculateItemCost(quantity, variant.price.amount);

      const updatedItem: CartItem = {
        id: existingItem?.id || `cart-item-${variant.id}`,
        quantity,
        cost: {
          totalAmount: {
            amount: totalAmount,
            currencyCode: variant.price.currencyCode,
          },
        },
        merchandise: {
          id: variant.id,
          title: variant.title,
          selectedOptions: variant.selectedOptions,
          product: {
            id: product.id,
            handle: product.handle,
            title: product.title,
            featuredImage: product.featuredImage,
          },
        },
      };

      const updatedLines = existingItem
        ? currentCart.lines.map((item) =>
            item.merchandise.id === variant.id ? updatedItem : item,
          )
        : [...currentCart.lines, updatedItem];

      return {
        ...currentCart,
        ...updateCartTotals(updatedLines),
        lines: updatedLines,
      };
    });
  }, []);

  const value = useMemo(
    () => ({
      cart,
      updateCartItem,
      addCartItem,
    }),
    [cart, updateCartItem, addCartItem],
  );

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
