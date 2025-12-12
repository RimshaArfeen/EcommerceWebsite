"use client";
import React from 'react'
import { ListChecks, Search, ChevronDown, Eye, X } from 'lucide-react';
import StatusBadge from '../StatusBadge/StatusBadge.jsx';
import { formatDate } from '@/app/utils/index';
import { OrderItemCard } from '../AccountPage/OrderHistory.jsx';
import { useAdmin } from '@/app/context/AdminContext.jsx';

// --- Color/Theme Configuration (Conceptual) ---
// Primary Dark Background: #181A20 (Replaces primary_bg in dark context)
// Secondary Background/Card: #20232A
// Accent 1 (Primary): #FFB300
// Accent 2 (Danger/Highlight): #A32412
// Text: #F3F4F6 (Light Gray)
// Table Header/Divider: #374151 (Darker Gray)

/**
 * Bulk Actions Bar with placeholder dropdowns (Updated for dark theme).
 */
const BulkActionsBar = () => {
     // State to simulate selection count for UI display purposes only
     const [selectedCount, setSelectedCount] = React.useState(2);

     // Check if items are selected for conditional styling
     const isSelected = selectedCount > 0;

     return (
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 primary_bg rounded-xl shadow-lg border mb-6">

               {/* Left: Bulk Actions Dropdown */}
               <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                    <ListChecks className="w-6 h-6 text-[#FFB300]" />

                    {/* Selection Count Button */}
                    <button
                         className={`flex items-center space-x-1 px-4 py-2 text-sm font-bold rounded-lg transition-colors 
                                   ${isSelected
                                   ? 'bg-[#FFB300] text-[#181A20] hover:bg-yellow-500' // Highlight when selected
                                   : 'bg-[#374151] text-[#F3F4F6] border border-[#4B5563] cursor-not-allowed'
                              }`}
                         disabled={!isSelected}
                    >
                         <span className="text-base">{selectedCount} Selected</span>
                         <ChevronDown className="w-4 h-4 ml-1" />
                    </button>

                    {/* Placeholder action button, only visible when items are selected */}
                    {
                         isSelected && (
                              <button
                                   className="px-4 py-2 text-sm font-bold rounded-lg bg-[#A32412]  hover:bg-red-800 transition-colors shadow-lg cursor-not-allowed"
                                   disabled
                              >
                                   Apply Bulk Action
                              </button>
                         )
                    }
               </div>

               {/* Right: Search Input */}
               <div className="w-full sm:w-64 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 " />
                    <input
                         type="text"
                         placeholder="Search orders, customers, or ID..."
                         className="w-full pl-10 pr-4 py-2 text-sm bg-[#37415149]  border border-[#4B5563] rounded-lg focus:ring-[#FFB300] focus:border-[#FFB300] transition-all placeholder-[#9CA3AF]"
                    />
               </div>
          </div>
     );
};


/**
 * Orders Table component (Updated for dark theme and tighter spacing).
 */
