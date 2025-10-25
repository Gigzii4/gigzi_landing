import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Gigzi Internship Page - Single-file React component
// Tailwind CSS is used for styling (assumes Tailwind is configured in the project)
// This page includes: announcement, application form, paid-training option, T&C modal, and contact info.

export default function InternshipPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("Full Stack");
  const [portfolio, setPortfolio] = useState("");
  const [experience, setExperience] = useState("");
  const [agreement, setAgreement] = useState(false);
  const [mode, setMode] = useState("skilled"); 
  const [showTnC, setShowTnC] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(null);

  // Basic form validation
  const canSubmit = () => {
    if (!name.trim() || !email.trim()) return false;
    if (!agreement) return false;
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canSubmit()) return;

    setSubmitting(true);

    
    try {
      const payload = {
        name,
        email,
        phone,
        role,
        portfolio,
        experience,
        selectedMode: mode,
        appliedAt: new Date().toISOString(),
      };

      await new Promise((r) => setTimeout(r, 900));

      setSuccess(true);
      setName("");
      setEmail("");
      setPhone("");
      setPortfolio("");
      setExperience("");
      setAgreement(false);
    } catch (err) {
      setSuccess(false);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <header className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-purple-400">Join Gigzi — Internship & Training</h1>
          <p className="mt-4 text-gray-300 max-w-2xl mx-auto">
            We're hiring interns for Gigzi (registered under Government of Maharashtra). If you're skilled and can contribute to production code, the internship is free. If you're still learning, join our 2-month training + internship program for <strong>₹2,500</strong> and get mentorship, certificate, and LOR.
          </p>
        </header>

        <main className="bg-gray-900 rounded-3xl p-8 md:p-12 shadow-xl border border-gray-700">
          <section className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-semibold text-purple-300 mb-4">Program Snapshot</h2>

              <ul className="space-y-3 text-gray-300 list-disc list-inside">
                <li><strong>Domains:</strong> Full Stack, UI/UX, Marketing, Operations</li>
                <li><strong>Mode:</strong> Remote (flexible)</li>
                <li><strong>Duration:</strong> 2 months (training) — internship duration based on role</li>
                <li><strong>Fee:</strong> ₹2,500 for the training track (mentorship, projects, certificate & LOR). Skilled candidates join free.</li>
                <li><strong>Outcome:</strong> Completion certificate, LOR, and opportunity for paid internship based on performance.</li>
                <li><strong>Registration:</strong> Gigzi is registered under Government of Maharashtra.</li>
              </ul>

              <div className="mt-6 p-4 bg-gray-800 rounded-lg border border-gray-700">
                <h3 className="font-semibold text-purple-200">Legal & Refund Highlights</h3>
                <p className="text-gray-300 mt-2 text-sm">
                  Fee is for training services, certificate, and LOR. We provide an invoice/receipt. Refunds allowed within <strong>7 days of enrollment</strong> (full refund) if training hasn't started; after onboarding, fees may be non-refundable — please read full T&amp;C.
                </p>

                <button
                  onClick={() => setShowTnC(true)}
                  className="mt-4 inline-block bg-purple-400 text-black px-4 py-2 rounded-full font-medium hover:bg-purple-300 transition"
                >
                  View Full Terms &amp; Conditions
                </button>
              </div>

              <div className="mt-6">
                <h3 className="font-semibold text-purple-200">Contact</h3>
                <p className="text-gray-300 mt-2">For queries or bulk hiring: <strong>gigziibuisness@gmail.com</strong></p>
              </div>

              <div className="mt-6 flex gap-3">
                <button onClick={() => navigate('/privacy')} className="px-4 py-2 rounded-full bg-transparent border border-purple-600 text-purple-300">Privacy Policy</button>
                <a href="#apply" className="px-4 py-2 rounded-full bg-purple-400 text-black font-semibold">Apply Now</a>
              </div>
            </div>

            {/* Right column - Form */}
            <div>
              <div className="bg-black p-6 rounded-2xl border border-gray-800">
                <form id="apply" onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-300 mb-1">Full name</label>
                    <input value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2" placeholder="Your full name" />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-300 mb-1">Email</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2" placeholder="you@domain.com" />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm text-gray-300 mb-1">Phone (optional)</label>
                      <input value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2" placeholder="+91 98xxxx..." />
                    </div>

                    <div>
                      <label className="block text-sm text-gray-300 mb-1">Role</label>
                      <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2">
                        <option>Full Stack</option>
                        <option>UI/UX</option>
                        <option>Marketing</option>
                        <option>Operations</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-300 mb-1">Portfolio / GitHub (optional)</label>
                    <input value={portfolio} onChange={(e) => setPortfolio(e.target.value)} className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2" placeholder="Link to projects or profile" />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-300 mb-1">Brief experience / why you should be selected</label>
                    <textarea value={experience} onChange={(e) => setExperience(e.target.value)} className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 h-24" placeholder="Tell us in 1–3 sentences" />
                  </div>

                  <div className="flex items-center gap-3">
                    <label className="inline-flex items-center">
                      <input type="radio" checked={mode === 'skilled'} onChange={() => setMode('skilled')} className="form-radio" />
                      <span className="ml-2 text-gray-300">I'm skilled — join free (evaluation will be done)</span>
                    </label>
                  </div>

                  <div className="flex items-center gap-3">
                    <label className="inline-flex items-center">
                      <input type="radio" checked={mode === 'training'} onChange={() => setMode('training')} className="form-radio" />
                      <span className="ml-2 text-gray-300">I want the 2-month training program (₹2,500)</span>
                    </label>
                  </div>

                  {mode === 'training' && (
                    <div className="p-3 bg-gray-800 rounded-lg border border-gray-700 text-gray-300 text-sm">
                      <p><strong>Training details:</strong> 8–12 mentorship hours / month, hands-on projects, performance reviews. Payment collected after form submission via secure link (replace with your payment gateway).</p>
                    </div>
                  )}

                  <div className="mt-2">
                    <label className="inline-flex items-start gap-2 text-gray-300">
                      <input type="checkbox" checked={agreement} onChange={(e) => setAgreement(e.target.checked)} />
                      <div className="text-sm">
                        <span>I accept the <button type="button" onClick={() => setShowTnC(true)} className="underline">Terms & Conditions</button> and the refund policy.</span>
                      </div>
                    </label>
                  </div>

                  <div>
                    <button disabled={!canSubmit() || submitting} className="w-full bg-purple-400 text-black px-4 py-2 rounded-full font-semibold hover:bg-purple-300 transition disabled:opacity-60">
                      {submitting ? 'Submitting...' : 'Submit Application'}
                    </button>
                  </div>

                  {success === true && <p className="text-green-400">Application submitted successfully — we'll email you next steps.</p>}
                  {success === false && <p className="text-red-400">Something went wrong. Try again later.</p>}
                </form>

                <div className="mt-6 text-xs text-gray-500">
                  <p>By applying you agree Gigzi may contact you and that you have read our privacy policy.</p>
                </div>
              </div>
            </div>
          </section>

          {/* T&C modal */}
          {showTnC && (
            <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
              <div className="absolute inset-0 bg-black/70" onClick={() => setShowTnC(false)} />
              <div className="relative max-w-3xl w-full bg-gray-900 rounded-2xl p-6 border border-gray-700">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-semibold text-purple-300">Terms & Conditions — Training + Internship (Gigzi)</h3>
                  <button onClick={() => setShowTnC(false)} className="text-gray-400">Close</button>
                </div>

                <div className="mt-4 text-gray-300 space-y-3 text-sm max-h-72 overflow-y-auto">
                  <p>
                    <strong>Program:</strong> Gigzi offers two tracks: (a) <em>Skilled</em> — candidates who can directly contribute to production work (no training fee), and (b) <em>Training</em> — a 2-month paid training program charged at ₹2,500. Training includes mentorship, hands-on projects, periodic reviews, and a completion certificate + LOR.
                  </p>

                  <p>
                    <strong>Fee and Payment:</strong> Fee is a one-time charge for the training services. An invoice/receipt will be issued under Gigzi. Payment will be collected through a secure payment gateway. If Gigzi's annual turnover exceeds applicable GST thresholds, GST may apply to the fee.
                  </p>

                  <p>
                    <strong>Refund policy:</strong> Full refund available within 7 days of enrollment if the training program has not started. After onboarding or after the 7-day window, fees may be non-refundable. Refunds (if any) will be processed to the original payment method.
                  </p>

                  <p>
                    <strong>No guaranteed employment:</strong> Completion of the training does not guarantee a job. Based on performance, participants may be offered paid internships or other roles — subject to availability and evaluation.
                  </p>

                  <p>
                    <strong>Apprenticeship compliance:</strong> This training program is not an Apprenticeship under the Apprentices Act, 1961. If Gigzi appoints trainees as Apprentices later, separate terms and statutory obligations will apply.
                  </p>

                  <p>
                    <strong>Data & privacy:</strong> Personal data (Including any identity documents) will be processed in accordance with our Privacy Policy. Candidates can request deletion of personal data by contacting <strong>gigziibuisness@gmail.com</strong>.
                  </p>

                  <p>
                    <strong>Dispute resolution:</strong> Any dispute will be governed by the laws of India, and parties agree to seek resolution through good-faith discussion before pursuing legal action.
                  </p>

                  <p>
                    <strong>Contact:</strong> For questions, email <strong>gigziibuisness@gmail.com</strong>.
                  </p>
                </div>

                <div className="mt-4 flex justify-end gap-3">
                  <button onClick={() => setShowTnC(false)} className="px-4 py-2 rounded-full bg-gray-800 border border-gray-700">Close</button>
                </div>
              </div>
            </div>
          )}

          <footer className="mt-10 text-center text-gray-500 text-sm">
            <p>Gigzi — Registered under Government of Maharashtra. For legal & billing queries: gigziibuisness@gmail.com</p>
            <p className="mt-2">© {new Date().getFullYear()} Gigzi. All rights reserved.</p>
          </footer>
        </main>
      </div>
    </div>
  );
}
