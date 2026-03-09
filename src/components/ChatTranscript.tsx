import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Phone,
  User,
  MicOff,
  Volume2,
  PhoneOff,
  Wifi,
  Battery,
  ShieldCheck,
  Send } from
'lucide-react';
const CONVERSATION = [
{
  role: 'patient',
  text: "Hi, I'm having some cramping at 12 weeks. Should I be worried?"
},
{
  role: 'ai',
  text: 'I understand your concern. Mild cramping can be normal as your uterus grows. Can you describe the intensity — is it sharp or more like a dull ache?'
},
{
  role: 'patient',
  text: "It's more of a dull ache, kind of like period cramps."
},
{
  role: 'ai',
  text: "That's reassuring. Dull, period-like cramping is very common in the first trimester. Are you experiencing any spotting or bleeding along with it?"
},
{
  role: 'patient',
  text: 'No bleeding, just the cramping. It comes and goes.'
},
{
  role: 'ai',
  text: "Intermittent dull cramping without bleeding is usually normal — it's often your uterus stretching. Stay hydrated and rest when you can. If the pain becomes sharp, one-sided, or you notice any bleeding, please call your provider right away."
},
{
  role: 'patient',
  text: 'Okay, that makes me feel better. Should I still mention it at my next appointment?'
},
{
  role: 'ai',
  text: "Absolutely — it's always good to mention any symptoms to your provider. Would you like me to help you schedule an earlier visit, or are you comfortable waiting for your next one?"
},
{
  role: 'patient',
  text: 'I think I can wait. My next appointment is in two weeks.'
},
{
  role: 'ai',
  text: "That sounds fine. In the meantime, if anything changes — increased pain, bleeding, or fever — don't hesitate to call. Is there anything else I can help with today?"
},
{
  role: 'patient',
  text: "No, that's all. Thank you so much."
},
{
  role: 'ai',
  text: "You're welcome. Take care, and congratulations on your pregnancy!"
}];

