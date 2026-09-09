'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchBox() {
  const router = useRouter();
  const [query, setQuery] = useState('');

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = query.trim();
    router.push(value ? `/browse?q=${encodeURIComponent(value)}` : '/browse');
  }

  return (
    <section className="container py-8" aria-label="گەڕان">
      <form onSubmit={submit} className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
        <div className="flex flex-col gap-3 sm:flex-row">
          <input value={query} onChange={(event) => setQuery(event.target.value)} className="min-w-0 flex-1 rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none placeholder:text-zinc-400 focus:border-red-500" placeholder="گەڕان بە ناوی فیلم، ئەکتەر..." type="search" aria-label="ناوی فیلم" />
          <button type="submit" className="rounded-2xl bg-red-600 px-7 py-4 font-black transition hover:bg-red-500">گەڕان</button>
        </div>
      </form>
    </section>
  );
}
