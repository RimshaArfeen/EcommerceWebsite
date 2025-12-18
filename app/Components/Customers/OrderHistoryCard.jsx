
"use client"
import React, { useState } from 'react';
import { User, Mail, DollarSign, ChevronRight, X, Clock, ShoppingCart, Package, MapPin} from 'lucide-react';
import "../../globals.css"
import { useCustomers } from '@/app/context/CustomerContext';
import { formatDate } from '@/app/utils/index';
import StatusBadge from '../StatusBadge/StatusBadge';
import { OrderItemCard } from '../AccountPage/OrderHistory'; 


 export const CustomerDetailsHeader = ({ customer }) => (
     <div className="flex items-center space-x-4 p-4 border-b rounded-t-xl bg-red/10 headings_on_red_bg ">
          {/* Placeholder for Profile Picture or Initial */}
          <div className="w-12 h-12 rounded-full bg-red  flex items-center justify-center text-xl font-bold border-2 border-red-600 shadow-md">
               {customer.name ? customer.name.charAt(0) : <User className="w-6 h-6" />}
          </div>
          <div className="flex-1">
               <h3 className="text-xl font-extrabold flex items-center mr-2">
                    {customer.name}
                    <StatusBadge status={customer.status || 'Active'} className="ml-3 text-xs" />
               </h3>
               <p className="text-sm opacity-80 flex items-center mt-1">
                    <Mail className="w-3 h-3 mr-1" />
                    {customer.email}
               </p>
          </div>
          <div className="text-right">
               <p className="text-xs font-mono opacity-60">Customer ID</p>
               <p className="text-sm font-semibold">#{customer.id.slice(-8)}</p>
          </div>
     </div>
);

// 2. Individual Order Card (Collapsible)
 export const OrderHistoryCard = ({ order, index }) => {
     const [isExpanded, setIsExpanded] = useState(index === 0); // Expand first order by default for visibility

     // Function to calculate total items (since totalOrders is on the customer object)
     const totalItems = order.orderItems.reduce((sum, item) => sum + item.quantity, 0);

     // Get the address if available
     const address = order.addressId ? order.addresses?.find(addr => addr.id === order.addressId) : null;

     return (
          <div className="border  rounded-lg shadow-sm overflow-hidden transition-all">
               {/* Header / Toggle */}
               <button
                    className={`flex justify-between items-center w-full p-4 text-left font-semibold transition-all duration-300 ${isExpanded ? 'bg-red headings_on_red_bg ' : 'hover:'}`}
                    onClick={() => setIsExpanded(!isExpanded)}
               >
                    <div className="flex items-center space-x-3">
                         <ShoppingCart className="w-5 h-5 text-red-600" />
                         <span className="text-base">Order #{order.id.slice(-8)}</span>
                         <StatusBadge status={order.status} />
                    </div>
                    <div className="flex items-center space-x-3 text-sm">
                         <span className="font-bold text-lg">${order.totalPrice.toFixed(2)}</span>
                         <ChevronRight className={`w-5 h-5 transition-transform hover:cursor-pointer ${isExpanded ? 'rotate-90' : 'rotate-0'}`} />
                    </div>
               </button>

               {/* Content / Details */}
               {isExpanded && (
                    <div className="p-4 border-t ">
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-sm">
                              {/* Summary Column */}
                              <div className="space-y-2">
                                   <p className="flex items-center">
                                        <Clock className="w-4 h-4 mr-2 opacity-60" />
                                        Date: {formatDate(order.createdAt)}
                                   </p>
                                   <p className="flex items-center">
                                        <Package className="w-4 h-4 mr-2 opacity-60" />
                                        Items: {totalItems}
                                   </p>
                                   <p className="flex items-center">
                                        <DollarSign className="w-4 h-4 mr-2 opacity-60" />
                                        Total: <span className="font-bold ml-1 text-red-600">Rs. {order.totalPrice.toFixed(2)}</span>
                                   </p>
                              </div>

                              {/* Shipping/Contact Column */}
                              <div className="space-y-2">
                                   <p className="flex items-start">
                                        <MapPin className="w-4 h-4 mr-2 mt-1 opacity-60 flex-shrink-0" />
                                        <div>
                                             Shipping Address:<br />
                                             <span className="text-xs opacity-80">
                                                  {order.fullName} - {order.phone}
                                                  {/* {address ? (
                                                       <>
                                                            <br />
                                                            {address.line1}, {address.city}, {address.state}
                                                       </>
                                                  ) : ' N/A'} */}
                                             </span>
                                        </div>
                                   </p>
                              </div>
                         </div>

                         {/* Order Items List */}
                         <h4 className="font-bold text-md mt-4 mb-2 border-t pt-3">Products ({order.orderItems.length})</h4>
                         <div className="space-y-3">
                              {order.orderItems.length > 0 ? (
                                   order.orderItems.map((item, itemIdx) => (
                                        <div key={itemIdx} className="p-3 border border-b-gray-400/50 rounded-md   flex items-center space-x-3">
                                             {/* Using a simplified version of OrderItemCard or inline content for density */}
                                             <div className="w-10 h-10 rounded overflow-hidden flex-shrink-0 0 ">
                                                  {item.product?.imageUrl && (
                                                       <img src={item.product.imageUrl} alt={item.product.title} className="w-full h-full object-cover" />
                                                  )}
                                             </div>
                                             <div className="flex-1 min-w-0">
                                                  <p className="font-semibold text-sm truncate">{item.product?.title || 'Product Not Found'}</p>
                                                  <p className="text-xs opacity-70">Quantity: {item.quantity}</p>
                                             </div>
                                             <span className="font-bold text-sm text-red-600">${(item.product?.price * item.quantity).toFixed(2) || 'N/A'}</span>
                                        </div>
                                   ))
                              ) : (
                                   <div className="text-sm opacity-60 p-2 border rounded-md">No items in this order.</div>
                              )}
                         </div>
                    </div>
               )}
          </div>
     );
};

// 3. Main Order History Section
 export const OrderHistoryAccordion = ({ orders }) => {
     // Sort orders by creation date (newest first)
     const sortedOrders = [...orders].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

     return (
          <div className="mt-6">
               <h3 className="text-xl font-bold mb-4 flex items-center">
                    <Clock className="w-5 h-5 mr-2" />
                    Order History (Total: {orders.length})
               </h3>
               <div className="space-y-4">
                    {sortedOrders.length > 0 ? (
                         sortedOrders.map((order, index) => (
                              <OrderHistoryCard key={order.id} order={order} index={index} />
                         ))
                    ) : (
                         <div className="text-center p-6 border rounded-xl opacity-70">
                              <Package className="w-8 h-8 mx-auto mb-2" />
                              <p>No orders found for this customer.</p>
                         </div>
                    )}
               </div>
          </div>
     );
};
