'use client';

import { useState } from 'react';
import Link from 'next/link';
import Footer from 'components/layout/footer';

export default function TrackOrderPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState<any[]>([]);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setOrders([]);

    try {
      const response = await fetch(`http://localhost:3001/api/orders?email=${encodeURIComponent(email)}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }

      const data = await response.json();
      
      if (!data || data.length === 0) {
        setError('No orders found for this email address.');
      } else {
        setOrders(data);
      }
    } catch (err: any) {
      setError('Failed to find orders. Please check your email address.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Track Your Orders</h1>
        <p className="text-gray-600">
          Enter your email to view all your orders
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white border rounded-lg p-6 mb-8">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:border-[var(--color-airbnb-red)]"
            />
            <p className="text-xs text-gray-500 mt-1">
              Enter the email you used when placing your order
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-2">
              <span className="text-red-500">⚠️</span>
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[var(--color-airbnb-red)] text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {loading ? 'Searching...' : 'View My Orders'}
          </button>
        </div>
      </form>

      {/* Orders List */}
      {orders.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold mb-4">Your Orders ({orders.length})</h2>
          {orders.map((order) => (
            <div key={order.id} className="bg-white border rounded-lg p-6">
              <div className="flex items-center justify-between mb-4 pb-4 border-b">
                <div>
                  <h3 className="text-lg font-bold">Order #{order.id}</h3>
                  <p className="text-sm text-gray-600">
                    {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  order.status === 'completed' ? 'bg-green-100 text-green-700' :
                  order.status === 'processing' ? 'bg-yellow-100 text-yellow-700' :
                  order.status === 'pending' ? 'bg-gray-100 text-gray-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {order.status.toUpperCase()}
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Product</p>
                  <p className="font-semibold">{order.productId}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-600">Account Email</p>
                  <p className="font-semibold">{order.accountEmail}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-600">Amount</p>
                  <p className="font-semibold">
                    {order.currency} {parseFloat(order.amount).toFixed(2)}
                  </p>
                </div>

                {order.status === 'completed' && (
                  <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm text-green-700 font-semibold mb-1">
                      ✓ Order Completed
                    </p>
                    <p className="text-xs text-green-600">
                      Your license has been delivered to {order.accountEmail}
                    </p>
                  </div>
                )}

                {order.status === 'processing' && (
                  <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-sm text-yellow-700 font-semibold mb-1">
                      ⏳ Processing
                    </p>
                    <p className="text-xs text-yellow-600">
                      Your order is being processed. You'll receive your license within 2 minutes.
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Help Section */}
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-600 mb-2">
          Need help? Contact us at{' '}
          <a href="mailto:Software@dropking.ch" className="text-[var(--color-airbnb-red)] hover:underline">
            Software@dropking.ch
          </a>
        </p>
        <Link href="/search" className="text-sm text-[var(--color-airbnb-red)] hover:underline">
          ← Back to Shop
        </Link>
      </div>
      <Footer />
    </div>
  );
}
