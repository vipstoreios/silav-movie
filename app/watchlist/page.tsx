'use client';

import { useEffect, useMemo, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MovieCard from '@/components/MovieCard';
import { getMovies } from '@/lib/movieService';
import type { Movie } from '@/lib/types';

export default function WatchlistPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [ids, setIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const raw = localStorage.getItem('silav-watchlist');
    setIds(raw ? JSON.parse(raw) : []);
    getMovies().then(setMovies).finally(() => setLoading(false));
  }, []);

  const savedMovies = useMemo(() => movies.filter((movie) => ids.includes(movie.id)), [movies, ids]);

  function clearAll() {
    localStorage.removeItem('silav-watchlist');
    setIds([]);
  }

  return (
    <main className="min-h-screen">
      <Navbar />
      <section className="container py-10 md:py-14">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-red-400">My list</p>
            <h1 className="mt-2 text-4xl font-black">لیستی من</h1>
            <p className="mt-2 text-zinc-400">ئەو فیلمانەی بۆ دواتر هەڵتگرتوون.</p>
          </div>
          {ids.length > 0 && (
            <button onClick={clearAll} className="rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-bold transition hover:bg-white/10">
              پاککردنەوەی هەموو
            </button>
          )}
        </div>

        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="aspect-[2/3] animate-pulse rounded-3xl bg-zinc-900" />
            ))}
          </div>
        ) : savedMovies.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {savedMovies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
          </div>
        ) : (
          <div className="rounded-[2rem] border border-dashed border-white/10 bg-white/[0.03] px-6 py-20 text-center">
            <div className="text-6xl">♡</div>
            <h2 className="mt-4 text-2xl font-black">لیستەکەت بەتاڵە</h2>
            <p className="mt-2 text-zinc-400">لەسەر هەر فیلمێک دڵ بکە بۆ زیادکردنی بۆ لیستەکەت.</p>
          </div>
        )}
      </section>
      <Footer />
    </main>
  );
}
