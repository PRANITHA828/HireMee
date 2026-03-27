"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserPlus,
  faMagnifyingGlass,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";

export default function HowItWorks() {
  const steps = [
    {
      id: 1,
      title: "Register an Account",
      desc: "Post a job tell us about your project. We’ll quick match you the right freelancers.",
      color: "bg-blue-400",
      icon: faUserPlus,
    },
    {
      id: 2,
      title: "Specify & Search Your Job",
      desc: "Browse profile, reviews and proposals then interview top candidates.",
      color: "bg-pink-500",
      icon: faMagnifyingGlass,
    },
    {
      id: 3,
      title: "Apply & Get Hired",
      desc: "Use the platform to chat, share files, and collaborate easily.",
      color: "bg-cyan-400",
      icon: faPaperPlane,
    },
  ];

  return (
    <section className="bg-gray-50 py-20 relative">
      <div className="max-w-6xl mx-auto px-6 text-center">

        {/* Heading */}
        <p className="text-pink-500 font-semibold uppercase tracking-wider">
          HOW IT WORK
        </p>

        <h2 className="text-3xl md:text-4xl font-bold mt-2 text-gray-800">
          Find Job, Employment
        </h2>

        <div className="w-16 h-1 bg-pink-500 mx-auto mt-4 mb-16 rounded-full"></div>

        {/* 🔥 CURVED LINE (FIXED) */}
        <div className="hidden md:block absolute left-0 right-0 top-40z-0">
          <svg viewBox="0 0 1000 200" className="w-full h-40">
            <path
              d="M 100 100 C 300 0, 700 200, 900 100"
              fill="none"
              stroke="#d1d5db"
              strokeWidth="2"
              strokeDasharray="6 6"
            />
          </svg>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-12 relative z-10">
          {steps.map((step) => (
            <div key={step.id} className="flex flex-col items-center text-center">
              
              {/* Circle */}
              <div
                className={`relative ${step.color} w-32 h-32 rounded-full flex items-center justify-center text-white text-3xl shadow-lg`}
              >
                <FontAwesomeIcon icon={step.icon} />

                {/* Number badge */}
                <span className="absolute -top-2 -left-2 bg-white text-gray-800 text-sm font-bold w-8 h-8 flex items-center justify-center rounded-full shadow">
                  {step.id}
                </span>
              </div>

              {/* Title */}
              <h3 className="mt-6 text-lg font-semibold text-gray-800">
                {step.title}
              </h3>

              {/* Description */}
              <p className="mt-3 text-gray-500 text-sm max-w-xs">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}