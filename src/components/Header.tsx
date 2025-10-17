import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Music, Sun, Moon, X } from 'lucide-react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';

const Header: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setIsSearchOpen(false); // Close dropdown after search
    }
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <img src="/logo.svg" alt="Music Discovery Logo" className="h-8 w-8" />
            <span className="hidden sm:block text-xl font-bold text-foreground">Music Discovery</span>
          </Link>

          {/* Desktop Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search for music..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={cn(
                  'w-full pl-10 pr-4 py-2 rounded-full border border-input bg-background',
                  'focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent',
                  'placeholder:text-muted-foreground'
                )}
              />
            </div>
          </form>

          {/* Mobile Search Toggle */}
          <button
            onClick={toggleSearch}
            className={cn(
              'md:hidden p-2 rounded-full hover:bg-accent transition-colors',
              'focus:outline-none focus:ring-2 focus:ring-primary'
            )}
            aria-label="Toggle search"
          >
            {isSearchOpen ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={cn(
              'p-2 rounded-full hover:bg-accent transition-colors',
              'focus:outline-none focus:ring-2 focus:ring-primary'
            )}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Mobile Search Dropdown */}
        {isSearchOpen && (
          <div className="md:hidden pb-4">
            <form onSubmit={handleSearch} className="flex">
              <div className="relative w-full max-w-md mx-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search for music..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={cn(
                    'w-full pl-10 pr-4 py-2 rounded-full border border-input bg-background',
                    'focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent',
                    'placeholder:text-muted-foreground'
                  )}
                  autoFocus
                />
              </div>
            </form>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;