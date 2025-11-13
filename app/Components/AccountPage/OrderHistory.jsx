
import React from 'react'
import {
  User, ShoppingBag, MapPin, LogOut, ChevronRight,
  ClipboardList, Package, DollarSign, Calendar, Mail, Phone, Home, Edit, Trash
} from 'lucide-react';

// Helper for Order Status Badge
const StatusBadge = ({ status }) => {
    let classes = 'bg-gray-100 '; // Default
    let Icon = Package;

    switch (status) {
        case 'Delivered':
            classes = 'bg-green-100 text-green-800';
            break;
        case 'Shipped':
            classes = 'bg-blue-100 text-blue-800';
            break;
        case 'Processing':
            classes = 'bg-yellow-100 text-yellow-800';
            break;
        case 'Cancelled':
            classes = 'bg-red-100 text-red-800';
            break;
    }

    return (
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${classes}`}>
            {status}
        </span>
    );
};

const OrderHistory = () => {
     // Mock data for the Order History table layout
     const mockOrders = [
          { id: '1004', date: 'Oct 30, 2024', status: 'Delivered', total: '$55.99' },
          { id: '1005', date: 'Oct 25, 2024', status: 'Shipped', total: '$32.50' },
          { id: '1006', date: 'Oct 20, 2024', status: 'Processing', total: '$40.00' },
          { id: '1007', date: 'Sep 15, 2024', status: 'Cancelled', total: '$25.00' },
     ];
     return (
          <div className=" rounded-xl shadow-lg border border-gray-100 overflow-hidden">

               {/* Desktop Table View */}
               <div className="hidden lg:block overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                         <thead className="">
                              <tr>
                                   {['Order ID', 'Date', 'Status', 'Total', 'Actions'].map((header) => (
                                        <th
                                             key={header}
                                             className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider"
                                        >
                                             {header}
                                        </th>
                                   ))}
                              </tr>
                         </thead>
                         <tbody className="divide-y divide-gray-200">
                              {mockOrders.map((order) => (
                                   <tr key={order.id} className="hover: transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium  flex items-center">
                                             <ClipboardList className="w-4 h-4 mr-2 " />
                                             #{order.id}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm  flex items-center">
                                             <Calendar className="w-4 h-4 mr-2 " />
                                             {order.date}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                             <StatusBadge status={order.status} />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold  flex items-center">
                                             <DollarSign className="w-4 h-4 mr-1 " />
                                             {order.total}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                             <button className=" hover: font-semibold disabled: cursor-not-allowed" disabled>
                                                  View Details
                                             </button>
                                        </td>
                                   </tr>
                              ))}
                         </tbody>
                    </table>
               </div>

               {/* Mobile Card View */}
               <div className="lg:hidden p-4 space-y-4">
                    {mockOrders.map((order) => (
                         <div key={order.id} className=" p-4 border border-gray-200 rounded-lg shadow-sm space-y-2">
                              <div className="flex justify-between items-center border-b pb-2">
                                   <h3 className="font-bold  flex items-center">
                                        <ClipboardList className="w-5 h-5 mr-2 text-black" />
                                        Order #{order.id}
                                   </h3>
                                   <StatusBadge status={order.status} />
                              </div>
                              <div className="grid grid-cols-2 gap-2 text-sm">
                                   <p className=" flex items-center"><Calendar className="w-4 h-4 mr-2 " /> Date: {order.date}</p>
                                   <p className=" font-bold flex items-center"><DollarSign className="w-4 h-4 mr-1 " /> Total: {order.total}</p>
                              </div>
                              <button className="w-full mt-2 py-2 text-sm bg-gray-100  font-semibold rounded-lg hover:bg-gray-200 transition-colors cursor-not-allowed" disabled>
                                   Track / View Details
                              </button>
                         </div>
                    ))}
               </div>
          </div>

     )

};

export default OrderHistory
