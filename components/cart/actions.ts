"use server";

import { TAGS } from "lib/constants";
import { updateTag } from "next/cache";
import { cookies } from "next/headers";

// Mock cart storage (in production, use a database)
const mockCarts = new Map<string, any>();

function getCartId() {
  return 'mock-cart-id';
}

function getMockCart() {
  const cartId = getCartId();
  if (!mockCarts.has(cartId)) {
    mockCarts.set(cartId, {
      id: cartId,
      lines: [],
      cost: {
        subtotalAmount: { amount: '0', currencyCode: 'CHF' },
        totalAmount: { amount: '0', currencyCode: 'CHF' },
        totalTaxAmount: { amount: '0', currencyCode: 'CHF' },
      },
      totalQuantity: 0,
    });
  }
  return mockCarts.get(cartId);
}

function calculateCartTotals(cart: any) {
  const total = cart.lines.reduce((sum: number, line: any) => {
    return sum + (parseFloat(line.cost.totalAmount.amount) || 0);
  }, 0);
  
  cart.cost.subtotalAmount.amount = total.toFixed(2);
  cart.cost.totalAmount.amount = total.toFixed(2);
  cart.totalQuantity = cart.lines.reduce((sum: number, line: any) => sum + line.quantity, 0);
}

export async function addItem(
  prevState: any,
  selectedVariantId: string | undefined
) {
  if (!selectedVariantId) {
    return "Error adding item to cart";
  }

  try {
    const cart = getMockCart();
    const existingLine = cart.lines.find((line: any) => line.merchandise.id === selectedVariantId);
    
    if (existingLine) {
      existingLine.quantity += 1;
      const unitPrice = parseFloat(existingLine.cost.totalAmount.amount) / (existingLine.quantity - 1);
      existingLine.cost.totalAmount.amount = (unitPrice * existingLine.quantity).toFixed(2);
    } else {
      // This is a mock - in real implementation, fetch product details
      cart.lines.push({
        id: `line-${Date.now()}`,
        quantity: 1,
        merchandise: {
          id: selectedVariantId,
          title: 'Product',
          product: {
            title: 'Product',
          },
        },
        cost: {
          totalAmount: {
            amount: '0',
            currencyCode: 'CHF',
          },
        },
      });
    }
    
    calculateCartTotals(cart);
    updateTag(TAGS.cart);
    return null;
  } catch (e) {
    return "Error adding item to cart";
  }
}

export async function removeItem(prevState: any, merchandiseId: string) {
  try {
    const cart = getMockCart();
    const lineIndex = cart.lines.findIndex((line: any) => line.merchandise.id === merchandiseId);
    
    if (lineIndex !== -1) {
      cart.lines.splice(lineIndex, 1);
      calculateCartTotals(cart);
      updateTag(TAGS.cart);
    } else {
      return "Item not found in cart";
    }
  } catch (e) {
    return "Error removing item from cart";
  }
}

export async function updateItemQuantity(
  prevState: any,
  payload: {
    merchandiseId: string;
    quantity: number;
  }
) {
  const { merchandiseId, quantity } = payload;

  try {
    const cart = getMockCart();
    const line = cart.lines.find((line: any) => line.merchandise.id === merchandiseId);
    
    if (line) {
      if (quantity === 0) {
        const lineIndex = cart.lines.indexOf(line);
        cart.lines.splice(lineIndex, 1);
      } else {
        const unitPrice = parseFloat(line.cost.totalAmount.amount) / line.quantity;
        line.quantity = quantity;
        line.cost.totalAmount.amount = (unitPrice * quantity).toFixed(2);
      }
    } else if (quantity > 0) {
      cart.lines.push({
        id: `line-${Date.now()}`,
        quantity,
        merchandise: {
          id: merchandiseId,
          title: 'Product',
          product: {
            title: 'Product',
          },
        },
        cost: {
          totalAmount: {
            amount: '0',
            currencyCode: 'CHF',
          },
        },
      });
    }
    
    calculateCartTotals(cart);
    updateTag(TAGS.cart);
  } catch (e) {
    console.error(e);
    return "Error updating item quantity";
  }
}

export async function redirectToCheckout() {
  // Mock checkout - in production, integrate with payment provider
  return '/checkout';
}

export async function createCartAndSetCookie() {
  const cart = getMockCart();
  (await cookies()).set("cartId", cart.id);
}
