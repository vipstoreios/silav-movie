import Link from 'next/link';

const links = [
  { href: '/', label: 'سەرەتا' },
  { href: '/#movies', label: 'فیلمەکان' },
  { href: '/#popular', label: 'بەناوبانگەکان' },
  { href: '/#categories', label: 'جۆرەکان' },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/60 backdrop-blur-2xl">
      <nav className="container flex min-h-20 items-center justify-between gap-5">
        <Link href="/" className="flex items-center gap-3 font-black group">
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-red-500 to-red-800 shadow-lg shadow-red-900/30 transition group-hover:scale-105">S</span>
          <span className="text-xl md:text-2xl">Silav Movie</span>
        </Link>

        <div className="flex items-center gap-2 text-sm font-bold text-zinc-300 md:gap-5">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-xl px-3 py-2 transition hover:bg-white/10 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/admin/login"
            className="rounded-xl bg-red-600 px-4 py-2 text-white transition hover:bg-red-500"
          >
            Admin
          </Link>
        </div>
      </nav>
    </header>
  );
}
