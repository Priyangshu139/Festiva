export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Festiva</h3>
            <p className="text-gray-300 text-sm">
              Your one-stop shop for authentic Indian festival bundles and decorations.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="text-gray-300 hover:text-white">Home</a></li>
              <li><a href="/diwali" className="text-gray-300 hover:text-white">Diwali</a></li>
              <li><a href="/holi" className="text-gray-300 hover:text-white">Holi</a></li>
              <li><a href="/navratri" className="text-gray-300 hover:text-white">Navratri</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>Email: hello@festiva.com</li>
              <li>Phone: +91 98765 43210</li>
              <li>Support: 9 AM - 6 PM IST</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p className="text-sm text-gray-400">
            © 2024 Festiva. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}