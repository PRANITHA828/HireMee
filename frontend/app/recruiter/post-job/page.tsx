"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Loader from "@/components/loader";

interface Company {
  _id: string;
  name: string;
}

export default function PostJobPage() {
  const router = useRouter();

  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [posting, setPosting] = useState(false);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "Full-time",
    experience: "",
    positions: "",
    companyId: "",
  });

  // 🔹 Load only recruiter's companies
  useEffect(() => {
    const loadCompanies = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/company/get`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (!res.ok) {
          router.replace("/unknown");
          return;
        }

        const data = await res.json();
        setCompanies(data.companies || []);
      } catch {
        setMessage("Failed to load companies");
      } finally {
        setLoading(false);
      }
    };

    loadCompanies();
  }, [router]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setPosting(true);
    setMessage("");

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/job/post`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: form.title,
            description: form.description,
            requirements: form.requirements
              .split("\n")
              .filter(Boolean),
            salary: Number(form.salary),
            location: form.location,
            jobType: form.jobType,
            experience: Number(form.experience),
            positions: Number(form.positions),
            companyId: form.companyId,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Failed to post job");
        return;
      }

      setMessage("Job posted successfully!");

      setTimeout(() => {
        router.push(`/company/${form.companyId}`);
      }, 800);

    } catch {
      setMessage("Network error");
    } finally {
      setPosting(false);
    }
  };

  if (loading)
              return (
                <>
                  <Header />
                  <div className="min-h-screen bg-white grid place-items-center text-lg">
                    <Loader />
                  </div>
                  <Footer />
                </>
              );

  return (
    <>
      <Header />

      <main className="min-h-screen mt-20 bg-white px-4 py-12">
        <div className="max-w-4xl mx-auto bg-white border rounded-2xl shadow-xl p-8 space-y-6">

          <h1 className="text-3xl font-bold text-gray-900 text-center">
            Post a Job
          </h1>

          

          {!loading && (
            <>
              {/* COMPANY DROPDOWN */}
              <div>
                <label className="font-semibold text-gray-700">
                  Select Company
                </label>
                <select
                  name="companyId"
                  value={form.companyId}
                  onChange={handleChange}
                  className="w-full border rounded-xl px-4 py-2 mt-1 focus:ring-2 focus:ring-pink-500"
                >
                  <option value="">Choose company</option>
                  {companies.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* TITLE */}
              <input
                name="title"
                placeholder="Job Title"
                value={form.title}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-2"
              />

              {/* DESCRIPTION */}
              <textarea
                name="description"
                placeholder="Job Description"
                value={form.description}
                onChange={handleChange}
                rows={4}
                className="w-full border rounded-xl px-4 py-2 resize-none"
              />

              {/* REQUIREMENTS */}
              <textarea
                name="requirements"
                placeholder="Requirements (one per line)"
                value={form.requirements}
                onChange={handleChange}
                rows={4}
                className="w-full border rounded-xl px-4 py-2 resize-none"
              />

              {/* GRID */}
              <div className="grid sm:grid-cols-2 gap-4">
                <input
                  name="salary"
                  type="number"
                  placeholder="Salary"
                  value={form.salary}
                  onChange={handleChange}
                  className="border rounded-xl px-4 py-2"
                />

                <input
                  name="location"
                  placeholder="Location"
                  value={form.location}
                  onChange={handleChange}
                  className="border rounded-xl px-4 py-2"
                />

                <select
                  name="jobType"
                  value={form.jobType}
                  onChange={handleChange}
                  className="border rounded-xl px-4 py-2"
                >
                  <option>Full-time</option>
                  <option>Part-time</option>
                  <option>Internship</option>
                  <option>Remote</option>
                </select>

                <input
                  name="experience"
                  type="number"
                  placeholder="Experience (years)"
                  value={form.experience}
                  onChange={handleChange}
                  className="border rounded-xl px-4 py-2"
                />

                <input
                  name="positions"
                  type="number"
                  placeholder="Open Positions"
                  value={form.positions}
                  onChange={handleChange}
                  className="border rounded-xl px-4 py-2"
                />
              </div>

              {/* ACTION */}
              <button
                onClick={handleSubmit}
                disabled={posting}
                className="w-full rounded-full bg-pink-600 text-white py-3 font-bold
                  hover:bg-gray-900 transition disabled:opacity-50"
              >
                {posting ? "Posting..." : "Post Job"}
              </button>

              {message && (
                <p className="text-center text-pink-600 font-medium">
                  {message}
                </p>
              )}
            </>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
