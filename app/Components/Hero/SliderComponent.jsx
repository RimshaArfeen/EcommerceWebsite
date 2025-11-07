"use client";
import React, { useState, useEffect, useCallback } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ShoppingBag } from 'lucide-react';
import "../../globals.css"

// Mock data (Keeping this separate is good practice)
const slides = [
  {
    title: "Ignite Your Taste Buds",
    subtitle: "Discover our hottest new sauces and pepper collections.",
    image:
      "https://plus.unsplash.com/premium_photo-1668543548958-7865de5b9b12?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870",
  },
  {
    title: "Artisan Chili Oil Collection",
    subtitle: "Hand-crafted with rare smoked peppers, delivering rich, deep heat.",
    image:
      "https://images.unsplash.com/photo-1605034997223-1a4819bb58cf?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870",
  },
  {
    title: "Mild to Wild: Find Your Flame",
    subtitle: "Explore personalized heat levels. Adventure awaits every spice lover.",
    image:
      "https://plus.unsplash.com/premium_photo-1666185806281-735f0e2ab5dc?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870",
  },
];

const SliderComponent = () => {

   const settings = {
    dots: true,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    waitForAnimate: false,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear"
  };
  // Autoplay effect

  // Changed h-[80%] w-[90%] to h-[60vh] to make it more visible, 
  // you might need to adjust the height based on your layout.
  // The relevant style change is using the `style` prop on the main div.
  return (
 <div className="slider-container">
  <Slider {...settings}>
    {slides.map((item, idx) => (
      <div key={idx}> {/* ← This wrapper fixes background clipping */}
        <div
          className="relative bg-center bg-no-repeat bg-cover bg-gray-500 bg-blend-multiply h-[80vh] w-full [98%] flex items-center justify-center font-sans "
          style={{ backgroundImage: `url(${item.image})` }}
        >
          <div className="absolute inset-0 bg-gray-900 opacity-40"></div>

          <div className="relative z-10 max-w-5xl mx-auto px-4 py-16 sm:px-6 lg:px-8 text-center text-white">
            <h1 className="mainHeading text-3xl sm:text-4xl md:text-6xl  font-bold tracking-tight mb-6 uppercase">
              {item.title}
            </h1>
            <p className="text-xl sm:text-2xl text-gray-200 max-w-4xl mx-auto mb-16 font-medium leading-snug">
              {item.subtitle}
            </p>
            <button
              className="inline-flex items-center justify-center px-12 py-4 text-lg font-bold uppercase tracking-wider text-white bg-red-600 rounded-full shadow-2xl hover:bg-red-700 hover:shadow-red-500/50 transform transition duration-300 ease-in-out hover:scale-[1.05] active:scale-95 focus:outline-none focus:ring-4 focus:ring-red-500 focus:ring-opacity-70"
              onClick={() => console.log('Shop Now clicked')}
            >
              <ShoppingBag className="w-6 h-6 mr-3" />
              Shop Now
            </button>
          </div>
        </div>
      </div>
    ))}
  </Slider>
</div>

  );
};

export default SliderComponent;