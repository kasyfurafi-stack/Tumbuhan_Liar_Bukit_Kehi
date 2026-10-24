/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useMemo } from 'react';
import confetti from 'canvas-confetti';
import { BookOpen, Volume2, VolumeX, RotateCcw, Compass, Award, CheckCircle2, HelpCircle } from 'lucide-react';
import { PLANTS_DATA, PlantData, PlantOption } from './data/plants';
import { soundEngine } from './audio/sound';
import { ThreeCanvas } from './components/ThreeCanvas';

export default function App() {
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [collectedMap, setCollectedMap] = useState<Record<number, boolean>>({});
  const [retriedMap, setRetriedMap] = useState<Record<number, boolean>>({});
  const [firstTryCount, setFirstTryCount] = useState<number>(0);

  // Proximity & Modals
  const [nearbyPlant, setNearbyPlant] = useState<PlantData | null>(null);
  const [activeQuizPlant, setActiveQuizPlant] = useState<PlantData | null>(null);
  const [shuffledOptions, setShuffledOptions] = useState<PlantOption[]>([]);
  const [selectedOption, setSelectedOption] = useState<PlantOption | null>(null);
  const [showPembahasan, setShowPembahasan] = useState<boolean>(false);

  const [showBookModal, setShowBookModal] = useState<boolean>(false);
  const [selectedBookPlant, setSelectedBookPlant] = useState<PlantData>(PLANTS_DATA[0]);
  const [showVictoryModal, setShowVictoryModal] = useState<boolean>(false);

  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [playerPosition, setPlayerPosition] = useState<{ x: number; z: number; rotY: number }>({ x: 0, z: 0, rotY: 0 });
  const [jumpTrigger, setJumpTrigger] = useState<number>(0);
  const [virtualControls, setVirtualControls] = useState<{ forward: number; side: number; run: boolean }>({
    forward: 0,
    side: 0,
    run: false
  });

  const handleJump = () => {
    if (!gameStarted || activeQuizPlant || showBookModal || showVictoryModal) return;
    soundEngine.init();
    setJumpTrigger((prev) => prev + 1);
  };

  const isModalOpen = !gameStarted || !!activeQuizPlant || showBookModal || showVictoryModal;

  const collectedCount = useMemo(() => {
    return Object.values(collectedMap).filter(Boolean).length;
  }, [collectedMap]);

  // Handle Proximity Keyboard E
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.code === 'KeyE') && nearbyPlant && !activeQuizPlant && !showBookModal && !showVictoryModal) {
        startQuiz(nearbyPlant);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nearbyPlant, activeQuizPlant, showBookModal, showVictoryModal]);

  // Open Quiz with randomized options
  const startQuiz = (plant: PlantData) => {
    soundEngine.init();
    soundEngine.playInteract();
    setActiveQuizPlant(plant);
    setSelectedOption(null);
    setShowPembahasan(!!collectedMap[plant.id]);

    // Shuffle options
    const shuffled = [...plant.opsi].sort(() => Math.random() - 0.5);
    setShuffledOptions(shuffled);
  };

  // Answer Quiz
  const handleSelectOption = (opt: PlantOption) => {
    if (selectedOption || !activeQuizPlant) return;
    setSelectedOption(opt);
    setShowPembahasan(true);

    if (opt.correct) {
      soundEngine.playCorrect();
      const isRetry = retriedMap[activeQuizPlant.id];
      const pts = isRetry ? 5 : 10;
      setScore((prev) => prev + pts);
      if (!isRetry) setFirstTryCount((prev) => prev + 1);

      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // ignore
      }

      setCollectedMap((prev) => {
        const updated = { ...prev, [activeQuizPlant.id]: true };
        if (Object.values(updated).filter(Boolean).length === 15) {
          setTimeout(() => setShowVictoryModal(true), 1500);
        }
        return updated;
      });
    } else {
      soundEngine.playWrong();
      setRetriedMap((prev) => ({ ...prev, [activeQuizPlant.id]: true }));
    }
  };

  // Close Quiz
  const closeQuiz = () => {
    setActiveQuizPlant(null);
    setSelectedOption(null);
    setShowPembahasan(false);
  };

  // Sound Toggle
  const toggleSound = () => {
    soundEngine.init();
    soundEngine.muted = !soundEngine.muted;
    setIsMuted(soundEngine.muted);
  };

  // Restart Game
  const restartGame = () => {
    setScore(0);
    setCollectedMap({});
    setRetriedMap({});
    setFirstTryCount(0);
    setShowVictoryModal(false);
    setActiveQuizPlant(null);
  };

  // Rank title
  const getRank = () => {
    if (score >= 135) return '🌟 Ahli Botani Bukit Kehi';
    if (score >= 95) return '🧭 Penjelajah Sejati Bukit Kehi';
    return '🌿 Pemula Pencinta Alam';
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#78a870] select-none text-slate-800">
      {/* 3D WebGL World */}
      <ThreeCanvas
        collectedMap={collectedMap}
        onProximityChange={setNearbyPlant}
        onPlayerPositionChange={(x, z, rotY) => setPlayerPosition({ x, z, rotY })}
        isModalOpen={isModalOpen}
        virtualControls={virtualControls}
        jumpTrigger={jumpTrigger}
      />

      {/* IN-GAME HUD OVERLAY (Zero-Occlusion) */}
      <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-4 md:p-6 z-10">
        {/* Top Bar */}
        <div className="flex justify-between items-start gap-3">
          {/* Status Chips & Back Button */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <button
              onClick={() => {
                if (window.parent && window.parent !== window) {
                  window.parent.postMessage({ type: 'NAVIGATE', page: 'home' }, '*');
                } else {
                  window.location.href = '/';
                }
              }}
              className="pointer-events-auto bg-white/95 hover:bg-emerald-100 active:scale-95 text-emerald-950 border-2 border-emerald-700/80 rounded-2xl px-3 sm:px-4 py-2.5 shadow-lg flex items-center gap-2 font-extrabold text-xs sm:text-sm transition cursor-pointer"
              title="Kembali ke Beranda Website"
            >
              <span>🏠</span>
              <span>Beranda</span>
            </button>

            <div className="pointer-events-auto bg-white/95 border-2 border-emerald-700/80 rounded-2xl px-3 sm:px-4 py-2 sm:py-2.5 shadow-lg flex items-center gap-2 sm:gap-3">
              <span className="text-xl sm:text-2xl">🌱</span>
              <div>
                <div className="text-[9px] sm:text-[10px] font-bold tracking-wider text-emerald-800 uppercase">Koleksi Flora</div>
                <div className="text-base sm:text-lg md:text-xl font-extrabold text-emerald-950 tabular-nums">
                  {collectedCount} / 15
                </div>
              </div>
            </div>

            <div className="pointer-events-auto bg-white/95 border-2 border-emerald-700/80 rounded-2xl px-3 sm:px-4 py-2 sm:py-2.5 shadow-lg flex items-center gap-2 sm:gap-3">
              <span className="text-xl sm:text-2xl">⭐</span>
              <div>
                <div className="text-[9px] sm:text-[10px] font-bold tracking-wider text-emerald-800 uppercase">Skor</div>
                <div className="text-base sm:text-lg md:text-xl font-extrabold text-emerald-950 tabular-nums">
                  {score}
                </div>
              </div>
            </div>
          </div>

          {/* Right Action Cluster & Minimap */}
          <div className="flex items-start gap-2 sm:gap-3">
            {/* Minimap */}
            <div className="pointer-events-auto w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full border-2 border-white shadow-xl bg-emerald-800/90 relative overflow-hidden shrink-0">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                {/* Island Outline */}
                <circle cx="50" cy="50" r="46" fill="#3a7536" />
                {/* Plants dots */}
                {PLANTS_DATA.map((p) => {
                  const mx = 50 + (p.pos.x / 50) * 40;
                  const my = 50 + (p.pos.z / 50) * 40;
                  const isCol = collectedMap[p.id];
                  return (
                    <circle
                      key={p.id}
                      cx={mx}
                      cy={my}
                      r={isCol ? 3.5 : 4}
                      fill={isCol ? '#00e676' : '#ffd600'}
                      stroke="#1e3a1b"
                      strokeWidth="1"
                    />
                  );
                })}
                {/* Player Indicator */}
                <g
                  transform={`translate(${50 + (playerPosition.x / 50) * 40}, ${50 + (playerPosition.z / 50) * 40}) rotate(${(playerPosition.rotY * 180) / Math.PI})`}
                >
                  <polygon points="0,-6 4,5 0,3 -4,5" fill="#ffffff" stroke="#e53935" strokeWidth="1.5" />
                </g>
              </svg>
            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-1.5 sm:gap-2">
              <button
                onClick={() => {
                  soundEngine.init();
                  setShowBookModal(true);
                }}
                className="pointer-events-auto bg-emerald-700 hover:bg-emerald-800 active:scale-95 text-white font-bold text-xs sm:text-sm px-3 py-2 sm:py-2.5 rounded-xl shadow-md flex items-center gap-1.5 transition"
                title="Buka Buku Koleksi Botani"
              >
                <BookOpen className="w-4 h-4" />
                <span className="hidden sm:inline">Buku Flora</span>
              </button>

              <button
                onClick={toggleSound}
                className="pointer-events-auto bg-white/90 hover:bg-white active:scale-95 text-emerald-800 font-bold text-xs px-3 py-1.5 sm:py-2 rounded-xl shadow border border-emerald-700/30 flex items-center justify-center gap-1.5 transition"
                title="Bisu / Aktifkan Suara"
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-rose-600" /> : <Volume2 className="w-4 h-4 text-emerald-700" />}
                <span className="hidden sm:inline">{isMuted ? 'Mute' : 'Audio'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Proximity Interaction Card (Slides up when near a plant) */}
        <div
          className={`self-center transition-all duration-300 transform pointer-events-auto ${
            nearbyPlant && !activeQuizPlant && !showBookModal && !showVictoryModal
              ? 'translate-y-0 opacity-100'
              : 'translate-y-24 opacity-0 pointer-events-none'
          }`}
        >
          {nearbyPlant && (
            <div className="bg-white/95 border-2 border-emerald-600 rounded-2xl shadow-2xl p-4 sm:p-5 w-[90vw] max-w-md text-center">
              <div className="inline-block bg-emerald-100 text-emerald-800 text-[11px] font-bold px-3 py-1 rounded-full mb-1">
                🔍 Tumbuhan Terdeteksi
              </div>
              <h2 className="text-lg sm:text-xl font-extrabold text-emerald-950">
                {nearbyPlant.namaLokal}
              </h2>
              <p className="text-xs sm:text-sm text-emerald-700 italic mb-3">
                {nearbyPlant.namaIlmiah}
              </p>
              <div className="flex gap-2 justify-center">
                <button
                  onClick={() => startQuiz(nearbyPlant)}
                  className="bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold text-sm px-5 py-2.5 rounded-xl shadow-md transition"
                >
                  {collectedMap[nearbyPlant.id] ? 'Baca Ulang Info' : 'Mulai Kuis (Tekan E)'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Control Hint / Mobile Controls & Jump Button */}
        <div className="w-full flex justify-between items-end gap-3 pointer-events-none">
          {/* Mobile Virtual D-Pad */}
          <div className="pointer-events-auto flex flex-col items-center gap-1 sm:hidden bg-slate-900/60 backdrop-blur-md p-2 rounded-2xl border border-white/20 select-none shadow-xl">
            <button
              onPointerDown={() => setVirtualControls(prev => ({ ...prev, forward: 1 }))}
              onPointerUp={() => setVirtualControls(prev => ({ ...prev, forward: 0 }))}
              onPointerLeave={() => setVirtualControls(prev => ({ ...prev, forward: 0 }))}
              className="w-10 h-10 bg-white/85 active:bg-emerald-400 rounded-xl flex items-center justify-center font-bold text-lg text-emerald-950 shadow"
            >
              ▲
            </button>
            <div className="flex gap-1">
              <button
                onPointerDown={() => setVirtualControls(prev => ({ ...prev, side: -1 }))}
                onPointerUp={() => setVirtualControls(prev => ({ ...prev, side: 0 }))}
                onPointerLeave={() => setVirtualControls(prev => ({ ...prev, side: 0 }))}
                className="w-10 h-10 bg-white/85 active:bg-emerald-400 rounded-xl flex items-center justify-center font-bold text-lg text-emerald-950 shadow"
              >
                ◀
              </button>
              <button
                onPointerDown={() => setVirtualControls(prev => ({ ...prev, forward: -1 }))}
                onPointerUp={() => setVirtualControls(prev => ({ ...prev, forward: 0 }))}
                onPointerLeave={() => setVirtualControls(prev => ({ ...prev, forward: 0 }))}
                className="w-10 h-10 bg-white/85 active:bg-emerald-400 rounded-xl flex items-center justify-center font-bold text-lg text-emerald-950 shadow"
              >
                ▼
              </button>
              <button
                onPointerDown={() => setVirtualControls(prev => ({ ...prev, side: 1 }))}
                onPointerUp={() => setVirtualControls(prev => ({ ...prev, side: 0 }))}
                onPointerLeave={() => setVirtualControls(prev => ({ ...prev, side: 0 }))}
                className="w-10 h-10 bg-white/85 active:bg-emerald-400 rounded-xl flex items-center justify-center font-bold text-lg text-emerald-950 shadow"
              >
                ▶
              </button>
            </div>
            <button
              onClick={() => setVirtualControls(prev => ({ ...prev, run: !prev.run }))}
              className={`w-full mt-0.5 text-[10px] font-bold py-1 px-2 rounded-lg border transition ${virtualControls.run ? 'bg-amber-500 text-white border-amber-300' : 'bg-white/80 text-emerald-950 border-white/40'}`}
            >
              ⚡ Lari {virtualControls.run ? 'ON' : 'OFF'}
            </button>
          </div>

          {/* Desktop Control Info */}
          <div className="hidden md:flex bg-black/50 text-white/95 text-xs px-4 py-2.5 rounded-2xl backdrop-blur-md gap-3 border border-white/10 shadow-lg">
            <span><strong>W A S D / Panah:</strong> Gerak</span>
            <span className="text-emerald-400 font-bold"><strong>Spasi:</strong> Lompat</span>
            <span><strong>Shift:</strong> Lari</span>
            <span><strong>Seret Mouse/Layar:</strong> Putar Sudut Pandang</span>
            <span><strong>E:</strong> Interaksi Tumbuhan</span>
          </div>

          {/* Jump Action Button (Interactive on both Desktop & Mobile) */}
          <div className="pointer-events-auto flex items-center gap-2">
            <button
              type="button"
              onClick={handleJump}
              className="bg-gradient-to-r from-amber-500 via-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 active:scale-90 text-white font-black text-xs sm:text-sm md:text-base px-4 sm:px-5 py-3 sm:py-3.5 rounded-2xl shadow-2xl border-2 border-yellow-200 flex items-center gap-2 transition cursor-pointer select-none"
              title="Lompat Karakter (Tekan Spasi)"
            >
              <span className="text-xl sm:text-2xl animate-bounce">🦘</span>
              <span className="font-extrabold tracking-wide">Lompat</span>
              <span className="hidden sm:inline text-[10px] bg-black/25 px-1.5 py-0.5 rounded font-mono uppercase">Spasi</span>
            </button>
          </div>
        </div>
      </div>

      {/* START GAME MODAL */}
      {!gameStarted && (
        <div className="absolute inset-0 bg-emerald-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 max-w-lg w-full text-center border-4 border-emerald-600">
            <div className="text-5xl mb-3">🌿⛰️🎒</div>
            <h1 className="text-2xl sm:text-3xl font-black text-emerald-900 leading-tight mb-2">
              Petualangan Keanekaragaman Hayati<br />di Bukit Kehi
            </h1>
            <p className="text-sm text-emerald-700 font-medium mb-5">
              Eksplorasi Botani 3D Virtual & Edukasi Sains SMP/SMA
            </p>

            <div className="bg-emerald-50 rounded-2xl p-4 text-left text-xs sm:text-sm text-emerald-900 leading-relaxed border border-emerald-200 mb-6 space-y-2">
              <div className="font-bold text-emerald-950 flex items-center gap-1.5">
                <span>🎮</span> <span>Cara Bermain & Kontrol:</span>
              </div>
              <div>• <strong>Laptop/Desktop:</strong> Tekan <strong>W/A/S/D</strong> atau Panah untuk jalan, <strong className="text-emerald-800 bg-emerald-200/80 px-1 rounded">Spasi</strong> untuk <strong>Melompat</strong>, tahan <strong>Shift</strong> untuk lari, seret mouse/layar untuk putar kamera, dan tekan <strong>E</strong> untuk kuis flora.</div>
              <div>• <strong>Ponsel/Tablet:</strong> Gunakan tombol virtual arah & tombol lompat 🦘 di layar, geser layar untuk memutar sudut pandang.</div>
              <div>• Temukan <strong>15 spesies tumbuhan lokal</strong> di perbukitan Bukit Kehi. Jawab kuisnya untuk mengumpulkan skor dan melengkapi Buku Koleksi Flora!</div>
            </div>

            <button
              onClick={() => {
                soundEngine.init();
                setGameStarted(true);
              }}
              className="w-full bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-extrabold text-lg py-3.5 rounded-2xl shadow-xl transition"
            >
              Mulai Petualangan ➔
            </button>
          </div>
        </div>
      )}

      {/* QUIZ MODAL */}
      {activeQuizPlant && (
        <div className="absolute inset-0 bg-black/60 z-40 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-7 max-w-lg w-full max-h-[90vh] overflow-y-auto border-2 border-emerald-600 relative animate-in fade-in zoom-in-95 duration-200">
            <div className="text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1">
              Kuis {activeQuizPlant.id} dari 15
            </div>
            <h2 className="text-lg sm:text-xl font-black text-emerald-950 pb-2 mb-4 border-b border-emerald-100">
              {activeQuizPlant.namaLokal} (<span className="italic font-serif">{activeQuizPlant.namaIlmiah}</span>)
            </h2>

            <p className="text-sm sm:text-base font-semibold text-slate-800 leading-relaxed mb-5">
              {activeQuizPlant.soal}
            </p>

            {/* Options */}
            {!collectedMap[activeQuizPlant.id] && (
              <div className="flex flex-col gap-2.5 mb-5">
                {shuffledOptions.map((opt, idx) => {
                  const letters = ['A', 'B', 'C', 'D'];
                  let btnColor = 'bg-emerald-50 hover:bg-emerald-100 text-emerald-950 border-emerald-200';

                  if (selectedOption) {
                    if (opt.correct) {
                      btnColor = 'bg-emerald-100 text-emerald-950 border-emerald-600 font-bold';
                    } else if (selectedOption === opt && !opt.correct) {
                      btnColor = 'bg-rose-100 text-rose-950 border-rose-500 font-bold';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      disabled={!!selectedOption}
                      onClick={() => handleSelectOption(opt)}
                      className={`text-left p-3.5 rounded-xl border-2 text-xs sm:text-sm transition flex items-start gap-3 ${btnColor}`}
                    >
                      <span className="font-extrabold text-emerald-700">{letters[idx]}.</span>
                      <span className="leading-snug">{opt.text}</span>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Explanation box */}
            {showPembahasan && (
              <div className="bg-emerald-50 border-l-4 border-emerald-600 p-4 rounded-xl text-xs sm:text-sm text-emerald-900 leading-relaxed mb-5">
                <div className="font-bold flex items-center gap-1.5 mb-1 text-emerald-950">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Pembahasan Sains:
                </div>
                <p>{activeQuizPlant.pembahasan}</p>
              </div>
            )}

            {/* Next / Close button */}
            {(showPembahasan || collectedMap[activeQuizPlant.id]) && (
              <button
                onClick={closeQuiz}
                className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3 rounded-xl transition"
              >
                Lanjutkan Penjelajahan ➜
              </button>
            )}
          </div>
        </div>
      )}

      {/* FIELD GUIDE (BUKU KOLEKSI) MODAL */}
      {showBookModal && (
        <div className="absolute inset-0 bg-black/60 z-40 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-7 max-w-2xl w-full max-h-[90vh] flex flex-col border-2 border-emerald-600 relative">
            <button
              onClick={() => setShowBookModal(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 text-2xl font-bold"
            >
              ×
            </button>

            <h2 className="text-xl font-black text-emerald-950 flex items-center gap-2 mb-1">
              <BookOpen className="w-5 h-5 text-emerald-600" />
              Buku Koleksi Flora Bukit Kehi
            </h2>
            <p className="text-xs text-slate-500 mb-4">
              Daftar 15 spesies flora lokal Bukit Kehi ({collectedCount} dari 15 telah dipelajari)
            </p>

            {/* Detail Box */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 mb-4">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-bold text-base text-emerald-950">
                  {selectedBookPlant.namaLokal}
                </h3>
                {collectedMap[selectedBookPlant.id] ? (
                  <span className="bg-emerald-200 text-emerald-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Terkoleksi
                  </span>
                ) : (
                  <span className="bg-slate-200 text-slate-600 text-[10px] font-extrabold px-2 py-0.5 rounded-full flex items-center gap-1">
                    <HelpCircle className="w-3 h-3" /> Belum Ditemukan
                  </span>
                )}
              </div>
              <p className="text-xs italic text-emerald-700 mb-2">
                {selectedBookPlant.namaIlmiah}
              </p>
              <p className="text-xs text-emerald-900 leading-relaxed">
                {collectedMap[selectedBookPlant.id]
                  ? `Catatan Sains: ${selectedBookPlant.pembahasan}`
                  : 'Temukan tanaman ini di hutan bukit dan jawab kuisnya untuk membuka catatan botani lengkap!'}
              </p>
              {collectedMap[selectedBookPlant.id] && (
                <button
                  onClick={() => {
                    if (window.parent && window.parent !== window) {
                      window.parent.postMessage({ type: 'VIEW_PLANT', plantId: selectedBookPlant.id }, '*');
                    } else {
                      window.location.href = `/?plant=${selectedBookPlant.id}`;
                    }
                  }}
                  className="mt-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs py-2 px-3.5 rounded-xl shadow transition flex items-center gap-1.5 cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Buka Info Lengkap Flora di Website ➔</span>
                </button>
              )}
            </div>

            {/* Plant Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 overflow-y-auto pr-1 flex-1">
              {PLANTS_DATA.map((p) => {
                const isCol = collectedMap[p.id];
                const isSel = selectedBookPlant.id === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => setSelectedBookPlant(p)}
                    className={`p-3 rounded-xl border text-left transition flex flex-col justify-between ${
                      isSel
                        ? 'border-emerald-600 bg-emerald-100 ring-2 ring-emerald-500/30'
                        : isCol
                        ? 'border-emerald-200 bg-emerald-50 hover:bg-emerald-100'
                        : 'border-slate-200 bg-slate-50 hover:bg-slate-100 opacity-70'
                    }`}
                  >
                    <div className="text-lg mb-1">{isCol ? '🌿' : '🔒'}</div>
                    <div className="font-bold text-xs text-slate-800 truncate w-full">
                      {p.namaLokal}
                    </div>
                    <div className="text-[10px] italic text-slate-500 truncate w-full">
                      {isCol ? p.namaIlmiah : '???'}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* VICTORY MODAL */}
      {showVictoryModal && (
        <div className="absolute inset-0 bg-emerald-950/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 max-w-md w-full text-center border-4 border-amber-400">
            <div className="text-5xl mb-2">🏆🎉🌿</div>
            <h1 className="text-2xl font-black text-emerald-950 mb-1">
              Selamat, Ekspedisi Selesai!
            </h1>
            <p className="text-xs sm:text-sm text-emerald-700 mb-4">
              Kamu telah berhasil mengoleksi dan mempelajari seluruh 15 tumbuhan Bukit Kehi!
            </p>

            <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl py-3 px-4 mb-4">
              <div className="text-xs text-amber-800 font-bold uppercase tracking-wider mb-0.5">
                Peringkat Ekspedisi
              </div>
              <div className="text-lg font-black text-amber-900">{getRank()}</div>
            </div>

            <div className="bg-emerald-50 rounded-2xl p-4 text-xs sm:text-sm text-emerald-900 mb-6 space-y-1">
              <div>Skor Total Akhir: <strong>{score}</strong> / 150</div>
              <div>Jawaban Benar Percobaan Pertama: <strong>{firstTryCount}</strong> / 15</div>
            </div>

            <button
              onClick={restartGame}
              className="w-full bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-extrabold text-base py-3.5 rounded-2xl shadow-xl flex items-center justify-center gap-2 transition"
            >
              <RotateCcw className="w-5 h-5" />
              Main Lagi
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
