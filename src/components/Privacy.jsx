import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <div className="max-w-5xl mx-auto p-6 md:p-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-10 text-center text-purple-400">
          Privacy Policy
        </h1>

        <div className="bg-gray-900 rounded-3xl p-8 md:p-12 shadow-xl space-y-8 border border-gray-700">

          <p className="text-gray-300">
            <strong>Gigzi</strong> respects your privacy and is committed to
            protecting your personal information. This Privacy Policy explains
            how we collect, use, and protect data when you use our app.
          </p>

          <section>
            <h2 className="text-2xl font-semibold text-purple-300 mb-2">
              1. Information We Collect
            </h2>
            <ul className="list-disc list-inside space-y-1 text-gray-300">
              <li>Name and email address for account creation and login.</li>
              <li>Basic app usage data to improve performance and features.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-purple-300 mb-2">
              2. Information We Do NOT Collect
            </h2>
            <p className="text-gray-300">
              Gigzi does <strong>not</strong> collect or store sensitive personal
              data such as Aadhaar number, PAN, biometric data, or government-issued
              identity documents.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-purple-300 mb-2">
              3. How We Use Your Information
            </h2>
            <ul className="list-disc list-inside space-y-1 text-gray-300">
              <li>To provide and maintain app functionality.</li>
              <li>To improve user experience and app reliability.</li>
              <li>To communicate important updates when required.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-purple-300 mb-2">
              4. Data Sharing
            </h2>
            <p className="text-gray-300">
              Gigzi does not sell or rent user data. Information is shared only
              when necessary to operate core app features or comply with legal
              requirements.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-purple-300 mb-2">
              5. User Rights
            </h2>
            <p className="text-gray-300">
              You may request access, correction, or deletion of your account or
              personal data by contacting us.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-purple-300 mb-2">
              6. Contact Us
            </h2>
            <p className="text-gray-300">
              For any privacy-related questions, please contact us at:
              <br />
              <strong>official@gigzi.in</strong>
            </p>
          </section>

          <p className="text-gray-500 text-sm text-center mt-6">
            Last updated: 8 January 2026
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
