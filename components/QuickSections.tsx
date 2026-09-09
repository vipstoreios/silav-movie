import Link from 'next/link';

const items = [
  { title: 'نوێترین فیلمەکان', text: 'دوایین زیادکراوەکان بە خێرایی بدۆزەرەوە', href: '/browse', icon: '🆕' },
  { title: 'ژانەرەکان', text: 'ئاکشن، دراما، کۆمیدی و زیاتر', href: '/genres', icon: '🎭' },
  { title: 'لیستی من', text: 'فیلمە هەڵگیراوەکانت لە یەک شوێن', href: '/watchlist', icon: '♥' },
  { title: 'مێژووی بینین', text: 'لەو شوێنەوە بەردەوامبە کە وەستایت', href: '/history', icon: '◷' },
];

export default function QuickSections() {
  return (
    <section className="container grid gap-4 py-8 sm:grid-cols-2 lg:grid-cols-4" aria-label="بەشە خێراکان">
      {items.map((item) => (
        <Link key={item.title} href={item.href} className="group rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl transition hover:-translate-y-1 hover:border-red-500/40 hover:bg-white/[0.06]">
          <div className="text-2xl">{item.icon}</div>
          <h3 className="mt-4 text-xl font-black">{item.title}</h3>
          <p className="mt-2 text-sm leading-6 text-zinc-400">{item.text}</p>
          <span className="mt-5 inline-block text-sm font-bold text-red-400 transition group-hover:translate-x-1">بینین ←</span>
        </Link>
      ))}
    </section>
  );
}
