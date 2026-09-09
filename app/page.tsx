import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import SearchBox from '@/components/SearchBox';
import FeatureStrip from '@/components/FeatureStrip';
import QuickSections from '@/components/QuickSections';
import TrendingSection from '@/components/TrendingSection';
import ContinueWatching from '@/components/ContinueWatching';
import MovieGrid from '@/components/MovieGrid';
import Footer from '@/components/Footer';
import MobileNav from '@/components/MobileNav';

export default function Home() {
  return (
    <main className="min-h-screen pb-24 md:pb-0">
      <Navbar />
      <Hero />
      <SearchBox />
      <FeatureStrip />
      <QuickSections />
      <TrendingSection />
      <ContinueWatching />
      <MovieGrid />
      <Footer />
      <MobileNav />
    </main>
  );
}
