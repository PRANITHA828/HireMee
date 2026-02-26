"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

import Header from "@/components/header";
import HeroSection from "@/components/herosection";
import CategorySection from "@/components/CategorySection";
import Footer from "@/components/footer";

export default function HomePage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  // 🔒 Client-side safety (back button protection)
  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  // ⏳ Avoid UI flash while checking auth
  if (loading || !user) return null;

  return (
    <div>
      <Header />
      <HeroSection />
      <CategorySection />
      <Footer />
    </div>
  );
}
