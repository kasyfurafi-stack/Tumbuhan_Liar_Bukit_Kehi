import React from 'react';
import { getAssetUrl } from '../utils/asset.js';

export default function PlantCard({ plant, onSelect }) {
  return (
    <div
      onClick={() => onSelect(plant)}
      className="group bg-white rounded-2xl border border-gray-100 hover:border-emerald-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col transform hover:-translate-y-1.5"
    >
      {/* Gambar Tumbuhan */}
      <div className="relative aspect-[4/3] bg-emerald-50/50 overflow-hidden">
        <img
          src={getAssetUrl(plant.gambar)}
          alt={plant.nama_lokal}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
          onError={(e) => {
            // Fallback jika ada gambar belum termuat
            e.currentTarget.src =
              'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?q=80&w=600&auto=format&fit=crop';
          }}
        />
        {plant.kategori && (
          <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-emerald-800 text-[11px] font-semibold px-2.5 py-1 rounded-full shadow-sm">
            {plant.kategori}
          </span>
        )}
      </div>

      {/* Konten Card */}
      <div className="p-4 sm:p-5 flex items-center justify-between mt-auto">
        <div className="min-w-0 pr-3">
          <h3 className="font-bold text-gray-900 text-base sm:text-lg tracking-tight truncate group-hover:text-emerald-700 transition-colors">
            {plant.nama_lokal}
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 italic truncate font-normal mt-0.5">
            ({plant.nama_ilmiah})
          </p>
        </div>

        {/* Tombol Panah Hijau Melingkar (Sesuai Desain Screenshot) */}
        <div className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-emerald-700 text-white flex items-center justify-center group-hover:bg-emerald-600 group-hover:scale-105 transition-all shadow-sm shadow-emerald-900/10">
          <svg
            className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </div>
      </div>
    </div>
  );
}
