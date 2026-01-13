"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ClickSpark = () => {
     const [sparks, setSparks] = useState([]);

     const addSpark = (e) => {
          const newSpark = {
               id: Date.now(),
               x: e.clientX,
               y: e.clientY,
          };
          setSparks((prev) => [...prev, newSpark]);
          setTimeout(() => {
               setSparks((prev) => prev.filter((s) => s.id !== newSpark.id));
          }, 1000);
     };

     return (
          <div onMouseDown={addSpark} className="fixed inset-0 z-[9999] pointer-events-auto">
               <AnimatePresence>
                    {sparks.map((spark) => (
                         <motion.div
                              key={spark.id}
                              initial={{ opacity: 1, scale: 0.5, y: 0 }}
                              animate={{ opacity: 0, scale: 1.5, y: -50, rotate: 45 }}
                              exit={{ opacity: 0 }}
                              style={{ left: spark.x - 10, top: spark.y - 10 }}
                              className="absolute pointer-events-none text-2xl"
                         >
                              🌶️
                         </motion.div>
                    ))}
               </AnimatePresence>
          </div>
     );
};

export default ClickSpark;