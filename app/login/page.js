"use client"
import React, { useState } from 'react';
import { Zap, Eye, EyeOff, Globe, Code, MessageCircle } from 'lucide-react';

// --- Sub-Component: Social Sign-In Button ---
// Uses Globe, Code, and MessageCircle as placeholders for Google, Github, and Facebook respectively.
const SocialButton = ({ icon: Icon, label, bgColorClass, hoverBgClass }) => (
  <button
    type="button"
    onClick={(e) => e.preventDefault()}
    className={`w-full flex items-center justify-center p-3 font-semibold rounded-xl text-sm transition-all duration-200
                border border-gray-300 shadow-sm ${bgColorClass} hover:${hoverBgClass} text-gray-700 hover:text-gray-900`}
  >
    <Icon className="w-5 h-5 mr-3" />
    {label}
  </button>
);

// --- Sub-Component: Form Input with Icon and Optional Password Toggle ---
const AuthInput = ({ id, label, type, placeholder, icon: Icon, autoComplete }) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputType = type === 'password' && showPassword ? 'text' : type;

  return (
    <div className="space-y-1">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 sr-only">
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </div>
        <input
          id={id}
          name={id}
          type={inputType}
          autoComplete={autoComplete}
          required
          placeholder={placeholder}
          className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400
                     focus:outline-none focus:ring-gray-800 focus:border-gray-800 text-sm transition-colors"
        />
        {type === 'password' && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        )}
      </div>
    </div>
  );
};

// --- Main Auth Component ---
const page = () => {
  const [isLogin, setIsLogin] = useState(true); // Toggles between Login and Register views

  // Conditional data based on state
  const title = isLogin ? "Welcome Back to the Heat" : "Join the Spicy Squad";
  const buttonText = isLogin ? "Sign In" : "Create Account";

  return (
    <div className="min-h-screen  flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
      
      {/* Central Card Container (Max Width & Shadow) */}
      <div className="w-full max-w-4xl border rounded-2xl shadow-2xl overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2">

          {/* Left Panel: Branding & Visual (Desktop Only) */}
          <div className="hidden lg:block p-10   md:flex flex-col justify-center items-center text-white">
            <Zap className="w-16 h-16 text-red-500 mb-4" />
            <h2 className="text-3xl font-extrabold mb-2">HeatWave Co.</h2>
            <p className="text-gray-300 text-center mb-6">
              Log in to track your order, manage subscriptions, and unlock exclusive hot sauces!
            </p>
            {/* Visual placeholder for spicy-food brand confidence */}
            <div className="w-full h-48 rounded-lg" style={{
              backgroundImage: 'url(https://i.pinimg.com/736x/96/27/fe/9627fe1ec0ac0831e0fd8ad88d03a988.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}></div>
          </div>

          {/* Right Panel: The Form */}
          <div className="p-8 sm:p-12 space-y-8">
            
            {/* Header & Title */}
            <div className="text-center">
              <h1 className="text-3xl font-extrabold text-gray-900">{title}</h1>
              <p className="mt-2 text-sm text-gray-600">
                Or {isLogin ? 'create an account' : 'sign in to your existing account'}
              </p>
            </div>

            {/* Social Sign-in Section (High Priority UX) */}
            <div className="space-y-3">
              <SocialButton icon={Globe} label="Sign in with Google" bgColorClass="bg-white" hoverBgClass=" " />
              <SocialButton icon={Code} label="Sign in with GitHub" bgColorClass="bg-white" hoverBgClass=" " />
              <SocialButton icon={MessageCircle} label="Sign in with Facebook" bgColorClass="bg-white" hoverBgClass=" " />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default page;