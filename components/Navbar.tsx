import Link from 'next/link';

const links = [
  { href: '/', label: 'سەرەتا' },
  { href: '/#movies', label: 'فیلمەکان' },
  { href: '/#categories', label: 'تایبەتمەندییەکان' },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/60 backdrop-blur-2xl">
      <nav className="container flex min-h-20 items-center justify-between gap-4">
        <Link href="/" className="group flex shrink-0 items-center gap-3 font-black">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-red-500 to-red-800 shadow-lg shadow-red-900/30 transition group-hover:scale-105">S</span>
          <span className="hidden text-xl sm:inline md:text-2xl">Silav Movie</span>
        </Link>

        <div className="flex min-w-0 items-center gap-1 overflow-x-auto text-sm font-bold text-zinc-300 md:gap-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="whitespace-nowrap rounded-xl px-3 py-2 transition hover:bg-white/10 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/admin/login"
            className="whitespace-nowrap rounded-xl bg-red-600 px-4 py-2 text-white transition hover:bg-red-500"
          >
            Admin
          </Link>
        </div>
      </nav>
    </header>
  );
}
