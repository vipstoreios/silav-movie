import Link from 'next/link';
import type { Movie } from '@/lib/types';

export default function MovieCard({ movie }: { movie: Movie }) {
  return (
    <Link
      href={`/watch?id=${encodeURIComponent(movie.id)}`}
      className="group overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/80 transition duration-300 hover:-translate-y-1 hover:border-red-500/40"
    >
      <div className="relative aspect-[2/3] overflow-hidden bg-gradient-to-br from-zinc-800 via-zinc-900 to-black">
        {movie.poster_url ? (
          <img
            src={movie.poster_url}
            alt={movie.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="grid h-full place-items-center">
            <span className="text-6xl opacity-60">🎬</span>
          </div>
        )}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/60 to-transparent p-5 pt-16">
          <p className="text-xs font-bold uppercase tracking-wider text-red-400">
            {movie.categories?.name ?? 'Silav Movie'}
          </p>
          <h3 className="mt-2 line-clamp-2 text-xl font-black">{movie.title}</h3>
          <p className="mt-2 text-sm text-zinc-400">{movie.year ?? '—'} · ژێرنوسی کوردی</p>
        </div>
      </div>
    </Link>
  );
}
