import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import MovieGrid from '@/components/MovieGrid';
import { getCategories, getMovies } from '@/lib/movieService';

export const revalidate = 60;

export default async function Home() {
  const [movies, categories] = await Promise.all([getMovies(), getCategories()]);

  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <MovieGrid movies={movies} categories={categories} />
    </main>
  );
}
