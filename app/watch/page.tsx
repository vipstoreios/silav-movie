'use client';

import Link from 'next/link';
import { Suspense, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MovieCard from '@/components/MovieCard';
import { getMovie, getMovies } from '@/lib/movieService';
import type { Movie } from '@/lib/types';

function WatchContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const [movie, setMovie] = useState<Movie | null>(null);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let active = true;

    if (!id) {
      setLoading(false);
      return;
    }

    Promise.all([getMovie(id), getMovies()])
      .then(([row, allMovies]) => {
        if (!active) return;
        setMovie(row);
        setMovies(allMovies);
        const raw = localStorage.getItem('silav-watchlist');
        const ids: string[] = raw ? JSON.parse(raw) : [];
        setSaved(ids.includes(id));
      })
      .catch((reason: unknown) => {
        if (!active) return;
        setError(reason instanceof Error ? reason.message : 'نەتوانرا فیلمەکە باربکرێت.');
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [id]);

  const related = useMemo(() => {
    if (!movie) return [];
    return movies
      .filter((item) => item.id !== movie.id && item.category_id === movie.category_id)
      .slice(0, 4);
  }, [movie, movies]);

  function toggleWatchlist() {
    if (!movie) return;
    const raw = localStorage.getItem('silav-watchlist');
    const ids: string[] = raw ? JSON.parse(raw) : [];
    const next = ids.includes(movie.id) ? ids.filter((item) => item !== movie.id) : [...ids, movie.id];
    localStorage.setItem('silav-watchlist', JSON.stringify(next));
    setSaved(next.includes(movie.id));
  }

  async function shareMovie() {
    if (!movie) return;
    const url = window.location.href;
    if (navigator.share) {
      await navigator.share({ title: movie.title, text: `${movie.title} - Silav Movie`, url });
      return;
    }
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  if (loading) {
    return <div className="container py-24 text-center text-zinc-400">فیلمەکە بار دەبێت...</div>;
  }

  if (error || !movie) {
    return (
      <div className="container py-24 text-center">
        <div className="text-6xl">🎞️</div>
        <h1 className="mt-5 text-3xl font-black">فیلمەکە نەدۆزرایەوە</h1>
        {error && <p className="mt-3 text-zinc-500">{error}</p>}
        <Link href="/" className="mt-6 inline-block rounded-full bg-red-600 px-6 py-3 font-bold">
          گەڕانەوە بۆ سەرەتا
        </Link>
      </div>
    );
  }

  return (
    <>
      <section className="container py-8 md:py-12">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-950/80 p-5 shadow-2xl shadow-black/40 md:p-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(220,38,38,0.16),transparent_28rem)]" />
          <div className="relative grid gap-8 lg:grid-cols-[320px_1fr]">
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-zinc-900 shadow-2xl shadow-black/30">
              {movie.poster_url ? (
                <img src={movie.poster_url} alt={movie.title} className="aspect-[2/3] h-full w-full object-cover" />
              ) : (
                <div className="grid aspect-[2/3] place-items-center bg-gradient-to-br from-zinc-800 to-black text-7xl">🎬</div>
              )}
            </div>

            <div className="flex flex-col justify-center">
              <div className="flex flex-wrap items-center gap-2 text-sm font-bold">
                <span className="rounded-full bg-red-600/15 px-3 py-1 text-red-300">{movie.categories?.name ?? 'Silav Movie'}</span>
                <span className="rounded-full bg-white/5 px-3 py-1 text-zinc-300">{movie.year ?? '—'}</span>
                <span className="rounded-full bg-white/5 px-3 py-1 text-zinc-300">ژێرنوسی کوردی</span>
              </div>

              <h1 className="mt-5 text-4xl font-black leading-tight md:text-6xl">{movie.title}</h1>
              <p className="mt-6 max-w-3xl text-base leading-8 text-zinc-300 md:text-lg">
                {movie.description ?? 'وردەکاری زیاتر بەم زووانە زیاد دەکرێت.'}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {movie.video_url && (
                  <a href={movie.video_url} target="_blank" rel="noreferrer" className="rounded-full bg-red-600 px-6 py-3 font-bold shadow-lg shadow-red-950/40 transition hover:bg-red-500">
                    ▶ بینینی فیلم
                  </a>
                )}
                {movie.trailer_url && (
                  <a href={movie.trailer_url} target="_blank" rel="noreferrer" className="rounded-full border border-white/15 bg-white/[0.04] px-6 py-3 font-bold transition hover:bg-white/10">
                    تریلەر
                  </a>
                )}
                {movie.subtitle_url && (
                  <a href={movie.subtitle_url} target="_blank" rel="noreferrer" className="rounded-full border border-white/15 bg-white/[0.04] px-6 py-3 font-bold transition hover:bg-white/10">
                    ژێرنوس
                  </a>
                )}
                <button onClick={toggleWatchlist} className="rounded-full border border-white/15 bg-white/[0.04] px-6 py-3 font-bold transition hover:bg-white/10">
                  {saved ? '♥ لە لیستی منە' : '♡ زیادکردن بۆ لیستی من'}
                </button>
                <button onClick={shareMovie} className="rounded-full border border-white/15 bg-white/[0.04] px-6 py-3 font-bold transition hover:bg-white/10">
                  {copied ? 'لینک کۆپی کرا' : '↗ هاوبەشکردن'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="container pb-16">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-red-400">More like this</p>
              <h2 className="mt-2 text-3xl font-black">فیلمی پەیوەندیدار</h2>
            </div>
            <Link href="/#movies" className="text-sm font-bold text-zinc-300 hover:text-white">هەموو فیلمەکان</Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((item) => <MovieCard key={item.id} movie={item} />)}
          </div>
        </section>
      )}
    </>
  );
}

export default function WatchPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Suspense fallback={<div className="container py-24 text-center text-zinc-400">بار دەبێت...</div>}>
        <WatchContent />
      </Suspense>
      <Footer />
    </main>
  );
}
