"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/header";
import Footer from "@/components/footer";

interface Job {
  _id: string;
  title: string;
  location: string;
  jobType: string;
  salary: number;
  experience: number;
  positions: number;
  applications: string[];
}

export default function AdminJobsPage() {
  const router = useRouter();

  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadJobs = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/job/getadminjobs`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        const data = await res.json();

        if (!res.ok) {
          setError(data.message || "Failed to load jobs");
          return;
        }

        setJobs(data.jobs || []);
      } catch {
        setError("Network error");
      } finally {
        setLoading(false);
      }
    };

    loadJobs();
  }, []);

  return (
    <>
      <Header />

      <main className="min-h-screen mt-20 bg-gray-50 px-4 py-12">
        <div className="max-w-7xl mx-auto space-y-8">

          {/* HEADER */}
          
          {/* STATES */}
          {loading && (
            <p className="text-center text-gray-500">
              Loading jobs…
            </p>
          )}

          {!loading && error && (
            <p className="text-center text-red-500">
              {error}
            </p>
          )}

          {!loading && jobs.length === 0 && (
            <p className="text-center text-gray-500">
              No jobs posted yet.
            </p>
          )}

          {/* JOB LIST */}
          {!loading && jobs.length > 0 && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobs.map((job) => (
                <div
                  key={job._id}
                  className="bg-white border rounded-2xl p-6 space-y-4
                  hover:shadow-lg transition"
                >
                  {/* TITLE */}
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                      {job.title}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {job.location}
                    </p>
                  </div>

                  {/* INFO */}
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="bg-pink-100 text-pink-600 px-3 py-1 rounded-full">
                      {job.jobType}
                    </span>
                    <span className="bg-blue-100 text-blue-500 px-3 py-1 rounded-full">
                      ₹{job.salary}/mo
                    </span>
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
                      {job.experience} yrs
                    </span>
                    <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full">
                      {job.positions} openings
                    </span>
                  </div>

                  {/* APPLICATION COUNT */}
                  <div className="text-sm font-medium text-gray-700">
                    Applications:{" "}
                    <span className="text-pink-600 font-bold">
                      {job.applications.length}
                    </span>
                  </div>

                  {/* ACTION */}
                  <button
                    onClick={() =>
                      router.push(`/applicants/${job._id}`)
                    }
                    className="w-full rounded-full border-2 border-pink-600
                    text-pink-600 font-semibold py-2 text-sm
                    transition-all duration-300
                    hover:bg-pink-600 hover:text-white"
                  > 
                    View Applicants
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
