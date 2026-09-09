'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MobileNav from '@/components/MobileNav';

export default function ProfilePage() {
  const [name, setName] = useState('میوان');
  const [lang, setLang] = useState('ku');
  const [autoplay, setAutoplay] = useState(true);
  const [quality, setQuality] = useState('auto');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem('silav-settings');
    if (!raw) return;
    try {
      const s = JSON.parse(raw);
      if (s.name) setName(s.name);
      if (s.lang) setLang(s.lang);
      if (typeof s.autoplay === 'boolean') setAutoplay(s.autoplay);
      if (s.quality) setQuality(s.quality);
    } catch {}
  }, []);

  const save = () => {
    localStorage.setItem('silav-settings', JSON.stringify({ name, lang, autoplay, quality }));
    setSaved(true);
    setTimeout(() => setSaved(false), 1800);
  };

  return (
    <main className="min-h-screen pb-24 md:pb-0">
      <Navbar />
      <section className="container py-10">
        <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
          <aside className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
            <div className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-gradient-to-br from-red-500 to-red-900 text-3xl font-black">{name.slice(0, 1) || 'S'}</div>
            <h1 className="mt-4 text-center text-2xl font-black">{name}</h1>
            <p className="mt-2 text-center text-sm text-zinc-400">ڕێکخستنەکانی Silav Movie</p>
            <div className="mt-6 space-y-2 text-sm text-zinc-300">
              <a href="/watchlist" className="block rounded-xl bg-white/5 px-4 py-3 hover:bg-white/10">♡ لیستی من</a>
              <a href="/browse" className="block rounded-xl bg-white/5 px-4 py-3 hover:bg-white/10">⌕ گەڕانی پێشکەوتوو</a>
              <a href="/request" className="block rounded-xl bg-white/5 px-4 py-3 hover:bg-white/10">＋ داواکاری فیلم</a>
            </div>
          </aside>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 md:p-8">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-red-400">Settings</p>
            <h2 className="mt-2 text-3xl font-black">ڕێکخستنەکان</h2>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              <label className="space-y-2"><span className="text-sm font-bold">ناوی پیشاندان</span><input value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3.5 outline-none focus:border-red-500" /></label>
              <label className="space-y-2"><span className="text-sm font-bold">زمان</span><select value={lang} onChange={(e) => setLang(e.target.value)} className="w-full rounded-2xl border border-white/10 bg-zinc-950 px-4 py-3.5 outline-none"><option value="ku">کوردی</option><option value="ar">العربية</option><option value="en">English</option></select></label>
              <label className="space-y-2"><span className="text-sm font-bold">کوالێتی بنەڕەتی</span><select value={quality} onChange={(e) => setQuality(e.target.value)} className="w-full rounded-2xl border border-white/10 bg-zinc-950 px-4 py-3.5 outline-none"><option value="auto">Auto</option><option value="720">720p</option><option value="1080">1080p</option><option value="4k">4K</option></select></label>
              <label className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/30 px-4 py-4"><span><b className="block">Autoplay</b><small className="text-zinc-500">دەستپێکردنی خۆکارانە</small></span><input type="checkbox" checked={autoplay} onChange={(e) => setAutoplay(e.target.checked)} className="h-5 w-5" /></label>
            </div>
            <button onClick={save} className="mt-7 rounded-full bg-red-600 px-6 py-3 font-bold transition hover:bg-red-500">{saved ? '✓ پاشەکەوت کرا' : 'پاشەکەوتکردن'}</button>
          </div>
        </div>
      </section>
      <Footer />
      <MobileNav />
    </main>
  );
}
