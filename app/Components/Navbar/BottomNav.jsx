"use client"
import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import {
  Home, Store, LayoutGrid, Phone, ChevronDown, Menu, X,
  ShoppingBag, Heart, CreditCard, User, LayoutDashboard,
  ShoppingCart, Package, Users, UserCircle
} from 'lucide-react';
import { useSession } from 'next-auth/react';
import "../../globals.css";

/**
 * Desktop NavLink (Hover-based)
 */
const NavLink = ({ name, href, icon: Icon, subLinks }) => {
  const [isOpen, setIsOpen] = useState(false);
  const textclass = "font-medium hover:text-[var(--color-saffron)]";

  return (
    <div
      className="relative h-full flex items-center text-sm"
      onMouseEnter={() => subLinks && setIsOpen(true)}
      onMouseLeave={() => subLinks && setIsOpen(false)}
    >
      <Link href={href} className={`flex items-center gap-1 p-2 whitespace-nowrap transition-colors ${textclass}`}>
        <span>{name}</span>
        {subLinks && <ChevronDown size={14} className={`ml-1 transition-transform ${isOpen ? 'rotate-180' : 'rotate-0'}`} />}
      </Link>

      {subLinks && isOpen && (
        <div className="dropdowns opacity-95 absolute top-full mt-0.5 w-48 rounded-lg shadow-xl p-2 z-50 border bg-white dark:bg-gray-900">
          {subLinks.map((subLink) => (
            <Link
              key={subLink.name}
              href={subLink.href}
              className={`flex items-center gap-2 p-2 rounded-md transition-colors text-sm ${textclass}`}
              onClick={() => setIsOpen(false)}
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

const BottomNav = () => {
  const { data: session, status } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedItem, setExpandedItem] = useState(null); // For mobile accordion

  const isLogin = status === "authenticated";

  const navigationItems = useMemo(() => {
    const items = [
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
        href: '#',
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
    ];

    if (session?.user?.role === "admin") {
      items.push({
        name: "Admin Dashboard",
        href: "/admin",
        icon: LayoutDashboard,
        subLinks: [
          { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
          { name: "Orders", href: "/admin/orders", icon: ShoppingCart },
          { name: "Products", href: "/admin/adminProducts", icon: Package },
          { name: "Users", href: "/admin/users", icon: Users },
        ],
      });
    }

    items.push({ name: 'Contact Us', href: '/contact', icon: Phone });
    return items;
  }, [session, isLogin]);

  // Close mobile menu when screen size increases
  useEffect(() => {
    const handleResize = () => { if (window.innerWidth >= 768) setIsMobileMenuOpen(false); };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <nav className="w-full shadow-lg sticky top-0 z-40 bottom-nav dark:bg-gray-900 border-b">
        <div className="container mx-auto flex items-center justify-between h-14 md:h-10 px-4 sm:px-6 lg:px-8">

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-2 h-full">
            {navigationItems.map((item) => (
              <NavLink key={item.name} {...item} />
            ))}
          </div>

          {/* Mobile Hamburger Button */}
          <div className="md:hidden flex items-center justify-between w-full">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2  dark:"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>


            <div className="flex md:hidden text-sm font-bold tracking-wide">
              <Phone size={18} className="mr-2 text-[var(--color-saffron)]" />
              <span className="text-[var(--color-saffron)]">+1 (800) 555-SPICE</span>
            </div>
          </div>

          {/* Desktop Right Section */}
          <div className="hidden md:flex items-center text-sm font-bold tracking-wide">
            <Phone size={18} className="mr-2 text-[var(--color-saffron)]" />
            <span className="text-[var(--color-saffron)]">+1 (800) 555-SPICE</span>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-screen opacity-100 border-t' : 'max-h-0 opacity-0'}`}>
          <div className="flex flex-col p-4 space-y-2 bottom-nav dark:bg-gray-800">
            {navigationItems.map((item) => (
              <div key={item.name} className="border-b border-gray-200 dark:border-gray-700 last:border-0">
                <div className="flex items-center justify-between py-3">
                  <Link
                    href={item.href}
                    className="flex items-center gap-3 text-sm font-medium"
                    onClick={() => item.href !== '#' && setIsMobileMenuOpen(false)}
                  >
                    <item.icon size={18} className="text-[var(--color-saffron)]" />
                    {item.name}
                  </Link>
                  {item.subLinks && (
                    <button
                      onClick={() => setExpandedItem(expandedItem === item.name ? null : item.name)}
                      className="p-1"
                    >
                      <ChevronDown size={18} className={`transition-transform ${expandedItem === item.name ? 'rotate-180' : ''}`} />
                    </button>
                  )}
                </div>

                {/* Mobile Sub-links Accordion */}
                {item.subLinks && expandedItem === item.name && (
                  <div className="pl-8 pb-3 flex flex-col space-y-2">
                    {item.subLinks.map((sub) => (
                      <Link
                        key={sub.name}
                        href={sub.href}
                        className="text-sm   py-1"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
};

export default BottomNav;