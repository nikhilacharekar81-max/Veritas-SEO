import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4 focus:outline-none">
      <section aria-labelledby="not-found-heading" className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center space-y-6">
        <header className="space-y-2">
          <span className="px-3 py-1 bg-red-500/10 text-red-400 border border-red-500/20 rounded-full text-xs font-mono font-bold uppercase tracking-wider">
            404 Error
          </span>
          <h1 id="not-found-heading" className="text-3xl font-extrabold text-white tracking-tight">
            Page Not Found
          </h1>
        </header>

        <p className="text-sm text-slate-400 leading-relaxed">
          The requested SEO tool or category route does not exist or may have been permanently relocated.
        </p>

        <footer>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold rounded-xl transition-all shadow-xs"
          >
            Return to Tools Directory
          </Link>
        </footer>
      </section>
    </main>
  );
}
