export default function SearchBox() {
  return (
    <section className="container py-8">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
        <input
          className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none placeholder:text-zinc-400 focus:border-red-500"
          placeholder="گەڕان بە ناوی فیلم، ئەکتەر..."
          type="search"
        />
      </div>
    </section>
  );
}
