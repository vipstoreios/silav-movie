'use client';

import Link from 'next/link';
import { Suspense, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MobileNav from '@/components/MobileNav';
import MovieCard from '@/components/MovieCard';
import VideoPlayer from '@/components/VideoPlayer';
import { getMovie, getMovies } from '@/lib/movieService';
import type { Movie } from '@/lib/types';

type CommentItem = { id: number; text: string; createdAt: string };

function WatchContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const [movie, setMovie] = useState<Movie | null>(null);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [reported, setReported] = useState(false);

  useEffect(() => {
    let active = true;
    if (!id) { setLoading(false); return; }
    Promise.all([getMovie(id), getMovies()]).then(([row, allMovies]) => {
      if (!active) return;
      setMovie(row); setMovies(allMovies);
      const ids: string[] = JSON.parse(localStorage.getItem('silav-watchlist') || '[]');
      setSaved(ids.includes(id));
      const ratings = JSON.parse(localStorage.getItem('silav-ratings') || '{}');
      setRating(Number(ratings[id] || 0));
      const commentStore = JSON.parse(localStorage.getItem('silav-comments') || '{}');
      setComments(commentStore[id] || []);
      const history: string[] = JSON.parse(localStorage.getItem('silav-history') || '[]');
      localStorage.setItem('silav-history', JSON.stringify([id, ...history.filter((x) => x !== id)].slice(0, 50)));
    }).catch((reason: unknown) => { if (active) setError(reason instanceof Error ? reason.message : 'نەتوانرا فیلمەکە باربکرێت.'); }).finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [id]);

  const related = useMemo(() => movie ? movies.filter((item) => item.id !== movie.id && item.category_id === movie.category_id).slice(0, 4) : [], [movie, movies]);

  function toggleWatchlist() {
    if (!movie) return;
    const ids: string[] = JSON.parse(localStorage.getItem('silav-watchlist') || '[]');
    const next = ids.includes(movie.id) ? ids.filter((item) => item !== movie.id) : [...ids, movie.id];
    localStorage.setItem('silav-watchlist', JSON.stringify(next)); setSaved(next.includes(movie.id));
  }

  function rate(value: number) {
    if (!movie) return;
    const ratings = JSON.parse(localStorage.getItem('silav-ratings') || '{}');
    ratings[movie.id] = value; localStorage.setItem('silav-ratings', JSON.stringify(ratings)); setRating(value);
  }

  function addComment() {
    if (!movie || !comment.trim()) return;
    const item = { id: Date.now(), text: comment.trim(), createdAt: new Date().toISOString() };
    const next = [item, ...comments].slice(0, 30);
    const store = JSON.parse(localStorage.getItem('silav-comments') || '{}'); store[movie.id] = next;
    localStorage.setItem('silav-comments', JSON.stringify(store)); setComments(next); setComment('');
  }

  async function shareMovie() {
    if (!movie) return;
    const url = window.location.href;
    if (navigator.share) { await navigator.share({ title: movie.title, text: `${movie.title} - Silav Movie`, url }); return; }
    await navigator.clipboard.writeText(url); setCopied(true); setTimeout(() => setCopied(false), 1800);
  }

  function reportProblem() {
    if (!movie) return;
    const reports = JSON.parse(localStorage.getItem('silav-reports') || '[]');
    reports.unshift({ movieId: movie.id, title: movie.title, createdAt: new Date().toISOString() });
    localStorage.setItem('silav-reports', JSON.stringify(reports.slice(0, 50))); setReported(true);
  }

  if (loading) return <div className="container py-24 text-center text-zinc-400">فیلمەکە بار دەبێت...</div>;
  if (error || !movie) return <div className="container py-24 text-center"><div className="text-6xl">🎞️</div><h1 className="mt-5 text-3xl font-black">فیلمەکە نەدۆزرایەوە</h1>{error && <p className="mt-3 text-zinc-500">{error}</p>}<Link href="/" className="mt-6 inline-block rounded-full bg-red-600 px-6 py-3 font-bold">گەڕانەوە بۆ سەرەتا</Link></div>;

  return <>
    {movie.video_url && <div id="player" className="pt-6"><VideoPlayer movieId={movie.id} title={movie.title} src={movie.video_url} poster={movie.poster_url} /></div>}

    <section className="container py-8 md:py-12">
      <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-950/80 p-5 shadow-2xl shadow-black/40 md:p-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(220,38,38,0.16),transparent_28rem)]" />
        <div className="relative grid gap-8 lg:grid-cols-[320px_1fr]">
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-zinc-900 shadow-2xl shadow-black/30">{movie.poster_url ? <img src={movie.poster_url} alt={movie.title} className="aspect-[2/3] h-full w-full object-cover" /> : <div className="grid aspect-[2/3] place-items-center bg-gradient-to-br from-zinc-800 to-black text-7xl">🎬</div>}</div>
          <div className="flex flex-col justify-center">
            <div className="flex flex-wrap items-center gap-2 text-sm font-bold"><span className="rounded-full bg-red-600/15 px-3 py-1 text-red-300">{movie.categories?.name ?? 'Silav Movie'}</span><span className="rounded-full bg-white/5 px-3 py-1 text-zinc-300">{movie.year ?? '—'}</span><span className="rounded-full bg-white/5 px-3 py-1 text-zinc-300">ژێرنوسی کوردی</span></div>
            <h1 className="mt-5 text-4xl font-black leading-tight md:text-6xl">{movie.title}</h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-zinc-300 md:text-lg">{movie.description ?? 'وردەکاری زیاتر بەم زووانە زیاد دەکرێت.'}</p>
            <div className="mt-6 flex items-center gap-1"><span className="ml-2 text-sm font-bold text-zinc-400">هەڵسەنگاندنی تۆ:</span>{[1,2,3,4,5].map((v) => <button key={v} onClick={() => rate(v)} className={`text-2xl transition hover:scale-110 ${v <= rating ? 'text-yellow-400' : 'text-zinc-700'}`}>★</button>)}</div>
            <div className="mt-8 flex flex-wrap gap-3">
              {movie.video_url && <a href="#player" className="rounded-full bg-red-600 px-6 py-3 font-bold shadow-lg shadow-red-950/40 transition hover:bg-red-500">▶ دەستپێکردنی بینین</a>}
              {movie.trailer_url && <a href={movie.trailer_url} target="_blank" rel="noreferrer" className="rounded-full border border-white/15 bg-white/[0.04] px-6 py-3 font-bold hover:bg-white/10">تریلەر</a>}
              {movie.subtitle_url && <a href={movie.subtitle_url} target="_blank" rel="noreferrer" className="rounded-full border border-white/15 bg-white/[0.04] px-6 py-3 font-bold hover:bg-white/10">ژێرنوس</a>}
              <button onClick={toggleWatchlist} className="rounded-full border border-white/15 bg-white/[0.04] px-6 py-3 font-bold hover:bg-white/10">{saved ? '♥ لە لیستی منە' : '♡ زیادکردن بۆ لیستی من'}</button>
              <button onClick={shareMovie} className="rounded-full border border-white/15 bg-white/[0.04] px-6 py-3 font-bold hover:bg-white/10">{copied ? 'لینک کۆپی کرا' : '↗ هاوبەشکردن'}</button>
              <button onClick={reportProblem} className="rounded-full border border-white/15 bg-white/[0.04] px-6 py-3 font-bold hover:bg-white/10">{reported ? '✓ تۆمار کرا' : '⚑ کێشەیەک هەیە'}</button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="container pb-12"><div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 md:p-7"><h2 className="text-2xl font-black">کۆمێنت و ڕا</h2><div className="mt-5 flex gap-3"><input value={comment} onChange={(e) => setComment(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') addComment(); }} placeholder="ڕای خۆت بنووسە..." className="min-w-0 flex-1 rounded-2xl border border-white/10 bg-black/40 px-4 py-3 outline-none focus:border-red-500" /><button onClick={addComment} className="rounded-2xl bg-red-600 px-5 font-bold hover:bg-red-500">ناردن</button></div><div className="mt-5 space-y-3">{comments.length ? comments.map((c) => <div key={c.id} className="rounded-2xl bg-white/[0.04] p-4"><p className="leading-7 text-zinc-200">{c.text}</p><small className="mt-2 block text-zinc-500">{new Date(c.createdAt).toLocaleDateString('ku')}</small></div>) : <p className="text-sm text-zinc-500">هێشتا کۆمێنت نییە.</p>}</div></div></section>

    {related.length > 0 && <section className="container pb-16"><div className="mb-6 flex items-end justify-between gap-4"><div><p className="text-sm font-bold uppercase tracking-[0.25em] text-red-400">More like this</p><h2 className="mt-2 text-3xl font-black">فیلمی پەیوەندیدار</h2></div><Link href="/browse" className="text-sm font-bold text-zinc-300 hover:text-white">هەموو فیلمەکان</Link></div><div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{related.map((item) => <MovieCard key={item.id} movie={item} />)}</div></section>}
  </>;
}

export default function WatchPage() {
  return <main className="min-h-screen pb-24 md:pb-0"><Navbar /><Suspense fallback={<div className="container py-24 text-center text-zinc-400">بار دەبێت...</div>}><WatchContent /></Suspense><Footer /><MobileNav /></main>;
}
