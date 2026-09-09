'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const items = [
  { href: '/', label: 'سەرەتا', icon: '⌂' },
  { href: '/browse', label: 'گەڕان', icon: '⌕' },
  { href: '/watchlist', label: 'لیستی من', icon: '♡' },
  { href: '/profile', label: 'هەژمار', icon: '◉' },
];

export default function MobileNav() {
  const pathname = usePathname();
  return (
    <nav className="fixed inset-x-3 bottom-3 z-50 grid grid-cols-4 rounded-2xl border border-white/10 bg-black/80 p-1.5 shadow-2xl backdrop-blur-2xl md:hidden">
      {items.map((item) => {
        const active = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
        return (
          <Link key={item.href} href={item.href} className={`flex flex-col items-center gap-1 rounded-xl px-2 py-2 text-[11px] font-bold transition ${active ? 'bg-red-600 text-white' : 'text-zinc-400 hover:bg-white/10 hover:text-white'}`}>
            <span className="text-lg leading-none">{item.icon}</span>
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
