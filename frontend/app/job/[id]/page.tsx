"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Header from "@/components/header";
import Footer from "@/components/footer";

interface Job {
  _id: string;
  title: string;
  description: string;
  requirements: string[];
  salary: number;
  location: string;
  jobType: string;
  experience: number;
  positions: number;
  company: string;
  applications: string[];
  createdAt: string;
}

interface AppliedJob {
  _id: string;
}

interface ApplicationItem {
  _id: string;
  job: AppliedJob;
  status: "pending" | "accepted" | "rejected";
}


export default function JobDetailsPage() {
  const params = useParams();
  const id = params?.id as string;

  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [hasApplied, setHasApplied] = useState(false);
  const [applying, setApplying] = useState(false);
  const [applyMessage, setApplyMessage] = useState("");

  /* ---------------- FETCH JOB ---------------- */
 useEffect(() => {
  if (!id) return;

  const loadData = async () => {
    try {
      // 1️⃣ Fetch job
      const jobRes = await fetch(
        `http://localhost:5000/api/v1/job/get/${id}`,
        { credentials: "include" }
      );
      const jobData = await jobRes.json();
      if (!jobRes.ok) throw new Error(jobData.message);

      const safeJob: Job = {
        ...jobData.job,
        requirements: Array.isArray(jobData.job.requirements)
          ? jobData.job.requirements
          : [],
        applications: Array.isArray(jobData.job.applications)
          ? jobData.job.applications
          : [],
      };

      setJob(safeJob);

      // 2️⃣ Fetch applied jobs
      const appliedRes = await fetch(
        "http://localhost:5000/api/v1/application/get",
        { credentials: "include" }
      );
      const appliedData = await appliedRes.json();

      if (appliedRes.ok) {
        const appliedJobIds = appliedData.application.map(
          (app:ApplicationItem) => app.job._id
        );

        setHasApplied(appliedJobIds.includes(safeJob._id));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  loadData();
}, [id]);


  /* ---------------- APPLY JOB ---------------- */
  const handleApply = async () => {
    if (!job || applying) return;

    setApplying(true);
    setApplyMessage("");

    try {
      const res = await fetch(
        `http://localhost:5000/api/v1/application/apply/${job._id}`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to apply");

      setHasApplied(true);
      setApplyMessage("Application submitted successfully!");

      setJob((prev) =>
        prev
          ? { ...prev, applications: [...prev.applications, "self"] }
          : prev
      );
    } catch (err) {
      setApplyMessage(
        err instanceof Error ? err.message : "Something went wrong"
      );
    } finally {
      setApplying(false);
    }
  };

  /* ---------------- UI ---------------- */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg">
        Loading job details…
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        {error}
      </div>
    );
  }

  if (!job) return null;

  return (
    <>
      <Header />

      <main className="min-h-screen bg-gray-50 py-20 px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-8 space-y-6">

          <div>
            <h1 className="text-3xl font-bold text-gray-800">{job.title}</h1>
            <p className="text-gray-600 mt-1">{job.location}</p>
          </div>

          <div className="flex flex-wrap gap-3 text-sm">
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
              {job.jobType}
            </span>
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
              ₹ {job.salary} / month
            </span>
            <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full">
              {job.experience} yrs
            </span>
            <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full">
              {job.positions} openings
            </span>
          </div>

          {/* APPLY BUTTON */}
          {hasApplied ? (
            <button
              disabled
              className="px-8 py-3 bg-green-600 text-white rounded-lg font-semibold cursor-not-allowed"
            >
              Applied ✓
            </button>
          ) : (
            <button
              onClick={handleApply}
              disabled={applying}
              className={`px-8 py-3 rounded-lg font-semibold transition
              ${
                applying
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              {applying ? "Applying…" : "Apply Now"}
            </button>
          )}

          {applyMessage && (
            <p className="text-sm font-medium text-blue-600">
              {applyMessage}
            </p>
          )}

          <div>
            <h2 className="text-xl font-semibold mb-2">Job Description</h2>
            <p className="text-gray-700">{job.description}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Requirements</h2>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              {job.requirements.length ? (
                job.requirements.map((req, i) => <li key={i}>{req}</li>)
              ) : (
                <li className="italic text-gray-400">
                  No requirements listed
                </li>
              )}
            </ul>
          </div>

          <div className="flex justify-between text-sm text-gray-500 pt-4 border-t">
            <span>
              Posted on {new Date(job.createdAt).toLocaleDateString()}
            </span>
            <span>Applicants: {job.applications.length}</span>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
