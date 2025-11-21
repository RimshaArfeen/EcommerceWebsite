"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import {
  Home,
  Store,
  LayoutGrid,
  BookOpen,
  Phone,
  ChevronDown,
  Icon as LucideIcon,
  ShoppingBag,
  Heart,
  CreditCard,
  User,
  MessageCircle,
} from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import "../../globals.css";

const NavLink = ({ name, href, icon: Icon, subLinks }) => {
  const [isOpen, setIsOpen] = useState(false);




  // Determine the color of the text (inherits from parent 'nav')
  // We use the 'a' selector in globals.css for text color on hover
  const textClass = "font-medium hover:text-[var(--color-saffron)]";

  return (
    <div
      className="relative h-full flex items-center text-sm"
      onMouseEnter={() => subLinks && setIsOpen(true)}
      onMouseLeave={() => subLinks && setIsOpen(false)}
    >
      <Link
        href={href}
        className={`flex items-center gap-1 p-2 whitespace-nowrap transition-colors ${textClass}`}
      >
        {/* <Icon size={18} aria-hidden="true" /> */}
        <span className=" lg:inline">{name}</span>
        {subLinks && <ChevronDown size={14} className={`ml-1 transition-transform ${isOpen ? 'rotate-180' : 'rotate-0'}`} />}
      </Link>

      {/* Dropdown Menu (Sub-links) */}
      {subLinks && isOpen && (
        <div
          className="dropdowns opacity-85 absolute top-full mt-0.5 w-48 rounded-lg shadow-xl p-2 z-50 border"
        >
          {subLinks.map((subLink) => (
            <Link
              key={subLink.name}
              href={subLink.href}
              className={`flex items-center gap-2 p-2 rounded-md transition-colors text-sm ${textClass}`}
              onClick={() => setIsOpen(false)} // Close on click
            >
              {subLink.icon && <subLink.icon size={16} />}
              {subLink.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

/**
 * The Bottom Primary Navigation Bar (often used for categories and pages).
 * It uses the 'nav2' style defined in globals.css for visual distinction.
 */
const BottomNav = () => {

  const [toggle, setToggle] = useState(false)
  const [isLogin, setIsLogin] = useState(false)
  const { data: session, status } = useSession();

  useEffect(() => {
    setIsLogin(status === "authenticated");
  }, [status]);
  
  const navigationItems = [
    { name: 'Home', href: '/', icon: Home },
    {
      name: 'Shop',
      href: '/allProds',
      icon: Store,
      subLinks: [
        { name: 'Shop Grid', href: '/allProds', icon: Store },
        { name: 'Shop Detail', href: '/allProds', icon: ShoppingBag },
      ],
    },
    {
      name: 'Pages',
      href: '#', // Placeholder for a main page link
      icon: LayoutGrid,
      subLinks: [
        { name: 'Cart', href: '/cart', icon: ShoppingBag },
        { name: 'Wishlist', href: '/wishlist', icon: Heart },
        { name: 'Checkout', href: '/checkout', icon: CreditCard },
        isLogin
          ? { name: 'My Account', href: '/account', icon: User }
          : { name: 'Login', href: '/login', icon: User },
      ],
    },
    {
      name: 'Blog',
      href: '/blog',
      icon: BookOpen,
      subLinks: [
        { name: 'Blog Overview', href: '/blog', icon: BookOpen },
        { name: 'Blog Detail', href: '/blog/detail', icon: MessageCircle },
      ],
    },
    { name: 'Contact Us', href: '/contact', icon: Phone },
  ];

  return (
    <>
      <nav
        aria-label="Secondary site navigation"
        // Use nav2 class to pick up specific styles from globals.css
        className="hidden md:block bottom-nav w-full  shadow-lg sticky top-0 z-40"
      >
        <div className="container mx-auto flex items-center justify-between h-10 px-4 sm:px-6 lg:px-8">

          {/* Left Section: Main Links */}
          <div className="flex space-x-2 h-full">
            {navigationItems.map((item) => (
              <NavLink
                key={item.name}
                name={item.name}
                href={item.href}
                icon={item.icon}
                subLinks={item.subLinks}
              />
            ))}
          </div>

          {/* Right Section: Contact Number/Utility */}
          <div className="flex items-center text-sm font-bold tracking-wide">
            {/* Using Warm Saffron for the number to suggest easy contact/urgency */}
            <Phone size={18} className="mr-2" style={{ color: 'var(--color-saffron)' }} />
            <span style={{ color: 'var(--color-saffron)' }}>
              +1 (800) 555-SPICE
            </span>
          </div>
        </div>
      </nav>

    </>
  );
};

export default BottomNav;