
"use client";
import React from 'react'
import { ListChecks, Search, ChevronDown, Eye, X } from 'lucide-react';
import StatusBadge from '../StatusBadge/StatusBadge.jsx';
import { formatDate } from '@/app/utils/index';
import { OrderItemCard } from '../AccountPage/OrderHistory.jsx';
import { useAdmin } from '@/app/context/AdminContext.jsx';


/**
 * Bulk Actions Bar with placeholder dropdowns.
 */
const BulkActionsBar = () => {
     // State to simulate selection count for UI display purposes only
     const [selectedCount, setSelectedCount] = React.useState(2);

     return (
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4  rounded-xl shadow-md border border-gray-100 mb-6">

               {/* Left: Bulk Actions Dropdown */}
               < div className="flex items-center space-x-3 mb-4 sm:mb-0" >
                    <ListChecks className="w-5 h-5 " />
                    <button
                         className="flex items-center space-x-1 px-3 py-2 text-sm font-semibold border border-gray-300 rounded-lg  hover:0 transition-colors cursor-not-allowed"
                         disabled
                    >
                         <span>{selectedCount} Selected</span>
                         <ChevronDown className="w-4 h-4 ml-1 " />
                    </button>

                    {/* Placeholder action button, only visible when items are selected */}
                    {
                         selectedCount > 0 && (
                              <button
                                   className="px-4 py-2 text-sm font-bold rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-md cursor-not-allowed"
                                   disabled
                              >
                                   Apply Bulk Action (UI)
                              </button>
                         )
                    }
               </div >

               {/* Right: Search Input */}
               < div className="w-full sm:w-64 relative" >
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 " />
                    <input
                         type="text"
                         placeholder="Search orders, customers, or ID..."
                         className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-black focus:border-black transition-all"
                    />
               </div >
          </div >
     );
};



const OrdersTable = ({ showModal, setShowModal, selectedOrder, setSelectedOrder }) => {
     const { customersOrders } = useAdmin();
     // State to simulate check status for UI demonstration
     const [checkedItems, setCheckedItems] = React.useState({});
     const safeOrders = Array.isArray(customersOrders) ? customersOrders : [];

     // Function to handle individual checkbox change
     const handleCheckChange = (id) => {
          // UI simulation only: toggle the state
          setCheckedItems(prev => ({
               ...prev,
               [id]: !prev[id],
          }));
     };

     // Function to handle "select all" checkbox change
     const handleSelectAll = (e) => {
          const isChecked = e.target.checked;
          const newCheckedState = orders.reduce((acc, order) => {
               acc[order.id] = isChecked;
               return acc;
          }, {});
          setCheckedItems(newCheckedState);
     };
     const handleOrderDetails = (orderId) => {
          setShowModal(true);
          const order = customersOrders.find(o => o.id === orderId);
          setSelectedOrder(order);
     }
     const isAllChecked = (customersOrders || []).every(order => checkedItems[order.id]);

     return (
          <div className=" primary_bg rounded-xl shadow-lg border overflow-x-auto">
               < table className="min-w-full divide-y divide-gray-500" >
                    <thead className="" >
                         <tr>
                              {/* Checkbox Header */}
                              <th className="px-6 py-3 w-10">
                                   <input
                                        type="checkbox"
                                        checked={isAllChecked}
                                        onChange={handleSelectAll}
                                        className="rounded  border-gray-300 focus:ring-black"
                                   />
                              </th>
                              {/* Data Headers */}
                              {
                                   ['Order ID', 'Date', 'Customer Name', 'Status', 'Actions'].map((header) => (
                                        <th
                                             key={header}
                                             className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider whitespace-nowrap"
                                        >
                                             {header}
                                        </th>
                                   ))
                              }
                         </tr >
                    </thead >
                    <tbody className="divide-y divide-gray-500 " >
                         {
                              safeOrders.map((order) => (
                                   <tr key={order.id} className="hover: transition-colors">
                                        {/* Checkbox Cell */}
                                        <td className="px-6 py-4 whitespace-nowrap">
                                             <input
                                                  type="checkbox"
                                                  checked={!!checkedItems[order.id]}
                                                  onChange={() => handleCheckChange(order.id)}
                                                  className="rounded  border-gray-300 focus:ring-black"
                                             />
                                        </td>
                                        {/* Order ID */}
                                        < td className="px-6 py-4 whitespace-nowrap text-sm font-semibold " >
                                             #{order.id}
                                        </td >
                                        {/* Date */}
                                        < td className="px-6 py-4 whitespace-nowrap text-sm " >
                                             {order.createdAt}
                                        </td >
                                        {/* Customer Name */}
                                        < td className="px-6 py-4 whitespace-nowrap text-sm font-medium " >
                                             {order.fullName}
                                        </td >
                                        {/* Status */}
                                        < td className="px-6 py-4 whitespace-nowrap text-sm" >
                                             <StatusBadge status={order.status} />
                                        </td >
                                        {/* Detail View Option */}
                                        < td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium" >
                                             <button
                                                  className=" hover: font-semibold transition-colors flex items-center space-x-1"
                                                  onClick={() => handleOrderDetails(order.id)} // Placeholder for routing
                                             >
                                                  <Eye className="w-4 h-4" />
                                                  <span>Details</span>
                                             </button>
                                        </td >
                                   </tr >
                              ))
                         }
                    </tbody >
               </table >
          </div >
     );
};

