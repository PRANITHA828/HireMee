"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
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

interface Job {
  _id: string;
  title: string;
  location: string;
  salary: number;
  experience: number;
  jobType: string;
  positions: number;
  company: string;
  createdAt: string;
  description: string;
}

export default function CompanyDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [company, setCompany] = useState<Company | null>(null);
  const [companyJobs, setCompanyJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!id) return;

    const loadData = async () => {
      try {
        const companyRes = await fetch(
          `http://localhost:5000/api/v1/company/get/${id}`,
          { credentials: "include" }
        );

        const companyData = await companyRes.json();
        if (!companyRes.ok) throw new Error(companyData.message);

        const jobsRes = await fetch(
          "http://localhost:5000/api/v1/job/getadminjobs",
          { credentials: "include" }
        );

        const jobsData = await jobsRes.json();

        const filteredJobs: Job[] = jobsData.jobs.filter(
          (job: Job) => job.company === id
        );

        setCompany(companyData.company);
        setCompanyJobs(filteredJobs);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Loading…
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        {error}
      </div>
    );

  if (!company) return null;

  return (
    <>
      <Header />

      <main className="min-h-screen mt-16 py-12 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto space-y-12">

          {/* COMPANY + ABOUT BOX */}
          <div className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <img
                src={company.logo}
                alt={company.name}
                className="w-24 h-24 object-contain border rounded-xl"
              />

              <div className="flex-1 text-center sm:text-left">
                <h1 className="text-3xl font-bold text-gray-900">
                  {company.name}
                </h1>
                <p className="text-gray-600 mt-1">{company.location}</p>

                <div className="mt-3 inline-block bg-pink-100 text-pink-700 px-4 py-1 rounded-full text-sm font-semibold">
                  Jobs Posted: {companyJobs.length}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={company.website}
                  target="_blank"
                  className="bg-pink-500 hover:bg-pink-700 text-white px-5 py-2 rounded-lg font-semibold text-sm text-center"
                >
                  Visit Website
                </a>

                <button
                  onClick={() => router.push(`/updatecompany/${company._id}`)}
                  className="border border-pink-500 text-pink-600 hover:bg-pink-50 px-5 py-2 rounded-lg font-semibold text-sm"
                >
                  Update Company
                </button>
              </div>
            </div>

            <div className="border-t pt-5">
              <h2 className="text-xl font-semibold mb-2">About Company</h2>
              <p className="text-gray-700 leading-relaxed">
                {company.description}
              </p>
            </div>
          </div>

          {/* OPEN POSITIONS */}
          <div className="space-y-5">
            <h2 className="text-xl font-semibold">Open Positions</h2>

            {companyJobs.length === 0 ? (
              <p className="text-gray-500">No jobs posted yet.</p>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {companyJobs.map((job) => (
                  <div
                    key={job._id}
                    className="bg-white rounded-xl shadow-md p-7 space-y-5 hover:shadow-lg transition"
                  >
                   
                      <h3 className="text-xl font-semibold text-gray-900">
                        {job.title}
                      </h3>
                       <div className="flex gap-4">
                      <p className="text-gray-500 text-sm mt-1">
                        {job.location}
                      </p>
                       <span className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-sm font-semibold">
                        {job.jobType}
                      </span>

                    </div>

                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                      {job.description}
                    </p>

                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="font-semibold text-gray-900">
                          ₹ {job.salary}
                        </p>
                        <p className="text-gray-500">Monthly Salary</p>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="font-semibold text-gray-900">
                          {job.experience} yrs
                        </p>
                        <p className="text-gray-500">Experience</p>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="font-semibold text-gray-900">
                          {job.positions}
                        </p>
                        <p className="text-gray-500">Openings</p>
                      </div>

                     
                    </div>

                    
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}
