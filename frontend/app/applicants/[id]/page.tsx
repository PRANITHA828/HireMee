"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Header from "@/components/header";
import Footer from "@/components/footer";

interface Applicant {
  _id: string;
  fullname: string;
  email: string;
  phoneNumber: number;
}

interface Application {
  _id: string;
  applicant: Applicant;
  status: "pending" | "accepted" | "rejected";
}

interface Job {
  title: string;
  location: string;
  jobType: string;
  applications: Application[];
}

export default function JobApplicantsPage() {
  // ✅ MUST match folder name: [id]
  const { id } = useParams<{ id: string }>();

  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const loadApplicants = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/application/${id}/applicants`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        const data = await res.json();

        if (res.ok) {
          setJob(data.job);
        }
      } catch (err) {
        console.error("Failed to load applicants");
      } finally {
        setLoading(false);
      }
    };

    loadApplicants();
  }, [id]);

  const updateStatus = async (
    applicationId: string,
    status: "accepted" | "rejected"
  ) => {
    setUpdatingId(applicationId);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/application/status/${applicationId}/update`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status }),
        }
      );

      if (res.ok && job) {
        setJob({
          ...job,
          applications: job.applications.map((app) =>
            app._id === applicationId ? { ...app, status } : app
          ),
        });
      }
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <>
      <Header />

      <main className="min-h-screen mt-20 bg-gray-50 px-4 py-12">
        <div className="max-w-5xl mx-auto space-y-8">

          {/* LOADING */}
          {loading && (
            <p className="text-center text-gray-500">
              Loading applicants…
            </p>
          )}

          {/* JOB INFO */}
          {!loading && job && (
            <div className="bg-white border rounded-2xl p-6 shadow">
              <h1 className="text-2xl font-bold text-gray-900">
                {job.title}
              </h1>
              <p className="text-gray-500 mt-1">
                {job.location} • {job.jobType}
              </p>
              <p className="mt-2 text-sm text-pink-600 font-semibold">
                Total Applicants: {job.applications.length}
              </p>
            </div>
          )}

          {/* NO APPLICANTS */}
          {!loading && job && job.applications.length === 0 && (
            <p className="text-center text-gray-500">
              No applicants yet.
            </p>
          )}

          {/* APPLICANTS LIST */}
          {!loading && job && job.applications.length > 0 && (
            <div className="space-y-4">
              {job.applications.map((app) => (
                <div
                  key={app._id}
                  className="bg-white border rounded-xl p-6
                  flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
                >
                  {/* INFO */}
                  <div>
                    <h2 className="font-semibold text-gray-900">
                      {app.applicant.fullname}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {app.applicant.email}
                    </p>
                    <p className="text-sm text-gray-500">
                      📞 {app.applicant.phoneNumber}
                    </p>

                    <span
                      className={`mt-2 inline-block px-3 py-1 rounded-full text-xs font-semibold
                        ${
                          app.status === "accepted"
                            ? "bg-green-100 text-green-700"
                            : app.status === "rejected"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                    >
                      {app.status}
                    </span>
                  </div>

                  {/* ACTIONS */}
                  <div className="flex gap-3">
                    <button
                      disabled={
                        app.status === "accepted" ||
                        updatingId === app._id
                      }
                      onClick={() =>
                        updateStatus(app._id, "accepted")
                      }
                      className="rounded-full border-2 border-green-600
                      text-green-600 px-5 py-2 text-sm font-semibold
                      hover:bg-green-600 hover:text-white transition
                      disabled:opacity-50"
                    >
                      Accept
                    </button>

                    <button
                      disabled={
                        app.status === "rejected" ||
                        updatingId === app._id
                      }
                      onClick={() =>
                        updateStatus(app._id, "rejected")
                      }
                      className="rounded-full border-2 border-red-600
                      text-red-600 px-5 py-2 text-sm font-semibold
                      hover:bg-red-600 hover:text-white transition
                      disabled:opacity-50"
                    >
                      Reject
                    </button>
                  </div>
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
