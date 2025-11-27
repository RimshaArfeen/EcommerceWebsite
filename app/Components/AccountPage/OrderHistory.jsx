// import React, { useEffect, useState } from 'react';
// import { ClipboardList, Package, DollarSign, Calendar, ChevronRight } from 'lucide-react';
// import { formatDate } from '../../utils/index';
// // --- StatusBadge Component (Unchanged) ---
// const StatusBadge = ({ status }) => {
//   let classes = '800/50 ';
//   switch (status) {
//     case 'Delivered': classes = 'bg-green-100 text-green-800'; break;
//     case 'Shipped': classes = 'bg-blue-100 text-blue-800'; break;
//     case 'Processing': classes = 'bg-yellow-100 text-yellow-800'; break;
//     case 'Cancelled': classes = 'bg-red-100 text-red-800'; break;
//     default: classes = '800/500  ';
//   }
//   return (
//     <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${classes}`}>
//       {status}
//     </span>
//   );
// };


// // --- NEW Component: OrderCard for Mobile/Tablet View ---
// // const OrderCard = ({ order, openModal }) => (

// //   <div className="border border-gray-200 rounded-lg p-4 mb-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
// //     <div className="flex justify-between items-start mb-2">
// //       {/* Order ID & Icon */}
// //       <h3 className="text-sm font-semibold   flex items-center">
// //         <ClipboardList className="w-4 h-4 mr-2 text-indigo-500" />
// //         Order :  #{order.id}
// //       </h3>
// //       {/* Status Badge */}
// //       <StatusBadge status={order.status} />
// //     </div>

// //     {/* Order Details Grid */}
// //     <div className="grid grid-cols-2 gap-y-2 text-sm">
// //       {/* Date */}
// //       <div className="flex items-center  ">
// //         <Calendar className="w-4 h-4 mr-2  " />
// //         <span className="font-medium">Date:</span>
// //       </div>
// //       <div className="text-right font-medium  ">   {formatDate(order.createdAt.toString())}</div>

// //       {/* Total */}
// //       <div className="flex items-center  ">
// //         <DollarSign className="w-4 h-4 mr-2  " />
// //         <span className="font-medium">Total:</span>
// //       </div>
// //       <div className="text-right text-lg font-bold text-green-600">
// //         ${order.totalPrice}
// //       </div>
// //     </div>

// //     {/* Action Button - Placed at the bottom for easy tap access */}
// //     <div className="mt-4 pt-3 border-t border-gray-100 flex justify-end">
// //       <button
// //         className="text-indigo-700 hover:text-indigo-800 font-medium flex items-center"
// //         onClick={() => openModal(order)}
// //       >
// //         View Details
// //         <ChevronRight className="w-4 h-4 ml-1" />
// //       </button>

// //     </div>
// //   </div>
// // );
// // New Component for visualizing individual items inside the modal
// const OrderItemCard = ({ item }) => (
//   // Outer container for the card, using flex or grid for horizontal layout
//   <div className="flex space-x-4 p-3 rounded-lg border border-gray-200">

//     {/* Product Image Container (1/5 of the space) */}
//     <div className="flex-shrink-0 w-1/5 aspect-square overflow-hidden rounded-md">
//       {/* Placeholder for Next.js Image Component */}
//       <div className="w-full h-full 100 flex items-center justify-center">
//         {/* We use a simple <img> tag here for the skeleton */}
//         <img
//           src={item.product.imageUrl}
//           alt={item.product.title}
//           className="object-cover w-full h-full"
//         />
//       </div>
//     </div>

//     {/* Product Details (3/5 of the space) */}
//     <div className="flex-grow space-y-1">
//       {/* Title - Bold and prominent */}
//       <p className="font-semibold text-base">{item.product.title}</p>

//       {/* Description - Subdued, truncated (optional) */}
//       <p className="text-sm line-clamp-2  ">{item.product.description}</p>

//       {/* Quantity - Clear count */}
//       <p className="text-sm font-medium">Quantity: <span className="font-bold">{item.quantity}</span></p>
//     </div>

