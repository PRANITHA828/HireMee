import Header from "@/components/header";
import Footer from "@/components/footer";

export default function ContactPage() {
  return (
    <>
      <Header />

      <div className="bg-gray-50 min-h-screen">
        {/* ✅ HERO SECTION */}
        <div
          className="relative h-[220px] sm:h-[260px] md:h-[320px] flex items-center justify-center bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1600')",
          }}
        >
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative z-10 text-center text-white px-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
              Contact Us
            </h1>
            <p className="mt-2 text-sm sm:text-base">Home / Contact Us</p>
          </div>
        </div>

        {/* ✅ INFO CARDS SECTION */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* ✅ Address */}
          <div className="bg-white rounded-2xl shadow-md text-center p-6 sm:p-8 hover:shadow-lg transition">
            <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full bg-gray-100 flex items-center justify-center text-2xl sm:text-3xl mb-5 sm:mb-6">
              📍
            </div>
            <h3 className="text-lg sm:text-xl font-semibold mb-2 text-gray-800">
              Address
            </h3>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              HireMe Pvt Ltd, <br />
              125, Tech Street, <br />
              Hyderabad, India
            </p>
          </div>

          {/* ✅ Phone */}
          <div className="bg-white rounded-2xl shadow-md text-center p-6 sm:p-8 hover:shadow-lg transition">
            <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full bg-gray-100 flex items-center justify-center text-2xl sm:text-3xl mb-5 sm:mb-6">
              📞
            </div>
            <h3 className="text-lg sm:text-xl font-semibold mb-2 text-gray-800">
              Phone
            </h3>
            <p className="text-gray-600 text-sm sm:text-base">
              +91 98765 43210
            </p>
            <p className="text-gray-600 text-sm sm:text-base">
              +91 91234 56789
            </p>
          </div>

          {/* ✅ Email */}
          <div className="bg-white rounded-2xl shadow-md text-center p-6 sm:p-8 hover:shadow-lg transition">
            <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full bg-gray-100 flex items-center justify-center text-2xl sm:text-3xl mb-5 sm:mb-6">
              ✉️
            </div>
            <h3 className="text-lg sm:text-xl font-semibold mb-2 text-gray-800">
              Email
            </h3>
            <p className="text-gray-600 text-sm sm:text-base">
              support@hireme.com
            </p>
            <p className="text-gray-600 text-sm sm:text-base">
              care@hireme.com
            </p>
          </div>

          {/* ✅ Website */}
          <div className="bg-white rounded-2xl shadow-md text-center p-6 sm:p-8 hover:shadow-lg transition">
            <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full bg-gray-100 flex items-center justify-center text-2xl sm:text-3xl mb-5 sm:mb-6">
              🌐
            </div>
            <h3 className="text-lg sm:text-xl font-semibold mb-2 text-gray-800">
              Web Address
            </h3>
            <p className="text-gray-600 text-sm sm:text-base">www.hireme.com</p>
            <p className="text-gray-600 text-sm sm:text-base">
              www.jobs.hireme.com
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
