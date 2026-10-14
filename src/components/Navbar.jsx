import React, { useState } from 'react';

export default function Navbar({ activePage = 'home', onNavigate }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (page) => {
    if (onNavigate) onNavigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-sm fixed w-full z-50 top-0 border-b border-gray-100 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Brand Logo */}
          <div 
            onClick={() => handleNav('home')}
            className="flex items-center space-x-2.5 cursor-pointer select-none group"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-700 group-hover:bg-emerald-100 transition">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21 3C11.5 3 4 10.5 4 20c3.5 0 8.5-1.5 12-5 3.5-3.5 5-8.5 5-12z" />
                <path d="M4 20c2-5 6-9 11-11" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" fill="none" />
              </svg>
            </div>
            <span className="font-bold text-lg text-emerald-950 tracking-tight">
              Tumbuhan Liar Bukit Kehi
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => handleNav('home')}
              className={`font-medium text-sm pb-1 transition border-b-2 ${
                activePage === 'home'
                  ? 'border-emerald-700 text-emerald-800'
                  : 'border-transparent text-gray-500 hover:text-emerald-700'
              }`}
            >
              Beranda
            </button>
            <button
              onClick={() => handleNav('tentang')}
              className={`font-medium text-sm pb-1 transition border-b-2 ${
                activePage === 'tentang'
                  ? 'border-emerald-700 text-emerald-800'
                  : 'border-transparent text-gray-500 hover:text-emerald-700'
              }`}
            >
              Tentang
            </button>
            <button
              onClick={() => handleNav('jelajah')}
              className={`font-medium text-sm pb-1 transition border-b-2 ${
                activePage === 'jelajah'
                  ? 'border-emerald-700 text-emerald-800'
                  : 'border-transparent text-gray-500 hover:text-emerald-700'
              }`}
            >
              Jelajah Tumbuhan
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="p-2 rounded-lg text-gray-600 hover:text-emerald-700 hover:bg-gray-100 focus:outline-none transition"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 px-4 pt-2 pb-4 space-y-2 shadow-lg">
          <button
            onClick={() => handleNav('home')}
            className={`w-full text-left px-3 py-2 rounded-md font-medium text-sm transition ${
              activePage === 'home'
                ? 'bg-emerald-50 text-emerald-800 font-semibold'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            Beranda
          </button>
          <button
            onClick={() => handleNav('tentang')}
            className={`w-full text-left px-3 py-2 rounded-md font-medium text-sm transition ${
              activePage === 'tentang'
                ? 'bg-emerald-50 text-emerald-800 font-semibold'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            Tentang
          </button>
          <button
            onClick={() => handleNav('jelajah')}
            className={`w-full text-left px-3 py-2 rounded-md font-medium text-sm transition ${
              activePage === 'jelajah'
                ? 'bg-emerald-50 text-emerald-800 font-semibold'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            Jelajah Tumbuhan
          </button>
        </div>
      )}
    </nav>
  );
}
