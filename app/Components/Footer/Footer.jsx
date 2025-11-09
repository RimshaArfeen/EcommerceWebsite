
"use client"
import React from 'react';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Zap, ArrowRight, Shield, CreditCard } from 'lucide-react';

// --- Sub-Component: Link Group ---
// Reusable component for displaying vertical link columns
const FooterLinkGroup = ({ title, links }) => (
  <div>
    <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">
      {title}
    </h3>
    <ul className="space-y-3">
      {links.map((link, index) => (
        <li key={index}>
          <a
            href={link.href}
            className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm"
            onClick={(e) => e.preventDefault()} // UX: Placeholder action
          >
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

// --- Sub-Component: Social Media Links ---
const SocialIcons = () => (
  <div className="flex space-x-4 mt-4">
    <a href="#" className="text-gray-500 hover:text-gray-900 transition-colors" aria-label="Facebook">
      <Facebook className="w-6 h-6" />
    </a>
    <a href="#" className="text-gray-500 hover:text-gray-900 transition-colors" aria-label="Instagram">
      <Instagram className="w-6 h-6" />
    </a>
    <a href="#" className="text-gray-500 hover:text-gray-900 transition-colors" aria-label="Twitter">
      <Twitter className="w-6 h-6" />
    </a>
  </div>
);

// --- Sub-Component: Newsletter Signup ---
const NewsletterSignup = () => (
  <div className="max-w-md">
    <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">
      Stay Updated on New Heat!
    </h3>
    <p className="text-sm text-gray-600 mb-4">
      Subscribe to our newsletter for exclusive drops and spicy recipes.
    </p>
    <div className="flex space-x-2">
      <input
        type="email"
        placeholder="Enter your email"
        className="flex-grow p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-gray-800 focus:border-gray-800 text-sm"
      />
      <button
        type="submit"
        className="flex items-center justify-center p-3 text-white bg-gray-800 rounded-lg hover:bg-gray-900 transition-colors"
        onClick={(e) => e.preventDefault()}
        aria-label="Subscribe to newsletter"
      >
        <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  </div>
);

// --- Main Footer Component ---
const Footer = () => {
  const quickLinks = [
    { label: 'Shop All Sauces', href: '/shop' },
    { label: 'Heat Scale Guide', href: '/heat-guide' },
    { label: 'Our Story', href: '/about' },
    { label: 'Customer Reviews', href: '/reviews' },
  ];

  const helpLinks = [
    { label: 'Shipping & Delivery', href: '/shipping' },
    { label: 'Returns & Exchanges', href: '/returns' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Contact Us', href: '/contact' },
  ];

  const legalLinks = [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Cookie Policy', href: '/cookies' },
  ];

  return (
    <footer className="bg-white border-t border-gray-200 font-sans mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        
        {/* Top Section: Grid Layout for Links and Newsletter */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8 lg:gap-12 pb-10 border-b border-gray-200">
          
          {/* Column 1: Brand & Social */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Zap className="w-8 h-8 text-red-600" />
              <span className="text-2xl font-bold tracking-tight text-gray-900">
                HeatWave Co.
              </span>
            </div>
            <p className="text-sm text-gray-500 mb-4">
              Fueling your passion for heat, one drop at a time.
            </p>
            <SocialIcons />
          </div>

          {/* Column 2: Quick Shop Links */}
          <FooterLinkGroup title="Quick Shop" links={quickLinks} />

          {/* Column 3: Help & Support */}
          <FooterLinkGroup title="Customer Help" links={helpLinks} />

          {/* Column 4: Newsletter Signup */}
          <NewsletterSignup />

        </div>

        {/* Bottom Section: Contact, Payment & Copyright */}
        <div className="pt-8 space-y-8 lg:space-y-0 lg:flex lg:justify-between lg:items-end">
          
          {/* Contact Information */}
          <div className="space-y-2 text-sm text-gray-600">
            <h4 className="font-semibold text-gray-800 mb-2">Get in Touch</h4>
            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4 text-gray-500" />
              <span>support@heatwaveco.com</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4 text-gray-500" />
              <span>(555) 555-HEAT</span>
            </div>
            <div className="flex items-start space-x-2">
              <MapPin className="w-4 h-4 text-gray-500 mt-1" />
              <span>100 Scoville Lane, Fire City, CA 90210</span>
            </div>
          </div>
          
          {/* Payment Icons and Security Badges (Trust Elements) */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-xs text-gray-500">
              <Shield className="w-4 h-4 text-green-500" />
              <span>100% Secure Shopping Guaranteed</span>
            </div>
            <div className="flex space-x-3">
              {/* UX: Use grayscale placeholder SVGs for payment methods */}
              <CreditCard className="w-8 h-6 text-gray-300" />
              <svg className="w-8 h-6 text-gray-300" viewBox="0 0 24 24" fill="currentColor"><path d="M21.93 7.84L12 11.2 2.07 7.84A1 1 0 0 1 2 7V4a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v3a1 1 0 0 1-.07.84zM12 21a9 9 0 0 0 9-9h-2a7 7 0 0 1-7 7V21zM3 12a9 9 0 0 0 9 9v-2a7 7 0 0 1-7-7H3zM12 3v2a7 7 0 0 1 7 7h2a9 9 0 0 0-9-9zM11 15v-6h2v6h-2z"/></svg>
              <svg className="w-8 h-6 text-gray-300" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.83 7.82l-4.75 4.75a.5.5 0 0 1-.71 0l-2.75-2.75a.5.5 0 0 1 0-.71l.71-.71a.5.5 0 0 1 .71 0l2.04 2.04 4.04-4.04a.5.5 0 0 1 .71 0l.71.71a.5.5 0 0 1 0 .71z"/></svg>
            </div>
          </div>

          {/* Copyright and Legal Links (Inline) */}
          <div className="text-sm text-gray-500 space-y-2 lg:text-right">
            <p>&copy; {new Date().getFullYear()} HeatWave Co. All rights reserved.</p>
            <div className="flex justify-start lg:justify-end space-x-4">
              {legalLinks.map((link, index) => (
                <a 
                  key={index} 
                  href={link.href}
                  className="hover:text-gray-700 transition-colors"
                  onClick={(e) => e.preventDefault()}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;