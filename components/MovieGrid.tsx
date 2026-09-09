'use client';

import { useEffect, useMemo, useState } from 'react';
import type { Category, Movie } from '@/lib/types';
import { getCategories, getMovies } from '@/lib/movieService';
import MovieCard from './MovieCard';

export default function MovieGrid() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
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
        setError(reason instanceof Error ? reason.message : 'نەتوانرا داتاکان باربکرێن.');
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase();
    return movies.filter((movie) => {
      const matchesQuery =
        normalized.length === 0 ||
        movie.title.toLocaleLowerCase().includes(normalized) ||
        String(movie.year ?? '').includes(normalized);
      const matchesCategory = category === 'all' || movie.category_id === category;
      return matchesQuery && matchesCategory;
    });
  }, [movies, query, category]);

  return (
    <section id="movies" className="container space-y-6 pb-16">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-red-400">Silav library</p>
          <h2 className="mt-2 text-3xl font-black">نوێترین فیلمەکان</h2>
        </div>
        <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-300">
          {loading ? '...' : `${filtered.length} فیلم`}
        </div>
      </div>

      <input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="گەڕان بە ناوی فیلم یان ساڵ..."
        className="w-full rounded-2xl border border-white/10 bg-zinc-900/80 px-5 py-4 outline-none transition focus:border-red-500"
      />

      <div className="flex gap-3 overflow-x-auto pb-2">
        <button
          onClick={() => setCategory('all')}
          className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-bold transition ${category === 'all' ? 'bg-red-600 text-white' : 'bg-zinc-900 text-zinc-300'}`}
        >
          هەموو
        </button>
        {categories.map((item) => (
          <button
            key={item.id}
            onClick={() => setCategory(item.id)}
            className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-bold transition ${category === item.id ? 'bg-red-600 text-white' : 'bg-zinc-900 text-zinc-300'}`}
          >
            {item.name}
          </button>
        ))}
      </div>

      {error ? (
        <div className="rounded-3xl border border-red-500/20 bg-red-950/20 px-6 py-12 text-center">
          <h3 className="text-xl font-bold">کێشەیەک لە پەیوەندی داتابەیسدا هەیە</h3>
          <p className="mt-2 text-zinc-400">{error}</p>
        </div>
      ) : loading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="aspect-[2/3] animate-pulse rounded-3xl bg-zinc-900" />
          ))}
        </div>
      ) : filtered.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
        </div>
      ) : (
        <div className="rounded-3xl border border-dashed border-white/10 bg-white/[0.03] px-6 py-16 text-center">
          <div className="text-5xl">🎬</div>
          <h3 className="mt-4 text-xl font-bold">هێشتا هیچ فیلمێک نییە</h3>
          <p className="mt-2 text-zinc-400">کاتێک فیلم زیاد بکرێت، لێرە دەردەکەوێت.</p>
        </div>
      )}
    </section>
  );
}
