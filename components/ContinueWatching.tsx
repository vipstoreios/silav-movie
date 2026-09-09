'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getMovies } from '@/lib/movieService';
import type { Movie } from '@/lib/types';

type Progress = Record<string, number>;

export default function ContinueWatching() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [progress, setProgress] = useState<Progress>({});

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('silav-progress') || '{}') as Progress;
    setProgress(stored);
    const ids = Object.keys(stored);
    if (!ids.length) return;
    getMovies().then((rows) => setMovies(rows.filter((movie) => ids.includes(movie.id)).slice(0, 6))).catch(() => {});
  }, []);

  if (!movies.length) return null;

  return (
    <section className="container py-8">
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-red-400">Continue watching</p>
          <h2 className="mt-2 text-2xl font-black md:text-3xl">بەردەوامبە لە بینین</h2>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {movies.map((movie) => (
          <Link key={movie.id} href={`/watch?id=${encodeURIComponent(movie.id)}`} className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] transition hover:-translate-y-1 hover:border-red-500/40">
            <div className="relative aspect-video overflow-hidden bg-zinc-900">
              {movie.poster_url ? <img src={movie.poster_url} alt={movie.title} className="h-full w-full object-cover opacity-70 transition group-hover:scale-105" /> : <div className="grid h-full place-items-center text-5xl">🎬</div>}
              <div className="absolute inset-0 grid place-items-center"><span className="grid h-12 w-12 place-items-center rounded-full bg-red-600 shadow-xl">▶</span></div>
            </div>
            <div className="p-4">
              <h3 className="font-black">{movie.title}</h3>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-red-600" style={{ width: `${Math.max(5, Math.min(100, progress[movie.id] || 10))}%` }} /></div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