//     {/* Price (1/5 of the space) - Right-aligned, financially highlighted */}
//     <div className="flex-shrink-0 w-1/5 text-right flex flex-col justify-center">
//       <p className="font-bold text-lg">
//         ${item.product.price}
//       </p>
//       <p className="text-xs  ">
//         Subtotal: ${item.product.price * item.quantity}
//       </p>
//     </div>
//   </div>
// );

// // --- Main Component ---
// const OrderHistory = () => {
//   const [orders, setOrders] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [selectedOrder, setSelectedOrder] = useState(null);

//   const openModal = (order) => {
//     setSelectedOrder(order);
//     setShowModal(true);
//   };

//   const closeModal = () => {
//     setShowModal(false);
//     setSelectedOrder(null);
//   };

//   // Existing useEffect (Functionality remains unchanged)
//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const res = await fetch('/api/orders?userId=someUserId');
//         const data = await res.json();
//         // Assuming data is an array of objects
//         setOrders(data || []);
//       } catch (err) {
//         console.error("Error fetching orders:", err);
//       }
//     };
//     fetchOrders();
//   }, []);

//   return (
//     <>
//       <div className="p-4 sm:p-6 lg:p-8">
//         <h1 className="text-3xl font-bold   mb-6 flex items-center">
//           <Package className="w-8 h-8 mr-3 text-indigo-700" />
//           Order History
//         </h1>

//         {/* --- Mobile/Tablet View (sm and below) --- */}
//         <div className="lg:hidden">
//           {orders.length === 0 ? (
//             <p className="text-center   py-10">No orders found.</p>
//           ) : (
//             orders.map(order => (
//               <OrderCard key={order.id} order={order} openModal={openModal} />
//             ))
//           )}
//         </div>

//         {/* --- Desktop View (lg and above) --- */}
//         <div className="hidden lg:block rounded-xl shadow-xl border border-gray-100 overflow-hidden primary_bg ">
//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-600">
//               <thead className="800/20">
//                 <tr>
//                   {['Order ID', 'Date', 'Status', 'Total', 'Actions'].map(header => (
//                     <th key={header} className="px-6 py-3 text-left text-xs font-semibold   uppercase tracking-wider">
//                       {header}
//                     </th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-100">
//                 {orders.map(order => (
//                   <tr key={order.id} className="hover:50/10 transition-colors">
//                     {/* Order ID: Clear Primary Identifier */}
//                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-700 flex items-center">
//                       <ClipboardList className="w-4 h-4 mr-2 text-indigo-400" />
//                       #{order.id}
//                     </td>
//                     {/* Date: Standard Text */}
//                     <td className="px-6 py-4 whitespace-nowrap text-sm   flex items-center">
//                       <Calendar className="w-4 h-4 mr-2  " />
//                       {formatDate(order.createdAt.toString())}

//                     </td>
//                     {/* Status: Visual Indicator */}
//                     <td className=" whitespace-nowrap">
//                       {/* <StatusBadge status={order.status} /> */}
//                       <div className="bg-green-100 text-green-800 text-sm text-center px-2 py-1 rounded-full">
//                         {order.status}
//                       </div>

//                     </td>
//                     {/* Total: Highlighted for Financial Visibility */}
//                     <td className="px-6 py-4 whitespace-nowrap text-lg font-bold text-green-600 flex items-center">
//                       <DollarSign className="w-4 h-4 mr-1" />
//                       {order.totalPrice}
//                     </td>
//                     {/* Actions: Primary Call to Action */}
//                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                       <button
//                         className="text-indigo-700 hover:text-indigo-800 font-medium flex items-center"
//                         onClick={() => openModal(order)}
//                       >
//                         View Details
//                         <ChevronRight className="w-4 h-4 ml-1" />
//                       </button>

//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//           {orders.length === 0 && (
//             <p className="text-center   py-10">No orders found.</p>
//           )}
//         </div>
//       </div>
//       {showModal && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//           <div className="primary_bg w-full max-w-md rounded-xl shadow-xl p-6 relative">

