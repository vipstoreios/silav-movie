const features = [
  ['⚡', 'خێرا و سادە', 'گەیشتن بە فیلم بە کەمترین هەنگاو'],
  ['🎬', 'ژێرنوسی کوردی', 'ناوەڕۆکی ڕێکخراو بۆ بینەری کورد'],
  ['♡', 'لیستی دڵخواز', 'فیلمە دڵخوازەکانت لە ئامێرەکەت هەڵبگرە'],
  ['📱', 'گونجاو بۆ موبایل', 'دیزاینی responsive بۆ مۆبایل و کۆمپیوتەر'],
];

export default function FeatureStrip() {
  return (
    <section className="container pb-10" id="categories">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {features.map(([icon, title, text]) => (
          <div key={title} className="rounded-3xl border border-white/10 bg-white/[0.035] p-5 backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-white/[0.055]">
            <div className="text-3xl">{icon}</div>
            <h3 className="mt-4 font-black">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-zinc-400">{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
