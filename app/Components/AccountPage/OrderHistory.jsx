
// app/Components/AccountPage/OrderHistory.jsx
"use client"
import React, { useEffect, useState } from 'react';
import { ClipboardList, Package, DollarSign, Calendar, ChevronRight, X } from 'lucide-react';
import { useOrders } from '../../context/OrderContext';
import { formatDate } from '../../utils/index';



// --- StatusBadge Component (Unchanged) ---
const StatusBadge = ({ status }) => {
  let classes = 'bg-gray-100 text-gray-800'; // Default background
  switch (status) {
    case 'Delivered': classes = 'bg-green-100 text-green-800'; break;
    case 'Shipped': classes = 'bg-blue-100 text-blue-800'; break;
    case 'Processing': classes = 'bg-yellow-100 text-yellow-800'; break;
    case 'Cancelled': classes = 'bg-red-100 text-red-800'; break;
  }
  return (
    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${classes}`
    }>
      {status}
    </span >
  );
};


// --- OrderCard Component (Unchanged for the list view) ---
const OrderCard = ({ order, openModal }) => (

  <div className="border border-gray-200 rounded-lg p-4 mb-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
    < div className="flex justify-between items-start mb-2" >
      <h3 className="text-sm font-semibold flex items-center" >
        <ClipboardList className="w-4 h-4 mr-2 text-indigo-500" />
        Order : **#{order.id}**
      </h3 >
      <StatusBadge status={order.status} />
    </div >

    <div className="grid grid-cols-2 gap-y-2 text-sm" >
      <div className="flex items-center" >
        <Calendar className="w-4 h-4 mr-2  " />
        <span className="font-medium  " > Date:</span >
      </div >
      <div className="text-right font-medium  " > {formatDate(order.createdAt.toString())}</div >

      <div className="flex items-center" >
        <DollarSign className="w-4 h-4 mr-2  " />
        <span className="font-medium  " > Total:</span >
      </div >
      <div className="text-right text-lg font-bold text-green-600" >
        ${order.totalPrice}
      </div >
    </div >

    <div className="mt-4 pt-3 border-t border-gray-200 flex justify-end" >
      <button
        className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center"
        onClick={() => openModal(order)}
      >
        View Details
        <ChevronRight className="w-4 h-4 ml-1" />
      </button>

    </div >
  </div >
);

// --- NEW Component: OrderItemCard (Defined above) ---
// export const OrderItemCard = ({ item }) => (
//   <div className="flex space-x-4 p-3 rounded-lg border border-gray-200">

//     {/* Product Image Container */}
//     < div className="flex-shrink-0 w-1/5 max-w-[80px] aspect-square overflow-hidden rounded-md" >
//       <img
//         src={item.product?.imageUrl || item.product?.imgUrl}
//         alt={item.product?.title || "N/A"}
//         className="object-cover w-full h-full"
//       />
//     </div >

//     {/* Product Details */}
//     < div className="flex-grow space-y-1" >
//       <p className="font-semibold text-base" > {item.product?.title || "N/A"}</p >
//       <p className="text-sm tracking-wide  " > {item.product?.description || "N/A"}</p >
//       <p className="text-sm font-medium  " >
//         Qty: <span className="font-bold">{item.quantity || "N/A"}</span >
//       </p >
//     </div >

//     {/* Price */}
//     < div className="flex-shrink-0 text-right" >
//       <p className="font-bold text-lg  " >
//         ${item.product?.price || "N/A"}
//       </p >
//       <p className="text-xs  " >
//         Total: ${item.product?.price * item.quantity || "N/A"}
//       </p >
//     </div >
//   </div >
// );

// OrderItemCard.jsx
export const OrderItemCard = ({ item }) => {
  const product = item.product ?? item.bestDeal; // pick whichever exists
  return (
    <div className="flex space-x-4 p-3 rounded-lg border border-gray-200">
      <div className="flex-shrink-0 w-1/5 max-w-[80px] aspect-square overflow-hidden rounded-md">
        <img
          src={product?.imageUrl || "/placeholder.png"}
          alt={product?.title || "Item removed"}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="flex-grow space-y-1">
        <p className="font-semibold text-base">{product?.title || "Item removed"}</p>
        <p className="text-sm">{product?.description || "No description"}</p>
        <p className="text-sm font-medium">Qty: <span className="font-bold">{item.quantity}</span></p>
      </div>
      <div className="flex-shrink-0 text-right">
        <p className="font-bold text-lg">${product?.price || 0}</p>
        <p className="text-xs">Total: ${(product?.price || 0) * item.quantity}</p>
      </div>
    </div>
  );
};


// --- Main Component: OrderHistory (Modified Modal) ---
const OrderHistory = () => {
  // const [orders, setOrders] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const { orders } = useOrders();
  console.log("Order CLien", orders)
  const safeOrders = Array.isArray(orders) ? orders : [];

  const openModal = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedOrder(null);
  };


  // useEffect(() => {
  //   const fetchOrders = async () => {
  //     try {
  //       const res = await fetch('/api/orders?userId=someUserId');
  //       const data = await res.json();
  //       // Assuming data is an array of objects
  //       setOrders(data || []);
  //     } catch (err) {
  //       console.error("Error fetching orders:", err);
  //     }
  //   };
  //   fetchOrders();
  // }, []);

  return (
    <>
      <div className="p-4 sm:p-6 lg:p-8">
        <h1 className="text-3xl font-bold   mb-6 flex items-center">
          <Package className="w-8 h-8 mr-3 text-indigo-600" />
          Order History
        </h1 >
        {/* Mobile View */}
        < div className="lg:hidden" >
          {
            orders.map(order => (
              <OrderCard key={order.id} order={order} openModal={openModal} />
            ))
          }
        </div >
        {/* Desktop View (Table structure remains mostly the same) */}
        < div className="hidden lg:block rounded-xl shadow-xl border border-gray-100 overflow-hidden " >
          {/* --- Desktop View (lg and above) --- */}
          < div className="hidden lg:block rounded-xl shadow-xl border border-gray-100 overflow-hidden primary_bg " >
            <div className="overflow-x-auto scrollbar-colored" >
              <table className="min-w-full divide-y divide-gray-600" >
                <thead className="800/20" >
                  <tr>
                    {['Order ID', 'Date', 'Status', 'Total', 'Actions'].map(header => (
                      <th key={header} className="px-6 py-3 text-left text-xs font-semibold   uppercase tracking-wider">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead >
                <tbody className="divide-y divide-gray-100" >
                  {
                    safeOrders.map(order => (
                      <tr key={order.id} className="hover:50/10 transition-colors">
                        {/* Order ID: Clear Primary Identifier */}
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-700 flex items-center">
                          <ClipboardList className="w-4 h-4 mr-2 text-indigo-400" />
                          #{order.id}
                        </td>
                        {/* Date: Standard Text */}
                        < td className="px-6 py-4 whitespace-nowrap text-sm   flex items-center" >
                          <Calendar className="w-4 h-4 mr-2  " />
                          {formatDate(order.createdAt.toString())
                          }

                        </td >
                        {/* Status: Visual Indicator */}
                        < td className=" whitespace-nowrap" >
                          {/* <StatusBadge status={order.status} /> */}
                          < div className="bg-green-100 text-green-800 text-xs text-center px-1 py-1 rounded-full" >
                            {order.status}
                          </div >

                        </td >
                        {/* Total: Highlighted for Financial Visibility */}
                        < td className="px-6 py-4 whitespace-nowrap text-lg font-bold text-green-600 flex items-center" >
                          <DollarSign className="w-4 h-4 mr-1" />
                          {order.totalPrice}
                        </td >
                        {/* Actions: Primary Call to Action */}
                        < td className="px-6 py-4 whitespace-nowrap text-sm font-medium" >
                          <button
                            className="text-indigo-700 hover:text-indigo-800 font-medium flex items-center"
                            onClick={() => openModal(order)}
                          >
                            View Details
                            <ChevronRight className="w-4 h-4 ml-1" />
                          </button>

                        </td >
                      </tr >
                    ))}
                </tbody >
              </table >
            </div >
            {
              orders.length === 0 && (
                <p className="text-center   py-10">No orders found.</p>
              )}
          </div >
        </div >
      </div >

      {/* --- MODAL STRUCTURE MODIFIED --- */}
      {
        showModal && selectedOrder && (
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

              <div className="space-y-3 overflow-y-auto scrollbar-colored pr-2 flex-grow" >
                {
                  selectedOrder.orderItems.map((item) => (
                    <OrderItemCard key={item.id} item={item} />
                  ))
                }
              </div >

              {/* Footer */}
              {/* <div
                 className="mt-6 pt-4 flex justify-end border-t"            >
              <button
                onClick={closeModal}
                   className="px-6 py-2 rounded-lg font-medium transition-opacity |hover:opacity-80 bg-indigo-600 text-white hover:bg-indigo-700" >
                Close Window
              </button>
            </div> */}
            </div >
          </div >
        )
      }


    </>

  );
};

export default OrderHistory;