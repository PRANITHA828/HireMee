"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Header from "@/components/header";
import Footer from "@/components/footer";

interface Company {
  _id: string;
  name: string;
  description: string;
  website: string;
  location: string;
  logo: string;
}

export default function Page() {
  const router = useRouter();
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCompanies = async () => {
      const res = await fetch("http://localhost:5000/api/v1/company/get", {
        method: "GET",
        credentials: "include",
      });

      // 🚫 If not recruiter → redirect
      if (!res.ok) {
        router.replace("/unknown");
        return;
      }

      const data = await res.json();
      setCompanies(data.companies || []);
      setLoading(false);
    };

    loadCompanies();
  }, [router]);

  if (loading)
    return (
      <>
        <Header />
        <div className="min-h-screen grid place-items-center text-lg">
          Loading companies...
        </div>
        <Footer />
      </>
    );

  return (
    <>
      <Header />

      <main className="min-h-screen mt-20 bg-linear-to-b py-12 px-4">
  <div className="max-w-7xl mx-auto">

    

    {/* Companies Grid */}
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
      {companies.map((company) => (
        <div
          key={company._id}
                onClick={() => router.push(`/company/${company._id}`)}
          className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 flex flex-col"
        >
          {/* Logo */}
          <div className="flex items-center justify-center h-24 mb-5">
             <div className="relative w-36 h-20">
                    <Image
                      src={company.logo}
                      alt={company.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 200px"
                      className="object-contain transition-transform duration-300 group-hover:scale-125"
                      priority
                    />
                  </div>
          </div>

          {/* Content */}
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-gray-900 group-hover:text-pink-600 transition">
              {company.name}
            </h2>

            <p className="text-gray-600 text-sm mt-3 leading-relaxed line-clamp-3">
              {company.description}
            </p>

            <div className="mt-4 text-sm text-gray-500 flex items-center gap-2">
              <span>📍</span>
              <span>{company.location}</span>
            </div>
          </div>

        
<div className="mt-6 flex gap-3">
  {/* View Company */}
  <button
    onClick={(e) => {
      e.stopPropagation();
      router.push(`/company/${company._id}`);
    }}
    className="flex-1 rounded-full border-2 border-pink-500 text-pink-600 font-semibold py-2 text-sm
      transition-all duration-300
      hover:bg-pink-500 hover:text-white hover:border-pink-500"
  >
    View Company
  </button>

  {/* Visit Website */}
  <a
    href={company.website}
    target="_blank"
    onClick={(e) => e.stopPropagation()}
    className="flex-1 text-center rounded-full bg-pink-500 text-white font-semibold py-2 text-sm
      transition-all duration-300
      hover:bg-transparent hover:text-pink-600 hover:border-2 hover:border-pink-500"
  >
    Visit Website
  </a>
</div>


        </div>
      ))}
    </div>
  </div>
</main>


      <Footer />
    </>
  );
}
