'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Footer from 'components/layout/footer';

export default function SuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  
  const [order, setOrder] = useState<any>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!orderId) {
      router.push('/');
      return;
    }

    // Fetch order details
    fetch(`http://localhost:3001/api/orders/${orderId}`)
      .then(res => res.json())
      .then(data => setOrder(data))
      .catch(err => console.error('Failed to fetch order:', err));
  }, [orderId, router]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!order) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-gray-300 border-t-black rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center">
            <span className="text-white text-4xl">✓</span>
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Activation Successful!
          </h1>
          <p className="text-gray-600">
            Your subscription is now active
          </p>
        </div>

        {/* Order Info Card */}
        <div className="border rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Order Details</h2>
            <span className="text-sm text-gray-600">#{orderId}</span>
          </div>

          {/* Account Email */}
          {order.accountEmail && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <h3 className="font-semibold text-sm mb-2">
                Account Recharged
              </h3>
              <p className="text-sm text-gray-700 mb-2">
                Your subscription has been added to:
              </p>
              <div className="flex items-center gap-2 bg-white px-3 py-2 rounded border">
                <span className="font-mono text-sm flex-1">{order.accountEmail}</span>
                <button
                  onClick={() => handleCopy(order.accountEmail)}
                  className="text-sm hover:underline"
                >
                  {copied ? '✓ Copied' : 'Copy'}
                </button>
              </div>
            </div>
          )}

          {/* License Key */}
          {order.licenseKey && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-semibold text-sm mb-2">
                Your License Key
              </h3>
              <p className="text-sm text-gray-700 mb-2">
                Save this key in a safe place:
              </p>
              <div className="flex items-center gap-2 bg-white px-3 py-2 rounded border">
                <span className="font-mono text-sm flex-1 select-all">
                  {order.licenseKey}
                </span>
                <button
                  onClick={() => handleCopy(order.licenseKey)}
                  className="text-sm hover:underline"
                >
                  {copied ? '✓ Copied' : 'Copy'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Next Steps */}
        <div className="border rounded-lg p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">Next Steps</h2>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                1
              </div>
              <div>
                <p className="font-medium">Check your email</p>
                <p className="text-sm text-gray-600">
                  Confirmation has been sent to your inbox
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                2
              </div>
              <div>
                <p className="font-medium">Start using your software</p>
                <p className="text-sm text-gray-600">
                  Log in and enjoy premium features
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            onClick={() => router.push('/')}
            className="flex-1 bg-[var(--color-airbnb-red)] text-white py-3 px-6 rounded-lg font-semibold hover:opacity-90"
          >
            Back to Home
          </button>
          <button
            onClick={() => router.push('/search')}
            className="flex-1 border border-gray-300 py-3 px-6 rounded-lg font-semibold hover:bg-gray-50"
          >
            Browse More
          </button>
        </div>

        <p className="text-center text-sm text-gray-600 mt-6">
          📧 A confirmation email has been sent to your inbox
        </p>
      </div>
      <Footer />
    </div>
  );
}
