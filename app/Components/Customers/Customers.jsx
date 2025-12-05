
"use client"
import React, { useState } from 'react';
import {
     Plus, Search, User, Mail, DollarSign, Edit, Trash, ChevronRight, X, Save, Clock
} from 'lucide-react';
import "../../globals.css"
import { useCustomers } from '@/app/context/CustomerContext';

// --- MOCK DATA ---
const mockCustomers = [
     { id: 'usr-43c1d', name: 'Alina Hernandez', email: 'alina.h@mail.com', totalOrders: 14, ltv: 350.50, status: 'Loyal', lastActive: '2 days ago' },
     { id: 'usr-b7e2f', name: 'Marcus Chen', email: 'marcus.c@mail.com', totalOrders: 5, ltv: 89.95, status: 'New', lastActive: '1 week ago' },
     { id: 'usr-1f9a0', name: 'Sophia Rossi', email: 'sophia.r@mail.com', totalOrders: 32, ltv: 1200.75, status: 'VIP', lastActive: '5 hours ago' },
     { id: 'usr-8d6b4', name: 'Javier Lopez', email: 'javier.l@mail.com', totalOrders: 1, ltv: 14.99, status: 'Churned', lastActive: '2 months ago' },
     { id: 'usr-c0a3e', name: 'Priya Sharma', email: 'priya.s@mail.com', totalOrders: 8, ltv: 155.00, status: 'Active', lastActive: '1 day ago' },
];

// --- Main Admin Customers Component ---
const AdminCustomers = () => {
     const [isModalOpen, setIsModalOpen] = useState(false);
     const [selectedCustomer, setSelectedCustomer] = useState(null); // Null for Add, object for Edit
     const { customers } = useCustomers();
console.log("Customers " , customers)
     const handleOpenModal = (customer = null) => {
          setSelectedCustomer(customer);
          setIsModalOpen(true);
     };

     const handleCloseModal = () => {
          setIsModalOpen(false);
          setSelectedCustomer(null);
     };



     // Customer Table (Minimalist and Responsive)
     const CustomerTable = ({ customers }) => (
          <div className="rounded-xl shadow-lg border overflow-x-auto">
               <table className="min-w-full divide-y divide-gray-200">
                    <thead className="">
                         <tr>
                              {/* Headers adjusted for better information density */}
                              {['User ID', 'Customer', 'Total Orders', 'Actions'].map((header) => (
                                   <th
                                        key={header}
                                        className={` bg-red headings_on_red_bg px-6 py-3 text-left text-xs font-bold uppercase tracking-wider whitespace-nowrap 
                                            ${header === 'Total Orders' ? 'text-center' : ''}`}
                                   >
                                        {header}
                                   </th>
                              ))}
                         </tr>
                    </thead>
                    <tbody className=" primary_bg divide-y divide-gray-100">
                         {customers.map((customer, idx) => (
                              <tr key={idx} className=" transition-colors">
                                   {/* User ID (Monospace font for ID/Code readability) */}
                                   <td className="px-6 py-4 whitespace-nowrap text-xs font-mono ">
                                        #{customer.id}
                                   </td>

                                   {/* Name & Email (Combined for responsiveness and density) */}
                                   <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <div className="flex flex-col">
                                             <div className="font-semibold  flex items-center">
                                                  <User className="w-4 h-4 mr-2  hidden sm:inline" />
                                                  {customer.name}
                                             </div>
                                             <div className="text-xs  flex items-center mt-1">
                                                  <Mail className="w-3 h-3 mr-1" />
                                                  {customer.email}
                                             </div>
                                        </div>
                                   </td>

                                   {/* Total Orders */}
                                   <td className="px-6 py-4 whitespace-nowrap text-sm text-center font-medium ">
                                        {customer.totalOrders}
                                   </td>

                                   {/* LTV (Lifetime Value) - Prominent Green color for monetary value */}
                                   {/* <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-green-700">
                                        <span className="flex items-center">
                                             <DollarSign className="w-4 h-4 mr-1" />
                                             {customer.ltv.toFixed(2)}
                                        </span>
                                   </td> */}

                                   {/* Actions (Details/Edit Button) */}
                                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <button
                                             className="flex items-center  hover:text-black font-semibold p-2 rounded-lg transition-colors hover:bg-red headings_on_red_bg0"

                                        >
                                             Details
                                             <ChevronRight className="w-4 h-4 ml-1" />
                                        </button>
                                   </td>
                              </tr>
                         ))}
                    </tbody>
               </table>
          </div>
     );

     return (
          <div className="min-h-screen font-sans p-4 sm:p-8 lg:p-12">
               <div className="max-w-7xl mx-auto">

                    {/* Header and CTA */}
                    <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 pb-4 border-b">
                         <div>
                              <h1 className="text-3xl font-extrabold tracking-tight  sm:text-4xl">
                                   👥 Customer Management
                              </h1>
                              <p className=" mt-1">
                                   View and manage all registered user accounts and customer data.
                              </p>
                         </div>


                    </header>

                    {/* Filter and Search Bar */}
                    <div className="flex justify-between items-center mb-8">
                         <div className="w-full sm:w-80 relative">
                              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 " />
                              <input
                                   type="text"
                                   placeholder="Search by name or email..."
                                   className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-black focus:border-black transition-all shadow-sm"
                              />
                         </div>
                         {/* Placeholder for additional filters like Status Dropdown or Date Range */}
                    </div>

                    {/* Customer List / Table */}
                    <CustomerTable customers={customers} />

                    {/* Pagination Placeholder (Clean, professional look) */}
                    <div className="mt-10 flex justify-center">
                         <div className="flex items-center space-x-2  text-sm">
                              <button className="px-3 py-1 border rounded-lg  hover:bg-red headings_on_red_bg0 transition-colors disabled:opacity-50" disabled>Previous</button>
                              <span className="px-3 py-1 font-bold border border-black rounded-lg bg-red headings_on_red_bg0 text-black">1</span>
                              <button className="px-3 py-1 border rounded-lg hover:bg-red headings_on_red_bg0 transition-colors cursor-pointer">2</button>
                              <button className="px-3 py-1 border rounded-lg hover:bg-red headings_on_red_bg0 transition-colors cursor-pointer">Next</button>
                         </div>
                    </div>
               </div>


          </div>
     );
};

export default AdminCustomers;