"use client";
import React from "react";
import { Mail, Phone, Clock, Send, ChevronDown } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen  font-sans py-24">
      < div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24" >
          {/* LEFT PANEL */}
          < div className="space-y-10" >
            <div>
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900 mb-4">
                We're Here to Help You Spice Things Up.
              </h1>
              <p className="text-lg text-gray-600" >
                Whether you have a question about an order, a recommendation for a
                new flavor, or just want to say hi, our team is ready to assist you.
              </p >
            </div >

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6" >
              <div className="flex p-6 border border-gray-200 rounded-xl /50 shadow-sm hover:shadow-md transition-shadow duration-300" >
                <Phone className="w-6 h-6 mr-4 text-red-600" />
                <div>
                  <p className="text-lg font-semibold text-gray-900 mb-1">
                    Call Us
                  </p>
                  <p className="text-sm font-bold text-gray-800" >
                    +1(555) HOT - SAUCE
                  </p >
                  <p className="text-xs text-gray-500 mt-1" >
                    Mon - Fri from 9am to 5pm EST.
                  </p >
                </div >
              </div >

              <div className="flex p-6 border border-gray-200 rounded-xl /50 shadow-sm hover:shadow-md transition-shadow duration-300" >
                <Mail className="w-6 h-6 mr-4 text-red-600" />
                <div>
                  <p className="text-lg font-semibold text-gray-900 mb-1">
                    Email Support
                  </p>
                  <p className="text-sm font-bold text-gray-800" >
                    support@heatwaveco.com
                  </p >
                  <p className="text-xs text-gray-500 mt-1" >
                    We aim to reply within 24 hours.
                  </p >
                </div >
              </div >
            </div >

            <div className="p-6 border-l-4 border-red-600 bg-red-50/50 rounded-lg" >
              <div className="flex items-center text-gray-900 font-semibold mb-2" >
                <Clock className="w-5 h-5 mr-3 text-red-600" />
                Operating Hours
              </div >
              <p className="text-gray-700 text-sm" >
                Our support team is available Monday - Friday from 9:00 AM to
                5:00 PM EST.
              </p >
            </div >
          </div >

          {/* RIGHT PANEL */}
          < div className="p-6 sm:p-10 rounded-2xl shadow-2xl border border-gray-100" >
            <h2 className="text-2xl font-bold text-gray-900 mb-6" >
              Send Us a Message
            </h2 >

            <form className="space-y-6" >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6" >
                <input
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 text-sm"
                  placeholder="Full Name"
                />
                <input
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 text-sm"
                  placeholder="Email Address"
                />
              </div >

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Inquiry Type
                </label>
                <div className="relative" >
                  <select className="submenu dropdowns w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm text-sm  pr-10" >
                    <option>General Inquiry</option>
                    <option>Order Issue / Tracking</option>
                    <option>Product Suggestion / Feedback</option>
                    <option>Wholesale or Partnerships</option>
                  </select >
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div >
              </div >

              <textarea
                className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 text-sm resize-y"
                placeholder="Your Message"
                rows={6}
              ></textarea>

              <button
                type="submit"
                className="bg-gray-900 w-full flex justify-center items-center py-3 px-4 text-lg font-bold rounded-xl text-white 0 hover 0 transition-all duration-300 shadow-lg"
              >
                Send Message
                <Send className="w-5 h-5 ml-2" />
              </button>
            </form >
          </div >
        </div >
      </div >
    </div >
  );
};

export default Contact;
