import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us – RAVO',
  description: 'Get in touch with RAVO. Follow us on WhatsApp, Instagram, TikTok and Facebook for the latest deals and offers.',
  openGraph: {
    title: 'Contact Us – RAVO',
    description: 'Get in touch with RAVO. Follow us on social media for the latest deals.',
    url: 'https://ravo-self.vercel.app/contact',
    siteName: 'RAVO',
    type: 'website',
    images: [{ url: 'https://ravo-self.vercel.app/ravo-icon.jpeg' }],
  },
  alternates: {
    canonical: 'https://ravo-self.vercel.app/contact',
  },
};

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-10">
        <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-2">Contact Us</h1>
        <p className="text-gray-400">Get in touch or follow us on social media</p>
      </div>

      <div className="card p-6 mb-10 border-brand-500/20 bg-brand-500/5">
        <h2 className="font-display text-xl font-bold text-white mb-3 flex items-center gap-2">
          <span>ℹ️</span> About RAVO
        </h2>
        <p className="text-gray-300 leading-relaxed">
          RAVO is an affiliate product platform that displays products from top external stores including Amazon, Noon, and Jumia. We do not sell products directly — instead, we help users discover and find the best deals easily by redirecting them to the official store pages. Our goal is to make your shopping journey faster, simpler, and smarter.
        </p>
      </div>

      <div className="mb-10">
        <h2 className="font-display text-xl font-bold text-white mb-6">Follow Us</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
            href="https://whatsapp.com/channel/0029VbDGUstJZg4GfkvZlY1f"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 card p-4 hover:border-green-500/50 hover:bg-green-500/5 transition-all group"
          >
            <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center text-2xl group-hover:bg-green-500/20 transition-colors">
              📱
            </div>
            <div>
              <div className="font-semibold text-white group-hover:text-green-400 transition-colors">WhatsApp</div>
              <div className="text-gray-500 text-sm">Join our channel</div>
            </div>
          </a>

          
            href="https://www.instagram.com/ravo_affiliate"
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
          </a>

          
            href="https://www.tiktok.com/@ravoaffiliate"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 card p-4 hover:border-white/20 hover:bg-white/5 transition-all group"
          
            <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-2xl group-hover:bg-white/10 transition-colors">
              🎵
            </div>
            <div>
              <div className="font-semibold text-white group-hover:text-white transition-colors">TikTok</div>
              <div className="text-gray-500 text-sm">Watch our videos</div>
            </div>
          </a>

          
            href="https://www.facebook.com/groups/961520243275695"
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
          </a>
        </div>
      </div>
    </div>
  );
}