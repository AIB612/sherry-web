'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useCart } from 'components/cart/cart-context';
import Price from 'components/price';
import { PayPalButton } from 'components/paypal-button';
import Footer from 'components/layout/footer';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (!cart || cart.lines.length === 0) {
      router.push('/');
    }
  }, [cart, router]);

  const handleCheckout = async () => {
    if (!cart || cart.lines.length === 0) return;

    setIsProcessing(true);

    try {
      // Mock order creation for testing
      const mockOrderId = 'TEST-' + Date.now();
      
      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Navigate to success page directly (skip recharge animation for testing)
      router.push(`/success?orderId=${mockOrderId}`);
      
      // Clear cart
      localStorage.removeItem('cart');
      localStorage.removeItem('cartEmails');
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Failed to process order.');
      setIsProcessing(false);
    }
  };

  const handlePayPalSuccess = async (details: any) => {
    console.log('PayPal payment successful:', details);
    await handleCheckout();
  };

  if (!cart || cart.lines.length === 0) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="mb-8 text-sm hover:underline"
        >
          ← Back
        </button>

        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div>
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="border rounded-lg p-6 space-y-4">
              {cart.lines.map((item, index) => {
                const cartEmails = JSON.parse(localStorage.getItem('cartEmails') || '{}');
                const email = cartEmails[item.merchandise.id];

                return (
                  <div key={index} className="flex gap-4 pb-4 border-b last:border-b-0">
                    <img
                      src={item.merchandise.product.featuredImage.url}
                      alt={item.merchandise.product.title}
                      className="w-16 h-16 object-contain rounded border"
                    />
                    <div className="flex-1">
                      <h3 className="font-bold">{item.merchandise.product.title}</h3>
                      {email && (
                        <p className="text-sm text-gray-600">📧 {email}</p>
                      )}
                      <p className="text-sm font-medium mt-1">
                        <Price
                          amount={item.cost.totalAmount.amount}
                          currencyCode={item.cost.totalAmount.currencyCode}
                        />
                      </p>
                    </div>
                  </div>
                );
              })}

              <div className="pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <Price
                    amount={cart.cost.totalAmount.amount}
                    currencyCode={cart.cost.totalAmount.currencyCode}
                  />
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax</span>
                  <span>CHF 0.00</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-2 border-t">
                  <span>Total</span>
                  <Price
                    amount={cart.cost.totalAmount.amount}
                    currencyCode={cart.cost.totalAmount.currencyCode}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Payment */}
          <div>
            <h2 className="text-xl font-bold mb-4">Payment</h2>
            <div className="border rounded-lg p-6">
              <p className="text-sm text-gray-600 mb-4">
                Pay securely with PayPal or Card
              </p>
              
              {/* PayPal Button */}
              <div className="mb-4">
                <PayPalButton 
                  amount={cart.cost.totalAmount.amount}
                  onSuccess={handlePayPalSuccess}
                />
              </div>
              
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or pay with card</span>
                </div>
              </div>
              
              <button
                onClick={handleCheckout}
                disabled={isProcessing}
                className="w-full bg-[var(--color-airbnb-red)] text-white py-3 px-6 rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Processing...
                  </>
                ) : (
                  'Pay with Card'
                )}
              </button>
              
              {/* Test Mode Button */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-dashed border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-orange-500">🧪 Test Mode</span>
                </div>
              </div>
              
              <button
                onClick={handleCheckout}
                disabled={isProcessing}
                className="w-full bg-gray-700 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Processing...
                  </>
                ) : (
                  '🧪 Skip Payment (Test Only)'
                )}
              </button>
              
              <p className="text-xs text-center text-gray-600 mt-4">
                Secure payment powered by Swisspro.IT
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
