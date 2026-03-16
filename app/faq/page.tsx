import type { Metadata } from 'next';
import Footer from 'components/layout/footer';

export const metadata: Metadata = {
  title: 'FAQ - Frequently Asked Questions | Swisspro.it',
  description: 'Find answers to common questions about Swisspro.it. Learn about our instant delivery, genuine licenses, payment methods, refund policy, and customer support.',
  keywords: 'software licenses FAQ, genuine software, instant delivery, PayPal payment, software support, license activation',
  openGraph: {
    title: 'FAQ - Swisspro.it',
    description: 'Get answers to your questions about purchasing genuine software licenses',
    type: 'website',
  },
};

const faqs = [
  {
    category: 'About Swisspro.it',
    questions: [
      {
        question: 'What is Swisspro.it?',
        answer: 'Swisspro.it is a trusted software license marketplace that provides instant access to genuine, premium software licenses at competitive prices. We offer Adobe Creative Cloud, Microsoft 365, Windows, and more with instant delivery and 24/7 support.',
      },
      {
        question: 'Why choose Swisspro.it?',
        answer: 'We offer 100% genuine licenses, instant delivery within 2 minutes, up to 33% savings compared to official prices, secure PayPal payments, and 24/7 customer support. All our licenses are verified and come with a 30-day money-back guarantee.',
      },
      {
        question: 'Are your licenses genuine?',
        answer: 'Yes! All our software licenses are 100% genuine and sourced directly from authorized distributors. Every license is verified before delivery and comes with full manufacturer support.',
      },
    ],
  },
  {
    category: 'Ordering & Payment',
    questions: [
      {
        question: 'How do I purchase a license?',
        answer: 'Simply browse our catalog, select your desired software, add it to cart, and proceed to checkout. We accept PayPal and major credit cards for secure payment processing.',
      },
      {
        question: 'What payment methods do you accept?',
        answer: 'We accept PayPal, Visa, Mastercard, American Express, and other major credit cards. All payments are processed securely through PayPal\'s encrypted payment gateway.',
      },
      {
        question: 'Is my payment information secure?',
        answer: 'Absolutely! We use industry-standard SSL encryption and PayPal\'s secure payment processing. We never store your credit card information on our servers.',
      },
      {
        question: 'Do you offer discounts for bulk purchases?',
        answer: 'Yes! Contact us at Software@dropking.ch for volume licensing and enterprise pricing. We offer special rates for businesses and educational institutions.',
      },
    ],
  },
  {
    category: 'Delivery & Activation',
    questions: [
      {
        question: 'How fast will I receive my license?',
        answer: 'Most licenses are delivered instantly within 2 minutes via email. Account-based licenses (like Adobe Creative Cloud) are activated immediately after payment confirmation.',
      },
      {
        question: 'How do I activate my license?',
        answer: 'For key-based licenses: You\'ll receive a license key via email. Simply enter it during software installation. For account-based licenses: Your subscription is automatically added to your account email.',
      },
      {
        question: 'What if I don\'t receive my license?',
        answer: 'Check your spam folder first. If you still haven\'t received it within 10 minutes, contact us at Software@dropking.ch with your order number, and we\'ll resend it immediately.',
      },
      {
        question: 'Can I use my license on multiple devices?',
        answer: 'It depends on the software. Most licenses allow installation on 1-2 devices. Check the product description for specific device limits. Microsoft 365 Family plans support up to 6 users.',
      },
    ],
  },
  {
    category: 'Refunds & Support',
    questions: [
      {
        question: 'What is your refund policy?',
        answer: 'We offer a 30-day money-back guarantee. If you\'re not satisfied or encounter activation issues, contact us within 30 days for a full refund. No questions asked.',
      },
      {
        question: 'How do I contact customer support?',
        answer: 'Email us at Software@dropking.ch for any questions or issues. Our support team responds within 24 hours, typically much faster. We\'re here to help!',
      },
      {
        question: 'Do you provide technical support?',
        answer: 'We provide activation support and license-related assistance. For software-specific technical issues, please contact the manufacturer\'s official support (Adobe, Microsoft, etc.).',
      },
      {
        question: 'Can I exchange my license for a different product?',
        answer: 'Exchanges are evaluated case-by-case. Contact us at Software@dropking.ch within 7 days of purchase, and we\'ll do our best to accommodate your request.',
      },
    ],
  },
  {
    category: 'Account & Licenses',
    questions: [
      {
        question: 'Do I need to create an account?',
        answer: 'No account required! Simply provide your email at checkout, and we\'ll send your license directly. However, we recommend saving your order confirmation for future reference.',
      },
      {
        question: 'How long is my license valid?',
        answer: 'License validity varies by product. Perpetual licenses (like Windows) never expire. Subscription licenses (like Adobe CC) are valid for the purchased period (monthly/yearly).',
      },
      {
        question: 'Can I renew my subscription through Swisspro.it?',
        answer: 'Yes! Simply purchase the same product again before your current subscription expires. We\'ll extend your existing subscription seamlessly.',
      },
      {
        question: 'What happens if my license stops working?',
        answer: 'Contact us immediately at Software@dropking.ch. We\'ll investigate and provide a replacement license if needed. All our licenses come with activation guarantee.',
      },
    ],
  },
  {
    category: 'Security & Privacy',
    questions: [
      {
        question: 'Is Swisspro.it safe to use?',
        answer: 'Yes! We use SSL encryption, secure PayPal payments, and never store sensitive payment information. Thousands of customers trust us for their software needs.',
      },
      {
        question: 'Do you share my personal information?',
        answer: 'Never! We respect your privacy. Your email and order information are used solely for license delivery and support. We never sell or share your data with third parties.',
      },
      {
        question: 'How do you source your licenses?',
        answer: 'We partner with authorized distributors and volume licensing programs to offer genuine software at competitive prices. All licenses are legally obtained and verified.',
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
        <p className="text-lg text-gray-600">
          Everything you need to know about Swisspro.it
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Can't find your answer? Email us at{' '}
          <a href="mailto:Software@dropking.ch" className="text-[var(--color-airbnb-red)] hover:underline">
            Software@dropking.ch
          </a>
        </p>
      </div>

      {/* Trust Badges */}
      <div className="grid grid-cols-3 gap-4 mb-12 text-center">
        <div className="p-4 border rounded-lg">
          <div className="text-2xl mb-2">✓</div>
          <div className="font-semibold text-sm">100% Genuine</div>
          <div className="text-xs text-gray-600">Verified Licenses</div>
        </div>
        <div className="p-4 border rounded-lg">
          <div className="text-2xl mb-2">⚡</div>
          <div className="font-semibold text-sm">2-Min Delivery</div>
          <div className="text-xs text-gray-600">Instant Access</div>
        </div>
        <div className="p-4 border rounded-lg">
          <div className="text-2xl mb-2">🔒</div>
          <div className="font-semibold text-sm">Secure Payment</div>
          <div className="text-xs text-gray-600">PayPal Protected</div>
        </div>
      </div>

      {/* FAQ Categories */}
      {faqs.map((category, categoryIndex) => (
        <div key={categoryIndex} className="mb-12">
          <h2 className="text-2xl font-bold mb-6 pb-2 border-b">
            {category.category}
          </h2>
          <div className="space-y-6">
            {category.questions.map((faq, faqIndex) => (
              <div key={faqIndex} className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-gray-900">
                  {faq.question}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* CTA Section */}
      <div className="mt-16 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
        <p className="text-gray-700 mb-6">
          Our support team is here to help you 24/7
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <a
            href="mailto:Software@dropking.ch"
            className="bg-[var(--color-airbnb-red)] text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            Contact Support
          </a>
          <a
            href="/search"
            className="border border-gray-300 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
          >
            Browse Products
          </a>
        </div>
      </div>

      {/* SEO Content */}
      <div className="mt-12 text-sm text-gray-600 leading-relaxed">
        <h2 className="text-xl font-bold mb-4 text-gray-900">
          Why Swisspro.it is Your Trusted Software License Provider
        </h2>
        <p className="mb-4">
          Swisspro.it is a leading online marketplace for genuine software licenses, offering instant delivery 
          of premium software including Adobe Creative Cloud, Microsoft 365, Windows 11 Pro, and more. We pride 
          ourselves on providing 100% authentic licenses at competitive prices, with savings of up to 33% compared 
          to official retail prices.
        </p>
        <p className="mb-4">
          Our commitment to customer satisfaction is reflected in our instant 2-minute delivery, secure PayPal 
          payment processing, and comprehensive 30-day money-back guarantee. Whether you're a creative professional 
          needing Adobe software, a business requiring Microsoft 365, or a home user upgrading to Windows 11 Pro, 
          Swisspro.it has you covered.
        </p>
        <p>
          Join thousands of satisfied customers who trust Swisspro.it for their software licensing needs. 
          Experience the convenience of instant delivery, the security of genuine licenses, and the peace of 
          mind that comes with our dedicated customer support team.
        </p>
      </div>
      <Footer />
    </div>
  );
}
