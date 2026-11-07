import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ArrowLeft, Smartphone, Maximize2, RotateCcw } from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<1 | 2>(1);
  const [direction, setDirection] = useState<number>(1); // 1 = forward (slide left), -1 = backward (slide right)
  const [showRulers, setShowRulers] = useState<boolean>(true);
  const [fillScreen, setFillScreen] = useState<boolean>(false);

  const goToNext = () => {
    setDirection(1);
    setCurrentPage(2);
  };

  const goToPrev = () => {
    setDirection(-1);
    setCurrentPage(1);
  };

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 375 : -375,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -375 : 375,
      opacity: 0,
    }),
  };

  return (
    <div className="min-h-screen w-full bg-[#f4f4f4] text-black font-mono flex flex-col items-center justify-between p-2 sm:p-4 select-none relative overflow-x-hidden">
      {/* Background wireframe blueprint grid */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: `
            linear-gradient(to right, #d1d5db 1px, transparent 1px),
            linear-gradient(to bottom, #d1d5db 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px',
        }}
      />

      {/* Top wireframe meta-bar / inspector */}
      <header className="relative z-10 w-full max-w-4xl flex flex-wrap items-center justify-between gap-3 border-2 border-black bg-white p-2.5 sm:px-4 text-xs shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 border-2 border-black bg-black" />
          <span className="font-bold tracking-tight uppercase">Wireframe Prototype</span>
          <span className="border border-black px-1.5 py-0.5 text-[11px] bg-neutral-100">
            iPhone 13 mini [375 × 812 pt]
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 border border-black px-2 py-1 bg-white">
            <span className="text-[11px] text-neutral-600">Stato:</span>
            <span className="font-bold">Pagina {currentPage} di 2</span>
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setShowRulers(!showRulers)}
              className={`border border-black px-2 py-1 text-[11px] flex items-center gap-1 transition-colors ${
                showRulers ? 'bg-black text-white' : 'bg-white text-black hover:bg-neutral-100'
              }`}
              title="Mostra / Nascondi guide e quote wireframe"
            >
              Quote: {showRulers ? 'ON' : 'OFF'}
            </button>
            <button
              type="button"
              onClick={() => setFillScreen(!fillScreen)}
              className="border border-black px-2 py-1 text-[11px] flex items-center gap-1 bg-white text-black hover:bg-neutral-100"
              title="Adatta alla finestra o mostra cornice dispositivo"
            >
              {fillScreen ? <Smartphone className="w-3 h-3" /> : <Maximize2 className="w-3 h-3" />}
              <span>{fillScreen ? 'Vista Telefono' : 'Vista Piena'}</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setDirection(-1);
                setCurrentPage(1);
              }}
              className="border border-black px-2 py-1 text-[11px] flex items-center gap-1 bg-white text-black hover:bg-neutral-100"
              title="Ricomincia da Pagina 1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center my-4 w-full">
        <div className="relative flex items-center justify-center">
          {/* Dimensional ruler badges for iPhone 13 mini */}
          {showRulers && !fillScreen && (
            <>
              {/* Width dimension top */}
              <div className="absolute -top-7 left-0 right-0 flex items-center justify-center text-[10px] text-neutral-600">
                <span className="border-t border-b border-black w-10 mr-1" />
                <span className="font-bold border border-black bg-white px-1">W: 375 pt (1080 px @3x)</span>
                <span className="border-t border-b border-black w-10 ml-1" />
              </div>
              {/* Height dimension right */}
              <div className="absolute -right-16 top-0 bottom-0 hidden md:flex flex-col items-center justify-center text-[10px] text-neutral-600">
                <span className="h-12 border-l border-r border-black mb-1" />
                <span className="font-bold border border-black bg-white px-1 py-2 rotate-90 my-2 whitespace-nowrap">
                  H: 812 pt
                </span>
                <span className="h-12 border-l border-r border-black mt-1" />
              </div>
            </>
          )}

          {/* Device Mockup Shell (iPhone 13 mini) */}
          <div
            className={`transition-all duration-300 relative ${
              fillScreen
                ? 'w-[375px] h-[812px] border-2 border-black bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]'
                : 'w-[393px] h-[830px] p-[9px] bg-white border-4 border-black rounded-[50px] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]'
            }`}
          >
            {/* Outer hardware buttons (volume & power) in wireframe mode */}
            {!fillScreen && (
              <>
                {/* Silent switch */}
                <div className="absolute -left-[9px] top-[110px] w-[5px] h-[26px] bg-white border-2 border-black rounded-l" />
                {/* Volume Up */}
                <div className="absolute -left-[9px] top-[150px] w-[5px] h-[48px] bg-white border-2 border-black rounded-l" />
                {/* Volume Down */}
                <div className="absolute -left-[9px] top-[210px] w-[5px] h-[48px] bg-white border-2 border-black rounded-l" />
                {/* Side Power Button */}
                <div className="absolute -right-[9px] top-[165px] w-[5px] h-[64px] bg-white border-2 border-black rounded-r" />
              </>
            )}

            {/* Screen Viewport: Exactly 375x812 pt */}
            <div
              className={`w-[375px] h-[812px] bg-white relative overflow-hidden flex flex-col justify-between ${
                fillScreen ? '' : 'rounded-[42px] border-2 border-black'
              }`}
            >
              {/* iPhone 13 mini Notch & Wireframe Status Bar */}
              <div className="relative w-full h-[44px] flex items-center justify-between px-6 pt-2 z-30 select-none bg-white">
                {/* Status Bar Clock */}
                <span className="text-[12px] font-bold tracking-tight">9:41</span>

                {/* iPhone 13 mini Notch (26mm wide, ~154px) */}
                <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[154px] h-[28px] bg-white border-b-2 border-l-2 border-r-2 border-black rounded-b-2xl flex items-center justify-center">
                  {/* Speaker ear-piece */}
                  <div className="w-12 h-1 bg-black rounded-full mb-1" />
                  {/* Front camera lens */}
                  <div className="w-2.5 h-2.5 border-2 border-black rounded-full ml-2 mb-1" />
                </div>

                {/* Status Bar Icons (Wireframe Signal, WiFi, Battery) */}
                <div className="flex items-center gap-1.5 text-[11px]">
                  {/* Cellular bars */}
                  <div className="flex items-end gap-[1.5px] h-3">
                    <span className="w-[2px] h-1 border border-black bg-black" />
                    <span className="w-[2px] h-1.5 border border-black bg-black" />
                    <span className="w-[2px] h-2.5 border border-black bg-black" />
                    <span className="w-[2px] h-3 border border-black bg-white" />
                  </div>
                  {/* Wifi icon wireframe */}
                  <div className="w-3.5 h-3 border-b-2 border-black flex items-center justify-center">
                    <div className="w-2 h-2 border-t-2 border-black rounded-t-full" />
                  </div>
                  {/* Battery wireframe */}
                  <div className="flex items-center">
                    <div className="w-5 h-2.5 border-2 border-black rounded-[2px] p-[1px] flex">
                      <div className="h-full w-3/4 bg-black" />
                    </div>
                    <div className="w-[1.5px] h-1 bg-black ml-[0.5px]" />
                  </div>
                </div>
              </div>

              {/* Wireframe Screen Content Area: Strictly empty except for the single required button */}
              <div className="relative flex-1 w-full overflow-hidden bg-white">
                <AnimatePresence initial={false} custom={direction} mode="wait">
                  {currentPage === 1 ? (
                    <motion.div
                      key="page-1"
                      custom={direction}
                      variants={variants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
                      className="absolute inset-0 w-full h-full bg-white flex flex-col items-center justify-center p-6"
                    >
                      {/* Pagina 1: Con dentro SOLO un bottone con scritto “avanti” */}
                      <button
                        type="button"
                        onClick={goToNext}
                        className="group relative cursor-pointer px-10 py-4 bg-white text-black border-2 border-black font-mono font-bold text-lg tracking-wider uppercase transition-all duration-150 active:translate-x-1 active:translate-y-1 active:shadow-none shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:bg-black hover:text-white flex items-center gap-3"
                      >
                        <span>avanti</span>
                        <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="page-2"
                      custom={direction}
                      variants={variants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
                      className="absolute inset-0 w-full h-full bg-white flex flex-col items-center justify-center p-6"
                    >
                      {/* Pagina 2: Con dentro SOLO un bottone con scritto “indietro” */}
                      <button
                        type="button"
                        onClick={goToPrev}
                        className="group relative cursor-pointer px-10 py-4 bg-white text-black border-2 border-black font-mono font-bold text-lg tracking-wider uppercase transition-all duration-150 active:translate-x-1 active:translate-y-1 active:shadow-none shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:bg-black hover:text-white flex items-center gap-3"
                      >
                        <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                        <span>indietro</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* iOS Home Indicator Bar (Wireframe) */}
              <div className="w-full h-[28px] flex items-center justify-center pb-2 z-30 bg-white">
                <div className="w-[134px] h-[4px] bg-black rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Wireframe Legend / Info */}
      <footer className="relative z-10 w-full max-w-4xl flex flex-wrap items-center justify-between gap-2 border border-black bg-white px-3 py-2 text-[11px] text-neutral-700">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full border border-black bg-black inline-block" />
          <span>Wireframe B&amp;W conforme ai requisiti: Pagina 1 (&quot;avanti&quot;) &harr; Pagina 2 (&quot;indietro&quot;).</span>
        </div>
        <div className="text-neutral-500 font-mono">
          Formato: iPhone 13 mini (375 &times; 812 pt)
        </div>
      </footer>
    </div>
  );
}
