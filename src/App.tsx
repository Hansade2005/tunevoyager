import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'next-themes';
import { MusicPlayerProvider } from '@/context/MusicPlayerContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Home from '@/pages/Home';
import Search from '@/pages/Search';
import TrackDetail from '@/pages/TrackDetail';
import MusicPlayer from '@/components/MusicPlayer';
import FloatingCredit from '@/components/FloatingCredit';
import { Toaster } from '@/components/ui/sonner';

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <MusicPlayerProvider>
        <Router>
          <div className="min-h-screen bg-background text-foreground">
            <Header />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<Search />} />
                <Route path="/track/:id" element={<TrackDetail />} />
              </Routes>
            </main>
            <MusicPlayer />
            <Footer />
            <FloatingCredit />
          </div>
          <Toaster />
        </Router>
      </MusicPlayerProvider>
    </ThemeProvider>
  );
}

export default App;