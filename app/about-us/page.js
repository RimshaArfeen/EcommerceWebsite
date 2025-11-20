
"use client"
import React, { useState, useEffect } from 'react';
import { Flame, Star, Zap, Users, Sun, Moon } from 'lucide-react';
import "../globals.css"

// Color Variable Mappings (for reference, using hex values in Tailwind classes):
// Light Theme Defaults:
// BG: #FFF8F0 | Text/Headings: #4B2E2E | Accent (Chili): #E53935 | CTA (Saffron): #FFB300 | Border: #E5DDD6
// Dark Theme Overrides (dark: prefix):
// BG: #2D1C1C | Text/Headings: #FFF8F0 | Accent (Saffron): #FFB300 | CTA (Chili): #E53935 | Border: #684B0A

const missionPoints = [
  { Icon: Flame, title: "Uncompromising Heat", description: "Sourcing the world’s most potent peppers and crafting unique, fiery flavor profiles. We live for the burn." },
  { Icon: Star, title: "Artisan Quality", description: "Every product is handmade in small batches to ensure premium taste and texture. Quality is never compromised for volume." },
  { Icon: Users, title: "Community Driven", description: "Supporting local farms and global pepper growers. We believe in sustainable practices and giving back to our partners." },
  { Icon: Zap, title: "Innovation in Spice", description: "Constantly pushing boundaries to create new, addictive sauces, snacks, and condiments you won't find anywhere else." },
];


