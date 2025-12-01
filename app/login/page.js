"use client"
import React from 'react';
import { Zap, Globe, Code, MessageCircle } from 'lucide-react';
import { signIn } from "next-auth/react"

const Page = () => {
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
      < div className="w-full max-w-4xl border rounded-2xl shadow-2xl overflow-hidden" >
        <div className="grid grid-cols-1 lg:grid-cols-2" >

          {/* Left Panel */}
          < div className="hidden lg:block p-10 md:flex flex-col justify-center items-center text-white" >
            <Zap className="w-16 h-16 text-red-500 mb-4" />
            <h2 className="text-3xl font-extrabold mb-2" > SPICYBAZAAR.</h2 >
            <p className="text-gray-300 text-center mb-6" >
              Log in to track your order, manage subscriptions, and unlock exclusive hot sauces!
            </p >
            <div
              className="w-full h-48 rounded-lg"
              style={{
                backgroundImage:
                  'url(https://i.pinimg.com/736x/96/27/fe/9627fe1ec0ac0831e0fd8ad88d03a988.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            ></div>
          </div >

          {/* Right Panel */}
          < div className="p-8 sm:p-12 space-y-8" >
            <div className="text-center" >
              <h1 className="text-3xl font-extrabold text-gray-900" >
                Welcome Back to the Heat
              </h1 >
              <p className="mt-2 text-sm text-gray-600" >
                Or create an account
              </p >
            </div >

            {/* Social Buttons */}
            < div className="space-y-3" >
              <button
                type="button"
                onClick={() => signIn("google", { redirectTo: "/" })}
                className="w-full flex items-center justify-center p-3 font-semibold rounded-xl text-sm transition-all duration-200
                border border-gray-300 shadow-sm bg-white text-gray-700 hover:text-gray-900 hover:cursor-pointer"
              >
                <Globe className="w-5 h-5 mr-3" />
                Sign in with Google
              </button>

              <button
                type="button"
                onClick={() => signIn("github", { redirectTo: "/" })}
                className="w-full flex items-center justify-center p-3 font-semibold rounded-xl text-sm transition-all duration-200
                border border-gray-300 shadow-sm bg-white text-gray-700 hover:text-gray-900 hover:cursor-pointer"
              >
                <Code className="w-5 h-5 mr-3" />
                Sign in with GitHub
              </button>

              <button
                type="button"
                className="w-full flex items-center justify-center p-3 font-semibold rounded-xl text-sm transition-all duration-200
                border border-gray-300 shadow-sm bg-white text-gray-700 hover:text-gray-900 hover:cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 mr-3" />
                Sign in with Facebook
              </button>
            </div >
          </div >
        </div >
      </div >
    </div >
  );
};

export default Page;
