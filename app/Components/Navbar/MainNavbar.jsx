"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Heart, ShoppingCart, Sun, Moon } from 'lucide-react';
import { useCart } from '@/app/context/CartContext';
import { useWishlist } from '@/app/context/LikeContext';


const MainNavbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  // State to track the current theme mode (true for dark, false for light)
  const [isDark, setIsDark] = useState(false);
  const { cartItems } = useCart()
  const { likedItems } = useWishlist()
  const total_items = cartItems.reduce((total, item) => total + (item.qty || 0), 0);
  const total_liked_items = likedItems.length
    const phrases = [
      "Authentic Heat.",
      "Global Flavors.",
      "Kitchen Traditions.",
      "Premium Spices."
    ];

    const [index, setIndex] = useState(0);
    const [fadeProp, setFadeProp] = useState('opacity-100');

    useEffect(() => {
      const timeout = setInterval(() => {
        // 1. Start fading out
        setFadeProp('opacity-0');

        // 2. Wait for fade-out to finish (500ms), then change text and fade back in
        setTimeout(() => {
          setIndex((prevIndex) => (prevIndex + 1) % phrases.length);
          setFadeProp('opacity-100');
        }, 500);

      }, 4000); // Change phrase every 4 seconds

      return () => clearInterval(timeout);
    }, []);


  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (storedTheme === 'dark' || (!storedTheme && systemPreference)) {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDark(false);
    }
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', newIsDark ? 'dark' : 'light');
  };
  // --- End Theme Logic ---

  const handleSearch = (e) => {
    e.preventDefault();
    // In a real application, you would navigate to the search results page:
    // router.push(`/search?query=${searchTerm}`);
    console.log('Searching for:', searchTerm);
    setSearchTerm('');
  };

  const IconLink = ({ href, icon: Icon, label }) => (
    <Link
      href={href}
      aria-label={label}
      // Inherits text color from 'nav' in globals.css
      className="p-2 transition-transform duration-200 hover:scale-110 hover:opacity-80 rounded-full"
    >
      <Icon size={24} />
    </Link>
  );

  return (
    <nav
      aria-label="Main navigation and search"
      className="w-full   px-4 py-3 sm:px-6 lg:px-8 "
    >
      <div className="container mx-auto flex flex-wrap items-center justify-between gap-4">

        {/* Left Section: Brand Name */}
        <div className="">
          <Link href="/" className="text-2xl font-logo font-extrabold tracking-wide">
            {/* Using a color variable for the brand name to ensure it pops */}
            <span style={{ color: 'var(--color-cayenne)' }}>SPICY</span>
            <span style={{ color: 'var(--color-saffron)' }}>BAZAAR</span>
          </Link>
        </div>

        {/* Middle Section: Brand Tagline */}
        <div className="max-w-2xl order-3 w-full md:w-auto flex flex-col items-center md:items-start justify-center px-4">
          <div className="flex items-center gap-2 group">
            <span className="h-px w-8 bg-[var(--color-saffron)] hidden lg:block opacity-50"></span>

            <h2 className="text-lg md:text-xl lg:text-2xl font-serif italic tracking-wide text-gray-800 dark:text-gray-100">
              Ignite Your Senses with{" "}
              <span className={`text-[var(--color-saffron)] font-bold not-italic transition-opacity duration-500 ${fadeProp}`}>
                {phrases[index]}
              </span>
            </h2>
          </div>

          <p className="text-[10px] hidden sm:flex uppercase tracking-[0.2em] text-gray-500 mt-1 font-medium">
            Your Global Gateway to Premium Spices
          </p>
        </div>

        
        {/* Right Section: User Icons and Theme Toggle */}
        < div className="flex items-center space-x-4 order-4 " >

          {/* Wishlist Icon */}
          < Link href="/wishlist"
            className="relative inline-flex items-center" >
            <Heart className="w-6 h-6" />
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold" >
              {total_liked_items}
            </span >
          </Link >


          {/* Cart Icon */}
          < Link href="/cart"
            className="relative inline-flex items-center" >
            <ShoppingCart className="w-6 h-6" />
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold" >
              {total_items}
            </span >
          </Link >

          {/* Theme Toggle Button (New Addition) */}
          < button
            onClick={toggleTheme}
            aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            className="p-2 transition-transform duration-200 hover:scale-110 hover:opacity-80 rounded-full hover:cursor-pointer"
          >
            {isDark ? <Sun size={24} /> : <Moon size={24} />}
          </button >

        </div >
        </div>

     
    </nav >
  );
}

export default MainNavbar;