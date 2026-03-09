import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle2,
  CalendarPlus,
  Menu,
  Search,
  Bell,
  User,
  FileText,
  LayoutDashboard,
  Users } from
'lucide-react';
// Raw transcript with highlight markers
const TRANSCRIPT_PARTS = [
{
  text: "Hi, I'm having some ",
  highlight: false
},
{
  text: 'cramping at 12 weeks',
  highlight: true,
  delay: 0.2
},
{
  text: ". Should I be worried? ... It's more of a ",
  highlight: false
},
{
  text: 'dull ache',
  highlight: true,
  delay: 0.4
},
{
  text: ', kind of like ',
  highlight: false
},
{
  text: 'period cramps',
  highlight: true,
  delay: 0.6
},
{
  text: '. ... ',
  highlight: false
},
{
  text: 'No bleeding',
  highlight: true,
  delay: 0.8
},
{
  text: ', just the cramping. It ',
  highlight: false
},
{
  text: 'comes and goes',
  highlight: true,
  delay: 1.0
},
{
  text: '. ... Okay, that makes me feel better. Should I still mention it at my next appointment? ... I think I can wait. My next appointment is in two weeks.',
  highlight: false
}];

export function ClinicianDashboard() {
  const [phase, setPhase] = useState(0);
  const [highlightsActive, setHighlightsActive] = useState(false);
  useEffect(() => {
    // Phase 1: Show transcript at 0.3s
    const t1 = setTimeout(() => setPhase(1), 300);
    // Start highlighting keywords at 0.6s
    const t2 = setTimeout(() => setHighlightsActive(true), 600);
    // Phase 2: Clinical Summary at 1.6s (visible for ~3.4s of the 5s scene)
    const t3 = setTimeout(() => setPhase(2), 1600);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);
  const containerVariants = {
    hidden: {
      opacity: 0,
      scale: 0.97
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut'
      }
    },
    exit: {
      opacity: 0,
      scale: 0.97,
      transition: {
        duration: 0.6,
        ease: 'easeIn'
      }
    }
  };
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="absolute inset-0 flex flex-col w-full h-full bg-[#F9F8FB] overflow-hidden">

      <div className="flex-1 relative flex items-center justify-center">
        {/* BACKGROUND: EHR Interface */}
        <motion.div
          animate={{
            opacity: phase === 0 ? 0.5 : phase === 1 ? 0.3 : 0.1
          }}
          transition={{
            duration: 1.2,
            ease: 'easeInOut'
          }}
          className="absolute inset-0 flex flex-col pointer-events-none">

          {/* Top Header */}
          <div className="h-16 border-b border-gray-300 bg-white flex items-center justify-between px-6 shrink-0">
            <div className="flex items-center gap-4">
              <Menu className="w-5 h-5 text-gray-500" />
              <div className="text-xl font-bold text-[#2D1B4E]">
                <span className="italic">Legend</span> EHR
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full w-64">
                <Search className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-400">Search patient...</span>
              </div>
              <Bell className="w-5 h-5 text-gray-500" />
              <div className="w-8 h-8 rounded-full bg-[#E8E2F0] flex items-center justify-center">
                <User className="w-4 h-4 text-[#2D1B4E]" />
              </div>
            </div>
          </div>

          {/* Main Content Area with Sidebar */}
          <div className="flex-1 flex">
            <div className="w-64 border-r border-gray-300 bg-white p-4 flex flex-col gap-2 shrink-0">
              <div className="flex items-center gap-3 px-4 py-3 text-gray-500 rounded-lg">
                <LayoutDashboard className="w-5 h-5" />
                <span className="text-sm font-medium">Dashboard</span>
              </div>
              <div className="flex items-center gap-3 px-4 py-3 bg-[#F0ECF5] text-[#2D1B4E] rounded-lg">
                <Users className="w-5 h-5" />
                <span className="text-sm font-medium">Patients</span>
              </div>
              <div className="mt-8 flex flex-col gap-4 px-4">
                <div className="h-8 bg-gray-100 rounded-md w-full"></div>
                <div className="h-8 bg-gray-100 rounded-md w-3/4"></div>
                <div className="h-8 bg-gray-100 rounded-md w-5/6"></div>
              </div>
            </div>
            <div className="flex-1 bg-[#F9F8FB] p-8">
              <div className="w-full max-w-4xl h-full border border-gray-200 bg-white rounded-xl shadow-sm opacity-50"></div>
            </div>
          </div>
        </motion.div>

        {/* FOREGROUND */}
        <AnimatePresence mode="wait">
          {/* Phase 1: Free-floating raw transcript text */}
          {phase === 1 &&
          <motion.div
            key="raw-transcript"
            initial={{
              opacity: 0,
              y: 20
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            exit={{
              opacity: 0,
              scale: 0.92,
              filter: 'blur(6px)'
            }}
            transition={{
              type: 'spring',
              stiffness: 100,
              damping: 20
            }}
            className="relative z-10 max-w-xl px-4">

              <p className="text-sm leading-loose text-[#8B7BA0] font-light">
                {TRANSCRIPT_PARTS.map((part, i) => {
                if (part.highlight) {
                  return (
                    <motion.span
                      key={i}
                      initial={{
                        backgroundColor: 'rgba(107, 63, 160, 0)',
                        color: '#8B7BA0'
                      }}
                      animate={
                      highlightsActive ?
                      {
                        backgroundColor: [
                        'rgba(107, 63, 160, 0)',
                        'rgba(107, 63, 160, 0.15)',
                        'rgba(107, 63, 160, 0.12)'],

                        color: ['#8B7BA0', '#2D1B4E', '#2D1B4E']
                      } :
                      {}
                      }
                      transition={{
                        delay: part.delay || 0,
                        duration: 0.5,
                        ease: 'easeOut'
                      }}
                      className="font-bold rounded px-0.5 py-0.5 inline">

                        {part.text}
                      </motion.span>);

                }
                return <span key={i}>{part.text}</span>;
              })}
              </p>
            </motion.div>
          }

          {/* Phase 2: Clinical Summary Card */}
          {phase === 2 &&
          <motion.div
            key="summary"
            initial={{
              opacity: 0,
              y: 40,
              scale: 0.95
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1
            }}
            transition={{
              type: 'spring',
              stiffness: 90,
              damping: 18
            }}
            className="relative z-20 w-full max-w-2xl flex flex-col items-center">

              <div className="w-full bg-white rounded-2xl shadow-[0_20px_50px_-12px_rgba(45,27,78,0.15)] border border-[#E8E2F0] overflow-hidden mb-6">
                {/* Card Header */}
                <div className="px-8 py-5 border-b border-[#E8E2F0] bg-[#FDFCFE] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-[#2D1B4E]" />
                    <h2 className="text-[#2D1B4E] text-lg font-bold tracking-wide">
                      Clinical Summary
                    </h2>
                  </div>
                  <div className="flex items-center gap-1.5 bg-teal-50 text-teal-700 px-3 py-1.5 rounded-full border border-teal-200">
                    <CheckCircle2 className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-widest">
                      Reviewed
                    </span>
                  </div>
                </div>

                {/* Card Data Rows */}
                <div className="px-8 py-2">
                  {[
                {
                  label: 'CC',
                  value: 'Cramping, 12w GA',
                  color: 'text-[#8B7BA0]'
                },
                {
                  label: 'Onset',
                  value: 'Intermittent',
                  color: 'text-[#8B7BA0]'
                },
                {
                  label: 'Assoc',
                  value: 'Dull ache; denies bleeding/fever',
                  color: 'text-[#8B7BA0]'
                },
                {
                  label: 'Hx',
                  value: 'No prior episodes',
                  color: 'text-[#8B7BA0]'
                },
                {
                  label: 'Plan',
                  value: 'Clinician review',
                  color: 'text-[#E88BA0]',
                  bold: true
                }].
                map((row, i) =>
                <motion.div
                  key={row.label}
                  initial={{
                    opacity: 0,
                    x: -10
                  }}
                  animate={{
                    opacity: 1,
                    x: 0
                  }}
                  transition={{
                    delay: 0.15 + i * 0.1,
                    type: 'spring',
                    stiffness: 120,
                    damping: 18
                  }}
                  className={`flex items-start py-4 ${i < 4 ? 'border-b border-gray-100' : ''}`}>

                      <div className="w-24 shrink-0 mt-0.5">
                        <span
                      className={`text-[10px] font-bold ${row.color} uppercase tracking-widest`}>

                          {row.label}
                        </span>
                      </div>
                      <div className="flex-1">
                        <span
                      className={`text-sm ${row.bold ? 'font-bold' : 'font-medium'} text-[#2D1B4E]`}>

                          {row.value}
                        </span>
                      </div>
                    </motion.div>
                )}
                </div>
              </div>

              {/* Actions - speed up Clinician Reviewed animation */}
              <div className="w-full flex items-center justify-between">
                <button className="text-[#8B7BA0] text-xs font-medium flex items-center gap-1.5 hover:text-[#2D1B4E] transition-colors">
                  <CalendarPlus className="w-3.5 h-3.5" />
                  Schedule Follow-up
                </button>

                <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.8
                }}
                animate={{
                  opacity: [0, 0, 1],
                  scale: [0.8, 0.8, 1]
                }}
                transition={{
                  delay: 0.4,
                  duration: 0.8,
                  times: [0, 0.5, 0.6],
                  ease: 'easeOut'
                }}
                className="flex items-center gap-1.5 text-teal-600 text-xs font-bold">

                  <motion.div
                  initial={{
                    scale: 0
                  }}
                  animate={{
                    scale: [0, 0, 1.2, 1]
                  }}
                  transition={{
                    delay: 0.4,
                    duration: 0.8,
                    times: [0, 0.5, 0.62, 0.68],
                    ease: 'easeOut'
                  }}>

                    <CheckCircle2 className="w-5 h-5" />
                  </motion.div>
                  Clinician Reviewed
                </motion.div>
              </div>
            </motion.div>
          }
        </AnimatePresence>
      </div>

      {/* Bottom Bar */}
      <div className="h-14 bg-[#2D1B4E] flex items-center px-6 shrink-0 z-20">
        <span className="text-white text-sm font-bold uppercase tracking-widest">
          Clinical Summary
        </span>
      </div>
    </motion.div>);

}