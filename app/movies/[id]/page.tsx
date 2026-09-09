import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { getMovie } from '@/lib/movieService';

export const revalidate = 60;

export default async function MoviePage({ params }: { params: { id: string } }) {
  const movie = await getMovie(params.id);

  if (!movie) {
    return (
      <main className="min-h-screen">
        <Navbar />
        <div className="container py-24 text-center">
          <div className="text-6xl">🎞️</div>
          <h1 className="mt-5 text-3xl font-black">فیلمەکە نەدۆزرایەوە</h1>
          <Link href="/" className="mt-6 inline-block rounded-full bg-red-600 px-6 py-3 font-bold">
            گەڕانەوە بۆ سەرەتا
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <Navbar />
      <section className="container py-10">
        <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-zinc-900">
            {movie.poster_url ? (
              <img src={movie.poster_url} alt={movie.title} className="aspect-[2/3] h-full w-full object-cover" />
            ) : (
              <div className="grid aspect-[2/3] place-items-center bg-gradient-to-br from-zinc-800 to-black text-7xl">🎬</div>
            )}
          </div>

          <div className="flex flex-col justify-center">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-red-400">
              {movie.categories?.name ?? 'Silav Movie'}
            </p>
            <h1 className="mt-3 text-4xl font-black md:text-6xl">{movie.title}</h1>
            <p className="mt-3 text-zinc-400">{movie.year ?? '—'} · ژێرنوسی کوردی</p>
            <p className="mt-7 max-w-3xl leading-8 text-zinc-300">
              {movie.description ?? 'وردەکاری زیاتر بەم زووانە زیاد دەکرێت.'}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {movie.video_url && (
                <a href={movie.video_url} target="_blank" rel="noreferrer" className="rounded-full bg-red-600 px-6 py-3 font-bold hover:bg-red-500">
                  ▶ بینینی فیلم
                </a>
              )}
              {movie.trailer_url && (
                <a href={movie.trailer_url} target="_blank" rel="noreferrer" className="rounded-full border border-white/15 px-6 py-3 font-bold hover:bg-white/10">
                  تریلەر
                </a>
              )}
              {movie.subtitle_url && (
                <a href={movie.subtitle_url} target="_blank" rel="noreferrer" className="rounded-full border border-white/15 px-6 py-3 font-bold hover:bg-white/10">
                  ژێرنوس
                </a>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
