import React, { Children } from 'react';
import { motion } from 'framer-motion';
import { Phone, PhoneOff, MessageCircle } from 'lucide-react';
export function PatientContact() {
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
        ease: 'easeOut',
        staggerChildren: 0.1
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
  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 12,
      scale: 0.85
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15
      }
    }
  };
  const centerVariants = {
    hidden: {
      opacity: 0,
      scale: 0.6
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 80,
        damping: 12,
        delay: 0.15
      }
    }
  };
  const iconVariants = {
    hidden: {
      opacity: 0,
      scale: 0
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 120,
        damping: 14
      }
    }
  };
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="absolute inset-0 flex flex-col w-full h-full bg-[#F5F3F9]">

      <div className="flex-1 relative flex items-center justify-center overflow-hidden">
        {/* Central Patient Avatar */}
        <motion.div
          variants={centerVariants}
          className="relative z-10 w-40 h-40 rounded-full flex items-center justify-center overflow-hidden">

          <img
            src="/image.png"
            alt="Patient"
            className="w-full h-full object-cover rounded-full" />

        </motion.div>

        {/* Message Bubble 1: Top-left */}
        <motion.div
          variants={itemVariants}
          className="absolute max-w-[260px]"
          style={{
            top: '12%',
            left: '8%'
          }}>

          <div className="bg-white rounded-xl border border-[#E8E2F0] shadow-sm px-4 py-3 flex items-start gap-2.5">
            <MessageCircle className="w-4 h-4 text-[#2D1B4E] shrink-0 mt-0.5" />
            <p className="text-sm font-medium text-[#2D1B4E] leading-snug">
              "When should I start taking prenatal vitamins?"
            </p>
          </div>
        </motion.div>

        {/* Message Bubble 2: Middle-left */}
        <motion.div
          variants={itemVariants}
          className="absolute max-w-[260px]"
          style={{
            top: '42%',
            left: '3%'
          }}>

          <div className="bg-white rounded-xl border border-[#E8E2F0] shadow-sm px-4 py-3 flex items-start gap-2.5">
            <MessageCircle className="w-4 h-4 text-[#2D1B4E] shrink-0 mt-0.5" />
            <p className="text-sm font-medium text-[#2D1B4E] leading-snug">
              "Is light spotting normal in early pregnancy?"
            </p>
          </div>
        </motion.div>

        {/* Message Bubble 3: Middle-right */}
        <motion.div
          variants={itemVariants}
          className="absolute max-w-[260px]"
          style={{
            top: '48%',
            right: '3%'
          }}>

          <div className="bg-white rounded-xl border border-[#E8E2F0] shadow-sm px-4 py-3 flex items-start gap-2.5">
            <MessageCircle className="w-4 h-4 text-[#2D1B4E] shrink-0 mt-0.5" />
            <p className="text-sm font-medium text-[#2D1B4E] leading-snug">
              "How often should I get a Pap smear at my age?"
            </p>
          </div>
        </motion.div>

        {/* Message Bubble 4: Bottom-right */}
        <motion.div
          variants={itemVariants}
          className="absolute max-w-[260px]"
          style={{
            bottom: '10%',
            right: '8%'
          }}>

          <div className="bg-white rounded-xl border border-[#E8E2F0] shadow-sm px-4 py-3 flex items-start gap-2.5">
            <MessageCircle className="w-4 h-4 text-[#2D1B4E] shrink-0 mt-0.5" />
            <p className="text-sm font-medium text-[#2D1B4E] leading-snug">
              "Can I continue breastfeeding while on allergy meds?"
            </p>
          </div>
        </motion.div>

        {/* Scattered Phone Icons — outline style */}
        {/* Row 1: top area */}
        <motion.div
          variants={iconVariants}
          className="absolute"
          style={{
            top: '22%',
            left: '26%'
          }}>

          <Phone className="w-5 h-5 text-[#B8A9D0]" strokeWidth={1.5} />
        </motion.div>
        <motion.div
          variants={iconVariants}
          className="absolute"
          style={{
            top: '22%',
            left: '42%'
          }}>

          <Phone className="w-5 h-5 text-[#B8A9D0]" strokeWidth={1.5} />
        </motion.div>
        <motion.div
          variants={iconVariants}
          className="absolute"
          style={{
            top: '22%',
            right: '18%'
          }}>

          <Phone className="w-5 h-5 text-[#B8A9D0]" strokeWidth={1.5} />
        </motion.div>

        {/* Row 2: bottom area */}
        <motion.div
          variants={iconVariants}
          className="absolute"
          style={{
            bottom: '26%',
            left: '40%'
          }}>

          <Phone className="w-5 h-5 text-[#B8A9D0]" strokeWidth={1.5} />
        </motion.div>
        <motion.div
          variants={iconVariants}
          className="absolute"
          style={{
            bottom: '26%',
            left: '55%'
          }}>

          <Phone className="w-5 h-5 text-[#B8A9D0]" strokeWidth={1.5} />
        </motion.div>

        {/* Missed Call Icons — pink circles */}
        <motion.div
          variants={iconVariants}
          className="absolute w-10 h-10 rounded-full bg-[#E88BA0] flex items-center justify-center shadow-sm"
          style={{
            top: '20%',
            right: '32%'
          }}>

          <PhoneOff className="w-4 h-4 text-white" strokeWidth={2} />
        </motion.div>

        <motion.div
          variants={iconVariants}
          className="absolute w-10 h-10 rounded-full bg-[#E88BA0] flex items-center justify-center shadow-sm"
          style={{
            bottom: '22%',
            right: '18%'
          }}>

          <PhoneOff className="w-4 h-4 text-white" strokeWidth={2} />
        </motion.div>

        <motion.div
          variants={iconVariants}
          className="absolute w-10 h-10 rounded-full bg-[#E88BA0] flex items-center justify-center shadow-sm"
          style={{
            bottom: '28%',
            left: '24%'
          }}>

          <PhoneOff className="w-4 h-4 text-white" strokeWidth={2} />
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <div className="h-14 bg-[#2D1B4E] flex items-center px-6 shrink-0 z-20">
        <span className="text-white text-sm font-bold uppercase tracking-widest">
          Patient Questions
        </span>
      </div>
    </motion.div>);

}