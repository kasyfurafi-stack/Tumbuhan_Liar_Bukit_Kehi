import React, { useState, useMemo } from 'react';
import PlantCard from '../components/PlantCard.jsx';

export default function Explore({ plants = [], onSelectPlant }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');

  // Kategori unik untuk filter
  const categories = useMemo(() => {
    const list = ['Semua'];
    plants.forEach((p) => {
      if (p.kategori && !list.includes(p.kategori)) {
        list.push(p.kategori);
      }
    });
    return list;
  }, [plants]);

  // Filter data berdasarkan kata kunci pencarian dan kategori
  const filteredPlants = useMemo(() => {
    return plants.filter((plant) => {
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        plant.nama_lokal?.toLowerCase().includes(q) ||
        plant.nama_ilmiah?.toLowerCase().includes(q) ||
        plant.morfologi?.toLowerCase().includes(q) ||
        plant.habitat?.toLowerCase().includes(q);

      const matchCategory =
        selectedCategory === 'Semua' || plant.kategori === selectedCategory;

      return matchSearch && matchCategory;
    });
  }, [plants, searchQuery, selectedCategory]);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 fade-in">
      {/* Header Halaman & Kolom Pencarian (Sesuai Screenshot 2) */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 pb-4 border-b border-gray-100">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-emerald-950 tracking-tight mb-2">
            Jelajah Tumbuhan Liar
          </h1>
          <p className="text-sm sm:text-base text-gray-500">
            Pilih salah satu tumbuhan untuk melihat informasi lebih lengkap.
          </p>
        </div>

        {/* Input Pencarian dengan Ikon Daun Dekoratif */}
        <div className="relative flex items-center max-w-md w-full">
          <div className="relative w-full">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari nama tumbuhan..."
              className="w-full pl-11 pr-10 py-2.5 bg-white border border-gray-200 rounded-full text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 shadow-sm transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* Aksen Daun Dekoratif Sisi Kanan Input */}
          <div className="hidden sm:block ml-3 text-emerald-600/70 flex-shrink-0" title="Flora Bukit Kehi">
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 2L13.5 7C14.5 10 18 11.5 21 12C18 12.5 14.5 14 13.5 17L12 22L10.5 17C9.5 14 6 12.5 3 12C6 11.5 9.5 10 10.5 7L12 2Z" fill="currentColor" fillOpacity="0.15" />
            </svg>
          </div>
        </div>
      </div>

      {/* Filter Kategori Chips */}
      {categories.length > 1 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-emerald-700 text-white shadow-sm shadow-emerald-900/20'
                  : 'bg-white border border-gray-200 text-gray-600 hover:border-emerald-300 hover:text-emerald-700'
              }`}
            >
              {cat}
            </button>
          ))}
          <span className="text-xs text-gray-400 ml-auto whitespace-nowrap hidden sm:inline">
            Menampilkan {filteredPlants.length} tumbuhan
          </span>
        </div>
      )}

      {/* Grid Kartu Tumbuhan (5 Kolom sesuai tangkapan layar) */}
      {filteredPlants.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {filteredPlants.map((plant) => (
            <PlantCard
              key={plant.id || plant.nama_lokal}
              plant={plant}
              onSelect={onSelectPlant}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center border border-dashed border-gray-200 max-w-lg mx-auto my-12">
          <div className="w-14 h-14 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-600">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-1">Tumbuhan tidak ditemukan</h3>
          <p className="text-sm text-gray-500 mb-6">
            Tidak ada tumbuhan yang cocok dengan pencarian "{searchQuery}".
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('Semua');
            }}
            className="px-5 py-2 rounded-full bg-emerald-700 text-white text-xs font-semibold hover:bg-emerald-600 transition"
          >
            Reset Pencarian
          </button>
        </div>
      )}
    </section>
  );
}
