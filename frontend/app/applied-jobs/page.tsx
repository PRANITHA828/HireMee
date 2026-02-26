"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";

interface Company {
  _id: string;
  name: string;
  logo: string;
}

interface Job {
  _id: string;
  title: string;
  salary: number;
  location: string;
  jobType: string;
  experience: number;
  company: Company;
}

interface Application {
  _id: string;
  job: Job;
  status: "pending" | "accepted" | "rejected";
}

export default function Page() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/application/get`, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      setApplications(data.application || []);
      setLoading(false);
    };

    fetchApplications();
  }, []);

  if (loading)
    return (
      <>
        <Header />
        <div className="min-h-screen grid place-items-center text-lg">
          Loading applied jobs...
        </div>
        <Footer />
      </>
    );

  return (
    <>
      <Header />

      <main className="min-h-screen mt-20 s-mt-20 bg-gray-50 py-10 px-4">
        <div className="max-w-6xl mx-auto space-y-6">

         

          {applications.length === 0 ? (
            <p className="text-gray-500">You have not applied for any jobs yet.</p>
          ) : (
            <div className="grid gap-5">
              {applications.map((app) => (
                <Link
                  href={`/job/${app.job._id}`}
                  key={app._id}
                  className="bg-white rounded-xl shadow-md p-5 flex flex-col sm:flex-row sm:items-center gap-4 hover:shadow-lg transition"
                >
                  {/* Company Logo */}
                  <div className="w-16 h-16 relative rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                    <Image
                      src={app.job.company.logo}
                      alt={app.job.company.name}
                      fill
                      className="object-contain"
                    />
                  </div>

                  {/* Job Info */}
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold text-gray-800">
                      {app.job.title}
                    </h2>
                    <p className="text-gray-600">
                      {app.job.company.name} • {app.job.location}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-2 text-sm">
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
                        {app.job.jobType}
                      </span>
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full">
                        ₹ {app.job.salary}
                      </span>
                      <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full">
                        {app.job.experience} yrs exp
                      </span>
                    </div>
                  </div>

                  {/* Status */}
                  <div
                    className={`px-4 py-2 rounded-full text-sm font-semibold capitalize
                      ${
                        app.status === "accepted"
                          ? "bg-green-100 text-green-700"
                          : app.status === "rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                  >
                    {app.status}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
