import Link from 'next/link';

const highlights = [
  ['4K', 'کوالێتی بەرز'],
  ['KRD', 'ژێرنوسی کوردی'],
  ['24/7', 'گەیشتنی خێرا'],
];

export default function Hero() {
  return (
    <section className="container py-8 md:py-14">
      <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-red-950/90 via-zinc-950 to-black px-6 py-14 shadow-2xl shadow-black/40 md:px-12 md:py-24">
        <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-red-600/25 blur-3xl" />
        <div className="absolute -bottom-28 left-1/3 h-80 w-80 rounded-full bg-fuchsia-700/10 blur-3xl" />

        <div className="relative max-w-3xl" dir="rtl">
          <div className="inline-flex items-center gap-2 rounded-full border border-red-400/20 bg-red-500/10 px-4 py-2 text-sm font-bold text-red-300">
            <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
            Silav Movie
          </div>

          <h1 className="mt-6 text-4xl font-black leading-tight md:text-6xl">
            فیلم و زنجیرە بە شێوازێکی مۆدێرن و ژێرنوسی کوردی
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-zinc-300 md:text-lg">
            فیلمە نوێکان بدۆزەوە، بە ژانەر بگەڕێ، وردەکاری ببینە و بە یەک کلیک دەست بە بینین بکە.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="#movies" className="rounded-2xl bg-red-600 px-6 py-3.5 font-black text-white transition hover:-translate-y-0.5 hover:bg-red-500">
              ▶ دەستپێکردنی بینین
            </Link>
            <Link href="#categories" className="rounded-2xl border border-white/10 bg-white/5 px-6 py-3.5 font-bold text-zinc-200 backdrop-blur-xl transition hover:bg-white/10">
              جۆرەکان ببینە
            </Link>
          </div>

          <div className="mt-10 grid max-w-xl grid-cols-3 gap-3">
            {highlights.map(([value, label]) => (
              <div key={value} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-center backdrop-blur-xl">
                <div className="text-lg font-black text-white">{value}</div>
                <div className="mt-1 text-xs text-zinc-400">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
