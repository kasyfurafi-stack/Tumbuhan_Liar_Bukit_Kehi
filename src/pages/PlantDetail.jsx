import React, { useState } from 'react';
import { getAssetUrl } from '../utils/asset.js';

// Daftar nama taksonomi, ordo, famili, genus, dan nama ilmiah tumbuhan
const SCIENTIFIC_TERMS = [
  // Tingkat Takson (Kingdom, Divisi, Kelas, Ordo, Famili)
  'Plantae',
  'Magnoliophyta',
  'Magnoliopsida',
  'Lamiales',
  'Fabales',
  'Sapindales',
  'Gentianales',
  'Asterales',
  'Malvales',
  'Rosales',
  'Malpighiales',
  'Lamiaceae',
  'Fabaceae',
  'Meliaceae',
  'Rubiaceae',
  'Loganiaceae',
  'Asteraceae',
  'Malvaceae',
  'Acanthaceae',
  'Rosaceae',
  'Phyllanthaceae',
  // Spesies & Genus
  'Salvia misella',
  'Leucas decemdentata',
  'Desmodium adscendens',
  'Desmodium triflorum',
  'Azadirachta indica',
  'Melia azedarach',
  'Oldenlandia corymbosa',
  'Richardia brasiliensis',
  'Spigelia anthelmia',
  'Ageratum conyzoides',
  'Sida javensis',
  'Ruellia tuberosa',
  'Chromolaena odorata',
  'Rubus trivialis',
  'Phyllanthus niruri',
  'Desmodium',
  'Salvia',
  'Leucas',
  'Ruellia',
  'Oldenlandia',
  'Spigelia',
  'Ageratum',
  'Sida',
  'Melia',
  'Richardia',
  'Chromolaena',
  'Rubus',
  'Phyllanthus',
  'Azadirachta'
];

function formatScientificText(text) {
  if (!text || typeof text !== 'string') return text;
  const sorted = [...SCIENTIFIC_TERMS].sort((a, b) => b.length - a.length);
  const regex = new RegExp(`\\b(${sorted.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})\\b`, 'g');
  const elements = [];
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      elements.push(text.slice(lastIndex, match.index));
    }
    elements.push(
      <span key={`${match.index}-${match[0]}`} className="italic">
        {match[0]}
      </span>
    );
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    elements.push(text.slice(lastIndex));
  }

  return elements.length > 0 ? elements : text;
}

