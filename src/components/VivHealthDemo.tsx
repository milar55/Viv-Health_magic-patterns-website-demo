import React, { useEffect, useState, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Pause, Play } from 'lucide-react';
import { PatientContact } from './PatientContact';
import { TriageRouting } from './TriageRouting';
import { ChatTranscript } from './ChatTranscript';
import { ClinicianDashboard } from './ClinicianDashboard';
import { MultiPatientOverview } from './MultiPatientOverview';
const SCENE_DURATIONS = [3000, 5000, 2000, 5000, 3000];
const TOTAL_SCENES = 5;
export function VivHealthDemo() {
  const [currentScene, setCurrentScene] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const scheduleNext = (scene: number) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      const next = (scene + 1) % TOTAL_SCENES;
      setCurrentScene(next);
      scheduleNext(next);
    }, SCENE_DURATIONS[scene]);
  };
  useEffect(() => {
    if (isPlaying) {
      scheduleNext(currentScene);
    } else {
      if (timerRef.current) clearTimeout(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isPlaying]);
  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };
  const goToScene = (idx: number) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setCurrentScene(idx);
    setIsPlaying(false);
    setTimeout(() => setIsPlaying(true), 50);
  };
  const renderScene = () => {
    switch (currentScene) {
      case 0:
        return <PatientContact key="scene-0" />;
      case 1:
        return <ChatTranscript key="scene-1" />;
      case 2:
        return <TriageRouting key="scene-2" />;
      case 3:
        return <ClinicianDashboard key="scene-3" />;
      case 4:
        return <MultiPatientOverview key="scene-4" />;
      default:
        return null;
    }
  };
  return (
    <div className="w-full min-h-screen bg-[#1A1025] flex items-center justify-center p-4 md:p-8 font-sans relative overflow-hidden">
      {/* Kato-style Side Navigation Lines */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-between px-4 md:px-12 z-0">
        <div className="flex items-center w-full max-w-[1200px] mx-auto relative">
          <div className="w-3 h-3 bg-white rounded-sm z-10" />
          <div className="h-[1px] bg-white/20 flex-1" />
          <div className="h-[1px] bg-white/20 flex-1" />
          <div className="w-3 h-3 bg-[#1A1025] border border-white/40 rounded-sm z-10" />
        </div>
      </div>

      <div
        className="relative w-full max-w-5xl aspect-[16/9] bg-white rounded-2xl shadow-2xl overflow-hidden border border-white/10 cursor-pointer z-10 flex flex-col"
        onClick={togglePlayPause}>

        {/* Scene Area */}
        <div className="flex-1 relative overflow-hidden">
          <AnimatePresence mode="sync">{renderScene()}</AnimatePresence>
        </div>

        {/* Progress Dots & Controls (Overlay) */}
        <div className="absolute bottom-6 left-0 right-0 flex flex-col justify-center items-center gap-3 z-50 pointer-events-none">
          <div className="flex gap-3 pointer-events-auto">
            {Array.from({
              length: TOTAL_SCENES
            }).map((_, idx) =>
            <motion.button
              key={idx}
              onClick={(e) => {
                e.stopPropagation();
                goToScene(idx);
              }}
              className={`h-2.5 rounded-full transition-all duration-500 cursor-pointer ${idx === currentScene ? 'w-9 bg-[#2D1B4E]' : 'w-2.5 bg-[#D8D0E8] hover:bg-purple-600/50'}`}
              layout
              whileHover={{
                scale: 1.3
              }}
              whileTap={{
                scale: 0.9
              }} />

            )}
          </div>

          <motion.div
            initial={{
              opacity: 0,
              y: 10
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            className="bg-white/80 backdrop-blur-md rounded-full px-4 py-1.5 flex items-center justify-center shadow-sm border border-white/40 pointer-events-auto"
            onClick={(e) => {
              e.stopPropagation();
              togglePlayPause();
            }}>

            {isPlaying ?
            <Pause className="w-3.5 h-3.5 text-[#2D1B4E]" /> :

            <Play className="w-3.5 h-3.5 text-[#2D1B4E] ml-0.5" />
            }
          </motion.div>
        </div>
      </div>
    </div>);

}