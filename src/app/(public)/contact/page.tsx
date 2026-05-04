export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-10">
        <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-2">Contact Us</h1>
        <p className="text-gray-400">Get in touch or follow us on social media</p>
      </div>

      {/* About Section — appears ONLY here per requirements */}
      <div className="card p-6 mb-10 border-brand-500/20 bg-brand-500/5">
        <h2 className="font-display text-xl font-bold text-white mb-3 flex items-center gap-2">
          <span>ℹ️</span> About RAVO
        </h2>
        <p className="text-gray-300 leading-relaxed">
          RAVO is an affiliate product platform that displays products from top external stores including Amazon, Noon, and Jumia. We do not sell products directly — instead, we help users discover and find the best deals easily by redirecting them to the official store pages. Our goal is to make your shopping journey faster, simpler, and smarter.
        </p>
      </div>

      {/* Social Links */}
      <div className="mb-10">
        <h2 className="font-display text-xl font-bold text-white mb-6">Follow Us</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* WhatsApp */}
          <a
            href="https://wa.me/yournumber"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 card p-4 hover:border-green-500/50 hover:bg-green-500/5 transition-all group"
          >
            <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center text-2xl group-hover:bg-green-500/20 transition-colors">
              📱
            </div>
            <div>
              <div className="font-semibold text-white group-hover:text-green-400 transition-colors">WhatsApp Group</div>
              <div className="text-gray-500 text-sm">Join our community</div>
            </div>
            <svg className="w-4 h-4 text-gray-600 ml-auto group-hover:text-green-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>

          {/* Instagram */}
          <a
            href="https://instagram.com/yourpage"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 card p-4 hover:border-pink-500/50 hover:bg-pink-500/5 transition-all group"
          >
            <div className="w-12 h-12 rounded-xl bg-pink-500/10 flex items-center justify-center text-2xl group-hover:bg-pink-500/20 transition-colors">
              📸
            </div>
            <div>
              <div className="font-semibold text-white group-hover:text-pink-400 transition-colors">Instagram</div>
              <div className="text-gray-500 text-sm">Follow our page</div>
            </div>
            <svg className="w-4 h-4 text-gray-600 ml-auto group-hover:text-pink-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>

          {/* TikTok */}
          <a
            href="https://tiktok.com/@yourpage"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 card p-4 hover:border-white/20 hover:bg-white/5 transition-all group"
          >
            <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-2xl group-hover:bg-white/10 transition-colors">
              🎵
            </div>
            <div>
              <div className="font-semibold text-white group-hover:text-white transition-colors">TikTok</div>
              <div className="text-gray-500 text-sm">Watch our videos</div>
            </div>
            <svg className="w-4 h-4 text-gray-600 ml-auto group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>

          {/* Facebook */}
          <a
            href="https://facebook.com/yourgroup"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 card p-4 hover:border-blue-500/50 hover:bg-blue-500/5 transition-all group"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-2xl group-hover:bg-blue-500/20 transition-colors">
              👥
            </div>
            <div>
              <div className="font-semibold text-white group-hover:text-blue-400 transition-colors">Facebook Group</div>
              <div className="text-gray-500 text-sm">Join our group</div>
            </div>
            <svg className="w-4 h-4 text-gray-600 ml-auto group-hover:text-blue-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
