import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FeatureStrip from '@/components/FeatureStrip';
import QuickSections from '@/components/QuickSections';
import TrendingSection from '@/components/TrendingSection';
import MovieGrid from '@/components/MovieGrid';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <FeatureStrip />
      <QuickSections />
      <TrendingSection />
      <MovieGrid />
      <Footer />
    </main>
  );
}
