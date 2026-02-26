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

  // Load user from localStorage
  useEffect(() => {
  const storedUser = localStorage.getItem("user");

  setTimeout(() => {
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setUserRole(parsed.role);
    }

    setLoading(false);
  }, 0);
}, []);

  // Restrict access
  if (!loading && userRole !== "recruiter") {
    return (
      <div className="h-screen flex items-center justify-center text-red-600 font-bold text-xl">
        ❌ Access Denied — Only Recruiters Can Register a Company
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("Submitting...");

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/company/register`,
        {
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
        }
      );

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
      console.error(error);
      setMessage("⚠️ Something went wrong!");
    }
  };

  return (
    <>
      <Header />

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 via-white to-pink-200 px-4 py-10">
        <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-8 md:p-10 border border-pink-100">
          <h1 className="text-3xl md:text-4xl font-extrabold text-center text-pink-600 mb-8">
            Register Your Company
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Company Name */}
            <input
              type="text"
              placeholder="Company Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full border rounded-xl px-4 py-3"
            />

            {/* Email */}
            <input
              type="email"
              placeholder="Company Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border rounded-xl px-4 py-3"
            />

            {/* Website */}
            <input
              type="text"
              placeholder="Website"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              className="w-full border rounded-xl px-4 py-3"
            />

            {/* Location */}
            <input
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full border rounded-xl px-4 py-3"
            />

            {/* Description */}
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border rounded-xl px-4 py-3 h-28"
            />

            {/* Logo */}
            <input
              type="text"
              placeholder="Logo URL"
              value={logo}
              onChange={(e) => setLogo(e.target.value)}
              className="w-full border rounded-xl px-4 py-3"
            />

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-pink-500 to-blue-500 text-white py-3 rounded-xl font-semibold"
            >
              Register Company
            </button>

            {message && (
              <p className="text-center mt-4 font-medium">{message}</p>
            )}
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
}