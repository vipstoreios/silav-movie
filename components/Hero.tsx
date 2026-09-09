export default function Hero() {
  return (
    <section className="container py-10 md:py-16">
      <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-red-950 via-zinc-950 to-black px-6 py-16 md:px-12 md:py-24">
        <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-red-600/20 blur-3xl" />
        <div className="relative max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.35em] text-red-400">Silav Movie</p>
          <h1 className="mt-5 text-4xl font-black leading-tight md:text-6xl">
            فیلم و دراما بە ژێرنوسی کوردی
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-300">
            شوێنێکی سادە و خێرا بۆ دۆزینەوەی فیلمەکان، بینینی وردەکاری و گەیشتن بە لینکەکانی بینین و ژێرنوس.
          </p>
          <a href="#movies" className="mt-8 inline-flex rounded-full bg-red-600 px-6 py-3 font-bold transition hover:bg-red-500">
            بینینی فیلمەکان
          </a>
        </div>
      </div>
    </section>
  );
}
