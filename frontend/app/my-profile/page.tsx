 "use client";
import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { useAuth } from "@/context/AuthContext";

interface ProfileFormData {
  fullname: string;
  email: string;
  phoneNumber: string;
  bio: string;
  skills: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const [formData, setFormData] = useState<ProfileFormData>({
    fullname: "",
    email: "",
    phoneNumber: "",
    bio: "",
    skills: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { updateUser } = useAuth();

  //  Fetch profile data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/user/profile`, {
          method: "GET",
          credentials: "include",
        });

        const data = await res.json();

        if (res.ok && data.success) {
          const user = data.user;
          setFormData({
            fullname: user.fullname || "",
            email: user.email || "",
            phoneNumber: user.phoneNumber || "",
            bio: user.profile?.bio || "",
            skills: user.profile?.skills?.join(", ") || "",
          });
        } else {
          router.push("/login");
        }
      } catch (error) {
        console.error("Error loading profile:", error);
        router.push("/login");
      }
    };

    fetchProfile();
  }, [router]);

  // Handle input
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //  Submit JSON update
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/user/profile/update`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setMessage("✅ Profile updated successfully!");
        updateUser(data.user); 
        setTimeout(() => router.push("/profile"), 1000);
      } else {
        setMessage(`❌ ${data.message || "Update failed"}`);
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      setMessage("⚠️ Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-200 via-white to-pink-200 px-4 py-10">
      <Header/>
      <div className="w-full max-w-2xl mt-24 sm:mt-10 md:mt-10 lg:mt-10 bg-white rounded-3xl shadow-2xl p-8 md:p-10 border border-pink-100">
        <h1 className="text-3xl md:text-4xl font-extrabold text-center text-pink-600 mb-8 drop-shadow-sm">
          Update Your Profile
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name  */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Full Name
            </label>
            <input
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              required
              className="w-full border border-blue-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-pink-400 outline-none transition-all"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border border-blue-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-pink-400 outline-none transition-all"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full border border-blue-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-pink-400 outline-none transition-all"
            />
          </div>

          {/* Bio */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Bio
            </label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className="w-full border border-blue-200 rounded-xl px-4 py-3 h-24 resize-none focus:ring-2 focus:ring-pink-400 outline-none transition-all"
            />
          </div>

          {/* Skills */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Skills (comma separated)
            </label>
            <input
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              className="w-full border border-blue-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-pink-400 outline-none transition-all"
            />
          </div>

          {message && (
            <p
              className={`text-center font-medium ${
                message.startsWith("✅") ? "text-green-600" : "text-red-600"
              }`}
            >
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-pink-500 to-blue-500 text-white py-3 rounded-xl font-semibold shadow-lg hover:opacity-90 transition-all"
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </form>
      </div>
    </div>
       <Footer/>
       </>
  );
}
