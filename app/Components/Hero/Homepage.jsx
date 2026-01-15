

"use client"
import React, { useState, useEffect,  } from 'react';
import { ShoppingBag, ChevronRight} from 'lucide-react';
import "../../globals.css";
import { useProducts } from '@/app/context/ProdContext';
import { ProdCard } from '../ProdCard/ProdCard';
import Categories from '../Categories/Categories';
import SliderComponent from '../Hero/SliderComponent';
import {dealData} from './dealsData';


// --- Particle Animation Component ---
const ParticleEffect = ({ x, y, onComplete }) => {
     const particles = ["🌶️", "🔥", "🥘", "🧂", "💥"];
     return (
          <div className="pointer-events-none fixed inset-0 z-[9999]">
               {particles.map((p, i) => (
                    <span
                         key={i}
                         className="absolute animate-ping text-2xl"
                         style={{
                              left: x,
                              top: y,
                              transform: `translate(${(Math.random() - 0.5) * 200}px, ${(Math.random() - 0.5) * 200}px)`,
                              transition: 'all 0.8s ease-out',
                              opacity: 0
                         }}
                         onAnimationEnd={onComplete}
                    >
                         {p}
                    </span>
               ))}
          </div>
     );
};



const DealCard = ({ title, discount, image }) => (
     <div className="relative overflow-hidden rounded-3xl group h-64 900">
          <img src={image} className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700" alt={title} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-6 flex flex-col justify-end">
               <span className="font-black text-4xl mb-1 uppercase italic tracking-tighter">{discount}</span>
               <span className="font-bold text-xl text-[#FFB300]">{title}</span>
               <Link
               href="/allProds" 
               className="mt-4 text-xs font-bold  uppercase tracking-[0.2em] border-b border-white w-fit pb-1 transition-colors">Grab it Now</Link>
          </div>
     </div>
);



// --- Main Homepage Component ---
const Homepage = () => {
     const [clickParticles, setClickParticles] = useState([]);
     const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
     const products = useProducts();
console.log("Deals Data: ", dealData)

     // console.log("Products : ", products)
     // Handle global click for food animations
     const handleGlobalClick = (e) => {
          const newParticle = { id: Date.now(), x: e.clientX, y: e.clientY };
          setClickParticles(prev => [...prev, newParticle]);
     };

     // Tracking mouse for "Heat" cursor glow
     useEffect(() => {
          const handleMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
          window.addEventListener('mousemove', handleMove);
          return () => window.removeEventListener('mousemove', handleMove);
     }, []);

     const removeParticle = (id) => {
          setClickParticles(prev => prev.filter(p => p.id !== id));
     };
     return (
          <div onClick={handleGlobalClick} className="relative selection:bg-red-500 selection:text-white overflow-x-hidden">
               <div className="overflow-hidden relative z-10">

                    {/* Floating Background Emojis */}
                    <div className="absolute top-1/2 left-10 text-8xl opacity-10 animate-pulse">🌶️</div>
                    <div className="absolute bottom-10 right-10 text-8xl opacity-10 animate-bounce">🔥</div>
               </div>
               {/* Click Particles Layer */}
               {clickParticles.map(p => (
                    <ParticleEffect key={p.id} x={p.x} y={p.y} onComplete={() => removeParticle(p.id)} />
               ))}

               {/* Dynamic Cursor Glow */}
               <div
                    className="fixed pointer-events-none z-50 w-64 h-64 bg-red-500/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 transition-transform duration-150 ease-out"
                    style={{ left: mousePos.x, top: mousePos.y }}
               />

               {/* Hero Section */}
              
                    <SliderComponent />

              
               {/* Categories Grid */}
               <Categories />

               {/* Best Deals Section */}
               <section className="max-w-7xl mx-auto px-6 py-32">
                    <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
                         <div className="space-y-2">
                              <h2 className="text-5xl font-black uppercase tracking-tighter">Liquid Gold <span className="text-red-600">Flash</span></h2>
                              <p className="text-gray-500 font-medium">Limited time bundles that burn bright.</p>
                         </div>
                         <Link href="/allProds" className="bg-black text-white px-8 py-3 rounded-full font-bold uppercase tracking-widest text-xs transition-all duration-500 hover:bg-red-600 ">View All Deals</Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                     {dealData.map((deal, idx) => (
                          <>
                               <DealCard title={deal.title} discount={deal.tag} image={deal.imgUrl} />
                          </>
                     ))}                   


                      
                    </div>
               </section>

               {/* Featured Products */}
               <section className="50 py-32">
                    <div className="max-w-7xl mx-auto px-6">
                         <div className="flex items-center justify-between border-b 0 pb-10 mb-16">
                              <h2 className="text-4xl font-black uppercase tracking-tighter italic">Featured Heat</h2>
                              <Link href="/allProds" className="flex items-center text-sm font-black uppercase tracking-widest hover:text-red-600 transition-colors">
                                   Everything <ChevronRight size={16} />
                              </Link>
                         </div>

                         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                              {products.slice(0, 8)
                                   .map((p, idx) => (
                                        <ProdCard key={idx} product={p} />
                                   ))}
                         </div>
                    </div>
               </section>

               {/* Sticky Attention Grabber (Footer CTA) */}
          </div>
     );
};

// Simple Link Mock
const Link = ({ children, href, className }) => <a href={href} className={className}>{children}</a>;

export default Homepage;