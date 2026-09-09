'use client';

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <main className="grid min-h-screen place-items-center bg-black px-6 text-center text-white" dir="rtl">
      <div>
        <h1 className="mb-3 text-3xl font-black">کێشەیەک ڕوویدا</h1>
        <p className="mb-6 text-zinc-400">تکایە دووبارە هەوڵ بدە.</p>
        <button onClick={reset} className="rounded-xl bg-red-600 px-5 py-3 font-bold hover:bg-red-500">
          دووبارە هەوڵدانەوە
        </button>
      </div>
    </main>
  );
}
