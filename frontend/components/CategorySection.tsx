"use client";

import {
  Briefcase,
  Code,
  Database,
  Globe,
  Layers,
  Layout,
  Server,
  Smartphone,
} from "lucide-react";

const categories = [
  { name: "Web Development", icon: Globe, count: "1.2k+ Jobs" },
  { name: "Mobile App", icon: Smartphone, count: "500+ Jobs" },
  { name: "Software Testing", icon: Layers, count: "200+ Jobs" },
  { name: "Data Science", icon: Database, count: "150+ Jobs" },
  { name: "UI/UX Design", icon: Layout, count: "300+ Jobs" },
  { name: "Backend Dev", icon: Server, count: "800+ Jobs" },
  { name: "Frontend Dev", icon: Code, count: "900+ Jobs" },
  { name: "Management", icon: Briefcase, count: "400+ Jobs" },
];

export default function CategorySection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        
        {/* Heading */}
        <div className="text-center mb-12">
          <p className="text-[#fa2295] font-bold uppercase tracking-wider mb-2">
            Browser Categories
          </p>
          <h2 className="text-4xl font-extrabold text-gray-900">
            Popular Categories
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              className="group bg-white p-6 rounded-xl border border-gray-100 cursor-pointer 
              transform transition-all duration-300 ease-in-out
              hover:scale-105 hover:shadow-2xl hover:border-[#fa2295]"
            >
              {/* Icon */}
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 
                bg-gray-100 transition duration-300
                group-hover:bg-[#fa2295]"
              >
                <cat.icon
                  className="w-8 h-8 text-[#fa2295] transition duration-300
                  group-hover:text-white"
                />
              </div>

              {/* Title */}
              <h3
                className="text-lg font-bold text-gray-800 text-center transition
                group-hover:text-[#fa2295]"
              >
                {cat.name}
              </h3>

              {/* Count */}
              <p className="text-gray-500 text-sm text-center mt-1">
                {cat.count}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}