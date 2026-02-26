"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Header from "@/components/header";
import Footer from "@/components/footer";

interface Company {
  name: string;
  description: string;
  website: string;
  location: string;
  logo: string;
}

type Field = keyof Company;

export default function UpdateCompanyPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [company, setCompany] = useState<Company | null>(null);
  const [edited, setEdited] = useState<Company>({
    name: "",
    description: "",
    website: "",
    location: "",
    logo: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [editingLogo, setEditingLogo] = useState(false);

  useEffect(() => {
    const loadCompany = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/v1/company/get/${id}`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        const data = await res.json();

        if (!res.ok) {
          setMessage(data.message || "Failed to load company");
          return;
        }

        setCompany(data.company);
        setEdited(data.company);
      } catch (err) {
        setMessage("Network error");
      } finally {
        setLoading(false);
      }
    };

    loadCompany();
  }, [id]);

  const updateField = (field: Field, value: string) => {
    setEdited((prev) => ({ ...prev, [field]: value }));
  };

  const saveChanges = async () => {
    setSaving(true);
    setMessage("");

    try {
      const res = await fetch(
        `http://localhost:5000/api/v1/company/update/${id}`,
        {
          method: "PUT", // backend expects POST
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: edited.name,
            description: edited.description,
            website: edited.website,
            location: edited.location,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Update failed");
        return;
      }

      setMessage("Company updated successfully!");
      setTimeout(() => {
      router.push(`/company/${id}`);
    }, 800);
    } catch (err) {
      setMessage("Network error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <Header />

      <main className="min-h-screen mt-20 bg-white px-4 py-12">
        <div className="max-w-3xl mx-auto bg-white border rounded-2xl shadow-xl p-8 space-y-8">

          {/* LOADING */}
          {loading && (
            <p className="text-center text-gray-500">Loading company...</p>
          )}

          {/* ERROR */}
          {!loading && !company && (
            <p className="text-center text-red-500">{message}</p>
          )}

          {/* FORM */}
          {!loading && company && (
            <>
              <h1 className="text-3xl font-bold text-center text-gray-900">
                Update Company
              </h1>

              {/* LOGO */}
              <div className="space-y-3">
                <label className="font-semibold text-gray-700">
                  Company Logo
                </label>

                <div className="flex items-center gap-6">
                  <img
                    src={edited.logo}
                    alt="Company logo"
                    className="w-24 h-24 object-contain border rounded-xl shadow"
                  />

                  {!editingLogo ? (
                    <button
                      onClick={() => setEditingLogo(true)}
                      className="rounded-full border-2 border-pink-600 text-pink-600 px-5 py-2 text-sm font-semibold
                      hover:bg-pink-600 hover:text-white transition"
                    >
                      Change Logo
                    </button>
                  ) : (
                    <input
                      value={edited.logo}
                      onChange={(e) => updateField("logo", e.target.value)}
                      placeholder="Paste logo URL"
                      className="border rounded-xl px-4 py-2 w-full"
                    />
                  )}
                </div>
              </div>

              {/* INPUTS */}
              {(["name", "location", "website"] as Field[]).map((field) => (
                <div key={field} className="space-y-2">
                  <label className="font-semibold text-gray-700 capitalize">
                    {field}
                  </label>
                  <input
                    value={edited[field]}
                    onChange={(e) => updateField(field, e.target.value)}
                    className="w-full border rounded-xl px-4 py-2 focus:ring-2 focus:ring-pink-500 outline-none"
                  />
                </div>
              ))}

              {/* DESCRIPTION */}
              <div className="space-y-2">
                <label className="font-semibold text-gray-700">
                  About Company
                </label>
                <textarea
                  value={edited.description}
                  onChange={(e) =>
                    updateField("description", e.target.value)
                  }
                  rows={4}
                  className="w-full border rounded-xl px-4 py-2 focus:ring-2 focus:ring-pink-500 outline-none resize-none"
                />
              </div>

              {/* ACTIONS */}
              <div className="flex gap-4 pt-4">
                <button
                  onClick={saveChanges}
                  disabled={saving}
                  className="flex-1 rounded-full bg-pink-600 text-white border-2 border-pink-600 py-2 font-bold
                  hover:bg-white hover:text-pink-600 transition disabled:opacity-50"
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>

                <button
                  onClick={() => router.back()}
                  className="flex-1 rounded-full border-2 border-pink-600 text-pink-600 py-2 font-semibold
                  hover:bg-pink-600 hover:text-white transition"
                >
                  Cancel
                </button>
              </div>

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
