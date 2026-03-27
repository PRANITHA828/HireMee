"use client";

import { useState, useRef, useEffect } from "react";

type Option = {
  label: string;
  value: string;
};

type Props = {
  options: Option[];
  value: string;
  onChange: (val: string) => void;
  placeholder: string;
};

export default function CustomSelect({
  options,
  value,
  onChange,
  placeholder,
}: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  // close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedLabel =
    options.find((opt) => opt.value === value)?.label || "";

  return (
    <div ref={ref} className="relative w-full">
      
      {/* BOX */}
      <div
        onClick={() => setOpen(!open)}
        className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-white cursor-pointer 
        flex justify-between items-center
        transition-all duration-300
        hover:border-pink-400 focus-within:ring-2 focus-within:ring-pink-400"
      >
        <span className={value ? "text-gray-800" : "text-gray-400"}>
          {selectedLabel || placeholder}
        </span>

        <span
          className={`text-pink-400 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        >
          ▼
        </span>
      </div>

      {/* DROPDOWN */}
      {open && (
        <div className="absolute z-50 mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden animate-fadeIn">
          {options.map((opt) => (
            <div
              key={opt.value}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              className={`px-4 py-3 text-sm cursor-pointer transition
              hover:bg-pink-100 hover:text-pink-600
              ${
                value === opt.value
                  ? "bg-pink-50 text-pink-600 font-medium"
                  : "text-gray-700"
              }`}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}