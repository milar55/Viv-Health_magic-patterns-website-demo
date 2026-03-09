import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
const COLS = 9;
const ROWS = 5;
const CENTER_ROW = 2;
const CENTER_COL = 4;
export function MultiPatientOverview() {
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
  const gridItems = Array.from(
    {
      length: ROWS * COLS
    },
    (_, i) => {
      const row = Math.floor(i / COLS);
      const col = i % COLS;
      const isCenter = row === CENTER_ROW && col === CENTER_COL;
      // Distance from center for stagger timing
      const dist = Math.sqrt(
        Math.pow(row - CENTER_ROW, 2) + Math.pow(col - CENTER_COL, 2)
      );
      return {
        row,
        col,
        isCenter,
        dist
      };
    }
  );
  const maxDist = Math.max(...gridItems.map((g) => g.dist));
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="absolute inset-0 flex flex-col w-full h-full bg-white">

      <div className="flex-1 relative flex items-center justify-center p-6 overflow-hidden">
        {/* Horizontal lines from center */}
        <motion.div
          initial={{
            scaleX: 0
          }}
          animate={{
            scaleX: 1
          }}
          transition={{
            delay: 0.6,
            duration: 0.8,
            ease: 'easeOut'
          }}
          className="absolute top-1/2 left-0 right-0 h-[1px] bg-[#E8E2F0] origin-center -translate-y-1/2 z-0" />


        {/* Grid */}
        <div
          className="relative z-10 grid gap-x-6 gap-y-5 place-items-center w-full max-w-3xl"
          style={{
            gridTemplateColumns: `repeat(${COLS}, 1fr)`,
            gridTemplateRows: `repeat(${ROWS}, 1fr)`
          }}>

          {gridItems.map(({ row, col, isCenter, dist }, i) => {
            if (isCenter) {
              // Central Viv Health circle
              return (
                <motion.div
                  key={i}
                  initial={{
                    opacity: 0,
                    scale: 0.7
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1
                  }}
                  transition={{
                    delay: 0.3,
                    type: 'spring',
                    stiffness: 80,
                    damping: 15
                  }}
                  className="w-28 h-28 rounded-full bg-white border border-[#E8E2F0] shadow-lg flex items-center justify-center z-20">

                  <span className="text-lg font-extrabold text-[#2D1B4E] tracking-wide">
                    Viv Health
                  </span>
                </motion.div>);

            }
            // Stagger delay based on distance from center
            const staggerDelay = 0.8 + dist / maxDist * 1.8;
            return (
              <div
                key={i}
                className="relative w-10 h-10 flex items-center justify-center">

                {/* Patient icon (fades out) */}
                <motion.div
                  initial={{
                    opacity: 1,
                    scale: 1
                  }}
                  animate={{
                    opacity: 0,
                    scale: 0.5
                  }}
                  transition={{
                    delay: staggerDelay,
                    duration: 0.3,
                    ease: 'easeIn'
                  }}
                  className="absolute inset-0 flex items-center justify-center">

                  <div className="w-9 h-9 rounded-full bg-[#F0ECF5] border border-[#E8E2F0] overflow-hidden flex items-center justify-center">
                    <img
                      src="/image.png"
                      alt="Patient"
                      className="w-full h-full object-cover" />

                  </div>
                </motion.div>

                {/* Checkmark icon (fades in) */}
                <motion.div
                  initial={{
                    opacity: 0,
                    scale: 0.3
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1
                  }}
                  transition={{
                    delay: staggerDelay + 0.15,
                    type: 'spring',
                    stiffness: 200,
                    damping: 15
                  }}
                  className="absolute inset-0 flex items-center justify-center">

                  <div className="w-9 h-9 rounded-full bg-teal-50 border border-teal-200 flex items-center justify-center">
                    <CheckCircle className="w-4.5 h-4.5 text-teal-500" />
                  </div>
                </motion.div>
              </div>);

          })}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="h-14 bg-[#2D1B4E] flex items-center px-6 shrink-0 z-20">
        <span className="text-white text-sm font-bold uppercase tracking-widest">
          Patients Resolved
        </span>
      </div>
    </motion.div>);

}