"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import TextType from "./TextType";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function HeroSection() {
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    location: "",
    category: "",
    experience: "",
  });

  const locations = [
    "Hyderabad",
    "Bangalore",
    "Chennai",
    "Pune",
    "Mumbai",
    "Delhi",
    "Noida",
    "Gurgaon",
    "Remote",
  ];

  const categories = [
    "Full-Time", "Part-Time", "Internship", "Remote"
  ];

  const experienceLevels = [
  { label: "Fresher", value: "0" },
  { label: "0-1 Years", value: "1" },
  { label: "1-3 Years", value: "3" },
  { label: "3-5 Years", value: "5" },
  { label: "5+ Years", value: "10" },
];

  
  const handleSearch = () => {
    const query = new URLSearchParams(form).toString();
    router.push(`/jobs?${query}`);
  };

  return (
    <section className="relative bg-blue-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mt-20 grid lg:grid-cols-2 gap-16 items-center">

        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-gray-900">
           <TextType
              text={[
                "The Easy Way To Get",
                "Your Dream Job",
                "Your New Career",
              ]}
              typingSpeed={60}
              deletingSpeed={40}
              pauseDuration={1500}
              variableSpeed={false}
              onSentenceComplete={() => {}}
              loop
            />
          </h1>

          <p className="mt-6 text-gray-600 max-w-xl">
            Discover verified jobs from top employers. Apply faster, smarter,
            and with confidence using HireMee.
          </p>

          <div className="mt-10 bg-white shadow-xl rounded-4xl p-6 grid sm:grid-cols-2 gap-4">

            <Input
              placeholder="Job title or keyword"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />

            {/* Location Dropdown */}
            <select
              className="w-full border rounded-md px-3 py-2 text-sm bg-white"
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
            >
              <option value="">Select Location</option>
              {locations.map((loc) => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>

            {/* Category Dropdown */}
            <select
              className="w-full border rounded-md px-3 py-2 text-sm bg-white"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>

            {/* Experience Dropdown */}
            <select
              className="w-full border rounded-md px-3 py-2 text-sm bg-white"
              value={form.experience}
              onChange={(e) => setForm({ ...form, experience: e.target.value })}
            >
              <option value="">Experience Level</option>
              {experienceLevels.map((exp) => (
                <option key={exp.value} value={exp.value}>{exp.label}</option>
              ))}
            </select>

            <Button
              onClick={handleSearch}
              className="sm:col-span-2 bg-pink-500 hover:bg-pink-600 h-12"
            >
              Search Jobs
            </Button>
          </div>
        </div>

        <div className="hidden lg:flex justify-center">
          <Image
            src="https://webstrot.com/html/tabula/job/images/index2/slider-img.png"
            alt="Job Portal Illustration"
            width={480}
            height={480}
            priority
          />
        </div>
      </div>
    </section>
  );
}
