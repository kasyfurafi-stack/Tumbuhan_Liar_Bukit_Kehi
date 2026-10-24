export interface PlantOption {
  text: string;
  correct: boolean;
}

export interface PlantData {
  id: number;
  namaLokal: string;
  namaIlmiah: string;
  pos: { x: number; z: number };
  type: string;
  soal: string;
  opsi: PlantOption[];
  pembahasan: string;
}

export const PLANTS_DATA: PlantData[] = [
  {
    id: 1,
    namaLokal: "Sage liar / salvia liar",
    namaIlmiah: "Salvia misella",
    pos: { x: -28, z: -18 },
    type: "salvia",
    soal: "Salvia misella memiliki ciri daun berhadapan (opposite) dan bunga berwarna biru-ungu. Mengapa tumbuhan ini dikelompokkan ke dalam famili yang sama (Lamiaceae) dengan Leucas decemdentata?",
    opsi: [
      { text: "Karena keduanya sama-sama pohon berkayu tinggi", correct: false },
      { text: "Karena memiliki kesamaan pada tata letak daun dan struktur bunganya", correct: true },
      { text: "Karena keduanya hidup menempel di pohon besar", correct: false },
      { text: "Karena buahnya berbentuk bulat besar", correct: false }
    ],
    pembahasan: "Keanekaragaman hayati tingkat spesies mengelompokkan Salvia misella dan Leucas decemdentata ke dalam famili Lamiaceae karena kesamaan ciri morfologinya."
  },
  {
    id: 2,
    namaLokal: "Penutup tanah",
    namaIlmiah: "Desmodium adscendens",
    pos: { x: -14, z: -32 },
    type: "groundcover",
    soal: "Batang Desmodium adscendens bersifat menjalar dan dapat membentuk akar pada buku-bukunya di area tanah terbuka. Apa peran ekologis utama dari bentuk batang tersebut bagi ekosistem lereng Bukit Kehi?",
    opsi: [
      { text: "Menyerap cahaya matahari dari pohon tinggi", correct: false },
      { text: "Mencegah erosi tanah dan mengikat nitrogen", correct: true },
      { text: "Menghalangi air hujan masuk ke dalam tanah", correct: false },
      { text: "Mengubah tanah menjadi batangan berkerikil", correct: false }
    ],
    pembahasan: "Tumbuhan penutup tanah (ground cover) berpola menjalar membantu menahan lapisan permukaan tanah dari erosi serta menyuburkan tanah."
  },
  {
    id: 3,
    namaLokal: "Mimba / intaran",
    namaIlmiah: "Azadirachta indica",
    pos: { x: 30, z: -30 },
    type: "tree_mimba",
    soal: "Di kawasan Bukit Kehi yang cenderung kering, Azadirachta indica tumbuh sebagai pohon berkayu dengan daun majemuk menyirip. Ciri morfologi tersebut menunjukkan bahwa Azadirachta indica berada pada tingkat ...",
    opsi: [
      { text: "Gen", correct: false },
      { text: "Spesies", correct: true },
      { text: "Ekosistem", correct: false },
      { text: "Populasi tunggal", correct: false }
    ],
    pembahasan: "Setiap jenis tumbuhan yang memiliki nama ilmiah (Binomial Nomenclatur) tunggal seperti Azadirachta indica merupakan wujud keanekaragaman tingkat spesies."
  },
  {
    id: 4,
    namaLokal: "Rumput mutiara",
    namaIlmiah: "Oldenlandia corymbosa L.",
    pos: { x: 16, z: -14 },
    type: "tiny_herb",
    soal: "Oldenlandia corymbosa merupakan herba kecil dengan daun tunggal berhadapan-bersilang. Tumbuhan ini masuk dalam famili Rubiaceae. Tumbuhan liar manakah di Bukit Kehi yang memiliki kekerabatan famili yang sama?",
    opsi: [
      { text: "Ageratum conyzoides", correct: false },
      { text: "Richardia brasiliensis", correct: true },
      { text: "Melia azedarach", correct: false },
      { text: "Ruellia tuberosa", correct: false }
    ],
    pembahasan: "Oldenlandia corymbosa dan Richardia brasiliensis sama-sama tergolong ke dalam famili Rubiaceae."
  },
  {
    id: 5,
    namaLokal: "Platikan / Mrican",
    namaIlmiah: "Spigelia anthelmia",
    pos: { x: -35, z: 10 },
    type: "spigelia",
    soal: "Spigelia anthelmia sering ditemukan tumbuh di tanah terbuka dengan serasah kering. Keberadaan serasah dan pencahayaan cukup merupakan contoh faktor ... yang mempengaruhi kehidupan tumbuhan tersebut.",
    opsi: [
      { text: "Biotik", correct: false },
      { text: "Abiotik", correct: true },
      { text: "Parasitisme", correct: false },
      { text: "Predator", correct: false }
    ],
    pembahasan: "Faktor abiotik adalah komponen tak hidup seperti tanah, cahaya matahari, dan serasah kering yang menentukan habitat tumbuhan."
  },
  {
    id: 6,
    namaLokal: "Bandotan / Babadotan",
    namaIlmiah: "Ageratum conyzoides L.",
    pos: { x: -16, z: 18 },
    type: "ageratum",
    soal: "Bunga majemuk Ageratum conyzoides menghasilkan buah achene kecil yang dilengkapi pappus. Fungsi dari struktur pappus ini dalam ekosistem adalah ...",
    opsi: [
      { text: "Membantu penyebaran biji oleh bantuan angin", correct: true },
      { text: "Menarik perhatian predator", correct: false },
      { text: "Menyimpan cadangan air saat musim kemarau", correct: false },
      { text: "Melindungi bunga dari sengatan matahari", correct: false }
    ],
    pembahasan: "Pappus seperti bulu halus memudahkan biji Ageratum conyzoides terbawa angin (anemokori) untuk berkembang biak di lahan terganggu."
  },
  {
    id: 7,
    namaLokal: "Sida Jawa / Sidaguri Jawa",
    namaIlmiah: "Sida javensis Cav.",
    pos: { x: 5, z: 28 },
    type: "sida",
    soal: "Bunganya muncul tunggal di ketiak daun berwarna kuning terang. Peran ekologis utama dari warna bunga yang mencolok tersebut adalah ...",
    opsi: [
      { text: "Memantulkan sinar matahari agar daun tidak layu", correct: false },
      { text: "Menarik serangga penyerbuk (polinator)", correct: true },
      { text: "Menakuti hewan pemakan daun", correct: false },
      { text: "Membantu penyerapan air dari udara", correct: false }
    ],
    pembahasan: "Warna mahkota bunga yang cerah berfungsi sebagai daya tarik visual bagi agen penyerbuk seperti lebah dan kupu-kupu."
  },
  {
    id: 8,
    namaLokal: "Desmodium / daun tiga",
    namaIlmiah: "Desmodium triflorum (L.) DC.",
    pos: { x: 26, z: 12 },
    type: "trifolium",
    soal: "Desmodium triflorum memiliki daun majemuk beranak tiga (trifoliat). Ciri bentuk daun trifoliat ini merupakan contoh dari ...",
    opsi: [
      { text: "Karakteristik morfologi untuk identifikasi taksonomi", correct: true },
      { text: "Kerusakan fisik akibat dimakan serangga", correct: false },
      { text: "Gejala penyakit tanaman", correct: false },
      { text: "Perubahan lingkungan abiotik", correct: false }
    ],
    pembahasan: "Ciri morfologi seperti jumlah anak daun (trifoliat) digunakan dalam taksonomi untuk mengidentifikasi dan membedakan jenis."
  },
  {
    id: 9,
    namaLokal: "Pletekan / Pletikan",
    namaIlmiah: "Ruellia tuberosa L.",
    pos: { x: -8, z: -8 },
    type: "ruellia",
    soal: "Ruellia tuberosa memiliki bunga berbentuk terompet berwarna ungu kebiruan dan buah kapsul yang dapat meletup saat matang. Adaptasi meletupnya buah tersebut bertujuan untuk ...",
    opsi: [
      { text: "Menyerap zat hara dari dalam tanah", correct: false },
      { text: "Memencarkan biji ke area sekitarnya", correct: true },
      { text: "Menarik serangga pemakan buah", correct: false },
      { text: "Mencegah pertumbuhan daun baru", correct: false }
    ],
    pembahasan: "Mekanisme pecahnya buah kapsul secara eksplosif membantu penyebaran biji tumbuhan pletekan."
  },
  {
    id: 10,
    namaLokal: "Mindi",
    namaIlmiah: "Melia azedarach L.",
    pos: { x: -28, z: 32 },
    type: "tree_mindi",
    soal: "Azadirachta indica dan Melia azedarach dikelompokkan ke dalam famili Meliaceae. Hal ini membuktikan adanya hubungan kekerabatan pada tingkat ...",
    opsi: [
      { text: "Genetik dalam satu spesies", correct: false },
      { text: "Taksonomi antarspesies dalam satu famili", correct: true },
      { text: "Ekosistem buatan", correct: false },
      { text: "Keanekaragaman ekosistem tanah", correct: false }
    ],
    pembahasan: "Kekerabatan famili menunjukkan variasi keanekaragaman hayati tingkat spesies yang berbagi tingkatan takson di atas genus."
  },
  {
    id: 11,
    namaLokal: "Richardia / herba liar",
    namaIlmiah: "Richardia brasiliensis",
    pos: { x: 34, z: -10 },
    type: "richardia",
    soal: "Bunganya tersusun mengelompok dalam perbungaan berbentuk bulat di ujung batang. Manakah yang merupakan manfaat ekologis Richardia brasiliensis pada lahan kering Bukit Kehi?",
    opsi: [
      { text: "Sebagai pohon peneduh jalan", correct: false },
      { text: "Membantu menutupi permukaan tanah kering dari limpasan air", correct: true },
      { text: "Menghasilkan kayu bangunan berkualitas tinggi", correct: false },
      { text: "Sebagai tumbuhan parasit yang membunuh pohon lain", correct: false }
    ],
    pembahasan: "Sebagai tumbuhan herba penutup tanah, Richardia brasiliensis berfungsi menutupi permukaan tanah agar tidak mudah tererosi."
  },
  {
    id: 12,
    namaLokal: "Kirinyuh",
    namaIlmiah: "Chromolaena odorata (L.) R.M.King & H.Rob.",
    pos: { x: 18, z: 34 },
    type: "kirinyuh",
    soal: "Chromolaena odorata merupakan semak yang sangat cepat tumbuh di lahan terbuka dan area terganggu. Dalam konsep rantai makanan, tumbuhan kirinyuh bertindak sebagai ...",
    opsi: [
      { text: "Konsumen tingkat I", correct: false },
      { text: "Pengurai (Dekomposer)", correct: false },
      { text: "Produsen", correct: true },
      { text: "Konsumen puncak", correct: false }
    ],
    pembahasan: "Semua tumbuhan hijau yang berfotosintesis berperan sebagai produsen yang menghasilkan energi bagi ekosistem."
  },
  {
    id: 13,
    namaLokal: "Dewberry / beri liar",
    namaIlmiah: "Rubus trivialis Michx.",
    pos: { x: -38, z: -35 },
    type: "rubus",
    soal: "Batang Rubus trivialis memanjang dan dilengkapi dengan duri serta rambut kaku. Struktur duri tersebut merupakan bentuk adaptasi yang berfungsi untuk ...",
    opsi: [
      { text: "Membantu fotosintesis pada malam hari", correct: false },
      { text: "Melindungi diri dari herbivora dan membantu merambat", correct: true },
      { text: "Mempercepat penguapan air", correct: false },
      { text: "Menyerap mineral dari udara", correct: false }
    ],
    pembahasan: "Duri pada batang (spina) berfungsi sebagai alat pertahanan fisik dari gangguan hewan pemakan tumbuhan (herbivora) serta alat untuk memanjat."
  },
  {
    id: 14,
    namaLokal: "Ileng-ileng",
    namaIlmiah: "Phyllanthus niruri L.",
    pos: { x: 38, z: 25 },
    type: "phyllanthus",
    soal: "Phyllanthus niruri memiliki daun kecil yang tersusun rapat pada ranting sehingga tampak seperti daun majemuk. Penulisan nama ilmiah Phyllanthus niruri L. yang benar menurut aturan Binomial Nomenclatur harus dicetak ...",
    opsi: [
      { text: "Tebal (Bold)", correct: false },
      { text: "Miring (Italic)", correct: true },
      { text: "Garis bawah pada setiap kata terpisah", correct: false },
      { text: "Huruf kapital semua", correct: false }
    ],
    pembahasan: "Aturan penulisan sistem Binomial Nomenclatur mewajibkan nama ilmiah dicetak miring (Italic) jika diketik dengan komputer."
  },
  {
    id: 15,
    namaLokal: "Leucas / ketumbit",
    namaIlmiah: "Leucas decemdentata",
    pos: { x: -3, z: -36 },
    type: "leucas",
    soal: "Leucas decemdentata memiliki bunga berbentuk tabung putih yang tersusun rapat melingkar pada ketiak daun. Tingkat keanekaragaman apakah yang ditunjukkan oleh variasi bentuk bunga antar jenis tumbuhan di Bukit Kehi?",
    opsi: [
      { text: "Keanekaragaman tingkat gen", correct: false },
      { text: "Keanekaragaman tingkat spesies/jenis", correct: true },
      { text: "Keanekaragaman tingkat ekosistem", correct: false },
      { text: "Keanekaragaman tingkat populasi", correct: false }
    ],
    pembahasan: "Perbedaan atau variasi morfologi antar spesies tumbuhan yang berbeda dinamakan keanekaragaman hayati tingkat spesies/jenis."
  }
];
