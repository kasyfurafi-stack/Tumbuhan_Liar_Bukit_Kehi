import React from 'react';

export default function Footer({ onNavigate }) {
  return (
    <footer className="bg-white border-t border-gray-100 py-10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-500 space-y-4">
        {onNavigate && (
          <div className="flex items-center justify-center space-x-6 text-sm">
            <button
              onClick={() => onNavigate('home')}
              className="text-gray-500 hover:text-emerald-700 transition"
            >
              Beranda
            </button>
            <span className="text-gray-300">•</span>
            <button
              onClick={() => onNavigate('tentang')}
              className="text-gray-500 hover:text-emerald-700 transition"
            >
              Tentang Bukit Kehi
            </button>
            <span className="text-gray-300">•</span>
            <button
              onClick={() => onNavigate('jelajah')}
              className="text-gray-500 hover:text-emerald-700 transition"
            >
              Jelajah Tumbuhan
            </button>
            <span className="text-gray-300">•</span>
            <button
              onClick={() => onNavigate('game')}
              className="text-emerald-700 font-semibold hover:text-emerald-900 transition flex items-center gap-1"
            >
              <span>🎮</span> Game 3D
            </button>
          </div>
        )}

        <div className="flex items-center justify-center space-x-2">
          <span className="font-semibold text-emerald-900">Tumbuhan Liar Bukit Kehi</span>
          <span>•</span>
          <span>Pamekasan, Madura</span>
        </div>
        <p className="text-xs text-gray-400">
          Media Pembelajaran & Dokumentasi Keanekaragaman Hayati
        </p>
      </div>
    </footer>
  );
}
