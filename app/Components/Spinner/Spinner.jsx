
"use client"
import React, { useState, useEffect, useCallback } from 'react';
import { ShoppingBag, Flame } from 'lucide-react';
import "../../globals.css";

const Spinner = ({ onComplete }) => {
     // const [loading, setLoading] = useState(true);

     // useEffect(() => {
     //      const timer = setTimeout(() => setLoading(false), 3000);
     //      return () => clearTimeout(timer); // cleanup
     // }, []);

     // if (!loading) return null;
     const [isExiting, setIsExiting] = useState(false);
     const [isBurning, setIsBurning] = useState(false);

     useEffect(() => {
          // Stage 1: The fire "ignites"
          const igniteTimer = setTimeout(() => setIsBurning(true), 100);

          // Stage 2: The split transition begins after 2 seconds
          const exitTimer = setTimeout(() => setIsExiting(true), 2200);

          // Stage 3: Remove loader from DOM after transition finishes
          const completeTimer = setTimeout(onComplete, 3200);

          return () => {
               clearTimeout(igniteTimer);
               clearTimeout(exitTimer);
               clearTimeout(completeTimer);
          };
     }, [onComplete]);


     return (
          // "fixed inset-0" covers the screen; "backdrop-blur" creates the frosted effect
          // <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center   backdrop-blur-md">

          //      {/* 1. Branded Micro-Animation Container */}
          //      <div className="relative flex items-center justify-center mb-8">
          //           {/* Ambient Glow */}
          //           <div className="absolute inset-0 rounded-full blur-2xl animate-pulse opacity-30 bg-red"></div>

          //           {/* Brand Icon: The Pepper/Flame */}
          //           <svg
          //                className="w-20 h-20 animate-bounce transition-transform"
          //                viewBox="0 0 24 24"
          //                fill="none"
          //                stroke="currentColor"
          //                strokeWidth="2"
          //                strokeLinecap="round"
          //                strokeLinejoin="round"
          //           >
          //                <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
          //           </svg>
          //      </div>

          //      {/* 2. Brand Messaging */}
          //      <div className="text-center">
          //           <h2 className="text-3xl font-black tracking-tighter animate-pulse uppercase">
          //                Simmering the Heat...
          //           </h2>
          //           <p className="mt-2 text-sm font-medium tracking-widest opacity-70 uppercase">
          //                Preparing your fire
          //           </p>
          //      </div>

          //      {/* 3. Aesthetic Detail: Bottom simmering particles (Optional/Visual) */}
          //      <div className="absolute bottom-10 left-0 w-full flex justify-center gap-4 opacity-20">
          //           <div className="w-1 h-1 rounded-full bg-current animate-ping"></div>
          //           <div className="w-1 h-1 rounded-full bg-current animate-ping [animation-delay:0.2s]"></div>
          //           <div className="w-1 h-1 rounded-full bg-current animate-ping [animation-delay:0.4s]"></div>
          //      </div>
          // </div>
          
          <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden pointer-events-none">
               {/* Left Door/Panel */}
               <div
                    className={`absolute inset-y-0 left-0 w-1/2 bg-gray-950 transition-transform duration-1000 ease-in-out border-r border-white/5
          ${isExiting ? '-translate-x-full' : 'translate-x-0'}`}
               />

               {/* Right Door/Panel */}
               <div
                    className={`absolute inset-y-0 right-0 w-1/2 bg-gray-950 transition-transform duration-1000 ease-in-out border-l border-white/5
          ${isExiting ? 'translate-x-full' : 'translate-x-0'}`}
               />

               {/* The Central Fire Icon Group */}
               <div className={`relative z-10 transition-all duration-1000 ease-in-out flex flex-col items-center
        ${isBurning ? 'scale-110 opacity-100' : 'scale-50 opacity-0'}
        ${isExiting ? 'opacity-0 scale-150 blur-2xl' : ''}
      `}>
                    <div className="relative">
                         {/* Animated Outer Glow */}
                         <div className="absolute inset-0 bg-red-600 blur-[80px] opacity-40 animate-pulse" />

                         {/* The Fire Icon */}
                         <Flame
                              size={160}
                              className="text-red-600/40  drop-shadow-[0_0_35px_rgba(220,38,38,0.5)] animate-bounce"
                              style={{ animationDuration: '3s' }}
                         />
                    </div>

                    {/* Loading Text */}
                    <div className={`mt-12 transition-opacity duration-500 ${isExiting ? 'opacity-0' : 'opacity-100'}`}>
                         <h2 className="text-white text-3xl font-black tracking-[0.8em] uppercase italic">
                              Heating Up
                         </h2>
                         <div className="mt-4 w-48 h-[2px] bg-gray-800 mx-auto overflow-hidden">
                              <div className="w-full h-full bg-red-600 origin-left animate-[loading_2s_ease-in-out_infinite]" />
                         </div>
                    </div>
               </div>

               <style jsx>{`
        @keyframes loading {
          0% { transform: scaleX(0); }
          50% { transform: scaleX(1); }
          100% { transform: scaleX(0); transform-origin: right; }
        }
      `}</style>
          </div>
     );
};

export default Spinner;