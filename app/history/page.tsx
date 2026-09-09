'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MobileNav from '@/components/MobileNav';
import MovieCard from '@/components/MovieCard';
import { getMovies } from '@/lib/movieService';
import type { Movie } from '@/lib/types';

export default function HistoryPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    const ids: string[] = JSON.parse(localStorage.getItem('silav-history') || '[]');
    getMovies().then((all) => {
      const map = new Map(all.map((m) => [m.id, m]));
      setMovies(ids.map((id) => map.get(id)).filter(Boolean) as Movie[]);
    }).finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const clear = () => { localStorage.removeItem('silav-history'); localStorage.removeItem('silav-progress'); setMovies([]); };

  return (
    <main className="min-h-screen pb-24 md:pb-0">
      <Navbar />
      <section className="container py-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div><p className="text-sm font-bold uppercase tracking-[0.25em] text-red-400">History</p><h1 className="mt-2 text-4xl font-black">مێژووی بینین</h1><p className="mt-2 text-zinc-400">ئەو فیلمانەی کە دوایین جار سەردانت کردوون.</p></div>
          {movies.length > 0 && <button onClick={clear} className="rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-bold hover:bg-red-600">پاککردنەوەی مێژوو</button>}
        </div>
        {loading ? <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{Array.from({ length: 4 }).map((_, i) => <div key={i} className="aspect-[2/3] animate-pulse rounded-3xl bg-zinc-900" />)}</div> : movies.length ? <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}</div> : <div className="mt-8 rounded-3xl border border-dashed border-white/10 p-14 text-center text-zinc-400">هێشتا مێژووی بینین نییە.</div>}
      </section>
      <Footer />
      <MobileNav />
    </main>
  );
}
