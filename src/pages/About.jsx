import React from 'react';

export default function About({ onExplore }) {
  const references = [
    {
      title: 'Desa Wisata Kertagena Dajah',
      source: 'Jadesta Kemenparekraf RI',
      url: 'https://jadesta.kemenpar.go.id/desa/kertagena_dajah',
      desc: 'Informasi potensi pariwisata dan profil desa wisata Kertagena Dajah.',
    },
    {
      title: 'Launching Plesir Desa Wisata Bukit Kehi',
      source: 'Pemerintah Kabupaten Pamekasan',
      url: 'https://pamekasankab.go.id/berita/1055/launching-plesir-desa-wisata-bukit-kehi-bupati-mas-tamam-ingin-ekonomi-desa-kuat',
      desc: 'Pemberitaan resmi inisiatif penguatan ekonomi desa melalui wisata Bukit Kehi.',
    },
    {
      title: 'Sejarah Wisata Bukit Kehi dan Perkembangan yang Signifikan',
      source: 'Portal Resmi Desa Kertagena Dajah',
      url: 'https://kertagenadajah.web.id/artikel/2023/6/20/sejarah-wisata-bukit-kehi-dan-perkembngan-yang-signifikan',
      desc: 'Dokumentasi sejarah transformasi lahan Kehi menjadi destinasi kebanggaan desa.',
    },
  ];

  const facilities = [
    {
      icon: (
        <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      name: 'Area Swafoto',
      desc: 'Spot foto berlatar panorama perbukitan asri dan alam pedesaan Madura.',
    },
    {
      icon: (
        <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      name: 'Tempat Makan',
      desc: 'Area santap santai dengan kuliner lokal dan suasana alam yang menyejukkan.',
    },
    {
      icon: (
        <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
        </svg>
      ),
      name: 'Musala',
      desc: 'Fasilitas ibadah yang bersih dan nyaman bagi pengunjung muslim.',
    },
    {
      icon: (
        <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
        </svg>
      ),
      name: 'Area Parkir',
      desc: 'Lahan parkir kendaraan roda dua dan roda empat yang aman dan teratur.',
    },
  ];

  return (
    <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 fade-in">
      {/* Header Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-950 text-white p-8 sm:p-12 mb-12 shadow-xl shadow-emerald-950/10">
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#a7f3d0_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center space-x-2 bg-emerald-700/60 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium text-emerald-100 mb-5 border border-emerald-500/30">
            <svg className="w-4 h-4 text-emerald-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>Dusun Moccol, Desa Kertagena Daya, Kec. Kadur, Kab. Pamekasan, Madura</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4 leading-tight">
            Mengenal Bukit Kehi Pamekasan
          </h1>
          <p className="text-emerald-100 text-base sm:text-lg leading-relaxed font-light">
            Destinasi wisata alam perbukitan, ruang rekreasi keluarga, dan wahana eksplorasi keanekaragaman flora lokal di Pulau Madura.
          </p>
        </div>
      </div>

      {/* Main Content Body */}
      <div className="space-y-12">
        {/* Seksi 1: Pengantar Bukit Kehi */}
        <section className="bg-white rounded-2xl p-6 sm:p-8 border border-emerald-900/10 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex-shrink-0 flex items-center justify-center text-emerald-700 font-bold">
              01
            </div>
            <div className="space-y-4 text-gray-700 leading-relaxed text-base sm:text-lg">
              <h2 className="text-2xl font-bold text-emerald-950 tracking-tight">
                Destinasi Wisata Alam Pedesaan
              </h2>
              <p>
                Bukit Kehi merupakan salah satu destinasi wisata alam yang terletak di{' '}
                <strong className="text-emerald-900 font-semibold">Dusun Moccol, Desa Kertagena Daya, Kecamatan Kadur, Kabupaten Pamekasan, Madura, Jawa Timur</strong>.
                Kawasan ini menawarkan panorama perbukitan dan pemandangan alam pedesaan yang menjadi daya tarik utama bagi pengunjung dari berbagai daerah.
              </p>
            </div>
          </div>
        </section>

        {/* Seksi 2: Asal-Usul Nama Kehi & Inisiatif Komunitas */}
        <section className="bg-white rounded-2xl p-6 sm:p-8 border border-emerald-900/10 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex-shrink-0 flex items-center justify-center text-emerald-700 font-bold">
              02
            </div>
            <div className="space-y-4 text-gray-700 leading-relaxed text-base sm:text-lg">
              <h2 className="text-2xl font-bold text-emerald-950 tracking-tight">
                Asal-Usul Nama <span className="italic font-semibold text-emerald-800">Kehi</span> & Transformasi Kawasan
              </h2>
              <p>
                Nama <em className="text-emerald-900 font-medium not-italic bg-emerald-50 px-2 py-0.5 rounded">Kehi</em> dikenal dalam konteks lokal sebagai istilah yang merujuk pada lahan kosong atau lahan tak bertuan.
              </p>
              <p>
                Kawasan ini kemudian dikembangkan menjadi destinasi wisata melalui inisiatif pemerintah desa dengan dukungan penuh masyarakat setempat, termasuk pemuda Karang Taruna dan Kelompok Sadar Wisata (Pokdarwis). Kolaborasi ini berhasil mengubah lahan tak berpenghuni menjadi potensi wisata desa yang produktif dan bernilai edukatif.
              </p>
            </div>
          </div>
        </section>

        {/* Seksi 3: Fasilitas Wisata */}
        <section className="space-y-5">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex-shrink-0 flex items-center justify-center text-emerald-700 font-bold">
              03
            </div>
            <div>
              <h2 className="text-2xl font-bold text-emerald-950 tracking-tight">
                Fasilitas Pengunjung
              </h2>
              <p className="text-sm text-gray-500">
                Kenyamanan dan fasilitas yang dapat dimanfaatkan oleh para pengunjung:
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            {facilities.map((fac, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-5 border border-emerald-900/10 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center mb-4 group-hover:bg-emerald-100 transition-colors">
                  {fac.icon}
                </div>
                <h3 className="text-lg font-bold text-emerald-950 mb-1">
                  {fac.name}
                </h3>
                <p className="text-sm text-gray-600 leading-normal">
                  {fac.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Seksi 4: Bukit Kehi sebagai Ruang Eksplorasi Keanekaragaman Tumbuhan */}
        <section className="bg-gradient-to-br from-emerald-50 via-teal-50/60 to-white rounded-3xl p-6 sm:p-10 border border-emerald-200/70 shadow-sm relative overflow-hidden">
          <div className="flex items-start gap-4 relative z-10">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex-shrink-0 flex items-center justify-center font-bold">
              04
            </div>
            <div className="space-y-4">
              <div className="inline-block px-3 py-1 bg-emerald-100/80 text-emerald-900 text-xs font-semibold rounded-full uppercase tracking-wider">
                Eksplorasi Botani & Konservasi
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-emerald-950 tracking-tight">
                Bukit Kehi sebagai Ruang Eksplorasi Keanekaragaman Tumbuhan
              </h2>

              <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
                Di balik daya tarik wisatanya, kawasan Bukit Kehi juga menjadi lokasi yang menarik untuk mengenal tumbuhan liar di lingkungan sekitar. Melalui pengamatan langsung, berbagai tumbuhan dapat didokumentasikan dan dipelajari berdasarkan ciri morfologi, habitat, serta karakteristik lainnya.
              </p>

              <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
                Eksplorasi tumbuhan liar ini diharapkan dapat menambah wawasan mengenai keanekaragaman hayati lokal sekaligus menumbuhkan kepedulian terhadap pelestarian lingkungan. Dengan demikian, Bukit Kehi tidak hanya dapat dikenal sebagai destinasi wisata, tetapi juga sebagai ruang pembelajaran alam yang mendukung pengenalan keanekaragaman tumbuhan di Madura.
              </p>

              {onExplore && (
                <div className="pt-4">
                  <button
                    onClick={onExplore}
                    className="inline-flex items-center space-x-2 bg-emerald-700 hover:bg-emerald-800 text-white font-medium px-6 py-3 rounded-full shadow-md shadow-emerald-900/10 transition-all transform hover:-translate-y-0.5"
                  >
                    <span>Mulai Jelajah Tumbuhan Liar</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Seksi 5: Sumber & Referensi Resmi */}
        <section className="bg-white rounded-2xl p-6 sm:p-8 border border-emerald-900/10 shadow-sm space-y-4">
          <div className="flex items-center space-x-3 mb-2">
            <svg className="w-6 h-6 text-emerald-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
            <h2 className="text-xl font-bold text-emerald-950">
              Referensi & Sumber Resmi
            </h2>
          </div>
          <p className="text-sm text-gray-500 mb-4">
            Informasi Bukit Kehi dirangkum berdasarkan rujukan portal resmi kepariwisataan dan pemerintahan:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {references.map((ref, idx) => (
              <a
                key={idx}
                href={ref.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col justify-between p-4 rounded-xl border border-gray-100 hover:border-emerald-400 bg-gray-50/50 hover:bg-emerald-50/30 transition-all shadow-xs"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-2">
                    <span>{ref.source}</span>
                    <svg className="w-4 h-4 text-gray-400 group-hover:text-emerald-700 transition" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-emerald-900 text-sm mb-1.5 transition">
                    {ref.title}
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed mb-3">
                    {ref.desc}
                  </p>
                </div>
                <div className="text-xs text-emerald-600 font-medium flex items-center space-x-1 group-hover:underline">
                  <span className="truncate">{ref.url.replace(/^https?:\/\//, '')}</span>
                </div>
              </a>
            ))}
          </div>
        </section>
      </div>
    </article>
  );
}
