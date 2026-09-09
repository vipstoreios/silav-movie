'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MobileNav from '@/components/MobileNav';
import { getCategories, getMovies } from '@/lib/movieService';
import type { Category, Movie } from '@/lib/types';

export default function GenresPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => { Promise.all([getCategories(), getMovies()]).then(([c, m]) => { setCategories(c); setMovies(m); }).catch(() => {}); }, []);

  return (
    <main className="min-h-screen pb-24 md:pb-0">
      <Navbar />
      <section className="container py-12">
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-red-400">Genres</p>
        <h1 className="mt-2 text-4xl font-black md:text-5xl">جۆرەکان</h1>
        <p className="mt-3 max-w-2xl text-zinc-400">بەپێی جۆری فیلم، ناوەڕۆکە دڵخوازەکەت خێراتر بدۆزەوە.</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {categories.map((category, index) => {
            const count = movies.filter((m) => m.category_id === category.id).length;
            return (
              <Link key={category.id} href={`/browse?category=${encodeURIComponent(category.id)}`} className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-6 transition hover:-translate-y-1 hover:border-red-500/40">
                <div className="absolute -left-8 -top-8 h-28 w-28 rounded-full bg-red-600/10 blur-2xl transition group-hover:bg-red-600/20" />
                <span className="relative text-xs font-bold text-red-400">#{String(index + 1).padStart(2, '0')}</span>
                <h2 className="relative mt-5 text-2xl font-black">{category.name}</h2>
                <p className="relative mt-2 text-sm text-zinc-400">{count} فیلم</p>
                <span className="relative mt-6 inline-flex rounded-full bg-white/5 px-4 py-2 text-sm font-bold transition group-hover:bg-red-600">بینینی فیلمەکان ←</span>
              </Link>
            );
          })}
        </div>
      </section>
      <Footer />
      <MobileNav />
    </main>
  );
}
