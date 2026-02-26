"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const Homepage = () => {
  const router = useRouter();
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6">
      <h1 className="text-3xl font-bold">Homepage</h1>

      {user ? (
        <button
          onClick={() => {
            logout();
            router.replace("/login");
          }}
          className="px-6 py-3 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition"
        >
          Logout
        </button>
      ) : (
        <button
          onClick={() => router.push("/login")}
          className="px-6 py-3 bg-pink-500 text-white rounded-lg font-semibold hover:bg-pink-600 transition"
        >
          Login
        </button>
      )}
    </div>
  );
};

export default Homepage;
