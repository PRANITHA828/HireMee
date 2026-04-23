"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function Header() {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    await logout(); // ✅ calls backend + clears user + redirects
    setSidebarOpen(false);
  };

  //  Hide header on auth pages
  if (pathname === "/login" || pathname === "/register") return null;

  return (
    <>
      <header
        className={`fixed w-full top-0 left-0 z-50 bg-transparent transition-all duration-300 ${
          isScrolled ? "bg-white shadow-md h-20" : " h-32"
        }`}
        style={{
          backgroundImage: !isScrolled
            ? "url('https://webstrot.com/html/tabula/job/images/index2/head-upper.png')"
            : "none",
          backgroundPosition: "left top",
          backgroundRepeat: "no-repeat",
          backgroundSize: "450px 120px",
        }}
      >
        <div className="container mx-auto px-6 h-full flex justify-between items-center">
          {/* Logo */}
          <Link href="/home" className="flex items-center space-x-2">
            <Image
              src="https://webstrot.com/html/tabula/job/images/fav-icon.png"
              alt="Logo"
              width={isScrolled ? 40 : 50}
              height={isScrolled ? 40 : 50}
            />
            <span
              className={`font-bold tracking-wide ${
                isScrolled ? "text-xl" : "text-3xl"
              }`}
            >
              <span className="text-black">Hire</span>
              <span className="text-pink-600">Mee</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8 text-gray-800 font-medium text-lg">
            <Link href="/home" className="hover:text-pink-500">
              Home
            </Link>

            {user?.role === "student" && (
              <Link href="/jobs" className="hover:text-pink-500">
                Jobs
              </Link>
            )}

            {user?.role === "recruiter" && (
              
                <Link href="/recruiter/companies" className="hover:text-pink-500">
                  Companies
                </Link>
              
            )}

            {user?.role === "recruiter" && (
              
                <Link href="/recruiter/admin-jobs" className="hover:text-pink-500">
                  Admin-Jobs
                </Link>
            )}

            <Link href="/contact" className="hover:text-pink-500">
              Contact Us
            </Link>

            {user?.role === "recruiter" && (
              <Link
                 href="/recruiter/post-job"
                className="
                          px-6 py-2 rounded-full text-sm font-bold
                         bg-pink-600 text-white
                         border-2
                        transition-all duration-300

                           hover:bg-transparent
                              hover:text-pink-600
                              hover:border-pink-600"
              >
                POST A JOB
              </Link>
            )}

            

            {user && (
              <Image
                src={
                  user.profile?.profilePhoto ||
                  "https://res.cloudinary.com/dcika1gku/image/upload/v1761887775/b9adb2c0c4adfa52f4c68afb4a7a8cc7_p4dent.jpg"
                }
                alt="Profile"
                width={40}
                height={40}
                className="rounded-full cursor-pointer border-2 border-white"
                onClick={() => setSidebarOpen(true)}
              />
            )}
          </nav>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden shadow-lg absolute w-full top-full p-4 space-y-4">
            <Link href="/home" onClick={() => setMenuOpen(false)}>
              Home
            </Link>

            {user?.role === "student" && (
              <Link href="/jobs" onClick={() => setMenuOpen(false)}>
                Jobs
              </Link>
            )}

            {user?.role === "recruiter" && (
              <Link href="/recruiter/post-job" onClick={() => setMenuOpen(false)}>
                Post Job
              </Link>
            )}

            {!user && (
              <>
                <Link href="/login">Login</Link>
                <Link href="/register">Register</Link>
              </>
            )}
          </div>
        )}
      </header>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Profile Sidebar */}
      <aside
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 p-6 transition-transform ${
          sidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between mb-8">
          <h2 className="text-xl font-bold">My Profile</h2>
          <button onClick={() => setSidebarOpen(false)}>✕</button>
        </div>

        {user && (
          <div className="text-center mb-6">
            <Image
              src={
                user.profile?.profilePhoto ||
                "https://res.cloudinary.com/dcika1gku/image/upload/v1761887775/b9adb2c0c4adfa52f4c68afb4a7a8cc7_p4dent.jpg"
              }
              width={80}
              height={80}
              className="mx-auto rounded-full mb-3"
              alt="Profile"
            />
            <h3 className="font-bold">{user.fullname}</h3>
            <p className="text-sm text-gray-500 capitalize">{user.role}</p>
          </div>
        )}

        <nav className="space-y-2">
          <Link href="/profile" className="block p-3 hover:bg-gray-50 rounded">
            User Profile
          </Link>

          {user?.role === "student" && (
            <Link
              href="/applied-jobs"
              className="block p-3 hover:bg-gray-50 rounded"
            >
              Applied Jobs
            </Link>
          )}

          <button
            onClick={handleLogout}
            className="w-full text-left p-3 hover:bg-red-50 text-red-600 rounded"
          >
            Logout
          </button>
        </nav>
      </aside>
    </>
  );
}