//             {/* Close Button */}
//             <button
//               className="absolute top-3 right-3"
//               onClick={closeModal}
//             >
//               ✕
//             </button>

//             <h2 className="text-xl font-bold mb-4">Order Details</h2>

//             {/* Fake sample layout – UI only */}
//             <div className="space-y-3 text-sm">
//               <p><span className="font-semibold">Order ID:</span> #{selectedOrder?.id}</p>
//               <p><span className="font-semibold">Status:</span> {selectedOrder?.status}</p>
//               <p><span className="font-semibold">Total:</span> ${selectedOrder?.totalPrice}</p>
//               <p><span className="font-semibold">Date:</span> {formatDate(selectedOrder?.createdAt.toString())}</p>

//               <div className="p-3 800/20 rounded-md">
//                 <p className="font-semibold mb-1">Items:</p>
//                 <p className="  text-sm">{selectedOrder?.orderItems.map((item, idx) =>(
//                   <span key={idx}>{item.orderId} (x{item.quantity}){idx < selectedOrder.orderItems.length - 1 ? ', ' : ''}</span>
//                 ))}</p>
//               </div>
//             </div>

//             {/* Close Button */}
//             <div className="mt-5 text-right">
//               <button
//                 className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
//                 onClick={closeModal}
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )
//       }
//     </>

//   );
// };

// export default OrderHistory;

import React, { useEffect, useState } from 'react';
import { ClipboardList, Package, DollarSign, Calendar, ChevronRight, X } from 'lucide-react';

// Assume formatDate is imported from '../../utils/index' as in your original snippet
// const formatDate = (dateString) => new Date(dateString).toLocaleDateString(); 

// Placeholder function for demonstration
const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

