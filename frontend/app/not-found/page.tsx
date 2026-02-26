"use client";

import { useRouter } from "next/navigation";

export default function NotFoundPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-100 to-blue-100 px-6">
      
      {/* Illustration */}
      <img
        src="https://cdn-icons-png.flaticon.com/512/2748/2748558.png"
        alt="Not Found"
        className="w-64 h-64 object-contain mb-6 drop-shadow-lg"
      />

      {/* Title */}
      <h1 className="text-5xl md:text-6xl font-extrabold text-indigo-700 mb-3 text-center">
        404
      </h1>

      {/* Message */}
      <p className="text-gray-700 text-lg md:text-xl font-medium text-center max-w-xl">
        Oops! The page youre looking for doesnt exist or has been moved.
      </p>

      {/* Button */}
      <button
        onClick={() => router.push("/homee")}
        className="mt-6 px-6 py-3 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-lg transition active:scale-95"
      >
        ⬅ Go Back Home
      </button>
    </div>
  );
}
