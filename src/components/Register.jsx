import React, { useState, useEffect } from "react";
import { MultiSelect } from "react-multi-select-component";
import axios from "axios";

export default function ArtistSignupWeb() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [events, setEvents] = useState([]);
  const [frontFile, setFrontFile] = useState(null);
  const [backFile, setBackFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const cities = [
    { label: "Mumbai", value: "Mumbai" },
    { label: "Pune", value: "Pune" },
    { label: "Delhi", value: "Delhi" },
    { label: "Bangalore", value: "Bangalore" },
  ];

  const BASE_URL = "https://gigzi-gigzi.vercel.app";

  const getMethod = async (path) => {
    try {
      const url = `${BASE_URL.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
      const res = await axios.get(url);
      return res.data;
    } catch (err) {
      console.error("GET Error:", err.response?.data || err.message);
      return { status: false };
    }
  };

  const postMethod = async (path, data) => {
    try {
      const url = `${BASE_URL.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
      const res = await axios.post(url, data);
      return res.data;
    } catch (err) {
      console.error("POST Error:", err.response?.data || err.message);
      return { status: false, error: err.response?.data || "Something went wrong" };
    }
  };

  useEffect(() => {
    const fetchEvents = async () => {
      const res = await getMethod("/admin/eventCat/getEventCategories");
      if (res.status) setEvents(res.data || []|| );
    };
    fetchEvents();
  }, []);

  const uploadImage = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "ARTIST_DOCS");
    data.append("cloud_name", "dkonh16z8");

    const res = await fetch("https://api.cloudinary.com/v1_1/dkonh16z8/image/upload", {
      method: "POST",
      body: data,
    });

    const json = await res.json();
    return json.secure_url;
  };

  const handleSignup = async () => {
    if (!frontFile || !backFile) {
      alert("Please upload both Aadhaar images");
      return;
    }
    if (!name || !email || !mobile || !address || !selectedCity) {
      alert("Please fill in all fields");
      return;
    }

    setUploading(true);
    const frontUrl = await uploadImage(frontFile);
    const backUrl = await uploadImage(backFile);

    const res = await postMethod("/v3/auth/artistSignup", {
      name,
      email,
      phone: mobile,
      address,
      adharfront: frontUrl,
      adharback: backUrl,
      eventcategories: selectedItems.map((e) => e.value),
      city: selectedCity,
    });

    setUploading(false);

    if (res.status) alert("Registered successfully! Gigzi will verify you.");
    else alert(res.error || "Signup failed");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-500 p-8 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white">Artist Signup</h1>
          <p className="mt-2 text-purple-100 text-lg md:text-xl">
            Join Gigzi and showcase your talent to the world!
          </p>
        </div>

        {/* Form */}
        <div className="p-8 space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
            />
            <input
              type="text"
              placeholder="Mobile"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
            />
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
            >
              <option value="">Select City</option>
              {cities.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          {/* Address */}
          <textarea
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 resize-none transition"
            rows={3}
          />

          {/* Aadhaar Upload Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[{ label: "Aadhaar Front", setter: setFrontFile, file: frontFile },
              { label: "Aadhaar Back", setter: setBackFile, file: backFile }].map((item, idx) => (
              <div
                key={idx}
                className="border-2 border-dashed border-pink-400 rounded-2xl p-4 flex flex-col items-center justify-center hover:border-pink-600 transition duration-300 bg-pink-50/30"
              >
                <label className="text-gray-700 font-semibold mb-3 text-center">
                  Upload {item.label}
                </label>

                {item.file ? (
                  <div className="relative w-full">
                    <img
                      src={URL.createObjectURL(item.file)}
                      alt={item.label}
                      className="w-full h-48 object-cover rounded-xl shadow-md"
                    />
                    <button
                      type="button"
                      onClick={() => item.setter(null)}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full px-2 py-1 text-xs shadow-md hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full h-48 cursor-pointer border border-gray-300 rounded-xl bg-white hover:bg-pink-100 transition">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-10 w-10 text-pink-500 mb-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    <span className="text-sm text-gray-600 font-medium">
                      Click to upload {item.label}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => item.setter(e.target.files[0])}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            ))}
          </div>

          {/* Event Categories */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Event Categories</label>
            <div className="relative">
              <MultiSelect
                options={events.map((e) => ({ label: e.name, value: e._id }))}
                value={selectedItems}
                onChange={setSelectedItems}
                labelledBy="Pick Events"
                overrideStrings={{
                  selectSomeItems: "Select event categories...",
                  allItemsAreSelected: "All categories selected",
                }}
                // Custom styles to open dropdown upward
                className="multi-select-up"
              />
            </div>
          </div>

          
          <button
            onClick={handleSignup}
            disabled={uploading}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:scale-105 transform transition duration-300 flex items-center justify-center"
          >
            {uploading ? (
              <>
                <svg
                  className="animate-spin h-6 w-6 mr-3 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
                Uploading...
              </>
            ) : (
              "Sign Up"
            )}
          </button>
        </div>
      </div>

  
      <style>{`
        .multi-select-up .dropdown-content {
          bottom: 100% !important;
          top: auto !important;
          margin-bottom: 8px !important;
        }
      `}</style>
    </div>
  );
}
