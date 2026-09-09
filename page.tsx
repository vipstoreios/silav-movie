import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SearchBar from "@/components/SearchBar";
import Category from "@/components/Category";
import MovieCard from "@/components/MovieCard";
import { movies } from "@/lib/movies";


export default function Home() {

  return (
    <main>

      <Navbar />

      <Hero />

      <SearchBar />

      <Category />


      <section className="container">

        <h2 className="text-3xl font-bold mb-8">
          نوێترین فیلمەکان 🎬
        </h2>


        <div className="
          grid
          grid-cols-1
          md:grid-cols-3
          gap-8
        ">

          {movies.map((movie) => (

            <MovieCard
              key={movie.id}
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