const OrdersTable = ({ showModal, setShowModal, selectedOrder, setSelectedOrder, updatedStatus }) => {
     const { orders } = useAdmin();
     const [checkedItems, setCheckedItems] = React.useState({});
     const safeOrders = Array.isArray(orders) ? orders : [];

     const handleCheckChange = (id) => {
          setCheckedItems(prev => ({
               ...prev,
               [id]: !prev[id],
          }));
     };

     const handleSelectAll = (e) => {
          const isChecked = e.target.checked;
          const newCheckedState = safeOrders.reduce((acc, order) => {
               acc[order.id] = isChecked;
               return acc;
          }, {});
          setCheckedItems(newCheckedState);
     };

     const handleOrderDetails = (orderId) => {
          setShowModal(true);
          const order = orders.find(o => o.id === orderId);
          setSelectedOrder(order);
     }
     // Ensure safeOrders is used for `every` check
     const isAllChecked = safeOrders.length > 0 && safeOrders.every(order => checkedItems[order.id]);


     return (
          <div className="primary_bg rounded-xl shadow-2xl shadow-black/50 border border-[#374151] overflow-x-auto">
               <table className="min-w-full divide-y divide-[#581205]">
                    <thead className="primary_bg">
                         <tr>
                              {/* Checkbox Header */}
                              <th className="px-6 py-3 w-10">
                                   <input
                                        type="checkbox"
                                        checked={isAllChecked}
                                        onChange={handleSelectAll}
                                        className="rounded text-[#FFB300] border-[#4B5563] focus:ring-[#FFB300] bg-gray-700"
                                   />
                              </th>
                              {/* Data Headers */}
                              {
                                   ['Order ID', 'Date', 'Customer Name', 'Status', 'Actions'].map((header) => (
                                        <th
                                             key={header}
                                             className="px-6 py-3 text-left text-xs font-semibold text-[#FFB300] uppercase tracking-wider whitespace-nowrap"
                                        >
                                             {header}
                                        </th>
                                   ))
                              }
                         </tr>
                    </thead>
                    <tbody className="divide-y divide-[#374151] text-[#F3F4F6]">
                         {
                              safeOrders?.filter(order => order.status === 'PENDING')
                                   .map((order) => (
                                        // Use a slightly different background on hover for visual feedback
                                        <tr key={order.id} className="hover:bg-[#2A2E35] transition-colors">
                                             {/* Checkbox Cell */}
                                             <td className="px-6 py-3 whitespace-nowrap">
                                                  <input
                                                       type="checkbox"
                                                       checked={!!checkedItems[order.id]}
                                                       onChange={() => handleCheckChange(order.id)}
                                                       className="rounded text-[#FFB300] border-[#4B5563] focus:ring-[#FFB300] bg-gray-700"
                                                  />
                                             </td>
                                             {/* Order ID */}
                                             <td className="px-6 py-3 whitespace-nowrap text-sm font-semibold">
                                                  <span className='text-[#FFB300]'>#{order.id}</span>
                                             </td>
                                             {/* Date */}
                                             <td className="px-6 py-3 whitespace-nowrap text-sm">
                                                  {formatDate(order.createdAt)}
                                             </td>
                                             {/* Customer Name */}
                                             <td className="px-6 py-3 whitespace-nowrap text-sm font-medium">
                                                  {order.fullName}
                                             </td>
                                             {/* Status */}
                                             <td className="px-6 py-3 whitespace-nowrap text-sm">
                                                  <StatusBadge status={order.status} />
                                             </td>
                                             {/* Detail View Option */}
                                             <td className="px-6 py-3 whitespace-nowrap text-sm font-medium">
                                                  <button
                                                       className="text-[#FFB300] hover:text-yellow-500 font-semibold transition-colors flex items-center space-x-1"
                                                       onClick={() => handleOrderDetails(order.id)}
                                                       aria-label={`View details for order ${order.id}`}
                                                  >
                                                       <Eye className="w-4 h-4" />
                                                       <span>Details</span>
                                                  </button>
                                             </td>
                                        </tr>
                                   ))
                         }
                    </tbody>
               </table>
          </div>
     );
};

/**
 * Main Admin Orders Page component.
 */
