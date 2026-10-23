import React from 'react';

export default function Home({ onExplore, onAbout, onPlayGame }) {
  return (
    <div className="fade-in">
      {/* Hero Section */}
      <section className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden">
        {/* Background Video with Nature Aesthetic */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover object-center"
            poster="https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?q=80&w=2000&auto=format&fit=crop"
          >
            <source src="/video.mp4" type="video/mp4" />
            <img
              src="https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?q=80&w=2000&auto=format&fit=crop"
              alt="Pemandangan Bukit Kehi"
              className="w-full h-full object-cover object-center"
            />
          </video>
          {/* Dark gradient overlay for contrast & legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
        </div>

        {/* Main Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 md:py-24">
          <div className="max-w-2xl text-white space-y-6">
            <div className="inline-flex items-center space-x-2 bg-emerald-500/20 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium text-emerald-300 border border-emerald-400/30">
              <span>Desa Kertagena Daya, Pamekasan, Madura</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight sm:leading-tight">
              Jelajahi Keanekaragaman Tumbuhan Liar di Bukit Kehi
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-gray-200 font-normal leading-relaxed">
              Kenali berbagai tumbuhan liar yang tumbuh di kawasan Bukit Kehi, Pamekasan, dan pelajari keunikannya melalui media pembelajaran dan mini game 3D interaktif.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onExplore}
                className="inline-flex items-center space-x-2.5 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-semibold text-base py-3.5 px-8 rounded-full shadow-lg shadow-emerald-950/20 hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-black"
              >
                <span>Mulai Eksplorasi</span>
                <svg
                  className="w-4 h-4 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </button>

              {onPlayGame && (
                <button
                  onClick={onPlayGame}
                  className="inline-flex items-center space-x-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 active:scale-95 text-slate-950 font-bold text-base py-3.5 px-7 rounded-full shadow-lg shadow-amber-900/30 transition-all duration-200 transform hover:-translate-y-0.5"
                >
                  <span className="text-xl">🎮</span>
                  <span>Mainkan Game 3D</span>
                </button>
              )}

              {onAbout && (
                <button
                  onClick={onAbout}
                  className="inline-flex items-center space-x-2 bg-white/15 hover:bg-white/25 backdrop-blur-md text-white font-semibold text-base py-3.5 px-7 rounded-full border border-white/25 hover:border-white/40 shadow-sm transition-all duration-200"
                >
                  <span>Mengenal Bukit Kehi</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Location Badge (Bottom Right) */}
        <div className="absolute bottom-6 right-6 z-10 flex items-center space-x-1.5 bg-black/40 backdrop-blur-sm px-3.5 py-1.5 rounded-full border border-white/10 text-white/90 text-xs sm:text-sm">
          <svg
            className="w-4 h-4 text-emerald-400"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z"
            />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>Bukit Kehi, Pamekasan</span>
        </div>

        {/* Scroll Indicator (Bottom Center) */}
        <div className="hidden sm:flex absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex-col items-center opacity-70">
          <div className="w-5 h-8 border-2 border-white/60 rounded-full flex justify-center pt-1.5">
            <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* Seksi Ringkasan Mengenal Bukit Kehi */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 border-b border-gray-100">
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center space-x-2 text-emerald-700 font-semibold text-xs uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full mb-3">
            <span>Destinasi Wisata & Edukasi Hayati</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-emerald-950 tracking-tight mb-4">
            Mengenal Bukit Kehi Pamekasan
          </h2>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
            Bukit Kehi merupakan salah satu destinasi wisata alam yang terletak di <strong>Dusun Moccol, Desa Kertagena Daya, Kecamatan Kadur, Kabupaten Pamekasan, Madura, Jawa Timur</strong>. Kawasan ini menawarkan panorama perbukitan dan pemandangan alam pedesaan yang menjadi daya tarik bagi pengunjung.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:border-emerald-200 transition">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold mb-4">
              01
            </div>
            <h3 className="text-lg font-bold text-emerald-950 mb-2">
              Asal-usul Nama *Kehi*
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Nama <em>Kehi</em> dikenal sebagai istilah untuk lahan kosong atau tak bertuan, yang kini bertransformasi menjadi objek wisata berkat inisiatif pemerintah desa, pemuda Karang Taruna, dan Pokdarwis.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:border-emerald-200 transition">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold mb-4">
              02
            </div>
            <h3 className="text-lg font-bold text-emerald-950 mb-2">
              Fasilitas Lengkap
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Dilengkapi berbagai fasilitas seperti spot swafoto berlatar panorama alam, warung tempat makan santai, musala yang nyaman, serta area parkir yang tertata rapi.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:border-emerald-200 transition">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold mb-4">
              03
            </div>
            <h3 className="text-lg font-bold text-emerald-950 mb-2">
              Ruang Pembelajaran Alam
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Bukit Kehi menjadi sarana pembelajaran dan dokumentasi keanekaragaman tumbuhan liar Madura, morfologi daun, serta karakteristik habitat alaminya.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          {onAbout && (
            <button
              onClick={onAbout}
              className="inline-flex items-center space-x-2 bg-emerald-700 hover:bg-emerald-800 text-white font-medium text-sm sm:text-base py-3 px-6 rounded-full shadow-sm hover:shadow transition"
            >
              <span>Baca Selengkapnya Tentang Bukit Kehi</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          )}
          <button
            onClick={onExplore}
            className="inline-flex items-center space-x-2 text-emerald-800 hover:text-emerald-950 font-medium text-sm sm:text-base py-3 px-6 rounded-full hover:bg-emerald-50 transition"
          >
            <span>Jelajahi Koleksi Tumbuhan</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </section>

      {/* Seksi Fitur Mini Game 3D */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 text-white p-8 sm:p-12 lg:p-16 border border-emerald-500/30 shadow-2xl">
          {/* Ambient glow effects */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-emerald-500/20 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-amber-500/15 blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center space-x-2 bg-emerald-500/20 border border-emerald-400/30 px-3.5 py-1.5 rounded-full text-xs font-semibold text-emerald-300">
                <span className="text-amber-400">★</span>
                <span>Fitur Baru: Game Edukasi 3D Interaktif</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
                Petualang Cilik: Eksplorasi Flora Bukit Kehi 3D
              </h2>

              <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
                Jelajahi lanskap alam 3D bersama <strong>Bimo si Penjelajah</strong>! Telusuri jalan setapak, dekati berbagai tanaman liar, pelajari ciri morfologinya, dan catat temuanmu ke dalam <em>Jurnal Flora</em>.
              </p>

              {/* Fitur Utama */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="flex items-start space-x-3 bg-white/5 rounded-2xl p-4 border border-white/10">
                  <span className="text-2xl">🌿</span>
                  <div>
                    <h4 className="font-bold text-sm text-emerald-300">Deteksi Flora Otomatis</h4>
                    <p className="text-xs text-slate-400 mt-0.5">Dekati tanaman untuk membuka pop-up ensiklopedia & audio.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 bg-white/5 rounded-2xl p-4 border border-white/10">
                  <span className="text-2xl">🗺️</span>
                  <div>
                    <h4 className="font-bold text-sm text-emerald-300">Radar & Mini-Map</h4>
                    <p className="text-xs text-slate-400 mt-0.5">Pantau posisi tanaman terdekat dengan radar kompas real-time.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 bg-white/5 rounded-2xl p-4 border border-white/10">
                  <span className="text-2xl">🕹️</span>
                  <div>
                    <h4 className="font-bold text-sm text-emerald-300">Joystick & Keyboard</h4>
                    <p className="text-xs text-slate-400 mt-0.5">Dukungan penuh kontrol PC (WASD/Spasi) dan HP (Touch Joystick).</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 bg-white/5 rounded-2xl p-4 border border-white/10">
                  <span className="text-2xl">📖</span>
                  <div>
                    <h4 className="font-bold text-sm text-emerald-300">Jurnal Flora Lengkap</h4>
                    <p className="text-xs text-slate-400 mt-0.5">Kumpulkan 15 spesies tumbuhan liar asli sesuai materi pembelajaran.</p>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              {onPlayGame && (
                <div className="pt-4 flex flex-wrap items-center gap-4">
                  <button
                    onClick={onPlayGame}
                    className="inline-flex items-center space-x-3 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-slate-950 font-extrabold text-base py-4 px-8 rounded-full shadow-lg shadow-emerald-500/25 transition-all duration-200 transform hover:-translate-y-0.5 active:scale-95 cursor-pointer"
                  >
                    <span className="text-xl">🎮</span>
                    <span>Mulai Mainkan Game 3D</span>
                  </button>

                  <a
                    href="/game.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 text-xs sm:text-sm text-slate-300 hover:text-white underline underline-offset-4"
                  >
                    <span>Buka Layar Penuh di Tab Baru ↗</span>
                  </a>
                </div>
              )}
            </div>

            {/* Visual Box / Card Preview */}
            <div className="lg:col-span-5">
              <div className="bg-slate-800/80 rounded-2xl p-6 border border-emerald-500/30 shadow-xl backdrop-blur-md relative overflow-hidden">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500"></span>
                    <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                    <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                  </div>
                  <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                    Three.js 3D WebGL
                  </span>
                </div>

                {/* Game mockup card */}
                <div className="bg-gradient-to-b from-teal-500 to-emerald-800 rounded-xl p-8 text-center text-white relative shadow-inner">
                  <div className="text-6xl mb-3 animate-bounce">🔬</div>
                  <h3 className="font-bold text-xl drop-shadow">Peneliti Muda Bukit Kehi</h3>
                  <p className="text-xs text-emerald-100 mt-1 max-w-xs mx-auto drop-shadow">
                    "Bawa kaca pembesar 3D dan temukan 15 spesies flora liar asli lereng Bukit Kehi!"
                  </p>

                  <div className="mt-6 flex flex-wrap justify-center gap-1.5">
                    <span className="bg-black/30 backdrop-blur-sm text-indigo-200 text-[11px] px-2.5 py-1 rounded-full border border-white/20">🌿 Sage Liar</span>
                    <span className="bg-black/30 backdrop-blur-sm text-amber-200 text-[11px] px-2.5 py-1 rounded-full border border-white/20">🌳 Pohon Mimba</span>
                    <span className="bg-black/30 backdrop-blur-sm text-purple-200 text-[11px] px-2.5 py-1 rounded-full border border-white/20">🌺 Pletekan</span>
                    <span className="bg-black/30 backdrop-blur-sm text-emerald-200 text-[11px] px-2.5 py-1 rounded-full border border-white/20">🌿 Leucas</span>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
                  <span>Rendering WebGL 60fps</span>
                  <span className="text-emerald-400 font-semibold flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span> Siap Dimainkan
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
