'use client';

import { useEffect, useMemo, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MobileNav from '@/components/MobileNav';
import MovieCard from '@/components/MovieCard';
import { getCategories, getMovies } from '@/lib/movieService';
import type { Category, Movie } from '@/lib/types';

export default function BrowsePage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState('newest');
  const [year, setYear] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const initialCategory = params.get('category');
    const initialQuery = params.get('q');
    if (initialCategory) setCategory(initialCategory);
    if (initialQuery) setQuery(initialQuery);
    Promise.all([getMovies(), getCategories()]).then(([m, c]) => { setMovies(m); setCategories(c); }).finally(() => setLoading(false));
  }, []);

  const years = useMemo(() => Array.from(new Set(movies.map((m) => m.year).filter(Boolean))).sort((a, b) => Number(b) - Number(a)), [movies]);
  const filtered = useMemo(() => {
    let rows = movies.filter((movie) => {
      const q = query.trim().toLowerCase();
      const matchesQuery = !q || movie.title.toLowerCase().includes(q) || (movie.description || '').toLowerCase().includes(q) || String(movie.year || '').includes(q);
      const matchesCategory = category === 'all' || movie.category_id === category;
      const matchesYear = year === 'all' || String(movie.year) === year;
      return matchesQuery && matchesCategory && matchesYear;
    });
    return [...rows].sort((a, b) => sort === 'oldest' ? Number(a.year || 0) - Number(b.year || 0) : sort === 'title' ? a.title.localeCompare(b.title) : new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime());
  }, [movies, query, category, sort, year]);

  const reset = () => { setQuery(''); setCategory('all'); setYear('all'); setSort('newest'); };

  return (
    <main className="min-h-screen pb-24 md:pb-0">
      <Navbar />
      <section className="container py-10">
        <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-zinc-900/90 via-black to-red-950/30 p-6 md:p-8">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-red-400">Discover</p>
          <h1 className="mt-2 text-3xl font-black md:text-5xl">فیلمەکان بدۆزەوە</h1>
          <div className="mt-6 grid gap-3 lg:grid-cols-[1fr_220px_180px_180px]">
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="ناوی فیلم، ساڵ یان وشەیەک..." className="rounded-2xl border border-white/10 bg-black/40 px-5 py-4 outline-none focus:border-red-500" />
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="rounded-2xl border border-white/10 bg-zinc-950 px-4 py-4 outline-none focus:border-red-500"><option value="all">هەموو جۆرەکان</option>{categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}</select>
            <select value={year} onChange={(e) => setYear(e.target.value)} className="rounded-2xl border border-white/10 bg-zinc-950 px-4 py-4 outline-none focus:border-red-500"><option value="all">هەموو ساڵەکان</option>{years.map((y) => <option key={String(y)} value={String(y)}>{y}</option>)}</select>
            <select value={sort} onChange={(e) => setSort(e.target.value)} className="rounded-2xl border border-white/10 bg-zinc-950 px-4 py-4 outline-none focus:border-red-500"><option value="newest">نوێترین</option><option value="oldest">کۆنترین</option><option value="title">بەپێی ناو</option></select>
          </div>
          <div className="mt-4 flex flex-wrap gap-2"><button onClick={reset} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-bold hover:bg-white/10">پاککردنەوەی فلتەرەکان</button><a href="/genres" className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-bold hover:bg-white/10">بینینی جۆرەکان</a><a href="/request" className="rounded-full bg-red-600 px-4 py-2 text-sm font-bold hover:bg-red-500">فیلمێک داوا بکە</a></div>
        </div>
        <div className="mt-8 flex items-center justify-between gap-4"><h2 className="text-2xl font-black">ئەنجامەکان</h2><span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-300">{loading ? '...' : `${filtered.length} دانە`}</span></div>
        {loading ? <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{Array.from({ length: 8 }).map((_, i) => <div key={i} className="aspect-[2/3] animate-pulse rounded-3xl bg-zinc-900" />)}</div> : filtered.length ? <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{filtered.map((movie) => <MovieCard key={movie.id} movie={movie} />)}</div> : <div className="mt-6 rounded-3xl border border-dashed border-white/10 p-14 text-center text-zinc-400">هیچ ئەنجامێک نەدۆزرایەوە.</div>}
      </section>
      <Footer />
      <MobileNav />
    </main>
  );
}
