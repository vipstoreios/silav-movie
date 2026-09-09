'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getCategories, getMovies } from '@/lib/movieService';
import type { Category, Movie } from '@/lib/types';

export default function AdminDashboard() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    Promise.all([getMovies(), getCategories()])
      .then(([movieRows, categoryRows]) => {
        if (!active) return;
        setMovies(movieRows);
        setCategories(categoryRows);
      })
      .catch((reason: unknown) => {
        if (!active) return;
        setError(reason instanceof Error ? reason.message : 'Database error');
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="container py-10">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-red-400">Read-only overview</p>
            <h1 className="mt-2 text-4xl font-black">Silav Movie Admin</h1>
            <p className="mt-2 text-sm text-zinc-500">Admin write access will be enabled after a Supabase Auth admin account is configured.</p>
          </div>
          <Link href="/" className="rounded-full border border-white/10 px-5 py-3 text-sm font-bold hover:bg-white/10">
            بینینی وێبسایت
          </Link>
        </div>

        {error && <div className="mt-8 rounded-2xl border border-red-500/20 bg-red-950/20 p-4 text-red-300">{error}</div>}

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-zinc-900 p-6">
            <p className="text-zinc-400">Movies</p>
            <strong className="mt-3 block text-4xl">{loading ? '—' : movies.length}</strong>
          </div>
          <div className="rounded-3xl border border-white/10 bg-zinc-900 p-6">
            <p className="text-zinc-400">Categories</p>
            <strong className="mt-3 block text-4xl">{loading ? '—' : categories.length}</strong>
          </div>
          <div className="rounded-3xl border border-white/10 bg-zinc-900 p-6">
            <p className="text-zinc-400">Database</p>
            <strong className="mt-3 block text-2xl text-emerald-400">{error ? 'Error' : 'Connected'}</strong>
          </div>
        </div>

        <div className="mt-8 rounded-3xl border border-white/10 bg-zinc-950 p-6">
          <h2 className="text-xl font-black">نوێترین فیلمەکان</h2>
          {loading ? (
            <p className="mt-4 text-zinc-500">Loading...</p>
          ) : movies.length ? (
            <div className="mt-4 divide-y divide-white/5">
              {movies.slice(0, 8).map((movie) => (
                <div key={movie.id} className="flex items-center justify-between gap-4 py-4">
                  <div>
                    <p className="font-bold">{movie.title}</p>
                    <p className="text-sm text-zinc-500">{movie.year ?? '—'} · {movie.categories?.name ?? 'No category'}</p>
                  </div>
                  <Link href={`/watch?id=${encodeURIComponent(movie.id)}`} className="text-sm font-bold text-red-400">View</Link>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-4 text-zinc-500">هێشتا فیلم زیاد نەکراوە.</p>
          )}
        </div>
      </div>
    </main>
  );
}
