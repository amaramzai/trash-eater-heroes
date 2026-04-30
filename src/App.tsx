import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Instagram, X } from 'lucide-react';
import BrandMark from './components/BrandMark';
import ParallaxBackground from './components/ParallaxBackground';

type AppState = 'idle' | 'generating' | 'result';
type Rarity = 'BASIC' | 'RARE' | 'MYTHIC' | 'LEGEND' | null;

const RARITY_IMAGES = {
  BASIC: '/lifebuoy.png',
  RARE: '/mansuit.png',
  MYTHIC: '/gilang.png',
  LEGEND: '/full.png',
};

function App() {
  const [appState, setAppState] = useState<AppState>('idle');
  const [currentRarity, setCurrentRarity] = useState<Rarity>(null);
  const [showSharePanel, setShowSharePanel] = useState(false);

  const handleGenerate = () => {
    setAppState('generating');
    
    // Determine rarity
    const rand = Math.floor(Math.random() * 100) + 1;
    let rarity: Rarity = 'BASIC';
    if (rand <= 55) {
      rarity = 'BASIC'; // 55%
    } else if (rand <= 82) {
      rarity = 'RARE'; // 27%
    } else if (rand <= 95) {
      rarity = 'MYTHIC'; // 13%
    } else {
      rarity = 'LEGEND'; // 5%
    }

    // Preload image
    const img = new Image();
    img.src = RARITY_IMAGES[rarity];

    setTimeout(() => {
      setCurrentRarity(rarity);
      setAppState('result');
    }, 4000);
  };

  const handleSave = async () => {
    // Tampilkan panel Share to Instagram segera
    setShowSharePanel(true);

    if (currentRarity) {
      try {
        // Mengambil gambar sebagai Blob agar bisa diunduh langsung
        const response = await fetch(RARITY_IMAGES[currentRarity]);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `trash-eater-hero-${currentRarity.toLowerCase()}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error('Gagal mengunduh gambar placeholder karena pembatasan CORS. Fitur unduh otomatis akan berjalan normal saat Anda mengganti URL placeholder dengan gambar milik Anda sendiri.', error);
        // Hapus window.open() agar browser tidak berpindah halaman dan tidak menutupi panel Share
      }
    }
  };

  const closeSharePanel = () => {
    setShowSharePanel(false);
    setCurrentRarity(null);
    setAppState('idle');
  };

  const closeResult = () => {
    setShowSharePanel(false);
    setCurrentRarity(null);
    setAppState('idle');
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans overflow-hidden relative flex justify-center">
      {/* Mobile container to constrain desktop view */}
      <div className="w-full max-w-md h-[100dvh] relative bg-zinc-900 shadow-2xl overflow-hidden flex flex-col">
        <ParallaxBackground />
        
        {/* IDLE STATE */}
        <AnimatePresence>
          {appState === 'idle' && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-between p-8 bg-transparent"
            >
              <div className="flex-1 flex flex-col items-center justify-center text-center">
                <BrandMark className="w-[clamp(26rem,98vw,52rem)] h-[clamp(10rem,44vw,26rem)]" />
                <h1 className="mt-[30px] text-4xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-zinc-100 to-zinc-500">
                  HERO GENERATOR
                </h1>
              </div>
              
              <button 
                onClick={handleGenerate}
                className="w-full py-5 rounded-2xl bg-white text-black font-black tracking-widest text-lg active:scale-95 transition-transform shadow-[0_0_40px_rgba(255,255,255,0.2)]"
              >
                GENERATE HERO
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* GENERATING STATE */}
        <AnimatePresence>
          {appState === 'generating' && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center bg-black z-10"
            >
              <LoadingDots />
            </motion.div>
          )}
        </AnimatePresence>

        {/* RESULT STATE */}
        <AnimatePresence>
          {appState === 'result' && currentRarity && (
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', damping: 15, stiffness: 100 }}
              className="absolute inset-0 z-20 flex flex-col bg-black"
            >
              <div className="relative flex-1 w-full h-full">
                <button
                  onClick={closeResult}
                  className="absolute top-6 right-6 z-40 p-2 bg-black/70 rounded-full text-white active:scale-95 transition-transform"
                >
                  <X size={24} />
                </button>
                <img 
                  src={RARITY_IMAGES[currentRarity]} 
                  alt={`${currentRarity} Hero`}
                  className="w-full h-full object-cover"
                />
                
                {/* Save Button */}
                <div className="absolute bottom-8 left-0 right-0 flex justify-center px-8">
                  <button 
                    onClick={handleSave}
                    className="flex items-center justify-center gap-2 bg-white text-black py-4 px-8 rounded-full font-bold tracking-widest active:scale-95 transition-transform shadow-2xl"
                  >
                    <Download size={20} strokeWidth={2.5} />
                    SAVE
                  </button>
                </div>
              </div>

              {/* Share Panel Overlay */}
              <AnimatePresence>
                {showSharePanel && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/50 backdrop-blur-sm z-50 flex flex-col items-center justify-center p-6"
                  >
                    <button 
                      onClick={closeSharePanel}
                      className="absolute top-6 right-6 p-2 bg-white/10 rounded-full text-white active:scale-95 transition-transform"
                    >
                      <X size={24} />
                    </button>
                    
                    <div className="bg-black/80 border border-zinc-800 p-8 rounded-3xl flex flex-col items-center text-center max-w-sm w-full shadow-2xl">
                      <div className="w-12 h-12 bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-600 rounded-xl flex items-center justify-center mb-6">
                        <Instagram size={24} color="white" />
                      </div>
                      <p className="text-sm tracking-widest text-zinc-300 leading-relaxed font-medium uppercase">
                        share to instagram story<br/>and tag
                      </p>
                      <a 
                        href="https://www.instagram.com/stoneflesh.gs?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-xl font-bold mt-2 text-white hover:text-pink-400 transition-colors active:scale-95 inline-block"
                      >
                        @stoneflesh.gs
                      </a>
                      
                      <p className="text-xs text-zinc-500 mt-6">Image saved to gallery</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// Loading Dots Component
function LoadingDots() {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => {
        if (prev === '....') return '.';
        return prev + '.';
      });
    }, 500); // 4 states (1 to 4 dots) over time
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div className="text-xl tracking-[0.2em] font-bold text-zinc-300 uppercase flex">
        <span>ANALYZING YOU</span>
        <span className="w-8 text-left">{dots}</span>
      </div>
    </div>
  );
}

export default App;
