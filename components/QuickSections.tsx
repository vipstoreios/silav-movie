export default function QuickSections() {
  const items = [
    { title: 'نوێترین فیلمەکان', text: 'دوایین زیادکراوەکان بە خێرایی بدۆزەرەوە', href: '#movies' },
    { title: 'بەناوبانگ', text: 'ئەو فیلمانەی زۆر بینراون', href: '#movies' },
    { title: 'ژانەرەکان', text: 'ئاکشن، دراما، کۆمیدی و زیاتر', href: '#movies' },
  ];

  return (
    <section className="container grid gap-4 py-8 md:grid-cols-3">
      {items.map((item) => (
        <a key={item.title} href={item.href} className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl transition hover:-translate-y-1 hover:border-red-500/40">
          <h3 className="text-xl font-black">{item.title}</h3>
          <p className="mt-2 text-zinc-400">{item.text}</p>
          <span className="mt-5 inline-block text-red-400 font-bold">بینین ←</span>
        </a>
      ))}
    </section>
  );
}
