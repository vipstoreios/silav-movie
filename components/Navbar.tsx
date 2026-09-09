'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/', label: 'سەرەتا' },
  { href: '/browse', label: 'گەڕان' },
  { href: '/genres', label: 'جۆرەکان' },
  { href: '/watchlist', label: 'لیستی من' },
  { href: '/history', label: 'مێژوو' },
  { href: '/request', label: 'داواکاری فیلم' },
];

export default function Navbar() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/75 backdrop-blur-2xl">
      <nav className="container flex min-h-20 items-center justify-between gap-3" dir="rtl">
        <Link href="/" className="group flex shrink-0 items-center gap-3 font-black">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-red-500 to-red-800 text-lg shadow-lg shadow-red-900/30 transition group-hover:rotate-3 group-hover:scale-105">S</span>
          <span className="hidden text-xl sm:inline md:text-2xl">Silav Movie</span>
        </Link>
        <div className="hidden min-w-0 flex-1 items-center justify-center gap-1 overflow-x-auto text-sm font-bold text-zinc-300 md:flex">
          {links.map((link) => {
            const active = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);
            return <Link key={link.href} href={link.href} aria-current={active ? 'page' : undefined} className={`whitespace-nowrap rounded-xl px-3 py-2 transition ${active ? 'bg-red-600 text-white' : 'hover:bg-white/10 hover:text-white'}`}>{link.label}</Link>;
          })}
        </div>
        <div className="flex items-center gap-2">
          <Link href="/profile" className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-bold transition hover:bg-white/10">هەژمار</Link>
          <Link href="/admin/login" className="hidden rounded-xl bg-red-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-red-500 sm:inline-flex">بەڕێوەبردن</Link>
        </div>
      </nav>
    </header>
  );
}
