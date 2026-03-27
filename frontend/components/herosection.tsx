"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import TextType from "./TextType";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CustomSelect from "./CustomSelect";

type FormState = {
  title: string;
  location: string;
  category: string;
  experience: string;
};

export default function HeroSection() {
  const router = useRouter();

  // ✅ FIX: proper ref typing
  const titleRef = useRef<HTMLInputElement | null>(null);

  const [active, setActive] = useState<boolean>(false);

  const [form, setForm] = useState<FormState>({
    title: "",
    location: "",
    category: "",
    experience: "",
  });

  const locations: string[] = [
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

  const categories: string[] = [
    "Full-Time",
    "Part-Time",
    "Internship",
    "Remote",
  ];

  const experienceLevels = [
    { label: "Fresher", value: "0" },
    { label: "0-1 Years", value: "1" },
    { label: "1-3 Years", value: "3" },
    { label: "3-5 Years", value: "5" },
    { label: "5+ Years", value: "10" },
  ];

  const handleSearch = (): void => {
    const query = new URLSearchParams(form).toString();
    router.push(`/jobs?${query}`);
  };

  // ✅ FIX: proper event type
  const handleBoxClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    const target = e.target as HTMLElement;

    if (
      target.tagName === "INPUT" ||
      target.tagName === "SELECT" ||
      target.tagName === "BUTTON"
    ) {
      return;
    }

    setActive(true);
    titleRef.current?.focus();
  };

  return (
    <section className="relative"> 
      <div className="max-w-7xl mx-auto px-6 mt-20 grid lg:grid-cols-2 gap-16 items-center">
        {/* LEFT */}
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
              loop
              onSentenceComplete={() => {}}
            />
          </h1>

          <p className="mt-6 text-gray-600 max-w-xl">
            Discover verified jobs from top employers. Apply faster, smarter,
            and with confidence using HireMee.
          </p>

          {/* SEARCH BOX */}
          <div
            onClick={handleBoxClick}
            className={`mt-10 bg-white shadow-xl rounded-3xl p-6 grid grid-cols-1 sm:grid-cols-2 gap-4 transition-all duration-300 
            hover:shadow-2xl ${active ? "scale-[1.02]" : ""}`}
          >
            {/* TITLE */}
            <Input
              ref={titleRef}
              placeholder="Job title or keyword"
              value={form.title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setForm({ ...form, title: e.target.value })
              }
            />

            {/* LOCATION */}
            <CustomSelect
              options={locations.map((loc) => ({
                label: loc,
                value: loc,
              }))}
              value={form.location}
              onChange={(val) => setForm({ ...form, location: val })}
              placeholder="Select Location"
            />

            {/* CATEGORY */}
            <CustomSelect
              options={categories.map((cat) => ({
                label: cat,
                value: cat,
              }))}
              value={form.category}
              onChange={(val) => setForm({ ...form, category: val })}
              placeholder="Select Category"
            />

            {/* EXPERIENCE */}
            <CustomSelect
              options={experienceLevels.map((exp) => ({
                label: exp.label,
                value: exp.value,
              }))}
              value={form.experience}
              onChange={(val) => setForm({ ...form, experience: val })}
              placeholder="Experience Level"
            />

            {/* BUTTON */}
            <Button
              type="button"
              onClick={handleSearch}
              className="col-span-1 sm:col-span-2 bg-pink-500 hover:bg-pink-600 h-12 w-full"
            >
              Search Jobs
            </Button>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="hidden lg:flex justify-center p-10 hover:transform hover:scale-105 ">
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
