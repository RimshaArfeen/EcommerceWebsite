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
  // console.log("Cart Now:", cartItems);
  // console.log("Liked Items", likedItems)
  // console.log("Total items:", total_items);


  // --- Theme Logic ---
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

        {/* Middle Section: Search Bar */}
        <div className=" max-w-2xl order-3  w-full md:w-auto">
          <form onSubmit={handleSearch} className="flex rounded-lg overflow-hidden border">
            <input
              type="search"
              placeholder="Search for spices, sauces, and heat levels..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 text-sm focus:outline-none bg-transparent"
              aria-label="Search products"
            />
            <button
              type="submit"
              aria-label="Search"
              className="p-3 bg-[#e69a00] transition-colors hover:cursor-pointer"
            >
              <Search size={20} style={{ color: 'var(--color-muted-brown)' }} />
            </button>
          </form>
        </div>

        {/* Right Section: User Icons and Theme Toggle */}
        <div className="flex items-center space-x-4 order-4 ">

          {/* Wishlist Icon */}
          <Link href="/wishlist"
            className="relative inline-flex items-center">
            <Heart className="w-6 h-6" />
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold">
              {total_liked_items}
            </span>
          </Link>


          {/* Cart Icon */}
          <Link href="/cart"
            className="relative inline-flex items-center">
            <ShoppingCart className="w-6 h-6" />
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold">
              {total_items}
            </span>
          </Link>

          {/* Theme Toggle Button (New Addition) */}
          <button
            onClick={toggleTheme}
            aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            className="p-2 transition-transform duration-200 hover:scale-110 hover:opacity-80 rounded-full hover:cursor-pointer"
          >
            {isDark ? <Sun size={24} /> : <Moon size={24} />}
          </button>

        </div>
      </div>
    </nav>
  );
}

export default MainNavbar;