const AdminOrders = () => {
     const { orders } = useAdmin();
     const [showModal, setShowModal] = React.useState(false);
     const [selectedOrder, setSelectedOrder] = React.useState(null);
     const [updatedStatus, setUpdatedStatus] = React.useState("");

     const closeModal = () => {
          setShowModal(false);
          setSelectedOrder(null);
     }
     const handleUpdateStatusChange = (orderId, newStatus) => {
          setUpdatedStatus(newStatus);
     };
   
     const handleSaveStatus = async (orderId) => {
          try {
               const res = await fetch(`/api/admin/orders/${orderId}`, {
                    method: "PUT",
                    headers: {
                         "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ status: updatedStatus }),
               });

               if (!res.ok) throw new Error("Failed to update");

               alert("Status updated!");
               closeModal();

          } catch (error) {
               console.log("Error occurring while updating Status", error);
          }
     };


     return (
          // Use a unified dark background for the page container
          <div className="min-h-screen font-sans p-4 sm:p-8 lg:p-12">
               <div className="max-w-7xl mx-auto">

                    {/* Header Section */}
                    <header className="mb-8">
                         <h1 className="text-4xl font-extrabold tracking-tight ">
                              🛍️ Orders Management
                         </h1>
                    </header>

                    {/* Bulk Actions and Search Bar */}
                    <BulkActionsBar />

                    {/* Orders List / Table */}
                    <OrdersTable showModal={showModal} setShowModal={setShowModal} selectedOrder={selectedOrder} setSelectedOrder={setSelectedOrder}
                         updatedStatus = {updatedStatus} 
                         />

                    {/* Pagination Placeholder (Updated for dark theme) */}
                    <div className="mt-8 flex justify-center">
                         <div className="flex items-center space-x-2 text-sm">
                              <button className="px-3 py-1 border border-[#4B5563] rounded-lg  hover:bg-[#2A2E35] cursor-not-allowed" disabled>
                                   Previous
                              </button>
                              <span className="px-3 py-1 font-bold bg-[#FFB300] text-[#181A20] rounded-lg">
                                   1
                              </span>
                              <span className="px-3 py-1 border border-[#4B5563] rounded-lg  hover:bg-[#2A2E35] cursor-not-allowed" disabled>
                                   2
                              </span>
                              <button className="px-3 py-1 border border-[#4B5563] rounded-lg  hover:bg-[#2A2E35] cursor-not-allowed" disabled>
                                   Next
                              </button>
                         </div>
                    </div>
               </div>

               {/* Order Details Modal */}
               {showModal && selectedOrder && (
                    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
                         {/* Modal container updated to dark background and more shadow */}
                         <div className="bg-[#20232A] w-full max-w-xl rounded-xl shadow-2xl shadow-black/80 p-6 relative flex flex-col max-h-[90vh]">

                              {/* Modal Header */}
                              <div
                                   className="pb-3 mb-4 flex justify-between items-center border-b border-[#374151]"
                              >
                                   <h2
                                        className="text-2xl font-bold text-[#FFB300]"
                                   >
                                        Order Details – <span className=''>#{selectedOrder.id}</span>
                                   </h2>

                                   <button
                                        onClick={closeModal}
                                        aria-label="Close"
                                        className="p-2 rounded-full bg-[#A32412]  hover:bg-red-700 transition-colors shadow-md"
                                   >
                                        <X className="w-6 h-6" />
                                   </button>
                              </div>

                              {/* General Order Info */}
                              <div
                                   className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm mb-6 pb-4 border-b border-[#374151]"
                              >
                                   <p>
                                        <span className="font-semibold text-[#A32412]">
                                             Date:
                                        </span>{" "}
                                        {formatDate(selectedOrder.createdAt.toString())}
                                   </p>

                                   <p className="text-right">
                                        <span className="font-semibold text-[#A32412]">
                                             Total Paid:
                                        </span>{" "}
                                        <span className="text-xl font-extrabold text-green-500">
                                             ${selectedOrder.totalPrice}
                                        </span>
                                   </p>

                                   <p>
                                        <span className="font-semibold text-[#A32412]">
                                             Status:
                                        </span>{" "}
                                        <StatusBadge status={selectedOrder.status} />
                                   </p>

                                   <p className="text-right">
                                        <span className="font-semibold text-[#A32412]">
                                             Customer:
                                        </span>{" "}
                                        <span className='font-medium text-[#FFB300]'>{selectedOrder.fullName}</span>
                                   </p>
                              </div>

                              {/* Update Status Section - Improved styling */}
                              <div className="mb-6 bg-[#2A2E35] p-4 rounded-lg border border-[#374151]">
                                   <label className="block text-base font-bold mb-2 text-[#FFB300]">
                                        Update Order Status
                                   </label>

                                   <div className="flex space-x-3 items-end">
                                        <select
                                             className="flex-grow p-2 border border-[#4B5563] rounded-lg bg-[#374151]  focus:ring-[#FFB300] focus:border-[#FFB300] transition-all"
                                             defaultValue={selectedOrder.status}
                                             onChange={(e) => handleUpdateStatusChange(selectedOrder.id, e.target.value)}
                                        >
                                             <option value="PENDING">Pending</option>
                                             <option value="PROCESSING">Processing</option>
                                             <option value="SHIPPED">Shipped</option>
                                             <option value="DELIVERED">Delivered</option>
                                             <option value="CANCELLED">Cancelled</option>

                                        </select>

                                        <button
                                             className="px-4 py-2 bg-green-600  rounded-lg hover:bg-green-700 transition font-semibold shadow-md"
                                             onClick={() => {
                                                  handleSaveStatus(selectedOrder.id);
                                             }}
                                        >
                                             Save
                                        </button>
                                   </div>
                              </div>

                              {/* Items List */}
                              <h3
                                   className="text-lg font-semibold mb-3 "
                              >
                                   📦 Items Purchased
                              </h3>

                              {/* Scrollable list container */}
                              <div className="space-y-3 overflow-y-auto pr-2 flex-grow custom-scrollbar" >
                                   {/* Note: OrderItemCard needs to support a dark background if it contains its own background */}
                                   {
                                        selectedOrder.orderItems.map((item) => (
                                             <OrderItemCard key={item.id} item={item} />
                                        ))
                                   }
                              </div>


                         </div>
                    </div>
               )}
          </div>
     );
}

export default AdminOrders