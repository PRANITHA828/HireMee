"use client";

import { useEffect, useState, useRef } from "react";
import { Rocket, MapPin, UserCheck, Users, LucideIcon } from "lucide-react";

type Stat = {
  label: string;
  value: number;
  icon: LucideIcon;
};

const stats: Stat[] = [
  { label: "Projects", value: 2500, icon: Rocket },
  { label: "Companies", value: 1200, icon: MapPin },
  { label: "Profiles", value: 1500, icon: UserCheck },
  { label: "Users", value: 1950, icon: Users },
];

export default function StatsSection() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [startCount, setStartCount] = useState(false);

  const [counts, setCounts] = useState<number[]>(
    stats.map(() => 1), // start from 1
  );

  //  Detect when section comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setStartCount(true);
          observer.disconnect(); // run only once
        }
      },
      { threshold: 0.3 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  //  Start counting ONLY when visible
  useEffect(() => {
    if (!startCount) return;

    const interval = setInterval(() => {
      setCounts((prev) =>
        prev.map((val, idx) => {
          const target = stats[idx].value;

          if (val < target) {
            return val + Math.ceil(target / 55); // adjust speed here
          } else {
            return target;
          }
        }),
      );
    }, 30);

    return () => clearInterval(interval);
  }, [startCount]);

  return (
    <section ref={sectionRef} className="bg-gray-50 py-20">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <p className="text-pink-500 font-semibold uppercase tracking-wider">
          MILLIONS OF JOBS
        </p>

        <h2 className="text-3xl md:text-4xl font-bold mt-2 text-gray-800">
          Find the one that’s Right for you
        </h2>

        <div className="w-16 h-1 bg-pink-500 mx-auto mt-4 mb-16 rounded-full"></div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, idx) => {
            const Icon = stat.icon; //  FIX HERE

            return (
              <div
                key={idx}
                className="bg-white border border-gray-200 p-8 flex items-center gap-4 hover:shadow-lg transition"
              >
                <div className="text-pink-500">
                  <Icon size={40} />
                </div>

                <div className="text-left">
                  <h3 className="text-3xl font-bold text-gray-900">
                    {counts[idx].toLocaleString()}
                  </h3>
                  <p className="text-gray-500">{stat.label}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
