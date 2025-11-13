
import React from 'react'
import {
  User, ShoppingBag, MapPin, LogOut, ChevronRight,
  ClipboardList, Package, DollarSign, Calendar, Mail, Phone, Home, Edit, Trash
} from 'lucide-react';

const AddressLayout = () => {
     const mockAddresses = [
    { type: 'Primary', street: '123 Fire Street', city: 'Flavor Town', state: 'CA', zip: '90210', phone: '(555) 123-4567' },
    { type: 'Work', street: '456 Heat Blvd', city: 'Spice City', state: 'NY', zip: '10001', phone: '(555) 987-6543' },
];

  return (

       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockAddresses.map((address, index) => (
            <div key={index} className=" p-6 rounded-xl shadow-lg border border-gray-100 space-y-3">
                <div className="flex items-center justify-between border-b pb-3 mb-3">
                    <h3 className="text-lg font-bold text-gray-900 flex items-center">
                        <Home className="w-5 h-5 mr-2 text-black" />
                        {address.type}
                    </h3>
                    <div className="text-xs font-medium px-3 py-1 bg-gray-900 text-white rounded-full">
                        {index === 0 ? 'DEFAULT' : 'SECONDARY'}
                    </div>
                </div>
                
                <p className="text-sm font-semibold text-gray-800">{address.street}</p>
                <p className="text-sm text-gray-600">{address.city}, {address.state} {address.zip}</p>
                <p className="text-sm text-gray-600 font-mono">Phone: {address.phone}</p>
                
                <div className="pt-3 flex space-x-4 border-t mt-3">
                    <button className="flex items-center text-sm text-gray-600 hover:text-black font-medium cursor-not-allowed disabled:opacity-50" disabled>
                        <Edit className="w-4 h-4 mr-1" /> Edit
                    </button>
                    <button className="flex items-center text-sm text-red-600 hover:text-red-800 font-medium cursor-not-allowed disabled:opacity-50" disabled>
                        <Trash className="w-4 h-4 mr-1" /> Remove
                    </button>
                </div>
            </div>
        ))}
        {/* Add New Address Placeholder */}
        <div className="p-6 border-2 border-dashed border-gray-300 rounded-xl hover:border-gray-50 transition-colors flex items-center justify-center cursor-not-allowed">
            <button className="text-gray-500 font-semibold hover:text-gray-700 flex items-center disabled:opacity-50" disabled>
                <MapPin className="w-5 h-5 mr-2" /> Add New Address
            </button>
        </div>
    </div>

  )
}

export default AddressLayout
