import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FeatureStrip from '@/components/FeatureStrip';
import MovieGrid from '@/components/MovieGrid';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <FeatureStrip />
      <MovieGrid />
      <Footer />
    </main>
  );
}
