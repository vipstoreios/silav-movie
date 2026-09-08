export default function Navbar() {
  return (
    <nav className="container flex justify-between items-center py-6">
      <h1 className="text-3xl font-bold text-red-600">
        Silav Movie 🎬
      </h1>

      <div className="flex gap-6 text-gray-300">
        <a href="/">سەرەتا</a>
        <a href="/movies">فیلم</a>
        <a href="/series">دراما</a>
      </div>
    </nav>
  );
}
