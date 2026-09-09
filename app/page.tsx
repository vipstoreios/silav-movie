import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import MovieGrid from '@/components/MovieGrid';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <MovieGrid />
    </main>
  );
}
