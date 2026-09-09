const items = [
  { title: 'نوێترین زیادکراوەکان', text: 'فیلمە تازەکان بە خێرایی بدۆزەرەوە' },
  { title: 'زۆر بینراوەکان', text: 'هەڵبژاردەی بینەرانی Silav Movie' },
  { title: 'ژێرنوسی کوردی', text: 'چێژ لە فیلمەکان بە زمانی خۆت ببینە' },
];

export default function TrendingSection() {
  return (
    <section className="container py-8">
      <div className="grid gap-4 md:grid-cols-3">
        {items.map((item) => (
          <div key={item.title} className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition hover:-translate-y-1 hover:border-red-500/40">
            <h3 className="text-xl font-black">{item.title}</h3>
            <p className="mt-2 text-zinc-400">{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
