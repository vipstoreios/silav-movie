'use client';

import { FormEvent, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MobileNav from '@/components/MobileNav';

type RequestItem = { id: number; title: string; year: string; note: string; createdAt: string };

export default function RequestPage() {
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [note, setNote] = useState('');
  const [sent, setSent] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    const existing = JSON.parse(localStorage.getItem('silav-movie-requests') || '[]') as RequestItem[];
    existing.unshift({ id: Date.now(), title: title.trim(), year: year.trim(), note: note.trim(), createdAt: new Date().toISOString() });
    localStorage.setItem('silav-movie-requests', JSON.stringify(existing.slice(0, 50)));
    setTitle(''); setYear(''); setNote(''); setSent(true);
    setTimeout(() => setSent(false), 2500);
  };

  return (
    <main className="min-h-screen pb-24 md:pb-0">
      <Navbar />
      <section className="container py-12">
        <div className="mx-auto max-w-3xl rounded-[2rem] border border-white/10 bg-gradient-to-br from-zinc-900/90 via-black to-red-950/30 p-6 md:p-9">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-red-400">Movie request</p>
          <h1 className="mt-2 text-3xl font-black md:text-5xl">فیلمێک داوا بکە</h1>
          <p className="mt-4 leading-7 text-zinc-400">ئەگەر فیلمێک لە Silav Movie نەبوو، ناوی بنووسە. داواکارییەکە لەم ئامێرە پاشەکەوت دەکرێت بۆ بەدواداچوون.</p>
          <form onSubmit={submit} className="mt-8 space-y-4">
            <input required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="ناوی فیلم یان زنجیرە" className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 outline-none focus:border-red-500" />
            <div className="grid gap-4 md:grid-cols-2">
              <input value={year} onChange={(e) => setYear(e.target.value)} placeholder="ساڵ (ئارەزوومەندانە)" className="rounded-2xl border border-white/10 bg-black/40 px-5 py-4 outline-none focus:border-red-500" />
              <input value={note} onChange={(e) => setNote(e.target.value)} placeholder="تێبینی / زمان / ژێرنوس" className="rounded-2xl border border-white/10 bg-black/40 px-5 py-4 outline-none focus:border-red-500" />
            </div>
            <button type="submit" className="w-full rounded-2xl bg-red-600 px-6 py-4 font-black transition hover:bg-red-500">{sent ? '✓ داواکارییەکە تۆمار کرا' : 'ناردنی داواکاری'}</button>
          </form>
        </div>
      </section>
      <Footer />
      <MobileNav />
    </main>
  );
}
