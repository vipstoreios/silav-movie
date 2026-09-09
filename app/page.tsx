import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import MovieGrid from '@/components/MovieGrid';
import SearchBox from '@/components/SearchBox';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <SearchBox />
      <MovieGrid />
    </main>
  );
}
