
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
     const metricsArray = [
          { id: 1, title: "Total Orders", value: metrics.totalOrders },
          { id: 2, title: "Total Sales (30 Days)", value: metrics.totalSalesLast30Days },
          { id: 3, title: "Orders Today", value: metrics.ordersToday },
          { id: 4, title: "New Customers", value: metrics.newCustomersLast30Days },
          { id: 5, title: "Pending Shipments", value: metrics.pendingShipments },
          { id: 6, title: "Total Products", value: metrics.totalProducts },
          { id: 7, title: "Low Stock Products", value: metrics.lowStockCount }
     ];
     console.log("Metric Array", metricsArray)
     return (
          <div className="min-h-screen font-sans p-4 sm:p-8 lg:p-12">
               < div className="max-w-7xl mx-auto" >

                    {/* Title and Welcome */}
                    < header className="mb-10" >
                         <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl" >
                              Admin Dashboard
                         </h1 >
                         <p className="text-gray-500 mt-2 text-lg" >
                              Welcome back to Spicy Bazaar. Here is your operational snapshot.
                         </p >
                    </header >

                    {/* --- SECTION 1: Key Metrics (3-column grid) --- */}
                    < section className="grid grid-cols-1 gap-6 md:grid-cols-3 mb-12" >
                         {metrics.totalOrders ? (
                              metricsArray.map(metric => (
                                   <MetricCard
                                        key={metric.id}
                                        title={metric.title}
                                        value={metric.value}
                                        // icon={metric.icon}
                                        // statusColor={metric.statusColor}
                                   />
                              ))
                         ) : (
                              <p>Loading metrics...</p>
                         )}
                    </section >

                    {/* --- SECTION 2: Operational Data (2-column responsive grid) --- */}
                    < section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12" >

                         {/* Column 1: Low Stock Alerts */}
                         < div className="lg:col-span-1" >
                              <LowStockAlerts />
                         </div >

                         {/* Column 2: Top Selling SKUs */}
                         {/* < div className="lg:col-span-1" >
                              <TopSellingSKUs />
                         </div >

                         {/* Column 2: Pending Shipments (Stretches across both columns on mobile/tablet, single on desktop) */}
                         <div className="lg:col-span-2">
                              <PendingShipments />
                         </div > 
                    </section >


               </div >
          </div >
     )
}

export default Home
