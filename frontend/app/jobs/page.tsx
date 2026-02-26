"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import JobCard from "@/components/JobCard";
import Header from "@/components/header";
import Footer from "@/components/footer";

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

export default function JobsPage() {
  const searchParams = useSearchParams();

  const initialSearch = searchParams.get("title") ?? "";
  const initialLocation = searchParams.get("location");

  const [search, setSearch] = useState(initialSearch);
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 4;

  const [filters, setFilters] = useState({
    titles: [] as string[],
    locations: initialLocation ? [initialLocation] : ([] as string[]),
    jobTypes: [] as string[],
    salary: [0, 150000],
    experience: [0, 15],
  });

  const [jobs, setJobs] = useState<Job[]>([]);

  const jobTitles = [
    "Frontend Developer","Backend Developer","Full Stack Developer","MERN Developer",
    "React Developer","Node.js Developer","Software Engineer","AI Engineer",
    "ML Engineer","Data Scientist","UI/UX Designer","DevOps Engineer",
    "Python Developer","Cyber Security Analyst",
  ];

  const jobTypes = ["Full-Time","Part-Time","Internship","Remote"];

  const locations = [
    "Hyderabad","Bangalore","Chennai","Pune","Mumbai",
    "Delhi","Noida","Vizag","Gurgaon","Remote",
  ];

  useEffect(() => {
    const fetchJobs = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/job/get`, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      setJobs(data.jobs || []);
    };
    fetchJobs();
  }, []);

  const toggleFilter = (key: "titles" | "locations" | "jobTypes", value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter((v) => v !== value)
        : [...prev[key], value],
    }));
    setCurrentPage(1);
  };

  const normalize = (value: string) =>
  value.toLowerCase().replace(/\s+/g, "").trim();


  const filteredJobs = useMemo(() => {
  return jobs.filter((job) => {
    const jobTitle = normalize(job.title);
    const jobLocation = normalize(job.location);
    const jobType = normalize(job.jobType);

    const matchesTitle =
      filters.titles.length === 0 ||
      filters.titles.some((t) => normalize(t) === jobTitle);

    const matchesLocation =
      filters.locations.length === 0 ||
      filters.locations.some((l) => jobLocation.includes(normalize(l)));

    const matchesType =
      filters.jobTypes.length === 0 ||
      filters.jobTypes.some((t) => normalize(t) === jobType);

    const matchesSearch = jobTitle.includes(normalize(search));

    return (
      matchesSearch &&
      matchesTitle &&
      matchesLocation &&
      matchesType &&
      job.salary >= filters.salary[0] &&
      job.salary <= filters.salary[1] &&
      job.experience >= filters.experience[0] &&
      job.experience <= filters.experience[1]
    );
  });
}, [jobs, search, filters]);


  const resetFilters = () => {
    setSearch("");
    setFilters({
      titles: [],
      locations: [],
      jobTypes: [],
      salary: [0, 150000],
      experience: [0, 15],
    });
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
  const startIndex = (currentPage - 1) * jobsPerPage;
  const paginatedJobs = filteredJobs.slice(startIndex, startIndex + jobsPerPage);

  return (
    <>
      <Header />

      <main className="min-h-screen mt-2 md:mt-10 lg:mt-20 bg-gray-50 p-4 lg:p-8">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6">

          {/* LEFT SIDEBAR */}
          <aside className="w-full lg:w-80 bg-white border rounded-xl p-5 space-y-6 h-fit">

            <input
              type="text"
              placeholder="Search jobs..."
              className="w-full border rounded-md px-3 py-2 text-sm"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
            />

            <div>
              <h3 className="font-semibold mb-2">Job Title</h3>
              <div className="max-h-60 overflow-y-auto space-y-1 pr-1">
                {jobTitles.map((title) => (
                  <label key={title} className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={filters.titles.includes(title)}
                      onChange={() => toggleFilter("titles", title)}
                    />
                    {title}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Location</h3>
              {locations.map((loc) => (
                <label key={loc} className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={filters.locations.includes(loc)}
                    onChange={() => toggleFilter("locations", loc)}
                  />
                  {loc}
                </label>
              ))}
            </div>

            <div>
              <h3 className="font-semibold mb-2">Job Type</h3>
              <div className="max-h-40 overflow-y-auto space-y-1 pr-1">
                {jobTypes.map((type) => (
                  <label key={type} className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={filters.jobTypes.includes(type)}
                      onChange={() => toggleFilter("jobTypes", type)}
                    />
                    {type}
                  </label>
                ))}
              </div>
            </div>

            {/* Salary */}
            <div>
              <h3 className="font-semibold mb-2">
                Salary: ₹{filters.salary[0]} – ₹{filters.salary[1]}
              </h3>
              <input
                type="range"
                min={0}
                max={150000}
                step={5000}
                value={filters.salary[1]}
                onChange={(e) => {
                  setFilters({ ...filters, salary: [0, Number(e.target.value)] });
                  setCurrentPage(1);
                }}
                className="w-full accent-blue-600"
              />
            </div>

            {/* Experience */}
            <div>
              <h3 className="font-semibold mb-2">
                Experience: {filters.experience[0]} – {filters.experience[1]} yrs
              </h3>
              <input
                type="range"
                min={0}
                max={15}
                value={filters.experience[1]}
                onChange={(e) => {
                  setFilters({ ...filters, experience: [0, Number(e.target.value)] });
                  setCurrentPage(1);
                }}
                className="w-full accent-blue-600"
              />
            </div>

            <button
              onClick={resetFilters}
              className="w-full border py-2 rounded-md text-sm hover:bg-gray-100"
            >
              Reset Filters
            </button>
          </aside>

          {/* JOB LIST */}
          <section className="flex-1 space-y-4">
            {paginatedJobs.length === 0
              ? <p className="text-center text-gray-500">No jobs found</p>
              : paginatedJobs.map((job) => <JobCard key={job._id} job={job} />)
            }
          </section>
        </div>

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-8">
            <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}
              className="px-3 py-1 border rounded disabled:opacity-40">Prev</button>

            {Array.from({ length: totalPages }).map((_, i) => (
              <button key={i} onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 border rounded ${currentPage === i + 1 ? "bg-blue-600 text-white" : ""}`}>
                {i + 1}
              </button>
            ))}

            <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)}
              className="px-3 py-1 border rounded disabled:opacity-40">Next</button>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}
