'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Footer from 'components/layout/footer';

export default function CheckoutSuccess() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          cletimer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        {/* Success Icon */}
        <div className="mb-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        {/* Success Message */}
        <h1 className="text-2xl font-bold mb-2">Order Successful! / 订单成功！</h1>
        <p className="text-gray-600 mb-6">
          Thank you for your purchase. Your order has been received and is being processed.
          <br />
          感谢您的购买。您的订单已收到并正在处理中。
        </p>

        {/* Order ID */}
        {orderId && (
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-600 mb-1">Order ID / 订单号</p>
            <p className="font-mono font-medium">{orderId}</p>
          </div>
        )}

        {/* Next Steps */}
        <div className="text-left bg-blue-50 rounded-lg p-4 mb-6">
          <h3 className="font-semibold mb-2">📧 What's Next? / 接下来？</h3>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>✓ Check your email for order confirmation</li>
            <li>✓ We'll process your order within 24 hours</li>
            <li>✓ You'll receive your license/activation via email</li>
          </ul>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <Link
            href="/"
            className="block w-full py-3 bg-[var(--color-airbnb-red)] text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            Continue Shopping / 继续购物
          </Link>         
          <Link
            href="/orders"
            className="block w-full py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            View My Orders / 查看我的订单
          </Link>
        </div>

        {/* Auto  */}
        {countdown > 0 && (
          <p className="text-sm text-gray-500 mt-6">
            Redirecting to homepage in {countdown} seconds...
            <br />
            {countdown} 秒后自动跳转到首页...
          </p>
        )}
      </div>
      <Footer />
    </div>
  );
}
