"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function RegisterCompanyPage() {
  const router = useRouter();

  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  // Form Fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [logo, setLogo] = useState("");

  // Load user from localStorage & validate recruiter
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setUserRole(parsed.role);
    }
    setLoading(false);
  }, []);

  // Restrict access to recruiters only
  if (!loading && userRole !== "recruiter") {
    return (
      <div className="h-screen flex items-center justify-center text-red-600 font-bold text-xl">
        ❌ Access Denied — Only Recruiters Can Register a Company
      </div>
    );
  }

  // Submit handler
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setMessage("Submitting...");

    try {
      const res = await fetch("http://localhost:5000/api/v1/company/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          name,
          email,
          website,
          location,
          description,
          logo,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(`❌ ${data.message || "Registration failed"}`);
        return;
      }

      setMessage("✅ Company registered successfully!");

      setTimeout(() => {
        router.push("/companies");
      }, 1500);
    } catch (error) {
      console.log("Error:", error);
      setMessage("⚠️ Something went wrong!");
    }
  };

 "use client";

export default function RegisterCompanyUI() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 via-white to-pink-200 px-4 py-10">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-8 md:p-10 border border-pink-100">
        <h1 className="text-3xl md:text-4xl font-extrabold text-center text-pink-600 mb-8 drop-shadow-sm">
          Register Your Company
        </h1>

        <form className="space-y-6">
          {/* Company Name */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Company Name
            </label>
            <input
              type="text"
              className="w-full border border-blue-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-pink-400 outline-none transition-all"
              placeholder="Enter company name"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Company Email
            </label>
            <input
              type="email"
              className="w-full border border-blue-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-pink-400 outline-none transition-all"
              placeholder="Enter email"
            />
          </div>

          {/* Website */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Website
            </label>
            <input
              type="text"
              className="w-full border border-blue-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-pink-400 outline-none transition-all"
              placeholder="https://example.com"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Location
            </label>
            <input
              type="text"
              className="w-full border border-blue-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-pink-400 outline-none transition-all"
              placeholder="City, Country"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Description
            </label>
            <textarea
              className="w-full border border-blue-200 rounded-xl px-4 py-3 h-28 resize-none focus:ring-2 focus:ring-pink-400 outline-none transition-all"
              placeholder="Describe your company"
            ></textarea>
          </div>

          {/* Logo URL */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Logo URL
            </label>
            <input
              type="text"
              className="w-full border border-blue-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-pink-400 outline-none transition-all"
              placeholder="https://logo-link.com/logo.png"
            />
          </div>

          {/* Submit Button */}
          <button
            type="button"
            className="w-full bg-gradient-to-r from-pink-500 to-blue-500 text-white py-3 rounded-xl font-semibold shadow-lg hover:opacity-90 transition-all"
          >
            Register Company
          </button>
        </form>
      </div>
    </div>
  );
}

}
