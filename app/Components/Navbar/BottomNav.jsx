"use client"
import React, { useState, useMemo } from 'react';
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
  LayoutDashboard,
  ShoppingCart,
  Package,
  Users,
  UserCircle
} from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import "../../globals.css";

const NavLink = ({ name, href, icon: Icon, subLinks }) => {
  const [isOpen, setIsOpen] = useState(false);




  // Determine the color of the text (inherits from parent 'nav')
  // We use the 'a' selector in globals.css for text color on hover
  const textclass = "font-medium hover:text-[var(--color-saffron)]";

  return (
    <div
      className="relative h-full flex items-center text-sm"
      onMouseEnter={() => subLinks && setIsOpen(true)}
      onMouseLeave={() => subLinks && setIsOpen(false)}
    >
      <Link
        href={href}
        className={`flex items-center gap-1 p-2 whitespace-nowrap transition-colors ${textclass}`}
      >
        {/* <Icon size={18} aria-hidden="true" /> */}
        <span className=" lg:inline">{name}</span>
        {subLinks && <ChevronDown size={14} className={`ml-1 transition-transform ${isOpen ? 'rotate-180' : 'rotate-0'}`} />}
      </Link>

      {/* Dropdown Menu (Sub-links) */}
      {
        subLinks && isOpen && (
          <div
            className="dropdowns opacity-85 absolute top-full mt-0.5 w-48 rounded-lg shadow-xl p-2 z-50 border"
          >
            {subLinks.map((subLink) => (
              <Link
                key={subLink.name}
                href={subLink.href}
                className={`flex items-center gap-2 p-2 rounded-md transition-colors text-sm ${textclass}`}
                onClick={() => setIsOpen(false)} // Close on click
              >
                {subLink.icon && <subLink.icon size={16} />}
                {subLink.name}
              </Link>
            ))
            }
          </div >
        )
      }
    </div >
  );
};

/**
 * The Bottom Primary Navigation Bar (often used for categories and pages).
 * It uses the 'nav2' style defined in globals.css for visual distinction.
 */
const BottomNav = () => {
  const { data: session, status } = useSession();
  const isLogin = status === "authenticated";

  // Use useMemo to recalculate navigation items only when session/login status changes
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

    // Debugging: Check if role is appearing now
    console.log("Current User Role:", session?.user?.role);

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
          { name: "Customers", href: "/admin/customers", icon: UserCircle },
        ],
      });
    }

    items.push({ name: 'Contact Us', href: '/contact', icon: Phone });
    return items;
  }, [session, isLogin]);

  return (
    <nav className="hidden md:block bottom-nav w-full shadow-lg sticky top-0 z-40">
      <div className="container mx-auto flex items-center justify-between h-10 px-4 sm:px-6 lg:px-8">
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
        <div className="flex items-center text-sm font-bold tracking-wide">
          <Phone size={18} className="mr-2" style={{ color: 'var(--color-saffron)' }} />
          <span style={{ color: 'var(--color-saffron)' }}>+1 (800) 555-SPICE</span>
        </div>
      </div>
    </nav>
  );
};

export default BottomNav;