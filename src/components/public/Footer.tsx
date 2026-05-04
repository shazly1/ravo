import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-dark-800 border-t border-dark-700 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Logo & Description */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg overflow-hidden">
                <img src="/ravo-icon.jpeg" alt="RAVO" className="w-full h-full object-cover" />
              </div>
              <span className="font-display font-bold text-lg text-white">RAVO</span>
            </Link>
            <p className="text-gray-500 text-sm">Find the best deals from top stores — all in one place.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-3">Quick Links</h3>
            <nav className="flex flex-col gap-2">
              <Link href="/" className="text-gray-400 hover:text-white text-sm transition-colors">Home</Link>
              <Link href="/products" className="text-gray-400 hover:text-white text-sm transition-colors">Products</Link>
              <Link href="/categories" className="text-gray-400 hover:text-white text-sm transition-colors">Categories</Link>
              <Link href="/contact" className="text-gray-400 hover:text-white text-sm transition-colors">Contact</Link>
            </nav>
          </div>

          {/* CEO Info */}
          <div>
            <h3 className="text-white font-semibold mb-3">Contact</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-brand-400 text-sm font-medium">CEO - RAVO</span>
              </div>
              <p className="text-gray-300 text-sm font-medium">Mohamed Elshazly</p>
              <a
                href="mailto:mohamedelshazly468@gmail.com"
                className="text-gray-400 hover:text-brand-400 text-sm transition-colors block"
              >
                mohamedelshazly468@gmail.com
              </a>
              <a
                href="https://wa.me/201022032837"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-green-400 text-sm transition-colors block"
              >
                WhatsApp: 01022032837
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-dark-700 pt-6 text-center">
          <p className="text-gray-600 text-sm">© {new Date().getFullYear()} RAVO. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
