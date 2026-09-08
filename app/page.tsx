import Navbar from "@/components/Navbar";
import MovieCard from "@/components/MovieCard";

export default function Home() {
  const movies = [
    {
      title: "The Last Kingdom",
      year: "2026",
      image: "https://via.placeholder.com/300x450",
    },
    {
      title: "Dark City",
      year: "2025",
      image: "https://via.placeholder.com/300x450",
    },
    {
      title: "Kurdish Drama",
      year: "2026",
      image: "https://via.placeholder.com/300x450",
    },
  ];

  return (
    <main>
      <Navbar />

      <section>
        <h1>
          Silav Movie 🎬
        </h1>

        <p>
          Kurdish subtitle movies and drama
        </p>

        <div>
          {movies.map((movie) => (
            <MovieCard
              key={movie.title}
              title={movie.title}
              year={movie.year}
              image={movie.image}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
