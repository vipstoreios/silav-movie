import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import MovieCard from "@/components/MovieCard";

import SearchBar from "@/components/SearchBar";
import Category from "@/components/Category";
export default function Home() {

  const movies = [
    {
      title: "The Last Kingdom",
      year: "2026",
      image: "https://image.tmdb.org/t/p/w500/example.jpg",
    },
    {
      title: "Dark",
      year: "2025",
      image: "https://image.tmdb.org/t/p/w500/example2.jpg",
    },
    {
      title: "Kurdish Drama",
      year: "2026",
      image: "https://image.tmdb.org/t/p/w500/example3.jpg",
    },
  ];


  return (
    <main>

      <Navbar />

      <Hero />

      <section className="container">

        <h2 className="text-3xl font-bold mb-8">
          نوێترین فیلمەکان 🎥
        </h2>


        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {movies.map((movie)=>(
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
