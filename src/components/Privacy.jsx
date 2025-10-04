import React from "react";
import { useNavigate } from "react-router-dom"; // if using react-router

const Privacy = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <div className="max-w-5xl mx-auto p-6 md:p-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-10 text-center text-purple-400">
          Privacy Policy
        </h1>

        <div className="bg-gray-900 rounded-3xl p-8 md:p-12 shadow-xl space-y-8 border border-gray-700">
          <p className="text-gray-300">
            At <strong>Gigzi</strong>, we value your privacy and are committed
            to protecting your personal information. This Privacy Policy outlines
            how we collect, use, and safeguard your data.
          </p>

          <section>
            <h2 className="text-2xl font-semibold text-purple-300 mb-2">
              1. Information We Collect
            </h2>
            <ul className="list-disc list-inside space-y-1 text-gray-300">
              <li>Name and Email address for login and account purposes.</li>
              <li>Payment information for transactions.</li>
              <li>Usage data for improving the app experience.</li>
              <li>
                Aadhaar images for identity verification of artists (securely stored and used only for verification purposes).
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-purple-300 mb-2">
              2. How We Use Your Data
            </h2>
            <ul className="list-disc list-inside space-y-1 text-gray-300">
              <li>To provide and maintain our services.</li>
              <li>To process transactions and send confirmations.</li>
              <li>To enhance and improve app features and user experience.</li>
              <li>To verify identity of artists using Aadhaar information.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-purple-300 mb-2">
              3. Data Sharing
            </h2>
            <p className="text-gray-300">
              We do not sell your personal data. We may share it with trusted
              service providers under strict confidentiality agreements to help
              operate our platform. Aadhaar images are never shared with any third party.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-purple-300 mb-2">
              4. Your Rights
            </h2>
            <p className="text-gray-300">
              You can request deletion of your account or personal data anytime,
              including Aadhaar images, by contacting us at <strong>gigziibuisness@gmail.com</strong>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-purple-300 mb-2">
              5. Contact Us
            </h2>
            <p className="text-gray-300">
              For questions regarding this Privacy Policy or data deletion requests,
              please reach out to us at <strong>gigziibuisness@gmail.com</strong>.
            </p>
          </section>

          <p className="text-gray-500 text-sm text-center mt-6">
            Last updated: 04 Oct 2025
          </p>

          <div className="flex justify-center mt-6">
            <button
              onClick={() => navigate("/")}
              className="bg-purple-400 text-black px-6 py-3 rounded-full font-semibold hover:bg-purple-300 transition"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
