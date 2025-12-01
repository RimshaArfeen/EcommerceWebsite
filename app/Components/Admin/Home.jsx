
"use client"
// Home.jsx - Admin Dashboard Main Component
import React from 'react'
import MetricCard from './MetricCard';
import LowStockAlerts from './LowStockAlerts';
import TopSellingSKUs from './TopSellingSKUs';
import PendingShipments from './PendingShipments';
import { useAdmin } from '@/app/context/AdminContext';

const Home = () => {
     const { orders, metrics } = useAdmin();
     // console.log("Orders in Home:", orders);
     // console.log("Total sale " , metrics)

     return (
          <div className="min-h-screen font-sans p-4 sm:p-8 lg:p-12">
               < div className="max-w-7xl mx-auto" >

                    {/* Title and Welcome */}
                    < header className="mb-10" >
                         <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl" >
                              Admin Dashboard
                         </h1 >
                         <p className="text-gray-500 mt-2 text-lg" >
                              Welcome back to Spicy Bazaar.Here is your operational snapshot.
                         </p >
                    </header >

                    {/* --- SECTION 1: Key Metrics (3-column grid) --- */}
                    < section className="grid grid-cols-1 gap-6 md:grid-cols-3 mb-12" >
                         {
                              metrics.map((metric) => (
                                   <MetricCard
                                        key={metric.id}
                                        title={metric.title}
                                        value={metric.value}
                                        icon={metric.icon}
                                        statusColor={metric.statusColor}
                                   />
                              ))
                         }
                    </section >

                    {/* --- SECTION 2: Operational Data (2-column responsive grid) --- */}
                    < section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12" >

                         {/* Column 1: Low Stock Alerts */}
                         < div className="lg:col-span-1" >
                              <LowStockAlerts />
                         </div >

                         {/* Column 2: Top Selling SKUs */}
                         < div className="lg:col-span-1" >
                              <TopSellingSKUs />
                         </div >

                         {/* Column 2: Pending Shipments (Stretches across both columns on mobile/tablet, single on desktop) */}
                         {/* Adjusted to be its own row for better vertical flow */}
                         <div className="lg:col-span-2">
                              <PendingShipments />
                         </div >
                    </section >

                    {/* Placeholder for future sections or footer */}
                    < footer className="mt-16 text-center text-sm text-gray-400 border-t pt-8" >
                         Spicy Bazaar Admin Console & copy; 2024
                    </footer >
               </div >
          </div >
     )
}

export default Home
