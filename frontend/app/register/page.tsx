"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function RegisterPage() {
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        fullname: "",
        email: "",
        phoneNumber: "", // Added phoneNumber as it's usually required for register
        password: "",
        role: "student",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError("");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await fetch("http://localhost:5000/api/v1/user/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Registration failed");
            }

            toast.success("Account created successfully!");
            router.push("/login");

        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : "Something went wrong";
            setError(errorMessage);
            toast.error(errorMessage || "Registration failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center bg-gray-900 bg-cover bg-center relative"
            style={{
                backgroundImage: "url('https://webstrot.com/html/tabula/job/images/loginback.jpg')",
            }}
        >
            <div className="absolute inset-0 bg-black/50"></div>

            <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden p-8 m-4">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-extrabold text-gray-900">Create Account</h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Full Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input
                            type="text"
                            name="fullname"
                            required
                            value={formData.fullname}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition"
                            placeholder="John Doe"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition"
                            placeholder="you@example.com"
                        />
                    </div>

                    {/* Phone Number */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                        <input
                            type="tel"
                            name="phoneNumber"
                            required
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition"
                            placeholder="+1234567890"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition"
                                placeholder="••••••••"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    {/* Role Selection */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">I am a</label>
                        <div className="grid grid-cols-2 gap-4">
                            <label
                                className={`flex items-center justify-center p-3 border rounded-lg cursor-pointer transition ${formData.role === 'student'
                                    ? 'border-pink-500 bg-pink-50 text-pink-500'
                                    : 'border-gray-200 hover:bg-gray-50'
                                    }`}
                            >
                                <input
                                    type="radio"
                                    name="role"
                                    value="student"
                                    checked={formData.role === 'student'}
                                    onChange={handleChange}
                                    className="sr-only"
                                />
                                <span className="font-semibold">Student</span>
                            </label>

                            <label
                                className={`flex items-center justify-center p-3 border rounded-lg cursor-pointer transition ${formData.role === 'recruiter'
                                    ? 'border-pink-500 bg-pink-50 text-pink-500'
                                    : 'border-gray-200 hover:bg-gray-50'
                                    }`}
                            >
                                <input
                                    type="radio"
                                    name="role"
                                    value="recruiter"
                                    checked={formData.role === 'recruiter'}
                                    onChange={handleChange}
                                    className="sr-only"
                                />
                                <span className="font-semibold">Recruiter</span>
                            </label>
                        </div>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg text-center">
                            {error}
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-pink-500 hover:bg-pink-700 text-white font-bold py-3.5 rounded-lg transition duration-300 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    >
                        {loading ? <Loader2 className="animate-spin w-5 h-5" /> : "Register"}
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-gray-600 text-sm">
                        Already have an account?{' '}
                        <Link href="/login" className="text-pink-500 font-bold hover:underline">
                            Login here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
