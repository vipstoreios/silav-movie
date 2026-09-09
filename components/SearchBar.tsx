export default function SearchBar() {
  return (
    <div className="container py-6">
      <input
        type="text"
        placeholder="گەڕان بۆ فیلم..."
        className="
        w-full
        bg-zinc-900
        border
        border-zinc-700
        rounded-full
        px-6
        py-4
        text-white
        outline-none
        "
      />
    </div>
  );
}
