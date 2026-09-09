import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-black/70 backdrop-blur-xl">
      <nav className="container flex min-h-20 items-center justify-between gap-5">
        <Link href="/" className="flex items-center gap-3 font-black">
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-red-600">S</span>
          <span className="text-xl md:text-2xl">Silav Movie</span>
        </Link>
        <div className="flex items-center gap-4 text-sm font-bold text-zinc-300 md:gap-7">
          <Link href="/" className="transition hover:text-white">سەرەتا</Link>
          <Link href="/#movies" className="transition hover:text-white">فیلمەکان</Link>
          <Link href="/admin/dashboard" className="hidden transition hover:text-white sm:block">Admin</Link>
        </div>
      </nav>
    </header>
  );
}
