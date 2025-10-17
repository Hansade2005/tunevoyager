import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'next-themes';
import { MusicPlayerProvider } from '@/context/MusicPlayerContext';
import Header from '@/components/Header';
import Home from '@/pages/Home';
import Search from '@/pages/Search';
import MusicPlayer from '@/components/MusicPlayer';
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
              </Routes>
            </main>
            <MusicPlayer />
          </div>
          <Toaster />
        </Router>
      </MusicPlayerProvider>
    </ThemeProvider>
  );
}

export default App;