// --- StatusBadge Component (Unchanged) ---
const StatusBadge = ({ status }) => {
  let classes = '100  '; // Default background
  switch (status) {
    case 'Delivered': classes = 'bg-green-100 text-green-800'; break;
    case 'Shipped': classes = 'bg-blue-100 text-blue-800'; break;
    case 'Processing': classes = 'bg-yellow-100 text-yellow-800'; break;
    case 'Cancelled': classes = 'bg-red-100 text-red-800'; break;
  }
  return (
    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${classes}`}>
      {status}
    </span>
  );
};


// --- OrderCard Component (Unchanged for the list view) ---
const OrderCard = ({ order, openModal }) => (

  <div className="border border-gray-200 rounded-lg p-4 mb-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
    <div className="flex justify-between items-start mb-2">
      <h3 className="text-sm font-semibold flex items-center">
        <ClipboardList className="w-4 h-4 mr-2 text-indigo-500" />
        Order : **#{order.id}**
      </h3>
      <StatusBadge status={order.status} />
    </div>

    <div className="grid grid-cols-2 gap-y-2 text-sm">
      <div className="flex items-center">
        <Calendar className="w-4 h-4 mr-2  " />
        <span className="font-medium  ">Date:</span>
      </div>
      <div className="text-right font-medium  ">{formatDate(order.createdAt.toString())}</div>

      <div className="flex items-center">
        <DollarSign className="w-4 h-4 mr-2  " />
        <span className="font-medium  ">Total:</span>
      </div>
      <div className="text-right text-lg font-bold text-green-600">
        ${order.totalPrice}
      </div>
    </div>

    <div className="mt-4 pt-3 border-t border-gray-200 flex justify-end">
      <button
        className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center"
        onClick={() => openModal(order)}
      >
        View Details
        <ChevronRight className="w-4 h-4 ml-1" />
      </button>

    </div>
  </div>
);

// --- NEW Component: OrderItemCard (Defined above) ---
const OrderItemCard = ({ item }) => (
  <div className="flex space-x-4 p-3 rounded-lg border border-gray-200">

    {/* Product Image Container */}
    <div className="flex-shrink-0 w-1/5 max-w-[80px] aspect-square overflow-hidden rounded-md">
      <img
        src={item.product.imageUrl}
        alt={item.product.title}
        className="object-cover w-full h-full"
      />
    </div>

    {/* Product Details */}
    <div className="flex-grow space-y-1">
      <p className="font-semibold text-base">{item.product.title}</p>
      <p className="text-sm tracking-wide  ">{item.product.description}</p>
      <p className="text-sm font-medium  ">
        Qty: <span className="font-bold">{item.quantity}</span>
      </p>
    </div>

    {/* Price */}
    <div className="flex-shrink-0 text-right">
      <p className="font-bold text-lg  ">
        ${item.product.price}
      </p>
      <p className="text-xs  ">
        Total: ${item.product.price * item.quantity}
      </p>
    </div>
  </div>
);


// --- Main Component: OrderHistory (Modified Modal) ---
const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const openModal = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedOrder(null);
  };

  // Existing useEffect (Functionality remains unchanged)
  // useEffect(() => {
  //   // ... fetching logic remains the same ...
  //   const fetchOrders = async () => {
  //     // ... (API fetching code) ...
  //     // Using sample data for UI demonstration purposes
  //     const sampleData = [{
  //       "id": "6926daea25b17327ce325a6c",
  //       "userId": "69269f1025b17327ce325a26",
  //       "fullName": "Rimsha Arfeen",
  //       "email": "rimshaarfeen61@gmail.com",
  //       "phone": "+923710253935",
  //       "addressId": null,
  //       "totalPrice": 2350,
  //       "status": "Delivered",
  //       "createdAt": "2025-11-26T10:48:09.708Z",
  //       "address": null,
  //       "orderItems": [
  //         {
  //           "id": "6926daea25b17327ce325a6d",
  //           "orderId": "6926daea25b17327ce325a6c",
  //           "productId": "6916036662fa49ba15619127",
  //           "quantity": 1,
  //           "product": {
  //             "id": "6916036662fa49ba15619127",
  //             "title": "Tandoori Naan",
  //             "description": "Soft, fluffy naan baked fresh in a traditional clay oven.",
  //             "price": 350,
  //             "imageUrl": "https://i0.wp.com/www.shanazrafiq.com/wp-content/uploads/2021/07/1-Tandoori-Naan-5.jpg?fit=1024%2C681&ssl=1",
  //             "categoryId": "6915f19662fa49ba156190c6",
  //             "categorySlug": "desi-tarka"
  //           }
  //         },
  //         {
  //           "id": "6926daea25b17327ce325a6e",
  //           "orderId": "6926daea25b17327ce325a6c",
  //           "productId": "6916036662fa49ba15619126",
  //           "quantity": 1,
  //           "product": {
  //             "id": "6916036662fa49ba15619126",
  //             "title": "BBQ Platter",
  //             "description": "A mix of grilled delights — tikka, boti, kabab, and naan.",
  //             "price": 2000,
  //             "imageUrl": "https://images.deliveryhero.io/image/fd-pk/LH/r623-listing.jpg",
  //             "categoryId": "6915f19662fa49ba156190c6",
  //             "categorySlug": "desi-tarka"
  //           }
  //         }
  //       ]
  //     }];
  //     setOrders(sampleData || []);
  //   };
  //   fetchOrders();
  // }, []);
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch('/api/orders?userId=someUserId');
        const data = await res.json();
        // Assuming data is an array of objects
        setOrders(data || []);
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };
    fetchOrders();
  }, []);
  return (
    <>
      <div className="p-4 sm:p-6 lg:p-8">
        <h1 className="text-3xl font-bold   mb-6 flex items-center">
          <Package className="w-8 h-8 mr-3 text-indigo-600" />
          Order History
        </h1>
        {/* Mobile View */}
        <div className="lg:hidden">
          {orders.map(order => (
            <OrderCard key={order.id} order={order} openModal={openModal} />
          ))}
        </div>
        {/* Desktop View (Table structure remains mostly the same) */}
        <div className="hidden lg:block rounded-xl shadow-xl border border-gray-100 overflow-hidden ">
          {/* --- Desktop View (lg and above) --- */}
          <div className="hidden lg:block rounded-xl shadow-xl border border-gray-100 overflow-hidden primary_bg ">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-600">
                <thead className="800/20">
                  <tr>
                    {['Order ID', 'Date', 'Status', 'Total', 'Actions'].map(header => (
                      <th key={header} className="px-6 py-3 text-left text-xs font-semibold   uppercase tracking-wider">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {orders.map(order => (
                    <tr key={order.id} className="hover:50/10 transition-colors">
                      {/* Order ID: Clear Primary Identifier */}
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-700 flex items-center">
                        <ClipboardList className="w-4 h-4 mr-2 text-indigo-400" />
                        #{order.id}
                      </td>
                      {/* Date: Standard Text */}
                      <td className="px-6 py-4 whitespace-nowrap text-sm   flex items-center">
                        <Calendar className="w-4 h-4 mr-2  " />
                        {formatDate(order.createdAt.toString())}

                      </td>
                      {/* Status: Visual Indicator */}
                      <td className=" whitespace-nowrap">
                        {/* <StatusBadge status={order.status} /> */}
                        <div className="bg-green-100 text-green-800 text-sm text-center px-2 py-1 rounded-full">
                          {order.status}
                        </div>

                      </td>
                      {/* Total: Highlighted for Financial Visibility */}
                      <td className="px-6 py-4 whitespace-nowrap text-lg font-bold text-green-600 flex items-center">
                        <DollarSign className="w-4 h-4 mr-1" />
                        {order.totalPrice}
                      </td>
                      {/* Actions: Primary Call to Action */}
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          className="text-indigo-700 hover:text-indigo-800 font-medium flex items-center"
                          onClick={() => openModal(order)}
                        >
                          View Details
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </button>

                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {orders.length === 0 && (
              <p className="text-center   py-10">No orders found.</p>
            )}
          </div>
        </div>
      </div>

      {/* --- MODAL STRUCTURE MODIFIED --- */}
      {showModal && selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="primary_bg w-full max-w-xl rounded-xl shadow-2xl p-6 relative flex flex-col max-h-[90vh]">

            {/* Modal Header */}
            <div
              className="pb-3 mb-4 flex justify-between items-center border-b"            >
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
            </div>

            {/* General Order Info */}
            <div
              className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm mb-6 pb-4 border-b"            >
              <p>
                <span className="font-semibold text-[#A32412]" >
                  Date:
                </span>{" "}
                {formatDate(selectedOrder.createdAt.toString())}
              </p>

              <p className="text-right">
                <span className="font-semibold text-[#A32412]" >
                  Total Paid:
                </span>{" "}
                <span className="text-lg font-bold text-green-600">
                  ${selectedOrder.totalPrice}
                </span>
              </p>

              <p>
                <span className="font-semibold text-[#A32412]" >
                  Status:
                </span>{" "}
                <StatusBadge status={selectedOrder.status} />
              </p>

              <p className="text-right">
                <span className="font-semibold text-[#A32412]" >
                  Customer:
                </span>{" "}
                {selectedOrder.fullName}
              </p>
            </div>

            {/* Items List */}
            <h3
              className="text-lg font-semibold mb-3"            >
              Items Purchased
            </h3>

            <div className="space-y-3 overflow-y-auto pr-2 flex-grow">
              {selectedOrder.orderItems.map((item) => (
                <OrderItemCard key={item.id} item={item} />
              ))}
            </div>

            {/* Footer */}
            {/* <div
              className="mt-6 pt-4 flex justify-end border-t"            >
              <button
                onClick={closeModal}
                className="px-6 py-2 rounded-lg font-medium transition-opacity hover:opacity-80 bg-indigo-600 text-white hover:bg-indigo-700" >
                Close Window
              </button>
            </div> */}
          </div>
        </div>
      )}


    </>

  );
};

export default OrderHistory;