export default function PlantDetail({ plant, onBack }) {
  const [activeImage, setActiveImage] = useState(plant?.gambar || '');
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  if (!plant) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <p className="text-gray-500 mb-4">Tumbuhan tidak ditemukan.</p>
        <button
          onClick={onBack}
          className="px-6 py-2 rounded-full bg-emerald-700 text-white text-sm"
        >
          Kembali
        </button>
      </div>
    );
  }

  const imagesList = plant.galeri && plant.galeri.length > 0 ? plant.galeri : [plant.gambar];

  return (
    <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 fade-in">
      {/* Tombol Navigasi Kembali (Sesuai Screenshot 3) */}
      <button
        onClick={onBack}
        className="inline-flex items-center space-x-2 px-5 py-2 rounded-full border border-gray-300 hover:border-emerald-600 bg-white text-gray-700 hover:text-emerald-800 text-sm font-medium shadow-sm hover:shadow transition-all mb-8 group"
      >
        <svg
          className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
        <span>Kembali</span>
      </button>

      {/* Konten Utama Detail (Grid 2 Kolom) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* Kolom Kiri: Visual Gambar & Galeri & Box Habitat */}
        <div className="lg:col-span-5 flex flex-col gap-5">
          {/* Gambar Utama dengan Tombol Zoom */}
          <div className="relative aspect-square rounded-3xl overflow-hidden bg-white border border-gray-100 shadow-md group">
            <img
              src={getAssetUrl(activeImage || plant.gambar)}
              alt={plant.nama_lokal}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
              onClick={() => setIsZoomOpen(true)}
              onError={(e) => {
                e.currentTarget.src =
                  'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?q=80&w=800&auto=format&fit=crop';
              }}
            />
            
            {/* Tombol Zoom di Sudut Kanan Bawah Gambar */}
            <button
              onClick={() => setIsZoomOpen(true)}
              className="absolute bottom-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-md rounded-full shadow-lg flex items-center justify-center text-gray-700 hover:text-emerald-700 hover:bg-white transition transform hover:scale-110"
              title="Perbesar gambar"
              aria-label="Perbesar gambar"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
              </svg>
            </button>
          </div>

          {/* Galeri Thumbnail Kecil */}
          {imagesList.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-1">
              {imagesList.map((imgUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(imgUrl)}
                  className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                    activeImage === imgUrl ? 'border-emerald-600 ring-2 ring-emerald-200' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={getAssetUrl(imgUrl)} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Box Habitat Ekologi Hijau Lembut (Sesuai Desain Screenshot 3) */}
          <div className="bg-emerald-50/70 border border-emerald-100/80 rounded-2xl p-5 flex items-start space-x-3.5 shadow-sm">
            <div className="w-9 h-9 rounded-xl bg-emerald-600/10 text-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21 3C11.5 3 4 10.5 4 20c3.5 0 8.5-1.5 12-5 3.5-3.5 5-8.5 5-12z" />
                <path d="M4 20c2-5 6-9 11-11" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" fill="none" />
              </svg>
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 mb-0.5">Ringkasan Spesies</p>
              <p className="text-xs sm:text-sm text-emerald-950 leading-relaxed font-medium">
                {formatScientificText(plant.deskripsi_singkat || plant.habitat || "Tumbuhan ini banyak ditemukan di area terbuka dan lereng Bukit Kehi. Mampu beradaptasi baik di tanah kering hingga agak lembap.")}
              </p>
            </div>
          </div>
        </div>

        {/* Kolom Kanan: Nama & Informasi Klasifikasi Lengkap */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-gray-100 shadow-sm space-y-7">
          
          {/* Header Nama Tumbuhan */}
          <div>
            {plant.kategori && (
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200 mb-2">
                {plant.kategori}
              </span>
            )}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">
              {plant.nama_lokal}
            </h1>
            <p className="text-lg sm:text-xl text-emerald-600 italic font-semibold mt-1">
              ({plant.nama_ilmiah})
            </p>
          </div>

          {/* Bagian 1: Klasifikasi */}
          {plant.klasifikasi && (
            <div className="space-y-3 pt-2 border-t border-gray-100">
              <div className="flex items-center space-x-2 text-emerald-800 font-bold text-base">
                <span className="p-1 rounded-md bg-emerald-50 text-emerald-700">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                  </svg>
                </span>
                <span>Klasifikasi</span>
              </div>
              <div className="bg-gray-50/70 rounded-2xl p-4 border border-gray-100 grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-6 text-sm">
                <div className="flex"><span className="w-24 text-gray-500 font-normal">Kingdom</span><span className="text-gray-900 font-medium">: <span className="italic">{plant.klasifikasi.kingdom || 'Plantae'}</span></span></div>
                <div className="flex"><span className="w-24 text-gray-500 font-normal">Divisi</span><span className="text-gray-900 font-medium">: <span className="italic">{plant.klasifikasi.divisi || '-'}</span></span></div>
                <div className="flex"><span className="w-24 text-gray-500 font-normal">Kelas</span><span className="text-gray-900 font-medium">: <span className="italic">{plant.klasifikasi.kelas || '-'}</span></span></div>
                <div className="flex"><span className="w-24 text-gray-500 font-normal">Ordo</span><span className="text-gray-900 font-medium">: <span className="italic">{plant.klasifikasi.ordo || '-'}</span></span></div>
                <div className="flex"><span className="w-24 text-gray-500 font-normal">Famili</span><span className="text-gray-900 font-medium">: <span className="italic">{plant.klasifikasi.famili || '-'}</span></span></div>
              </div>
            </div>
          )}

          {/* Bagian 2: Ciri Morfologi (Daun, Batang, Bunga/Buah) */}
          <div className="space-y-3 pt-2 border-t border-gray-100">
            <div className="flex items-center space-x-2 text-emerald-800 font-bold text-base">
              <span className="p-1 rounded-md bg-emerald-50 text-emerald-700">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
              <span>Ciri Morfologi (Daun, Batang, Bunga/Buah)</span>
            </div>
            {Array.isArray(plant.ciri_ciri) && plant.ciri_ciri.length > 0 ? (
              <ul className="space-y-2 text-sm text-gray-700 leading-relaxed pl-1">
                {plant.ciri_ciri.map((item, idx) => (
                  <li key={idx} className="flex items-start space-x-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-2 flex-shrink-0" />
                    <span>{formatScientificText(item)}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-700 leading-relaxed pl-1">
                {formatScientificText(plant.ciri_morfologi || plant.morfologi)}
              </p>
            )}
          </div>

          {/* Bagian 3: Habitat */}
          <div className="space-y-2 pt-2 border-t border-gray-100">
            <div className="flex items-center space-x-2 text-emerald-800 font-bold text-base">
              <span className="p-1 rounded-md bg-emerald-50 text-emerald-700">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918" />
                </svg>
              </span>
              <span>Habitat</span>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed pl-1">
              • {formatScientificText(plant.habitat)}
            </p>
          </div>

          {/* Bagian 4: Peran Ekologis */}
          {plant.peran_ekologis && (
            <div className="space-y-2.5 pt-2 border-t border-gray-100">
              <div className="flex items-center space-x-2 text-emerald-900 font-bold text-base">
                <span className="p-1 rounded-md bg-emerald-100 text-emerald-800">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                  </svg>
                </span>
                <span>Peran Ekologis</span>
              </div>
              <div className="bg-emerald-50/80 border border-emerald-200/80 rounded-2xl p-4 shadow-sm">
                <p className="text-sm text-emerald-950 leading-relaxed font-medium">
                  {formatScientificText(plant.peran_ekologis)}
                </p>
              </div>
            </div>
          )}

          {/* Bagian 5: Konsep Keanekaragaman Hayati */}
          {plant.konsep_keanekaragaman_hayati && (
            <div className="space-y-2.5 pt-2 border-t border-gray-100">
              <div className="flex items-center space-x-2 text-amber-900 font-bold text-base">
                <span className="p-1 rounded-md bg-amber-100 text-amber-800">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.516 0c.85.493 1.508 1.333 1.508 2.316V18" />
                  </svg>
                </span>
                <span>Konsep Keanekaragaman Hayati</span>
              </div>
              <div className="bg-amber-50/80 border border-amber-200/80 rounded-2xl p-4 shadow-sm">
                <p className="text-sm text-amber-950 leading-relaxed font-medium">
                  {formatScientificText(plant.konsep_keanekaragaman_hayati)}
                </p>
              </div>
            </div>
          )}

          {/* Bagian 6: Manfaat */}
          {plant.manfaat && (
            <div className="space-y-2 pt-2 border-t border-gray-100">
              <div className="flex items-center space-x-2 text-emerald-800 font-bold text-base">
                <span className="p-1 rounded-md bg-emerald-50 text-emerald-700">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </span>
                <span>Manfaat</span>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed pl-1">
                • {formatScientificText(plant.manfaat)}
              </p>
            </div>
          )}

          {/* Bagian 5: Ekspedisi & Tautan Web Ilmiah */}
          <div className="pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4 text-xs text-gray-500">
            <div>
              <span>Lokasi: </span>
              <strong className="text-gray-700">{plant.lokasi || 'Kawasan Bukit Kehi'}</strong>
              {plant.tanggal_dokumentasi && (
                <span className="ml-2 text-gray-400">({plant.tanggal_dokumentasi})</span>
              )}
            </div>

            {plant.sumber_web && (
              <a
                href={plant.sumber_web}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1 text-emerald-700 hover:text-emerald-800 font-semibold hover:underline"
              >
                <span>Referensi POWO / Ilmiah</span>
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            )}
          </div>

        </div>
      </div>

      {/* Modal Zoom Gambar Penuh */}
      {isZoomOpen && (
        <div
          onClick={() => setIsZoomOpen(false)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 cursor-zoom-out fade-in"
        >
          <div className="relative max-w-4xl max-h-[90vh]">
            <img
              src={getAssetUrl(activeImage || plant.gambar)}
              alt={plant.nama_lokal}
              className="max-w-full max-h-[85vh] rounded-2xl object-contain shadow-2xl"
            />
            <button
              onClick={() => setIsZoomOpen(false)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 text-sm font-semibold flex items-center space-x-1"
            >
              <span>Tutup [✕]</span>
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
