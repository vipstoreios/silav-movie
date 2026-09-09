import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FeatureStrip from '@/components/FeatureStrip';
import QuickSections from '@/components/QuickSections';
import MovieGrid from '@/components/MovieGrid';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <FeatureStrip />
      <QuickSections />
      <MovieGrid />
      <Footer />
    </main>
  );
}
