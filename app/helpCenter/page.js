import React from 'react';
import { Search, Flame, Package, RefreshCcw, CreditCard, MessageCircle, ChevronRight } from 'lucide-react';

const Page = () => {
     const categories = [
          { title: "Track Order", icon: <Package className="text-orange-600" />, description: "Where is my spicy haul?" },
          { title: "Returns & Refunds", icon: <RefreshCcw className="text-red-600" />, description: "Too hot to handle? Let's fix it." },
          { title: "Payments", icon: <CreditCard className="text-orange-600" />, description: "Manage your Scoville points and billing." },
          { title: "Spicy Rewards", icon: <Flame className="text-red-600" />, description: "How our loyalty program works." },
     ];

     return (
          <div className="min-h-screen  font-sans ">
               {/* Hero Section */}
               <header className="relative bg-red py-16 px-6 overflow-hidden">
                    <div className="absolute inset-0 opacity-10">
                         {/* Subtle flame pattern overlay could go here */}
                         <div className="absolute -top-24 -left-24 w-96 h-96 bg-orange-400 rounded-full blur-3xl"></div>
                    </div>

                    <div className="max-w-4xl mx-auto text-center relative z-10">
                         <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
                              How can we help you stay <span className="italic text-orange-300">Spicy?</span>
                         </h1>

                         <div className="relative max-w-2xl mx-auto">
                              <Search className="absolute left-4 top-1/2 -translate-y-1/2  w-5 h-5" />
                              <input
                                   type="text"
                                   placeholder="Search for orders, sauces, or heat levels..."
                                   className="w-full pl-12 pr-4 py-4 rounded-xl border-none shadow-2xl focus:ring-4 focus:ring-red-500/10 text-lg outline-none"
                              />
                         </div>
                    </div>
               </header>

               <main className="max-w-6xl mx-auto px-6 -mt-8 pb-20">
                    {/* Quick Links Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
                         {categories.map((cat, i) => (
                              <div key={i} className=" p-6 rounded-2xl shadow-sm border border-slate-100 hover:border-red-200 hover:shadow-md transition-all cursor-pointer group">
                                   <div className=" w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-red-50 transition-colors">
                                        {cat.icon}
                                   </div>
                                   <h3 className="font-bold text-lg mb-1">{cat.title}</h3>
                                   <p className=" text-sm">{cat.description}</p>
                              </div>
                         ))}
                    </div>

                    {/* FAQ Section */}
                    <section className="grid md:grid-cols-3 gap-12">
                         <div className="md:col-span-2">
                              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                   <Flame className="text-red-600 fill-red-600" size={24} />
                                   Burning Questions (FAQs)
                              </h2>
                              <div className="space-y-4">
                                   {["How do you measure sauce heat?", "International shipping rates", "Are the sauces vegan-friendly?"].map((q, i) => (
                                        <button key={i} className="w-full flex items-center justify-between p-5  rounded-xl border border-slate-200 hover: transition-colors">
                                             <span className="font-medium text-left">{q}</span>
                                             <ChevronRight className="" size={20} />
                                        </button>
                                   ))}
                              </div>
                         </div>

                         {/* Contact Sidebar */}
                         <aside className=" p-8 rounded-3xl border border-slate-200 h-fit sticky top-8">
                              <h3 className="text-xl font-bold mb-4">Still feeling the burn?</h3>
                              <p className=" mb-6 text-sm leading-relaxed">
                                   Our Spice Masters are available 24/7 to help you with your order.
                              </p>
                              <button className="w-full bg-blue-900 text-white py-3 rounded-xl font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-2 mb-3">
                                   <MessageCircle size={18} />
                                   Live Chat
                              </button>
                              <button className="w-full  border-2 border-slate-200  py-3 rounded-xl font-bold hover:border-red-600 hover:text-red-600 transition-all">
                                   Email Support
                              </button>
                         </aside>
                    </section>
               </main>
          </div>
     );
};

export default Page;