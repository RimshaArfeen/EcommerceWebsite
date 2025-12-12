
import React from 'react'
import { Truck, ChevronRight } from 'lucide-react';
import { formatDate } from '@/app/utils';
import { useAdmin } from '@/app/context/AdminContext';
const PendingShipments = () => {
     const { pendingShipments } = useAdmin();

     return (
          <div className=" p-6 rounded-xl shadow-lg border border-gray-100 h-full">
               < div className="flex justify-between items-center mb-6 border-b pb-3" >
                    <h3 className="text-xl font-bold text-gray-900 flex items-center" >
                         <Truck className="w-6 h-6 mr-2 text-blue-600" />
                         Pending Shipments
                    </h3 >
                    <a href="#" className="text-sm font-semibold text-black hover:text-gray-700 transition-colors cursor-not-allowed">
                         Shipping Queue
                    </a>
               </div >

               <div className="space-y-3" >
                    {
                         pendingShipments.map((shipment) => (
                              <div key={shipment.id} className="p-3 tracking-wide  rounded-lg flex justify-between items-center hover:0 transition-colors">
                                   <div>
                                        <p className="text-sm font-medium text-gray-800">Order #{shipment.id}</p>
                                        <p className="text-xs text-gray-500">
                                             <span className="font-semibold">{shipment.fullName}</span>, {formatDate(shipment.createdAt)}
                                        </p >
                                   </div >
                                   <div className="text-xs font-semibold px-2 py-1 bg-red-100 text-red-800 rounded-full flex items-center space-x-1" >
                                        <span>{shipment.status}</span>
                                        <ChevronRight className="w-3 h-3" />
                                   </div >
                              </div >
                         ))}
               </div >
          </div >
     )
}

export default PendingShipments
