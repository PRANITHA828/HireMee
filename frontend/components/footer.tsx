export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-10">
        <div>
          <h3 className="text-xl font-bold text-white">HireMee</h3>
          <p className="mt-3 text-sm">
            A modern job platform connecting talent with opportunity.
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Company</h4>
          <ul className="space-y-2 text-sm">
            <li>About</li>
            <li>Careers</li>
            <li>Contact</li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Support</h4>
          <p className="text-sm">support@hiremee.com</p>
        </div>
      </div>

      <div className="border-t border-gray-800 text-center py-4 text-sm">
        © 2025 HireMee. All rights reserved.
      </div>
    </footer>
  );
}
