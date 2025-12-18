"use client"
// Home.jsx - Admin Dashboard Main Component
import React from 'react'
import MetricCard from './MetricCard';
import TopSellingSKUs from './TopSellingSKUs';
import PendingShipments from './PendingShipments';
import { useAdmin } from '@/app/context/AdminContext';
// Import icons for better visual representation
import { ShoppingCart, DollarSign, Clock, Users, Package, Grid, Zap } from 'lucide-react';


const Home = () => {
     const { orders, metrics } = useAdmin();

     // UPDATED: Added icons and dynamic color hints to metricsArray
     const metricsArray = [
          { id: 1, title: "Total Orders", value: metrics.totalOrders, icon: ShoppingCart, color: "text-red-500", bgColor: "bg-red-500/10" },
          { id: 2, title: "Total Sales (30 Days)", value: metrics.totalSalesLast30Days, icon: DollarSign, color: "text-green-500", bgColor: "bg-green-500/10" },
          { id: 3, title: "Orders Today", value: metrics.ordersToday, icon: Clock, color: "text-amber-500", bgColor: "bg-amber-500/10" },
          { id: 4, title: "New Customers", value: metrics.newCustomersLast30Days, icon: Users, color: "text-blue-500", bgColor: "bg-blue-500/10" },
          { id: 5, title: "Pending Shipments", value: metrics.pendingShipments, icon: Package, color: "text-orange-500", bgColor: "bg-orange-500/10" },
          { id: 6, title: "Total Products", value: metrics.totalProducts, icon: Grid, color: "text-purple-500", bgColor: "bg-purple-500/10" },
     ];

     console.log("Metric Array", metricsArray)

     return (
          // MODIFIED: Use a subtle dark background for the whole page
          <div className="min-h-screen font-sans p-4 sm:p-8 lg:p-16 xl:p-20  dark:  transition-colors duration-300">
               < div className="max-w-7xl mx-auto" >

                    {/* Title and Welcome */}
                    < header className="mb-10 border-b border-red-700/50 pb-4" >
                         {/* MODIFIED: High contrast title for a premium look */}
                         <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark: sm:text-5xl" >
                              🔥 Admin Dashboard
                         </h1 >
                         {/* MODIFIED: Subdued text color for context */}
                         <p className="text-gray-500 dark:text-gray-400 mt-2 text-lg" >
                              Welcome back to Spicy Bazaar. Here is your operational snapshot.
                         </p >
                    </header >

                    {/* --- SECTION 1: Key Metrics (Enhanced Grid) --- */}
                    {/* MODIFIED: Added lg:grid-cols-4 for tighter layout on large screens */}
                    < section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12" >
                         {metrics.totalOrders ? (
                              metricsArray.map(metric => (
                                   // Note: MetricCard needs to accept the new `icon`, `color`, and `bgColor` props
                                   <MetricCard
                                        key={metric.id}
                                        title={metric.title}
                                        value={metric.value}
                                        icon={metric.icon}
                                        color={metric.color}
                                        bgColor={metric.bgColor}
                                   />
                              ))
                         ) : (
                              <p className="">Loading metrics...</p>
                         )}
                    </section >

                    {/* --- SECTION 2: Operational Data (2-column responsive grid) --- */}
                    <h2 className="text-2xl font-bold text-gray-900 dark: mb-6 border-l-4 border-red-600 pl-3">Operational Insights</h2>
                    < section className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12" >

                         {/* Column 1: Pending Shipments (Stretches across two columns for space) */}
                         {/* MODIFIED: Adjusted column span */}
                         <div className="lg:col-span-2">
                              {/* Assuming PendingShipments is styled to fit the dark theme */}
                              <PendingShipments />
                         </div >

                         {/* Column 2: Top Selling SKUs (Takes remaining column) */}
                         < div className="lg:col-span-1" >
                              {/* Assuming TopSellingSKUs is styled to fit the dark theme */}
                              <TopSellingSKUs />
                         </div >

                    </section >

               </div >
          </div >
     )
}

export default Home