const DarkModeToggle = ({ isDark, toggleTheme }) => (
  <button
    onClick={toggleTheme}
    className="fixed top-4 right-4 p-3 rounded-full shadow-lg z-50 transition duration-300
               bg-[#FFB300] dark:bg-[#E53935] text-[#4B2E2E] dark:text-[#FFF8F0] hover:scale-105"
    aria-label="Toggle dark mode"
  >
    {isDark ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
  </button>
);

const Page = () => {
 
  return (
    <div className="min-h-screen pb-24">
      

      {/* SECTION 1: HERO - Bold Introduction */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24 text-center ">
        <div className="max-w-4xl mx-auto px-6">
          {/* Subtitle: Muted Brown on Light, Neutral on Dark */}
          <h1 className="text-sm font-semibold uppercase tracking-widest text-[#4B2E2E] dark:text-[#FFF8F0] mb-3">
            Our Passion for Fire
          </h1>
          {/* Headline: Muted Brown on Light, Saffron on Dark */}
          <p className="text-5xl md:text-6xl font-extrabold tracking-tight text-[#A32412] dark:text-[#FFB300] leading-tight">
            The Story Behind the Burn
          </p>
          {/* Body Text: Muted Brown on Light, Neutral on Dark */}
          <p className="mt-6 text-xl text-[#4B2E2E] dark:text-[#FFF8F0] max-w-2xl mx-auto">
            We didn't just start a company; we ignited a movement. Spicy-Food Co. was founded on a simple, singular belief: that flavor and intensity should never be mutually exclusive. We are the architects of agony and the connoisseurs of capsicum.
          </p>
        </div>
      </section>

      {/* SECTION 2: OUR STORY - Asymmetrical Layout */}
      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="md:grid md:grid-cols-12 md:gap-16 items-center">
            
            {/* Story Text */}
            <div className="md:col-span-7 space-y-8 order-2 md:order-1">
              {/* Title: Muted Brown, Accent Border: Chili Red (remains strong in both themes) */}
              <h2 className="text-3xl md:text-4xl font-bold text-[#4B2E2E] dark:text-[#FFF8F0] border-l-4 border-[#E53935] pl-4">
                From Backyard Hobby to Global Heat
              </h2>
              {/* Body Text: Muted Brown on Light, Neutral on Dark */}
              <p className="text-lg text-[#4B2E2E] dark:text-[#FFF8F0] leading-relaxed">
                It all started in a tiny kitchen with an oversized ambition. We spent years cultivating, fermenting, and taste-testing until we perfected the balance of pain and pleasure. This commitment to the craft is why every bottle and bag that leaves our facility carries not just intense heat, but a complex depth of flavor.
              </p>
              <p className="text-lg text-[#4B2E2E] dark:text-[#FFF8F0] leading-relaxed">
                We believe that spice is more than just an additive—it's an experience. It connects cultures, ignites conversations, and transforms ordinary meals into unforgettable ones. Our journey is driven by the desire to share this thrill with fellow chili-heads around the world.
              </p>
            </div>
            
            {/* Visual Placeholder */}
            <div className="md:col-span-5 mb-12 md:mb-0 order-1 md:order-2">
              {/* Placeholder BG: Light Border color on Light, Dark Border color on Dark */}
              <div className="aspect-w-16 aspect-h-9 md:aspect-h-12 bg-[#E5DDD6] dark:bg-[#684B0A] rounded-xl shadow-2xl overflow-hidden transform hover:scale-[1.01] transition duration-300">
                {/* Placeholder Text: Muted Brown on Light, Neutral on Dark */}
                <div className="flex items-center justify-center text-[#4B2E2E] dark:text-[#FFF8F0]">
                  <img 
                  src='https://i.pinimg.com/1200x/ed/a1/96/eda196191700069f2b1178fbed39cc58.jpg'
                  className="text-xl font-medium w-full h-full"/>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* SECTION 3: MISSION/VALUES - Value Proposition Grid */}
      <section className="py-20 md:py-24  border-t   ">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          {/* Subtitle: Chili Red on Light, Saffron on Dark */}
          <h2 className="text-sm font-semibold uppercase tracking-widest text-[#E53935] dark:text-[#FFB300] mb-2">
            Our Core Values
          </h2>
          {/* Title: Muted Brown on Light, Neutral on Dark */}
          <p className="text-4xl md:text-5xl font-extrabold text-[#4B2E2E] dark:text-[#FFF8F0] mb-16">
            The Pillars of Our Philosophy
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {missionPoints.map((point, index) => {
              const IconComponent = point.Icon;
              return (
                <div key={index} className="flex flex-col items-center p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300 transform dark:bg-[#4B2E2E] ">
                  {/* Icon: Chili Red on Light, Saffron on Dark */}
                  <IconComponent className="h-10 w-10 text-[#E53935] dark:text-[#FFB300] mb-4" />
                  {/* Title: Muted Brown on Light, Neutral on Dark */}
                  <h3 className="text-xl font-semibold mb-3">{point.title}</h3>
                  {/* Description: Muted Brown on Light, Neutral on Dark */}
                  <p className="text-base  font-light">{point.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

     
      {/* SECTION 5: CLOSING CTA - Actionable Conclusion */}
      {/* CTA Section BG: Dark Brown on Light, Near Black on Dark. Text: Neutral Warm */}
      <section className="py-16  dark:bg-gray-900 text-[#FFF8F0] relative  bottom-0">
        <div className="max-w-3xl mx-auto text-center px-6">
          <p className="text-3xl md:text-4xl text-white font-extrabold mb-4">
            Ready to Taste the Difference?
          </p>
          <p className="text-lg mb-8">
            Our story is now waiting to be written on your plate. Browse our curated collection and find your new addiction.
          </p>
          {/* CTA Button: Saffron on Light, Chili Red on Dark. Text: Muted Brown on Light, White on Dark */}
          <div className="inline-block px-8 py-3 bg-[#FFB300] dark:bg-[#E53935] 
                        text-[#4B2E2E] dark:text-white font-bold rounded-full shadow-lg 
                        hover:bg-[#e69a00] dark:hover:bg-[#A32412] transition duration-300 
                        transform hover:scale-105 cursor-pointer">
            View All Products
          </div>
        </div>
      </section>
      
    </div>
  );
};

export default Page;