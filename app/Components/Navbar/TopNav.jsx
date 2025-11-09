"use client";
// app/Components/Navbar/TopNav.jsx
import React from 'react';
import Link from 'next/link';
import {
  Info,
  Truck,
  Undo2,
  HelpCircle,
  User,
  Icon as LucideIcon, // Use 'Icon' type for the component prop
} from 'lucide-react';

/**
 * A reusable link component for the top utility bar.
 * It's small, includes an icon, and inherits text color.
 */
const UtilityLink = ({
  href,
  icon: Icon, // Renames the 'icon' prop (which holds the component) to 'Icon' for proper JSX usage
  children,
}) => {
  return (
    <Link
      href={href}
      className="flex items-center gap-1.5 text-sm font-medium transition-opacity hover:opacity-80"
    >
      {/* Icon is decorative since text is present */}
      <Icon size={16} aria-hidden="true" />
      <span>{children}</span>
    </Link>
  );
};

/**
 * The Top Utility Navbar.
 * Sits at the very top of the page.
 * It automatically inherits its background and text colors from the 'nav'
 * selector in your globals.css file.
 */
const TopNavbar = () => {
  return (
    <nav
      // aria-label="Top utility navigation"
      // The 'nav' element will be targeted by your 'body nav' style
      // We just add padding and layout logic.
      className="top-nav w-full px-4 py-2 sm:px-6 lg:px-8"
    >
      <div className="container mx-auto flex flex-col items-center justify-between gap-y-2 gap-x-4 md:flex-row">
        
        {/* Left Section: Business Policies */}
        <div className="flex flex-wrap items-center text-white justify-center gap-y-1 gap-x-4 md:justify-start">
          <UtilityLink href="/about-us" icon={Info}>
            About Us
          </UtilityLink>
          <UtilityLink href="/delivery" icon={Truck}>
            Free Delivery
          </UtilityLink>
          <UtilityLink href="/returns" icon={Undo2}>
            Return Policy
          </UtilityLink>
        </div>

        {/* Right Section: User & Support */}
        <div className="flex flex-wrap items-center justify-center gap-y-1 gap-x-4 md:justify-start">
          <UtilityLink href="/help" icon={HelpCircle}>
            Help Center
          </UtilityLink>
          <UtilityLink href="/login" icon={User}>
           Login/Register
          </UtilityLink>

          {/* <UtilityLink href="/account" icon={User}>
            My Account
          </UtilityLink> */}
        </div>
      </div>
    </nav>
  );
};

export default TopNavbar;