import React, { Fragment } from 'react';
import { motion } from 'framer-motion';
import { User, BookOpen, ShieldCheck, Stethoscope } from 'lucide-react';
export function TriageRouting() {
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
  const sources = [
  {
    icon: BookOpen,
    label: 'ACOG Guidelines',
    desc: 'Clinical practice bulletins'
  },
  {
    icon: ShieldCheck,
    label: 'Clinic Protocols',
    desc: 'Internal care standards'
  },
  {
    icon: Stethoscope,
    label: 'Human OB/Gyn Expert Review',
    desc: 'Clinician oversight'
  }];

  const vivX = 50;
  const vivY = 50;
  const sourceYPositions = [35, 50, 65];
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="absolute inset-0 flex flex-col w-full h-full bg-white">

      <div className="flex-1 relative flex items-center justify-center p-8">
        {/* Flowing dots: Patient card → Viv */}
        {[0, 1, 2, 3].map((dotIdx) =>
        <motion.div
          key={`dot-left-${dotIdx}`}
          className="absolute w-1.5 h-1.5 rounded-full bg-purple-600/30 z-[5]"
          animate={{
            left: ['25%', '42%'],
            top: ['50%', '50%'],
            opacity: [0, 1, 1, 0]
          }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            delay: dotIdx * 0.55,
            ease: 'linear'
          }} />

        )}

        {/* Flowing dots: Viv → Source cards */}
        {sourceYPositions.map((sourceY, streamIdx) =>
        <Fragment key={`stream-right-${streamIdx}`}>
            {[0, 1, 2].map((dotIdx) =>
          <motion.div
            key={`dot-right-${streamIdx}-${dotIdx}`}
            className="absolute w-1.5 h-1.5 rounded-full bg-purple-600/30 z-[5]"
            animate={{
              left: ['70%', '58%'],
              top: [`${sourceY}%`, `${vivY}%`],
              opacity: [0, 1, 1, 0]
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              delay: dotIdx * 0.6 + 0.3,
              ease: 'easeOut'
            }} />

          )}
          </Fragment>
        )}

        <div className="w-full max-w-4xl flex items-center justify-between gap-6 z-10">
          {/* Left: Patient Card (Structured) */}
          <motion.div
            initial={{
              opacity: 0,
              x: -20
            }}
            animate={{
              opacity: 1,
              x: 0
            }}
            transition={{
              duration: 0.6,
              delay: 0.2
            }}
            className="w-64 bg-[#F9F8FB] rounded-xl border border-[#E8E2F0] p-5 shrink-0">

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-white border border-[#E8E2F0] flex items-center justify-center">
                <User className="w-5 h-5 text-[#2D1B4E]" />
              </div>
              <div>
                <h3 className="text-[#2D1B4E] font-bold text-sm">Sarah M.</h3>
                <p className="text-[10px] text-[#8B7BA0] uppercase tracking-wide">
                  28y • 7w Gestation
                </p>
              </div>
            </div>
            <div className="bg-white p-3 rounded-lg border border-[#E8E2F0]">
              <p className="text-xs text-[#2D1B4E] font-medium leading-snug">
                "Spotting at 7 weeks, mild cramping"
              </p>
            </div>
          </motion.div>

          {/* Center: Viv AI Circle */}
          <div className="flex-1 flex items-center justify-center relative">
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.85
              }}
              animate={{
                opacity: 1,
                scale: 1
              }}
              transition={{
                delay: 0.4,
                type: 'spring',
                stiffness: 80,
                damping: 20
              }}
              className="relative">

              <motion.div
                animate={{
                  scale: [1, 1.06, 1],
                  boxShadow: [
                  '0 0 0px 0px rgba(107, 63, 160, 0)',
                  '0 0 20px 8px rgba(107, 63, 160, 0.25)',
                  '0 0 0px 0px rgba(107, 63, 160, 0)']

                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
                className="w-28 h-28 bg-[#F0ECF5] rounded-full flex flex-col items-center justify-center">

                <span className="text-xl font-bold text-[#2D1B4E] tracking-widest uppercase">
                  Viv AI
                </span>
                <div className="absolute bottom-7 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-[#2D1B4E]" />
              </motion.div>
            </motion.div>
          </div>

          {/* Right: Source Cards */}
          <div className="w-72 flex flex-col gap-3 shrink-0">
            <div className="text-[10px] font-bold text-[#8B7BA0] uppercase tracking-widest mb-1 ml-1">
              Validated Against
            </div>

            {sources.map((source, i) =>
            <motion.div
              key={source.label}
              initial={{
                opacity: 0,
                x: 20
              }}
              animate={{
                opacity: 1,
                x: 0
              }}
              transition={{
                delay: 1.0 + i * 0.25,
                type: 'spring',
                stiffness: 90,
                damping: 15
              }}
              className="flex items-center gap-3 bg-[#F9F8FB] rounded-xl px-3.5 py-3 border border-[#E8E2F0]">

                <div className="w-8 h-8 rounded-full bg-white border border-[#E8E2F0] flex items-center justify-center shrink-0">
                  <source.icon className="w-3.5 h-3.5 text-[#2D1B4E]" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-[#2D1B4E] leading-tight">
                    {source.label}
                  </p>
                  <p className="text-[10px] text-[#8B7BA0] leading-tight mt-0.5">
                    {source.desc}
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Kato-style Dark Bottom Bar */}
      <div className="h-14 bg-[#2D1B4E] flex items-center px-6 shrink-0 z-20">
        <span className="text-white text-sm font-bold uppercase tracking-widest">
          Medically Vetted AI
        </span>
      </div>
    </motion.div>);

}