
"use client"
import React from 'react';
import { useEffect, useState } from 'react';
import "../../globals.css";
const Spinner = () => {
     const [loading, setLoading] = useState(true);

     useEffect(() => {
          const timer = setTimeout(() => setLoading(false), 3000);
          return () => clearTimeout(timer); // cleanup
     }, []);

     if (!loading) return null;


     return (
          // "fixed inset-0" covers the screen; "backdrop-blur" creates the frosted effect
          <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center   backdrop-blur-md">

               {/* 1. Branded Micro-Animation Container */}
               <div className="relative flex items-center justify-center mb-8">
                    {/* Ambient Glow */}
                    <div className="absolute inset-0 rounded-full blur-2xl animate-pulse opacity-30 bg-red"></div>

                    {/* Brand Icon: The Pepper/Flame */}
                    <svg
                         className="w-20 h-20 animate-bounce transition-transform"
                         viewBox="0 0 24 24"
                         fill="none"
                         stroke="currentColor"
                         strokeWidth="2"
                         strokeLinecap="round"
                         strokeLinejoin="round"
                    >
                         <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
                    </svg>
               </div>

               {/* 2. Brand Messaging */}
               <div className="text-center">
                    <h2 className="text-3xl font-black tracking-tighter animate-pulse uppercase">
                         Simmering the Heat...
                    </h2>
                    <p className="mt-2 text-sm font-medium tracking-widest opacity-70 uppercase">
                         Preparing your fire
                    </p>
               </div>

               {/* 3. Aesthetic Detail: Bottom simmering particles (Optional/Visual) */}
               <div className="absolute bottom-10 left-0 w-full flex justify-center gap-4 opacity-20">
                    <div className="w-1 h-1 rounded-full bg-current animate-ping"></div>
                    <div className="w-1 h-1 rounded-full bg-current animate-ping [animation-delay:0.2s]"></div>
                    <div className="w-1 h-1 rounded-full bg-current animate-ping [animation-delay:0.4s]"></div>
               </div>
          </div>
     );
};

export default Spinner;