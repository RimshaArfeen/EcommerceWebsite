
import React from 'react'
import { CheckCircle, Clock, Truck, XCircle, Package } from 'lucide-react';
const StatusBadge = ({ status }) => {
     let classes = 'bg-gray-100 text-gray-800'; // Default
     let Icon = Clock;

     switch (status) {
          case 'Delivered':
               classes = 'bg-green-100 text-green-800';
               Icon = CheckCircle;
               break;
          case 'Shipped':
               classes = 'bg-blue-100 text-blue-800';
               Icon = Truck;
               break;
          case 'Processing':
               classes = 'bg-yellow-100 text-yellow-800';
               Icon = Package;
               break;
          case 'Cancelled':
               classes = 'bg-red-100 text-red-800';
               Icon = XCircle;
               break;
          // 'Pending' uses the default gray/clock
     }



     return (
          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-medium rounded-full ${classes} items-center space-x-1`
          }>
               <Icon className="w-3 h-3" />
               <span>{status}</span>
          </span >
     );

}

export default StatusBadge
