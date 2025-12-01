
import React, { useState, useEffect } from 'react'
import {
    User, ShoppingBag, MapPin, LogOut, ChevronRight,
    ClipboardList, Package, DollarSign, Calendar, Mail, Phone, Home, Edit, Trash
} from 'lucide-react';

const AddressLayout = () => {
    const [address, setAddress] = useState([]);
    // Existing useEffect (Functionality remains unchanged)
    useEffect(() => {
        const fetchAddresses = async () => {
            try {
                const res = await fetch('/api/addresses?userId=someUserId');
                const data = await res.json();
                // Assuming data is an array of objects
                setAddress(data || []);
                // console.log("Address Data", data)
                return data;
            } catch (err) {
                console.error("Error fetching addresses:", err);
            }
        };
        fetchAddresses();
    }, []);

    const handleDelete = async (id) => {
        await fetch(`/api/addresses?id=${id}`, {
            method: "DELETE",
        });

        // refresh UI
        setAddress(prev => prev.filter(a => a.id !== id));
        alert("Address deleted successfully");
    };


    return (

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {
                address.map((address, index) => (
                    <div key={index} className="p-6 rounded-xl shadow-lg border border-gray-100 space-y-3">

                        <div className="flex items-center justify-between border-b pb-3 mb-3">
                            <h3 className="text-lg font-bold text-gray-900 flex items-center">
                                <Home className="w-5 h-5 mr-2 text-black" />
                                {index === 0 ? "Home Address" : "Other Address"}
                            </h3>

                            <div className="text-xs font-medium px-3 py-1 bg-gray-900 text-white rounded-full" >
                                {index === 0 ? "DEFAULT" : "SECONDARY"}
                            </div >
                        </div >

                        {/* Address Lines */}
                        < p className="text-sm font-semibold text-gray-800" > {address.line1}</p >
                        {
                            address.line2 && (
                                <p className="text-sm text-gray-600">{address.line2}</p>
                            )}

                        {/* City / State / Postal / Country */}
                        <p className="text-sm text-gray-600">
                            {address.city}, {address.state} {address.postalCode}
                        </p >

                        <p className="text-sm text-gray-600" > {address.country}</p >

                        {/* User Info */}
                        < p className="text-sm text-gray-600 font-mono" >
                            User: {address.user?.name}
                        </p >

                        <div className="pt-3 flex space-x-4 border-t mt-3" >
                            {/* <button
                              className="flex items-center text-sm text-gray-600 hover:text-black font-medium cursor-not-allowed disabled:opacity-50"
                            disabled
                        >
                            <Edit   className="w-4 h-4 mr-1" /> Edit
                        </button> */}

                            < button
                                onClick={() => handleDelete(address.id)}
                                className="flex items-center text-sm text-red-600 hover:text-red-800 font-medium cursor-not-allowed disabled:opacity-50"
                            >
                                <Trash className="w-4 h-4 mr-1" /> Remove
                            </button >
                        </div >

                    </div >
                ))}


        </div >

    )
}

export default AddressLayout
