'use client';

import { useEffect, useRef, useState } from 'react';

export default function VideoPlayer({ movieId, title, src, poster }: { movieId: string; title: string; src: string; poster?: string | null }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [cinema, setCinema] = useState(false);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const saved = Number(localStorage.getItem(`silav-progress:${movieId}`) || '0');
    if (saved > 5) video.currentTime = saved;

    const persist = () => localStorage.setItem(`silav-progress:${movieId}`, String(Math.floor(video.currentTime)));
    const onKey = (event: KeyboardEvent) => {
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) return;
      if (event.code === 'Space') { event.preventDefault(); video.paused ? video.play() : video.pause(); }
      if (event.key === 'ArrowRight') video.currentTime = Math.min(video.duration || Infinity, video.currentTime + 10);
      if (event.key === 'ArrowLeft') video.currentTime = Math.max(0, video.currentTime - 10);
      if (event.key.toLowerCase() === 'm') { video.muted = !video.muted; setMuted(video.muted); }
      if (event.key.toLowerCase() === 'f') video.requestFullscreen?.();
    };

    video.addEventListener('timeupdate', persist);
    window.addEventListener('keydown', onKey);
    return () => {
      persist();
      video.removeEventListener('timeupdate', persist);
      window.removeEventListener('keydown', onKey);
    };
  }, [movieId]);

  return (
    <section className={cinema ? 'fixed inset-0 z-[100] grid place-items-center bg-black p-3 md:p-8' : 'container pb-8'}>
      <div className={`w-full ${cinema ? 'max-w-[1500px]' : ''}`}>
        <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-black shadow-2xl shadow-black/50">
          <video ref={videoRef} src={src} poster={poster || undefined} controls playsInline preload="metadata" className="aspect-video w-full bg-black" aria-label={title} />
        </div>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-sm text-zinc-400">
          <div className="flex flex-wrap gap-2">
            <button onClick={() => setCinema((value) => !value)} className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 font-bold text-zinc-200 transition hover:bg-white/10">{cinema ? 'دەرچوون لە Cinema' : 'Cinema mode'}</button>
            <button onClick={() => { const video = videoRef.current; if (!video) return; video.muted = !video.muted; setMuted(video.muted); }} className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 font-bold text-zinc-200 transition hover:bg-white/10">{muted ? '🔇 بێدەنگ' : '🔊 دەنگ'}</button>
          </div>
          <span>Space: Play/Pause · ← →: 10s · M: Mute · F: Fullscreen</span>
        </div>
      </div>
    </section>
  );
}
