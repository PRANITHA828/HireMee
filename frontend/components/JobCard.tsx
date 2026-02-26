"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Briefcase, MapPin, IndianRupee, TrendingUp } from "lucide-react";

interface Company {
  name: string;
  logo: string;
}

interface Job {
  _id: string;
  title: string;
  description: string;
  salary: number;
  location: string;
  jobType: string;
  experience: number;
  company: Company;
}

interface JobCardProps {
  job: Job;
}

export default function JobCard({ job }: JobCardProps) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/job/${job._id}`)}
      className="group bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 cursor-pointer transition-all hover:shadow-xl hover:border-pink-400"
    >
      <div className="flex flex-col sm:flex-row gap-5 items-start">

        {/* LEFT LOGO */}
        <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-xl flex items-center justify-center border border-pink-200 shrink-0">
          <Image
            src={job.company.logo}
            alt={job.company.name}
            width={80}
            height={80}
            className="object-contain"
          />
        </div>

        {/* JOB INFO */}
        <div className="flex-1">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
            {job.title}
          </h3>

          <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
            <MapPin className="w-5 h-5 text-pink-500" />
            <span className="font-medium">{job.company.name}</span>
            <span className="text-gray-400">•</span>
            <span>{job.location}</span>
          </div>

          <p className="mt-3 text-sm sm:text-base text-gray-700 line-clamp-2">
            {job.description}
          </p>

          <div className="flex flex-wrap gap-5 mt-4 text-sm text-gray-700">
            <div className="flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-pink-500" />
              <span>{job.jobType}</span>
            </div>

            <div className="flex items-center gap-2">
              <IndianRupee className="w-5 h-5 text-pink-500" />
              <span className="font-medium">₹{job.salary}</span>
            </div>

            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-pink-500" />
              <span>{job.experience} yrs</span>
            </div>
          </div>

          <button className="mt-6 inline-flex items-center justify-center rounded-lg bg-pink-500 px-6 py-2.5 text-sm font-semibold text-white hover:bg-pink-600 transition shadow">
            View Details →
          </button>
        </div>
      </div>
    </div>
  );
}
