'use client';

import { useState } from 'react';

export default function NewsletterGiveaway() {
  const [email, setEmail] = useState('');
  const [product, setProduct] = useState('Adobe');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="py-16 px-4">
      <div className="max-w-xl mx-auto text-center">
        <p className="text-gray-500 text-sm mb-6">
          Share your wish — we randomly gift genuine licenses every month.
        </p>

        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <select
            value={product}
            onChange={(e) => setProduct(e.target.value)}
            className="border-b border-gray-300 bg-transparent py-2 px-1 text-sm text-gray-700 focus:outline-none focus:border-black hover:border-gray-500 transition-colors"
          >
            <option value="Adobe">Adobe</option>
            <option value="Axure">Axure</option>
          </select>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            className="flex-1 border-b border-gray-300 bg-transparent py-2 px-1 text-sm focus:outline-none focus:border-black hover:border-gray-500 transition-colors"
          />

          <button
            type="submit"
            disabled={submitted}
            className="text-sm font-medium border-b border-black pb-2 hover:opacity-60 transition-opacity disabled:opacity-40 whitespace-nowrap"
          >
            {submitted ? 'Submitted ✓' : 'Subscribe →'}
          </button>
        </form>
      </div>
    </div>
  );
}
