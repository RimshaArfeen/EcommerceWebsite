
"use client"
import React, { useState } from 'react';
import {
     Plus, Search, User, Mail, DollarSign, Edit, Trash, ChevronRight, X, Save, Clock,
     ShoppingCart, Package, Truck, CheckCircle, MapPin
} from 'lucide-react';
import "../../globals.css"
import { useCustomers } from '@/app/context/CustomerContext';
import { formatDate } from '@/app/utils/index';
import { CustomerDetailsHeader, OrderHistoryCard, OrderHistoryAccordion } from './OrderHistoryCard';


// --- Main Admin Customers Component (Modal Structure Update) ---
const AdminCustomers = () => {

     const [showModal, setShowModal] = useState(false)
     const [selectedCustomer, setSelectedCustomer] = useState(null);

     const { customers } = useCustomers();
     // console.log("Customers ", customers)

     const handleOpenModal = (customer) => {
          setSelectedCustomer(customer)
          setShowModal(true);
          console.log("Opened Modal")
     };

     const handleCloseModal = () => {
          setShowModal(false);
          setSelectedCustomer(null);
     };

     // Customer Table (Minimalist and Responsive) - (Kept for context, unchanged)
     const CustomerTable = ({ customers }) => (
          <div className="rounded-xl shadow-lg border overflow-x-auto scrollbar-colored">
               <table className="min-w-full divide-y divide-red-200">
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
                    <tbody className=" primary_bg divide-y divide-red-100">
                         {customers.map((customer, idx) => (
                              <tr key={idx} className=" transition-colors hover:" >
                                   {/* User ID (Monospace font for ID/Code readability) */}
                                   <td className="px-6 py-4 whitespace-nowrap text-xs font-mono ">
                                        #{customer.id.slice(-8)}
                                   </td>

                                   {/* Name & Email (Combined for responsiveness and density) */}
                                   <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <div className="flex flex-col">
                                             <div className="font-semibold flex items-center">
                                                  <User className="w-4 h-4 mr-2 hidden sm:inline" />
                                                  {customer.name}
                                             </div>
                                             <div className="text-xs opacity-70 flex items-center mt-1">
                                                  <Mail className="w-3 h-3 mr-1" />
                                                  {customer.email}
                                             </div>
                                        </div>
                                   </td>

                                   {/* Total Orders */}
                                   <td className="px-6 py-4 whitespace-nowrap text-sm text-center font-medium ">
                                        {customer.orders?.length || 0}
                                   </td>

                                   {/* Actions (Details/Edit Button) */}
                                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <button
                                             onClick={() => handleOpenModal(customer)}
                                             className="flex items-center text-red-600 hover:text-black font-semibold p-2 rounded-lg transition-colors hover:bg-red-100">
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
                              <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
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
                              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 opacity-50" />
                              <input
                                   type="text"
                                   placeholder="Search by name or email..."
                                   className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-red-500 focus:border-red-500 transition-all shadow-sm"
                              />
                         </div>
                         {/* Placeholder for additional filters like Status Dropdown or Date Range */}
                    </div>

                    {/* Customer List / Table */}
                    <CustomerTable customers={customers} />
               </div>

               {/* --- MODAL STRUCTURE MODIFIED (High-Fidelity UI/UX) --- */}
               {showModal && selectedCustomer && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 ">
                         <div className="primary_bg max-h-[90vh] overflow-hidden w-full max-w-2xl rounded-xl shadow-2xl flex flex-col">

                              {/* Modal Header/Title Bar */}
                              <div className="flex justify-between items-center p-6 border-b sticky top-0  z-10">
                                   <h2 className="text-2xl font-extrabold flex items-center text-red-600">
                                        <User className="w-6 h-6 mr-3" />
                                        Customer Profile
                                   </h2>
                                   <button
                                        onClick={handleCloseModal}
                                        className="p-2 rounded-full hover:0  transition-colors"
                                        aria-label="Close modal"
                                   >
                                        <X className="w-8 h-8 hover:bg-red-700 rounded-full hover:p-2 hover:text-white hover:cursor-pointer transition-all duration-200 opacity-70" />
                                   </button>
                              </div>

                              {/* Modal Content - Scrollable Area */}
                              <div className="overflow-y-auto scrollbar-colored p-6 flex-1">
                                   {/* 1. Customer Details Header */}
                                   <CustomerDetailsHeader customer={selectedCustomer} />

                                   {/* 2. Key Metrics Card (Optional but Recommended for UX) */}
                                   <div className="grid grid-cols-3 gap-4 mt-6">
                                        {/* Total Orders */}
                                        <div className="p-4 border rounded-lg shadow-xl hover:cursor-pointer hover:scale-95 transition-all duration-300 text-center">
                                             <ShoppingCart className="w-5 h-5 mx-auto text-red-600" />
                                             <p className="text-2xl font-bold mt-1 ">{selectedCustomer.orders?.length || 0}</p>
                                             <p className="text-xs opacity-70 mt-0.5 ">Total Orders</p>
                                        </div>
                                        {/* LTV (Mocked since data structure doesn't contain LTV directly) */}
                                        <div className="p-4 border rounded-lg   shadow-sm text-center">
                                             <DollarSign className="w-5 h-5 mx-auto text-green-600" />
                                             <p className="text-2xl font-bold mt-1">${selectedCustomer.ltv?.toFixed(2) || '0.00'}</p>
                                             <p className="text-xs opacity-70 mt-0.5">Life Time Value (LTV)</p>
                                        </div>
                                        {/* Last Order Date */}
                                        <div className="p-4 border rounded-lg   shadow-sm text-center">
                                             <Clock className="w-5 h-5 mx-auto text-blue-600" />
                                             <p className="text-sm font-bold mt-1 whitespace-nowrap">
                                                  {selectedCustomer.orders && selectedCustomer.orders.length > 0
                                                       ? formatDate(selectedCustomer.orders[0].createdAt) // Assuming first one is latest after sorting in component
                                                       : 'N/A'}
                                             </p>
                                             <p className="text-xs opacity-70 mt-0.5">Last Order</p>
                                        </div>
                                   </div>

                                   {/* 3. Order History Accordion */}
                                   <OrderHistoryAccordion orders={selectedCustomer.orders || []} />
                              </div>
                         </div>
                    </div>
               )}

          </div>
     );
};

export default AdminCustomers;