const AdminOrders = () => {
     const { customersOrders } = useAdmin();
     const [showModal, setShowModal] = React.useState(false);
     const [selectedOrder, setSelectedOrder] = React.useState(null);
     const closeModal = () => {
          setShowModal(false);
          setSelectedOrder(null);
     }
     return (
          <>
               <div className="min-h-screen  font-sans p-4 sm:p-8 lg:p-12">
                    <div className="max-w-7xl mx-auto">

                         {/* Header Section */}
                         <header className="mb-8">
                              <h1 className="text-3xl font-bold tracking-tight  sm:text-4xl">
                                   Orders Management
                              </h1 >
                         </header >

                         {/* Bulk Actions and Search Bar */}
                         < BulkActionsBar />

                         {/* Orders List / Table */}
                         < OrdersTable showModal={showModal} setShowModal={setShowModal} selectedOrder={selectedOrder} setSelectedOrder={setSelectedOrder} />

                         {/* Pagination Placeholder (Minimal UI element) */}
                         < div className="mt-8 flex justify-center" >
                              <div className="flex items-center space-x-2  text-sm" >
                                   <button className="px-3 py-1 border rounded-lg hover:0 cursor-not-allowed" disabled > Previous</button >
                                   <span className="px-3 py-1 font-semibold border border-black rounded-lg " > 1</span >
                                   <span className="px-3 py-1 border rounded-lg hover:0 cursor-not-allowed" disabled > 2</span >
                                   <button className="px-3 py-1 border rounded-lg hover:0 cursor-not-allowed" disabled > Next</button >
                              </div >
                         </div >
                    </div >
               </div >
               {showModal && selectedOrder && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                         < div className="primary_bg w-full max-w-xl rounded-xl shadow-2xl p-6 relative flex flex-col max-h-[90vh]" >

                              {/* Modal Header */}
                              < div
                                   className="pb-3 mb-4 flex justify-between items-center border-b" >
                                   <h2
                                        className="main_heading text-2xl font-bold text-[#FFB300] "              >
                                        Order Details – #{selectedOrder.id}
                                   </h2>

                                   <button
                                        onClick={closeModal}
                                        aria-label="Close"
                                        className="hover:opacity-70 p-2 rounded-lg bg-red-700 hover:bg-red-800 transition-opacity"
                                   >
                                        <X className="w-6 h-6" />
                                   </button>
                              </div >

                              {/* General Order Info */}
                              < div
                                   className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm mb-6 pb-4 border-b" >
                                   <p>
                                        <span className="font-semibold text-[#A32412]" >
                                             Date:
                                        </span>{" "}
                                        {formatDate(selectedOrder.createdAt.toString())}
                                   </p >

                                   <p className="text-right" >
                                        <span className="font-semibold text-[#A32412]" >
                                             Total Paid:
                                        </span > {" "}
                                        < span className="text-lg font-bold text-green-600" >
                                             ${selectedOrder.totalPrice}
                                        </span >
                                   </p >

                                   <p>
                                        <span className="font-semibold text-[#A32412]" >
                                             Status:
                                        </span>{" "}
                                        <StatusBadge status={selectedOrder.status} />
                                   </p >

                                   <p className="text-right" >
                                        <span className="font-semibold text-[#A32412]" >
                                             Customer:
                                        </span > {" "}
                                        {selectedOrder.fullName}
                                   </p >
                              </div >

                              {/* Items List */}
                              < h3
                                   className="text-lg font-semibold mb-3" >
                                   Items Purchased
                              </h3 >

                              <div className="space-y-3 overflow-y-auto pr-2 flex-grow" >
                                   {
                                        selectedOrder.orderItems.map((item) => (
                                             <OrderItemCard key={item.id} item={item} />
                                        ))
                                   }
                              </div >


                         </div >
                    </div >
               )}
          </>

     );
}

export default AdminOrders