export function ChatTranscript() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  // 0 = Incoming, 1 = Tapping, 2 = Active
  const [phase, setPhase] = useState(0);
  const [callSeconds, setCallSeconds] = useState(0);
  const [visibleMessages, setVisibleMessages] = useState(0);
  // Manage animation phases
  useEffect(() => {
    const tapTimer = setTimeout(() => setPhase(1), 1200);
    const activeTimer = setTimeout(() => setPhase(2), 1800);
    const messageTimer = setTimeout(() => {
      const msgInterval = setInterval(() => {
        setVisibleMessages((prev) => {
          if (prev < CONVERSATION.length) return prev + 1;
          clearInterval(msgInterval);
          return prev;
        });
      }, 600);
      return () => clearInterval(msgInterval);
    }, 2400);
    return () => {
      clearTimeout(tapTimer);
      clearTimeout(activeTimer);
      clearTimeout(messageTimer);
    };
  }, []);
  // Call timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (phase === 2) {
      interval = setInterval(() => {
        setCallSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [phase]);
  // Smooth continuous auto-scroll
  useEffect(() => {
    const el = scrollRef.current;
    if (!el || visibleMessages < 3) return;
    let animationId: number;
    let startTime: number | null = null;
    const startScroll = el.scrollTop;
    const targetScroll = el.scrollHeight - el.clientHeight;
    const distance = targetScroll - startScroll;
    if (distance <= 0) return;
    const scrollDuration = 800; // ms per scroll step
    const scroll = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / scrollDuration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      el.scrollTop = startScroll + distance * eased;
      if (progress < 1) {
        animationId = requestAnimationFrame(scroll);
      }
    };
    animationId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationId);
  }, [visibleMessages]);
  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60).
    toString().
    padStart(2, '0');
    const secs = (totalSeconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };
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
      className="absolute inset-0 flex flex-col w-full h-full bg-white">

      <div className="flex-1 flex items-center justify-center p-5 gap-10">
        {/* LEFT: Phone Mockup */}
        <div className="relative w-[180px] h-[340px] bg-[#F9F8FB] rounded-[32px] border-[6px] border-[#2D1B4E] shadow-sm overflow-hidden flex flex-col items-center pt-4 pb-4 shrink-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-5 bg-[#2D1B4E] rounded-b-xl z-20" />

          <div className="w-full px-5 flex justify-between items-center text-[#2D1B4E] text-[9px] font-bold mb-8 z-10 mt-1">
            <span>9:41</span>
            <div className="flex items-center gap-1.5">
              <Wifi className="w-2.5 h-2.5" />
              <Battery className="w-3 h-3" />
            </div>
          </div>

          <div className="flex flex-col items-center gap-2 mb-4">
            <div className="relative w-14 h-14 rounded-full bg-[#E8E2F0] flex items-center justify-center">
              <Phone className="w-5 h-5 text-[#2D1B4E]" />
            </div>
            <div className="text-center">
              <h2 className="text-[#2D1B4E] text-sm font-bold tracking-wide">
                Clinic
              </h2>
            </div>
          </div>

          {/* Timer or Incoming Text */}
          <div className="text-[#2D1B4E] font-mono text-xl font-light mb-4 tracking-wider h-7 flex items-center justify-center">
            {phase >= 2 ?
            formatTime(callSeconds) :

            <span className="text-xs font-medium animate-pulse">
                Calling...
              </span>
            }
          </div>

          {/* Waveform (only active in phase 2) */}
          <div className="flex items-center gap-1.5 h-6 mb-auto">
            {[0, 1, 2, 3, 4].map((i) =>
            <motion.div
              key={i}
              className="w-1 rounded-full bg-purple-600"
              style={{
                height: phase >= 2 ? [6, 14, 10, 16, 8][i] : 2
              }}
              animate={
              phase >= 2 ?
              {
                opacity: [0.3, 0.8, 0.3]
              } :
              {
                opacity: 0.2
              }
              }
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.15
              }} />

            )}
          </div>

          {/* Call Controls */}
          <div className="flex items-center justify-center gap-4 mt-3 w-full px-5 h-11">
            <AnimatePresence mode="wait">
              {phase < 2 ?
              // Incoming Call Button
              <motion.div
                key="answer"
                initial={{
                  scale: 1
                }}
                animate={{
                  scale: phase === 1 ? 0.85 : 1
                }}
                exit={{
                  scale: 0,
                  opacity: 0
                }}
                transition={{
                  duration: 0.2
                }}
                className="w-11 h-11 rounded-full bg-green-500 flex items-center justify-center shadow-md">

                  <Phone className="w-4.5 h-4.5 text-white" />
                </motion.div> :

              // Active Call Controls
              <motion.div
                key="active-controls"
                initial={{
                  opacity: 0,
                  scale: 0.8
                }}
                animate={{
                  opacity: 1,
                  scale: 1
                }}
                className="flex items-center justify-center gap-4 w-full">

                  <div className="w-9 h-9 rounded-full bg-white border border-[#E8E2F0] flex items-center justify-center">
                    <MicOff className="w-3.5 h-3.5 text-[#2D1B4E]" />
                  </div>
                  <div className="w-11 h-11 rounded-full bg-[#E88BA0] flex items-center justify-center shadow-sm">
                    <PhoneOff className="w-4.5 h-4.5 text-white" />
                  </div>
                  <div className="w-9 h-9 rounded-full bg-white border border-[#E8E2F0] flex items-center justify-center">
                    <Volume2 className="w-3.5 h-3.5 text-[#2D1B4E]" />
                  </div>
                </motion.div>
              }
            </AnimatePresence>
          </div>
        </div>

        {/* RIGHT: Secure Chat */}
        <div className="w-full max-w-md h-[390px] bg-[#F9F8FB] rounded-2xl border border-[#E8E2F0] flex flex-col overflow-hidden shrink-0">
          <div className="px-5 py-4 border-b border-[#E8E2F0] bg-white flex items-center gap-2.5 shrink-0">
            <ShieldCheck className="w-4 h-4 text-[#2D1B4E]" />
            <h3 className="text-[#2D1B4E] font-bold text-sm uppercase tracking-wide">
              Secure Chat
            </h3>
          </div>

          <div
            ref={scrollRef}
            className="flex-1 px-5 py-5 flex flex-col gap-4 overflow-y-auto">

            {CONVERSATION.slice(0, visibleMessages).map((msg, idx) =>
            <motion.div
              key={idx}
              initial={{
                opacity: 0,
                y: 10,
                scale: 0.95
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1
              }}
              transition={{
                type: 'spring',
                stiffness: 200,
                damping: 20
              }}
              className={`flex flex-col ${msg.role === 'ai' ? 'items-end' : 'items-start'}`}>

                <div
                className={`flex items-center gap-1.5 mb-1.5 ${msg.role === 'ai' ? 'flex-row-reverse' : ''}`}>

                  {msg.role === 'patient' ?
                <div className="w-5 h-5 rounded-full bg-white border border-[#E8E2F0] flex items-center justify-center">
                      <User className="w-2.5 h-2.5 text-[#2D1B4E]" />
                    </div> :

                <div className="w-5 h-5 rounded-full bg-[#2D1B4E] flex items-center justify-center">
                      <span className="text-[8px] font-bold text-white tracking-widest">
                        V
                      </span>
                    </div>
                }
                  <span className="text-[9px] font-bold uppercase tracking-wider text-[#8B7BA0]">
                    {msg.role === 'ai' ? 'Viv AI' : 'Patient'}
                  </span>
                </div>

                <div
                className={`px-4 py-3 max-w-[85%] ${msg.role === 'ai' ? 'bg-[#2D1B4E] text-white rounded-2xl rounded-tr-sm' : 'bg-white text-[#2D1B4E] border border-[#E8E2F0] rounded-2xl rounded-tl-sm'}`}>

                  <p className="text-xs leading-relaxed font-medium">
                    {msg.text}
                  </p>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} className="h-1 w-full shrink-0" />
          </div>

          {/* Input Field Area */}
          <div className="bg-white border-t border-[#E8E2F0] px-4 py-3 shrink-0">
            <div className="flex items-center gap-3 bg-[#F9F8FB] border border-[#E8E2F0] rounded-full px-4 py-2">
              <input
                type="text"
                placeholder="Type a message..."
                className="flex-1 bg-transparent border-none outline-none text-xs text-[#2D1B4E] placeholder:text-[#8B7BA0]"
                disabled />

              <button className="w-6 h-6 rounded-full bg-[#2D1B4E] flex items-center justify-center shrink-0">
                <Send className="w-3 h-3 text-white -ml-0.5 mt-0.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Kato-style Dark Bottom Bar */}
      <div className="h-14 bg-[#2D1B4E] flex items-center px-6 shrink-0 z-20">
        <span className="text-white text-sm font-bold uppercase tracking-widest">
          Voice or Secure Chat
        </span>
      </div>
    </motion.div>);

}