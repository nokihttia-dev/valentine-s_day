"use client";

import React, { useState, useEffect, useRef, forwardRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { 
  Heart, Star, Gift, Mail, 
  X, Volume2, VolumeX, BatteryCharging, MousePointer2, Plane
} from 'lucide-react';
import confetti from 'canvas-confetti';

// --- Types & Interfaces ---
interface AvatarProps {
  headUrl: string;
  bodyColor?: string;
  label?: string;
  isWaving?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  mood?: 'happy' | 'excited' | 'bouncy' | 'static';
}

interface ShuffleCardProps {
  url: string;
  index: number;
  total: number;
  isActive: boolean;
  onNext: () => void;
}

interface LoveChargeGameProps {
  onWin: () => void;
  isChargingParent: boolean;
  setIsChargingParent: (v: boolean) => void;
}


const OUR_AVATARS = {
  me: '/images/unme/me.jpeg',
  partner: '/images/unme/u.jpeg'
};



// --- Helpers ---
const shuffleArray = <T,>(array: T[]): T[] => {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
};

const seeded = (seed: number) => {
  const x = Math.sin(seed * 9999) * 10000;
  return x - Math.floor(x);
};

// --- Sub-Components ---

const FallingElements: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
      {[...Array(12)].map((_, i) => {
        const startX = seeded(i + 1) * 100;
        const endX = seeded(i + 101) * 100 + Math.sin(i) * 20;
        const duration = 15 + seeded(i + 201) * 20;
        const delay = seeded(i + 301) * 10;

        return (
          <motion.div
            key={`heart-bg-${i}`}
            initial={{ y: -50, x: `${startX}vw`, rotate: 0, opacity: 0 }}
            animate={{ y: '110vh', x: `${endX}vw`, rotate: 360, opacity: [0, 0.6, 0.6, 0] }}
            transition={{ duration, repeat: Infinity, delay, ease: "linear" }}
            className="absolute text-rose-200/40"
          >
            {i % 2 === 0 ? <Heart className="w-4 h-4 md:w-6 md:h-6" fill="currentColor" /> : <Star className="w-3 h-3 md:w-5 md:h-5 text-yellow-100/30" fill="currentColor" />}
          </motion.div>
        );
      })}
    </div>
  );
};

