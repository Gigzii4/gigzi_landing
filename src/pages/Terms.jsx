import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function Terms() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-[#021d5c] via-[#06328c] to-[#4D55CC] text-white pb-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <Link to="/account" className="inline-flex items-center text-white/80 hover:text-white mb-6">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </Link>
          <h1 className="text-3xl font-bold mb-2">Terms & Conditions</h1>
          <p className="text-white/80">Please read our terms carefully</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl p-8 shadow-sm space-y-6">
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">1. Acceptance of Terms</h2>
            <p className="text-gray-600">
              By accessing and using Gigzi, you accept and agree to be bound by the terms and provision of this agreement.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">2. Use License</h2>
            <p className="text-gray-600 mb-2">
              Permission is granted to temporarily use Gigzi for personal, non-commercial transitory viewing only.
            </p>
            <p className="text-gray-600">
              This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose</li>
              <li>Attempt to decompile or reverse engineer any software</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">3. Booking Terms</h2>
            <p className="text-gray-600">
              All bookings are subject to artist availability. Cancellation policies apply as per the artist's terms.
              Refunds are processed according to our refund policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">4. User Responsibilities</h2>
            <p className="text-gray-600">
              Users are responsible for providing accurate information and maintaining the security of their account.
              Any fraudulent activity will result in immediate account termination.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">5. Limitation of Liability</h2>
            <p className="text-gray-600">
              Gigzi shall not be liable for any indirect, incidental, special, consequential, or punitive damages
              resulting from your use of the platform.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">6. Changes to Terms</h2>
            <p className="text-gray-600">
              Gigzi reserves the right to revise these terms at any time. By continuing to use the platform,
              you agree to be bound by the revised terms.
            </p>
          </section>

          <div className="pt-6 border-t border-gray-200">
            <p className="text-gray-500 text-sm">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

