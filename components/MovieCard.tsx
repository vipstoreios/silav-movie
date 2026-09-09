'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import type { Movie } from '@/lib/types';

const WATCHLIST_KEY = 'silav-watchlist';

export default function MovieCard({ movie }: { movie: Movie }) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    try {
      const list = JSON.parse(localStorage.getItem(WATCHLIST_KEY) || '[]') as string[];
      setSaved(list.includes(movie.id));
    } catch {
      setSaved(false);
    }
  }, [movie.id]);

  function toggleSaved() {
    try {
      const list = JSON.parse(localStorage.getItem(WATCHLIST_KEY) || '[]') as string[];
      const next = list.includes(movie.id) ? list.filter((id) => id !== movie.id) : [...list, movie.id];
      localStorage.setItem(WATCHLIST_KEY, JSON.stringify(next));
      setSaved(next.includes(movie.id));
    } catch {
      setSaved((value) => !value);
    }
  }

  return (
    <article className="group overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/80 shadow-lg shadow-black/20 transition duration-300 hover:-translate-y-1 hover:border-red-500/40 hover:shadow-red-950/20">
      <div className="relative aspect-[2/3] overflow-hidden bg-gradient-to-br from-zinc-800 via-zinc-900 to-black">
        <Link href={`/watch?id=${encodeURIComponent(movie.id)}`} className="block h-full">
          {movie.poster_url ? (
            <img
              src={movie.poster_url}
              alt={movie.title}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="grid h-full place-items-center">
              <span className="text-6xl opacity-60">🎬</span>
            </div>
          )}
        </Link>

        <button
          type="button"
          onClick={toggleSaved}
          aria-label={saved ? 'لابردن لە لیستی دڵخواز' : 'زیادکردن بۆ لیستی دڵخواز'}
          className="absolute left-3 top-3 grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-black/55 text-xl backdrop-blur-xl transition hover:scale-105 hover:bg-black/75"
        >
          {saved ? '♥' : '♡'}
        </button>

        <div className="absolute right-3 top-3 rounded-full border border-white/10 bg-black/55 px-3 py-1.5 text-xs font-black backdrop-blur-xl">
          {movie.year ?? '—'}
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/80 to-transparent p-5 pt-20">
          <p className="text-xs font-bold uppercase tracking-wider text-red-400">
            {movie.categories?.name ?? 'Silav Movie'}
          </p>
          <h3 className="mt-2 line-clamp-2 text-xl font-black">{movie.title}</h3>
          <p className="mt-2 text-sm text-zinc-400">ژێرنوسی کوردی</p>
        </div>
      </div>

      <div className="flex gap-2 p-3">
        <Link
          href={`/watch?id=${encodeURIComponent(movie.id)}`}
          className="flex-1 rounded-xl bg-red-600 px-4 py-2.5 text-center text-sm font-black transition hover:bg-red-500"
        >
          ▶ بینین
        </Link>
        <button
          type="button"
          onClick={toggleSaved}
          className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-bold transition hover:bg-white/10"
        >
          {saved ? 'دڵخواز ✓' : 'دڵخواز'}
        </button>
      </div>
    </article>
  );
}