const AvatarCharacter = forwardRef<HTMLDivElement, AvatarProps>(
  ({ headUrl, bodyColor = "#fb7185", label = "", isWaving = false, size = "md", mood = "happy" }, ref) => {
    const sizeClasses = {
      sm: 'w-12 h-12 md:w-16 md:h-16',
      md: 'w-20 h-20 md:w-32 md:h-32',
      lg: 'w-24 h-24 md:w-40 md:h-40',
      xl: 'w-32 h-32 md:w-48 md:h-48'
    };
    
    const moodVariants = {
      happy: { rotate: [-4, 4, -4], y: [0, -5, 0] },
      excited: { scale: [1, 1.1, 1], y: [0, -15, 0], rotate: [-8, 8, -8] },
      bouncy: { y: [0, -25, 0], scaleY: [1, 0.9, 1.1, 1] },
      static: { rotate: 0, y: 0 }
    };

    return (
      <motion.div 
        ref={ref} 
        className="relative flex flex-col items-center group cursor-pointer"
        whileHover={{ scale: 1.05 }}
      >
        <AnimatePresence>
          {label && (
            <motion.div 
              initial={{ opacity: 0, scale: 0, y: 10 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0 }} 
              className="absolute -top-14 md:-top-24 bg-white px-3 py-1.5 md:px-4 md:py-2 rounded-2xl shadow-xl text-[10px] md:text-sm font-bold text-rose-500 whitespace-nowrap border-2 border-rose-50 z-20"
            >
              {label}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-b-2 border-r-2 border-rose-50 rotate-45" />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div 
          animate={moodVariants[mood]} 
          transition={{ repeat: Infinity, duration: mood === 'excited' ? 1 : 3, ease: "easeInOut" }}
        >
          <div className={`rounded-full border-white shadow-2xl overflow-hidden bg-rose-100 relative border-4 md:border-8 ${sizeClasses[size]}`}>
            <img src={headUrl} alt="head" className="w-full h-full object-cover" />
            <motion.div 
              animate={{ opacity: [0.3, 0.6, 0.3] }} 
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute bottom-2 left-2 md:bottom-4 md:left-4 w-2 h-1 md:w-4 md:h-2 bg-rose-400/40 rounded-full blur-[2px]" 
            />
          </div>
        </motion.div>

        <div className={`relative ${size === 'sm' ? 'scale-[0.4] mt-[-10px]' : 'scale-[0.6] md:scale-100 mt-[-15px] md:mt-[-25px]'}`}>
          <svg width="80" height="70" viewBox="0 0 80 70" fill="none">
            <path d="M15 5C15 5 5 10 5 25C5 40 10 55 15 60C20 65 60 65 65 60C70 55 75 40 75 25C75 10 65 5 65 5H15Z" fill={bodyColor} />
            <motion.circle 
              animate={isWaving || mood === 'excited' ? { y: [0, -35, 0], x: [0, 5, 0], scale: [1, 1.2, 1] } : {}} 
              transition={{ repeat: Infinity, duration: 0.4 }} 
              cx="12" cy="30" r="9" fill={bodyColor} 
            />
            <motion.circle 
              animate={isWaving || mood === 'excited' ? { y: [0, -35, 0], x: [0, -5, 0], scale: [1, 1.2, 1] } : {}} 
              transition={{ repeat: Infinity, duration: 0.4, delay: 0.1 }} 
              cx="68" cy="30" r="9" fill={bodyColor} 
            />
            <rect x="25" y="62" width="10" height="12" rx="5" fill="#444" />
            <rect x="45" y="62" width="10" height="12" rx="5" fill="#444" />
          </svg>
        </div>
      </motion.div>
    );
  }
);
AvatarCharacter.displayName = "AvatarCharacter";

const VinylPlayer = ({ isPlaying, setIsPlaying, audioRef }: { isPlaying: boolean, setIsPlaying: (v: boolean) => void, audioRef: React.RefObject<HTMLAudioElement | null> }) => {
  const toggleMusic = () => {
    if (isPlaying) audioRef.current?.pause();
    else audioRef.current?.play();
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed bottom-4 left-4 md:bottom-6 md:left-6 z-[100] flex items-center gap-3">
      <motion.div 
        animate={{ rotate: isPlaying ? 360 : 0 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        onClick={toggleMusic}
        className="relative w-12 h-12 md:w-20 md:h-20 cursor-pointer group scale-90 md:scale-100"
      >
        <div className="absolute inset-0 bg-[#222] rounded-full border-2 md:border-4 border-[#333] shadow-2xl flex items-center justify-center">
          <div className="w-full h-full absolute inset-0 rounded-full border border-white/10" />
          <div className="w-1/3 h-1/3 bg-rose-400 rounded-full border-2 md:border-4 border-[#222] flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-[#222] rounded-full" />
          </div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 rounded-full">
           {isPlaying ? <Volume2 className="w-4 h-4 md:w-6 md:h-6" /> : <VolumeX className="w-4 h-4 md:w-6 md:h-6" />}
        </div>
      </motion.div>
      
      <AnimatePresence>
        {isPlaying && (
          <motion.div 
            initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }}
            className="bg-white/90 backdrop-blur-md px-3 py-1 md:px-4 md:py-2 rounded-2xl shadow-xl border border-rose-100"
          >
            <p className="text-[8px] md:text-[10px] font-black text-rose-500 uppercase tracking-widest">Now Playing</p>
            <p className="text-[10px] md:text-xs font-bold text-gray-700 whitespace-nowrap">Dept - 17 🎧</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ShuffleCard = forwardRef<HTMLDivElement, ShuffleCardProps>(
  ({ url, index, total, isActive, onNext }, ref) => {
    const rotation = (index % 2 === 0 ? 4 : -4) + (index * 2);

    return (
      <motion.div
        ref={ref}
        style={{ zIndex: isActive ? 50 : total - index }}
        animate={{ 
          scale: isActive ? 1 : 0.9 - (index * 0.05), 
          y: isActive ? 0 : index * 10, 
          rotate: isActive ? 0 : rotation, 
          opacity: isActive ? 1 : 0.4 
        }}
        whileHover={isActive ? { scale: 1.02, y: -10 } : {}}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="absolute cursor-pointer max-w-[90vw]"
        onClick={isActive ? onNext : undefined}
      >
        <div className="bg-white p-2 md:p-5 pb-10 md:pb-16 shadow-[0_15px_40px_rgba(0,0,0,0.1)] rounded-sm border-2 border-white relative overflow-hidden group">
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-16 md:w-24 h-6 md:h-8 bg-rose-100/60 -rotate-1 z-20 backdrop-blur-sm border-x-4 border-dashed border-rose-200/30" />
          
          <div className="w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 overflow-hidden bg-rose-50 mb-4 md:mb-6 relative">
            <img src={url} alt="memory" className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110" />
          </div>
          <div className="text-center">
            <p className="text-rose-500 font-serif font-black text-sm md:text-2xl italic tracking-tight">Our Captured Moment ei ei</p>
          </div>
        </div>
      </motion.div>
    );
  }
);
ShuffleCard.displayName = "ShuffleCard";

const LoveChargeGame: React.FC<LoveChargeGameProps> = ({ onWin, isChargingParent, setIsChargingParent }) => {
  const [progress, setProgress] = useState(0);
  const [isWon, setIsWon] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startCharging = () => {
    if (isWon) return;
    setIsChargingParent(true);
    timerRef.current = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          if (timerRef.current) clearInterval(timerRef.current);
          setIsWon(true);
          confetti({ particleCount: 200, spread: 80, origin: { y: 0.6 }, colors: ['#fb7185', '#fda4af', '#fecdd3'] });
          setTimeout(() => onWin(), 2000);
          return 100;
        }
        return prev + 3;
      });
    }, 50);
  };

  const stopCharging = () => {
    setIsChargingParent(false);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  return (
    <div className="flex flex-col items-center gap-6 md:gap-10 py-8 md:py-12 relative w-full">
      <div className="absolute -left-12 lg:-left-20 top-1/2 -translate-y-1/2 hidden sm:block scale-75 lg:scale-100">
         <AvatarCharacter headUrl={OUR_AVATARS.me} size="sm" mood={isChargingParent ? 'excited' : 'happy'} label={isChargingParent ? "ชาร์จจจ!!!" : "ส่งพลัง!"} />
      </div>
      <div className="absolute -right-12 lg:-right-20 top-1/2 -translate-y-1/2 hidden sm:block scale-75 lg:scale-100">
         <AvatarCharacter headUrl={OUR_AVATARS.partner} size="sm" mood={isChargingParent ? 'excited' : 'happy'} label={isChargingParent ? "อู้ววว!!!" : "รับพลัง!"} />
      </div>

      <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 flex items-center justify-center">
         <AnimatePresence>
           {isChargingParent && (
             <motion.div 
               key="glow-pulse"
               initial={{ scale: 0.8, opacity: 0 }} 
               animate={{ scale: [1, 1.4, 1.6], opacity: [0.6, 0.3, 0] }} 
               exit={{ opacity: 0 }} 
               transition={{ duration: 1.5, repeat: Infinity }} 
               className="absolute inset-0 bg-rose-300 rounded-full blur-2xl" 
             />
           )}
         </AnimatePresence>
         
         <motion.button
            onPointerDown={startCharging} onPointerUp={stopCharging} onPointerLeave={stopCharging}
            animate={{ scale: isChargingParent ? [1, 1.15, 1.1] : 1 }}
            className={`relative z-10 w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 rounded-full flex items-center justify-center shadow-xl border-4 md:border-8 border-white ${isWon ? 'bg-green-500' : 'bg-rose-500 hover:bg-rose-600'}`}
         >
            <Heart className="text-white w-10 h-10 sm:w-16 sm:h-16" fill="currentColor" />
         </motion.button>
         
         <svg className="absolute inset-0 w-full h-full -rotate-90">
            <circle cx="50%" cy="50%" r="46%" fill="none" stroke="#fce7f3" strokeWidth="10" />
            <motion.circle 
              cx="50%" cy="50%" r="46%" 
              fill="none" stroke="#fb7185" 
              strokeWidth="10" strokeLinecap="round" 
              strokeDasharray="100 100" 
              animate={{ strokeDashoffset: 100 - progress }} 
            />
         </svg>
      </div>
      
      <div className="text-center space-y-3 px-4">
         <div className="inline-flex items-center gap-2 bg-rose-50 px-4 py-1.5 rounded-full border-2 border-rose-100 shadow-sm">
            <BatteryCharging className="w-4 h-4 text-rose-500 animate-pulse" />
            <span className="text-xs md:text-sm font-black text-rose-600 tabular-nums">{progress}% LOVE POWER</span>
         </div>
         <p className="text-gray-500 text-xs md:text-sm font-medium italic">"แตะค้างที่หัวใจเพื่อส่งความรักข้ามจังหวัดมาให้เค้า!!!!"</p>
      </div>
    </div>
  );
};

// --- Main Page ---
export default function ValentinePage() {
  const [shuffledMemories, setShuffledMemories] = useState<string[]>([]);
  const [gameWon, setGameWon] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEntryUnlocked, setIsEntryUnlocked] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isCharging, setIsCharging] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const loadMemories = async () => {
      try {
        const response = await fetch('/api/memories', { cache: 'no-store' });
        if (!response.ok) return;
        const data = (await response.json()) as { files: string[] };
        setShuffledMemories(shuffleArray(data.files));
      } catch {
        // Fallback
      }
    };
    void loadMemories();
  }, []);

  const handleStart = () => {
    setIsEntryUnlocked(true);
    setIsPlaying(true);
    if (audioRef.current) {
      audioRef.current.play().catch(() => console.log("Interaction needed"));
    }
    confetti({ particleCount: 80, spread: 70, origin: { y: 0.5 } });
  };

  const spawnClickHearts = (e: React.MouseEvent | React.TouchEvent) => {
    const x = 'clientX' in e ? e.clientX : (e.touches[0]?.clientX || 0);
    const y = 'clientY' in e ? e.clientY : (e.touches[0]?.clientY || 0);
    
    confetti({
      particleCount: 3,
      spread: 20,
      origin: { x: x / window.innerWidth, y: y / window.innerHeight },
      colors: ['#fb7185', '#fda4af'],
      shapes: ['circle'],
      scalar: 0.4
    });
  };

  return (
    <div 
      className="min-h-screen bg-[#fffafa] text-gray-800 overflow-x-hidden selection:bg-rose-200 relative"
      onMouseDown={spawnClickHearts}
    >
      <audio ref={audioRef} loop src="/music.mp3" />

      <AnimatePresence>
        {!isEntryUnlocked && (
          <motion.div 
            key="entry-overlay"
            initial={{ opacity: 1 }} exit={{ opacity: 0, scale: 1.05 }} transition={{ duration: 1 }}
            className="fixed inset-0 z-[1000] bg-[#fffafa] flex flex-col items-center justify-center p-4 md:p-6 text-center overflow-hidden"
          >
            <FallingElements />
            <div className="absolute bottom-[-20px] w-full flex justify-between px-4 md:px-40 pointer-events-none opacity-60 md:opacity-100">
                <AvatarCharacter headUrl={OUR_AVATARS.me} size="sm" mood="happy" label="พร้อมยังอ้วง?" />
                <AvatarCharacter headUrl={OUR_AVATARS.partner} size="sm" mood="happy" label="จัดมาเลออ!" />
            </div>

            <div className="relative z-10 flex flex-col items-center gap-8 md:gap-12 w-full max-w-lg">
              <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="space-y-4 px-2">
                <h1 className="text-3xl sm:text-5xl md:text-7xl font-serif text-rose-600 font-black italic drop-shadow-md leading-tight">Happy <br className="sm:hidden" /> Valentine's Day</h1>
                <p className="text-rose-400 font-bold uppercase tracking-[0.2em] md:tracking-[0.6em] text-[8px] md:text-xs text-balance">Our distance means nothing because you mean everything</p>
                <div className="h-0.5 md:h-1 w-24 md:w-32 bg-rose-200 mx-auto rounded-full" />
              </motion.div>

              <div className="relative group cursor-pointer" onClick={handleStart}>
                <motion.div animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0.2, 0.4] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute inset-0 bg-rose-400 rounded-full blur-2xl md:blur-3xl" />
                <motion.div 
                  whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
                  className="relative bg-white p-10 md:p-16 rounded-full shadow-2xl border-8 md:border-[12px] border-white"
                >
                  <Heart className="w-16 h-16 md:w-24 md:h-24 text-rose-500 fill-rose-500" />
                </motion.div>
                <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute -bottom-12 md:-bottom-20 left-1/2 -translate-x-1/2 w-full">
                  <span className="whitespace-nowrap bg-rose-500 text-white px-4 py-1.5 md:px-8 md:py-2.5 rounded-full text-[10px] md:text-sm font-black shadow-xl uppercase">แตะที่หัวนม เอ้ยย!! หัวใจ</span>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <FallingElements />
      <VinylPlayer isPlaying={isPlaying} setIsPlaying={setIsPlaying} audioRef={audioRef} />
      <motion.div className="fixed top-0 left-0 right-0 h-1.5 md:h-2 bg-gradient-to-r from-rose-300 via-rose-500 to-rose-300 origin-left z-[100] shadow-sm" style={{ scaleX }} />

      {isEntryUnlocked && (
        <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          
          <section className="min-h-screen flex flex-col items-center justify-center px-4 py-20 text-center relative overflow-hidden">
            <div className="absolute top-1/4 left-4 md:left-10 opacity-5 -rotate-12 scale-75 md:scale-100"><Star className="w-24 h-24 text-rose-500" fill="currentColor" /></div>
            <div className="absolute bottom-1/4 right-4 md:right-10 opacity-5 rotate-12 scale-75 md:scale-100"><Heart className="w-32 h-32 text-rose-500" fill="currentColor" /></div>

            <div className="relative flex flex-col items-center gap-4 w-full">
              <div className="flex gap-4 sm:gap-12 md:gap-24 mb-10 md:mb-16 items-end relative w-full justify-center">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-xl h-px border-t-2 md:border-t-4 border-dashed border-rose-100 -z-10 hidden sm:block">
                   <motion.div animate={{ left: ['0%', '100%'] }} transition={{ repeat: Infinity, duration: 6, ease: "linear" }} className="absolute top-[-12px] md:top-[-16px] text-rose-300">
                     <Plane className="w-6 h-6 md:w-8 md:h-8 rotate-90" fill="currentColor" />
                   </motion.div>
                </div>
                <AvatarCharacter headUrl={OUR_AVATARS.me} bodyColor="#60a5fa" label={isCharging ? "ฮึบๆๆๆ!!!!" : "คิดถึงอ้วงๆ!!!!"} mood={isCharging ? 'excited' : 'happy'} size={isCharging ? 'xl' : 'lg'} />
                <div className="mb-20 hidden lg:block">
                  <motion.div animate={{ scale: [1, 1.4, 1] }} transition={{ repeat: Infinity, duration: 3 }}><Heart className="w-16 h-16 text-rose-500 fill-rose-500" /></motion.div>
                </div>
                <AvatarCharacter headUrl={OUR_AVATARS.partner} label={isCharging ? "แร๊งงงงง!!!" : "เค้าก็เหมือนกานนน"} mood={isCharging ? 'excited' : 'happy'} size={isCharging ? 'xl' : 'lg'} />
              </div>

              <motion.h1 className="text-5xl sm:text-8xl md:text-[12rem] font-serif font-black text-rose-600 tracking-tighter leading-none mb-8 md:mb-12">Valentine's Day</motion.h1>
            </div>
            

          </section>

          <section className="py-24 md:py-40 px-4 relative max-w-4xl mx-auto text-center overflow-hidden">
            <div className="inline-block bg-white px-4 py-2 md:px-8 md:py-3 rounded-2xl shadow-xl mb-12 border-2 border-rose-50">
               <span className="text-rose-500 font-black text-[10px] md:text-sm uppercase tracking-[0.3em] md:tracking-[0.5em]">..................</span>
            </div>
            <h2 className="text-4xl md:text-7xl font-serif text-gray-800 font-bold mb-16 md:mb-24 italic tracking-tighter">Memories</h2>
            <div className="relative h-[400px] md:h-[600px] w-full flex justify-center items-center">
              <AnimatePresence mode='popLayout'>
                {shuffledMemories.slice(0, 5).map((url, index) => (
                  <ShuffleCard key={`card-${url}`} url={url} index={index} total={5} isActive={index === 0} onNext={() => setShuffledMemories(prev => { const n = [...prev]; const f = n.shift(); if(f) n.push(f); return n; })} />
                ))}
              </AnimatePresence>
            </div>
            <div className="mt-8 md:mt-16 flex items-center justify-center gap-2 md:gap-4 text-rose-300 font-bold italic animate-bounce text-xs md:text-base">
               <MousePointer2 className="w-4 h-4 md:w-5 md:h-5" />
               <span>แตะที่การ์ดเพื่อสลับดูนะแม๊...</span>
            </div>
          </section>

          <section className="py-24 md:py-40 px-4 bg-gradient-to-b from-rose-50/80 to-white relative overflow-hidden">
             <div className="max-w-2xl mx-auto bg-white/95 backdrop-blur-2xl p-6 md:p-20 rounded-[3rem] md:rounded-[5rem] shadow-2xl border-4 md:border-[12px] border-white text-center relative z-10">
                <LoveChargeGame onWin={() => setGameWon(true)} isChargingParent={isCharging} setIsChargingParent={setIsCharging} />
             </div>
          </section>

          <section className="py-24 md:py-40 px-4 relative bg-white">
             <AnimatePresence mode="wait">
                {!gameWon ? (
                  <motion.div key="locked" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-[#fffdfa] border-4 border-dashed border-rose-200 rounded-[3rem] p-10 md:p-24 text-center max-w-5xl mx-auto">
                    <Gift className="w-12 h-12 md:w-16 md:h-16 text-rose-200 mx-auto mb-6 animate-pulse" />
                    <p className="text-rose-400 text-lg md:text-2xl font-black italic">"ชาร์จพลังรักให้เต็มก่อนนะแม๊"</p>
                  </motion.div>
                ) : (
                  <motion.div key="unlocked" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-24 md:space-y-48">
                    <div className="flex flex-col items-center text-center">
                      <h3 className="text-4xl md:text-8xl font-serif font-black mb-12 md:mb-20 tracking-tighter">The Message</h3>
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="relative w-full max-w-[300px] md:max-w-[450px] aspect-[4/3] cursor-pointer group" onClick={() => setIsModalOpen(true)}>
                         <div className="absolute inset-0 bg-[#f9e2e2] rounded-b-[2rem] md:rounded-b-[4rem] z-20 shadow-2xl border-b-[6px] md:border-b-[10px] border-rose-200 flex items-center justify-center overflow-hidden" />
                         <div className="absolute inset-0 h-1/2 bg-[#fbdada] rounded-t-[2rem] md:rounded-t-[4rem] shadow-md origin-top z-30 transition-transform duration-500 group-hover:rotate-x-40 flex items-center justify-center overflow-hidden">
                            <div className="bg-white p-3 md:p-6 rounded-full shadow-xl border-2 md:border-4 border-rose-50 mt-4"><Heart className="w-8 h-8 md:w-16 md:h-16 text-rose-500" fill="currentColor" /></div>
                         </div>
                         <div className="absolute inset-0 flex items-end justify-center pb-6 md:pb-12 z-40">
                             <span className="text-rose-500 font-black text-[10px] md:text-sm uppercase tracking-[0.4em] md:tracking-[0.8em]">Tap to Open</span>
                         </div>
                      </motion.div>
                    </div>

                    <div className="max-w-7xl mx-auto px-2 md:px-6 relative">
                       <h2 className="text-4xl md:text-9xl font-serif text-gray-800 font-black tracking-tighter text-center mb-16 md:mb-32">Our Memory Wall</h2>
                       <div className="columns-2 sm:columns-3 md:columns-4 gap-3 md:gap-8 space-y-4 md:space-y-10">
                          {shuffledMemories.map((url, idx) => (
                            <motion.div key={`wall-${idx}`} whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative break-inside-avoid">
                               <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-12 md:w-20 h-4 md:h-7 bg-rose-200/60 -rotate-2 z-10 rounded-sm backdrop-blur-[1px]" />
                               <div className="bg-white p-1.5 md:p-3 pb-6 md:pb-12 shadow-xl border-[4px] md:border-[8px] border-white transition-all overflow-hidden" style={{ transform: `rotate(${(idx % 2 === 0 ? 3 : -3) + (Math.sin(idx) * 5)}deg)` }}>
                                  <img src={url} className="w-full h-auto object-cover rounded-xs" alt="wall" />
                                  <div className="mt-2 md:mt-4 flex justify-center gap-1 opacity-20"><Heart className="w-3 h-3 md:w-4 md:h-4" fill="currentColor" /></div>
                               </div>
                            </motion.div>
                          ))}
                       </div>
                    </div>
                  </motion.div>
                )}
             </AnimatePresence>
          </section>

          <AnimatePresence>
            {isModalOpen && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[2000] flex items-center justify-center p-4 md:p-6 bg-rose-950/50 backdrop-blur-xl" onClick={() => setIsModalOpen(false)}>
                <motion.div initial={{ scale: 0.9, y: 50 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 50 }} className="bg-[#fffef5] max-w-2xl w-full p-6 md:p-16 rounded-[2.5rem] md:rounded-[4rem] shadow-2xl border-[10px] md:border-[15px] border-white text-center relative overflow-hidden max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                  <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 md:top-8 md:right-8 text-rose-300 hover:text-rose-500 p-2 transition-all"><X size={28} /></button>
                  <div className="bg-rose-50 w-16 h-16 md:w-20 md:h-20 rounded-[1.5rem] md:rounded-[2.5rem] flex items-center justify-center mx-auto mb-6 md:mb-10"><Mail className="w-8 h-8 md:w-12 md:h-12 text-rose-500" /></div>
                  <h2 className="text-2xl md:text-5xl font-serif text-rose-600 font-black italic mb-6 md:mb-10 text-balance leading-tight">ถึง... ไออ้วงงง ❤️</h2>
                  <div className="space-y-6 md:space-y-8 text-gray-700 font-serif text-sm md:text-2xl leading-relaxed italic border-t-2 border-dashed border-rose-100 pt-8 md:pt-12 px-2 text-balance">
                    <p>ขอบคุณที่รักกันมาตลอดนะแม่่ เสียดายที่วันวาเลนไทน์ปีนี้ไม่ได้อยู่ด้วยย อยากทำอะไรให้สักอย่างเลยเขียนเว็บเป็นของขวัญให้นะอ้วงง</p>
                    <p>สุขสันต์วันวาเลนไทน์นะงับบ คิดถึงอ้วนที่สุดด เดี๋ยวรีบกลับไปน้าา  อิอิ</p>
                  </div>
                  <div className="mt-12 md:mt-20 text-right border-t border-rose-50 pt-6 md:pt-10">
                    <p className="text-2xl md:text-5xl text-rose-500 font-black italic mb-2 leading-none">รักอ้วนน</p>
                    <p className="text-[10px] md:text-xs text-gray-400 font-bold uppercase tracking-[0.4em] md:tracking-[0.5em]">ด้วยรักและคิดฮอด</p>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.main>
      )}

      <footer className="py-20 text-center opacity-30 font-black uppercase tracking-[1em] text-[8px] md:text-[10px] relative z-10">
        Valentine • 2026
      </footer>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Mali:wght@400;700&family=Playfair+Display:ital,wght@0,700;1,700&display=swap');
        body { font-family: 'Mali', cursive; background-color: #fffafa; scroll-behavior: smooth; -webkit-tap-highlight-color: transparent; }
        .font-serif { font-family: 'Playfair Display', serif; }
        ::-webkit-scrollbar { width: 0px; }
      `}</style>
    </div>
  );
}
