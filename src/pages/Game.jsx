import React, { useEffect, useRef, useState } from 'react';
import plantData from '../data/daun.json';

export default function Game({ onNavigate, onSelectPlant }) {
  const iframeRef = useRef(null);
  const containerRef = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Listen for navigation messages from the embedded 3D game
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data) {
        if (event.data.type === 'NAVIGATE' && onNavigate) {
          onNavigate(event.data.page);
        } else if (event.data.type === 'VIEW_PLANT' && onSelectPlant && event.data.plantId) {
          const target = plantData.find((p) => p.id === event.data.plantId);
          if (target) onSelectPlant(target);
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [onNavigate, onSelectPlant]);

  // Handle Fullscreen Toggle
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen?.().then(() => setIsFullscreen(true)).catch(err => {
        console.warn("Fullscreen request failed:", err);
      });
    } else {
      document.exitFullscreen?.().then(() => setIsFullscreen(false)).catch(err => {
        console.warn("Exit fullscreen failed:", err);
      });
    }
  };

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-slate-950 text-white relative overflow-hidden">
      {/* Top Game Bar */}
      <div className="bg-slate-900/90 border-b border-emerald-900/40 px-4 py-2.5 flex items-center justify-between text-xs sm:text-sm z-20 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate && onNavigate('home')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-emerald-800/60 text-slate-200 hover:text-white transition font-medium border border-slate-700/60"
          >
            <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Beranda</span>
          </button>
          
          <div className="hidden sm:flex items-center gap-2 text-emerald-400 font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Petualang Cilik 3D: Eksplorasi Bukit Kehi</span>
          </div>
        </div>

        {/* Controls Info & Fullscreen */}
        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-2 text-xs text-slate-400 bg-slate-800/70 px-3 py-1.5 rounded-lg border border-slate-700/40">
            <span className="font-mono bg-slate-700 text-slate-200 px-1.5 py-0.5 rounded">W A S D</span>
            <span>Jalan</span>
            <span className="text-slate-600">|</span>
            <span className="font-mono bg-slate-700 text-slate-200 px-1.5 py-0.5 rounded">Spasi</span>
            <span>Lompat</span>
            <span className="text-slate-600">|</span>
            <span>Putar Kamera (Klik Kanan/Drag)</span>
          </div>

          <button
            onClick={toggleFullscreen}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition font-medium text-xs shadow-md shadow-emerald-950/40"
            title="Mode Layar Penuh"
          >
            {isFullscreen ? (
              <>
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 9L4 4m0 0l5 0m-5 0l0 5m6 6l5 5m0 0l-5 0m5 0l0-5M9 15l-5 5m0 0l5 0m-5 0l0-5m6-6l5-5m0 0l-5 0m5 0l0 5" />
                </svg>
                <span>Keluar Layar Penuh</span>
              </>
            ) : (
              <>
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
                <span>Layar Penuh</span>
              </>
            )}
          </button>

          <a
            href="/game.html"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition text-xs border border-slate-700/60"
            title="Buka Game di Tab Baru"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>

      {/* Game Iframe Container */}
      <div ref={containerRef} className="relative flex-1 w-full h-full bg-slate-950 overflow-hidden">
        {loading && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-slate-950 text-white">
            <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-emerald-400 font-semibold text-base animate-pulse">
              Memuat Dunia 3D Hutan Tropis Bukit Kehi...
            </p>
            <p className="text-xs text-slate-400 mt-1">Siapkan diri untuk berpetualang!</p>
          </div>
        )}
        <iframe
          ref={iframeRef}
          src="/game.html"
          title="Petualang Cilik 3D - Eksplorasi Flora Bukit Kehi"
          className="w-full h-full border-0 block"
          allow="autoplay; fullscreen; accelerometer; gyroscope"
          onLoad={() => setLoading(false)}
        />
      </div>
    </div>
  );
}
