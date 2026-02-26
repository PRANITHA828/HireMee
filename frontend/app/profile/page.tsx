"use client";

import { useAuth } from "@/context/AuthContext";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { useRouter } from "next/navigation";
import { Loader2, Mail, Phone, User as UserIcon, FileText } from "lucide-react";

/* ================= TYPES ================= */

interface UserProfile {
  profilePhoto?: string;
  bio?: string;
  skills?: string[];
  resume?: string;
  company?: string;
}

interface User {
  fullname: string;
  email: string;
  phoneNumber: number;
  role: "student" | "recruiter";
  profile?: UserProfile;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
}

/* ================= PAGE ================= */

export default function ProfilePage() {
  const { user, loading } = useAuth() as AuthContextType;
  const router = useRouter();

  if (loading) {
    return (
      <>
        <Header />
        <div className="flex justify-center p-20">
          <Loader2 className="animate-spin w-10 h-10 text-[#ff4f6c]" />
        </div>
        <Footer />
      </>
    );
  }

  if (!user) {
    return (
      <>
        <Header />
        <div className="p-20 text-center">
          Please login to view profile.
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />

      <div className="bg-gray-50 min-h-screen py-10">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">

            {/* Cover */}
            <div className="h-48 bg-linear-to-r from-pink-500 to-purple-600" />

            <div className="px-8 pb-8">
              <div className="relative flex justify-between items-end -mt-16 mb-6">
                <div className="bg-white p-1 rounded-full">
                  <img
                    src={
                      user.profile?.profilePhoto ||
                      "https://res.cloudinary.com/dcika1gku/image/upload/v1761887775/b9adb2c0c4adfa52f4c68afb4a7a8cc7_p4dent.jpg"
                    }
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md"
                  />
                </div>

                <button onClick={() => router.push("/my-profile")} className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-2 rounded-lg font-medium transition">
                  Edit Profile
                </button>
              </div>

              {/* Name */}
              <h1 className="text-3xl font-bold text-gray-900">
                {user.fullname}
              </h1>

              <p className="text-gray-500 text-lg capitalize flex items-center gap-2">
                {user.role}
                {user.role === "recruiter" && user.profile?.company && (
                  <span className="text-sm bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full border">
                    @{user.profile.company}
                  </span>
                )}
              </p>

              <div className="grid md:grid-cols-2 gap-8 mt-10">

                {/* CONTACT */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <UserIcon size={20} /> Contact Information
                  </h3>

                  <div className="space-y-3 text-gray-600">
                    <div className="flex items-center gap-3">
                      <Mail size={18} />
                      <span>{user.email}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone size={18} />
                      <span>{user.phoneNumber}</span>
                    </div>
                  </div>
                </div>

                {/* BIO & SKILLS */}
                <div className="space-y-6">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <FileText size={20} /> Bio & Skills
                    </h3>

                    <p className="text-gray-600 mb-4">
                      {user.profile?.bio || "No bio added yet."}
                    </p>

                    {user.profile?.skills?.length ? (
                      <div className="flex flex-wrap gap-2">
                        {user.profile.skills.map((skill, i) => (
                          <span
                            key={i}
                            className="bg-white border px-3 py-1 rounded-full text-sm"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </div>

                  {/* RESUME */}
                  {user.role === "student" && (
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <FileText size={20} /> Resume
                      </h3>

                      {user.profile?.resume ? (
                        <a
                          href={user.profile.resume}
                          target="_blank"
                          className="text-[#ff4f6c] underline"
                        >
                          View Resume
                        </a>
                      ) : (
                        <p className="text-gray-500 text-sm">
                          No resume uploaded.
                        </p>
                      )}
                    </div>
                  )}
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
