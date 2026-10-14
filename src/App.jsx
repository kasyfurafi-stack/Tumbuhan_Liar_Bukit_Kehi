import React, { useState } from 'react';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Explore from './pages/Explore.jsx';
import PlantDetail from './pages/PlantDetail.jsx';
import plantData from './data/daun.json';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedPlant, setSelectedPlant] = useState(null);

  // Navigasi ke halaman tertentu
  const handleNavigate = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Buka detail tumbuhan
  const handleSelectPlant = (plant) => {
    setSelectedPlant(plant);
    setCurrentPage('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Kembali dari detail ke halaman jelajah
  const handleBackToExplore = () => {
    setCurrentPage('jelajah');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8faf8] text-slate-800 antialiased selection:bg-emerald-100 selection:text-emerald-900">
      {/* Navbar Global (Highlight tab Jelajah jika sedang di halaman detail) */}
      <Navbar
        activePage={currentPage === 'detail' ? 'jelajah' : currentPage}
        onNavigate={handleNavigate}
      />

      {/* Main Content Area */}
      <main className="flex-grow pt-16">
        {currentPage === 'home' && (
          <Home
            onExplore={() => handleNavigate('jelajah')}
            onAbout={() => handleNavigate('tentang')}
          />
        )}

        {currentPage === 'tentang' && (
          <About onExplore={() => handleNavigate('jelajah')} />
        )}

        {currentPage === 'jelajah' && (
          <Explore
            plants={plantData}
            onSelectPlant={handleSelectPlant}
          />
        )}

        {currentPage === 'detail' && (
          <PlantDetail
            plant={selectedPlant || plantData[0]}
            onBack={handleBackToExplore}
          />
        )}
      </main>

      {/* Footer Global */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
