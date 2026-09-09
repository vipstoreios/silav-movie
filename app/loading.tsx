export default function Loading() {
  return (
    <main className="grid min-h-screen place-items-center bg-black text-white" dir="rtl">
      <div className="text-center">
        <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-white/20 border-t-red-600" />
        <p className="font-bold text-zinc-300">تکایە چاوەڕێ بکە...</p>
      </div>
    </main>
  );
}
