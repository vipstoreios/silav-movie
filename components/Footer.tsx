import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="mt-10 border-t border-white/10 bg-black/30 py-10">
      <div className="container flex flex-col gap-6 md:flex-row md:items-center md:justify-between" dir="rtl">
        <div>
          <div className="text-xl font-black">Silav Movie</div>
          <p className="mt-2 text-sm text-zinc-500">پلاتفۆرمێکی مۆدێرن بۆ فیلم و ژێرنوسی کوردی.</p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm font-bold text-zinc-400">
          <Link href="/" className="hover:text-white">سەرەتا</Link>
          <Link href="/#movies" className="hover:text-white">فیلمەکان</Link>
          <Link href="/#categories" className="hover:text-white">تایبەتمەندییەکان</Link>
          <Link href="/admin/login" className="hover:text-white">Admin</Link>
        </div>
      </div>
    </footer>
  );
}
