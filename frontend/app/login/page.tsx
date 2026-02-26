"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "student",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "http://localhost:5000/api/v1/user/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include", // ✅ IMPORTANT
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // ✅ Save user in context
      login(data.user);

      toast.success("Login Successful");

      // ✅ ROLE-BASED REDIRECT (ONLY ONE PLACE)
      if (data.user.role === "recruiter") {
        router.replace("/companies");
      } else {
        router.replace("/homee");
      }
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Something went wrong";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gray-900 bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://webstrot.com/html/tabula/job/images/loginback.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden p-8 m-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Welcome Back
          </h2>
          <p className="text-gray-500 mt-2">
            Login to your account to continue
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 outline-none"
              placeholder="you@gmail.com"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 outline-none"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              I am a
            </label>
            <div className="grid grid-cols-2 gap-4">
              {["student", "recruiter"].map((role) => (
                <label
                  key={role}
                  className={`p-3 border rounded-lg text-center cursor-pointer font-semibold transition ${
                    formData.role === role
                      ? "border-pink-500 bg-pink-100 text-pink-600"
                      : "border-gray-200"
                  }`}
                >
                  <input
                    type="radio"
                    name="role"
                    value={role}
                    checked={formData.role === role}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  {role.charAt(0).toUpperCase() + role.slice(1)}
                </label>
              ))}
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg text-center">
              {error}
            </div>
          )}

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 rounded-lg flex justify-center"
          >
            {loading ? (
              <Loader2 className="animate-spin w-5 h-5" />
            ) : (
              "Login"
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-600 text-sm">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="text-pink-500 font-bold hover:underline"
            >
              Register Now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
