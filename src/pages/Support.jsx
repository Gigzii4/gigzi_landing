import { Link } from 'react-router-dom';
import { ArrowLeft, HelpCircle, Mail, MessageCircle, Phone } from 'lucide-react';

export default function Support() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-[#021d5c] via-[#06328c] to-[#4D55CC] text-white pb-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <Link to="/account" className="inline-flex items-center text-white/80 hover:text-white mb-6">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </Link>
          <h1 className="text-3xl font-bold mb-2">Help & Support</h1>
          <p className="text-white/80">We're here to help you</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <Mail className="w-8 h-8 text-[#4D55CC] mb-4" />
            <h3 className="font-bold text-gray-900 mb-2">Email Support</h3>
            <p className="text-gray-600 text-sm mb-4">Send us an email and we'll get back to you</p>
            <a href="mailto:support@gigzi.com" className="text-[#4D55CC] font-semibold">
              support@gigzi.com
            </a>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <Phone className="w-8 h-8 text-[#4D55CC] mb-4" />
            <h3 className="font-bold text-gray-900 mb-2">Phone Support</h3>
            <p className="text-gray-600 text-sm mb-4">Call us for immediate assistance</p>
            <a href="tel:+911234567890" className="text-[#4D55CC] font-semibold">
              +91 123 456 7890
            </a>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <MessageCircle className="w-8 h-8 text-[#4D55CC] mb-4" />
            <h3 className="font-bold text-gray-900 mb-2">Live Chat</h3>
            <p className="text-gray-600 text-sm mb-4">Chat with our support team</p>
            <button className="text-[#4D55CC] font-semibold">Start Chat</button>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <HelpCircle className="w-8 h-8 text-[#4D55CC] mb-4" />
            <h3 className="font-bold text-gray-900 mb-2">FAQ</h3>
            <p className="text-gray-600 text-sm mb-4">Find answers to common questions</p>
            <button className="text-[#4D55CC] font-semibold">View FAQ</button>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">How do I book an artist?</h3>
              <p className="text-gray-600 text-sm">
                Browse artists on the home page, select an artist, choose a slot, and complete the booking process.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">How do I cancel a booking?</h3>
              <p className="text-gray-600 text-sm">
                Go to your Orders page, select the booking you want to cancel, and follow the cancellation process.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">What payment methods are accepted?</h3>
              <p className="text-gray-600 text-sm">
                We accept all major credit/debit cards, UPI, and net banking through Razorpay.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

