import Link from 'next/link';

export default function AdminLogin() {
  return (
    <main className="grid min-h-screen place-items-center bg-black p-6 text-white">
      <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-zinc-950 p-8 text-center">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-red-600 text-xl font-black">S</div>
        <h1 className="mt-6 text-3xl font-black">Admin access is not enabled yet</h1>
        <p className="mt-4 leading-7 text-zinc-400">
          A real Supabase Auth administrator account and admin-only RLS policies must be configured before write access is exposed.
        </p>
        <Link href="/" className="mt-7 inline-flex rounded-full bg-red-600 px-6 py-3 font-bold hover:bg-red-500">
          گەڕانەوە بۆ وێبسایت
        </Link>
      </div>
    </main>
  );
}
