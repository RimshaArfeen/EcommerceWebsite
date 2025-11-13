import React from 'react'
import { User, ShoppingBag, Home, LogOut, ChevronRight, Mail, } from "lucide-react"; // ✅ make sure names match exactly

const ProfileSection = ({session}) => {
  return (
    
       <div className="p-6 sm:p-8 rounded-xl shadow-lg border border-gray-100 max-w-lg mx-auto lg:mx-0">
                                        <div className="flex flex-col items-center space-y-4 border-b pb-6 mb-6">
                                             <div className="w-24 h-24 rounded-full flex items-center justify-center border-4 border-white shadow-xl">
                                                  <img src={session?.user.image} alt={session?.user.name} className=" rounded-full" />

                                             </div>
                                             <h2 className="text-2xl font-bold">{session?.user.name}</h2>
                                        </div>

                                        <div className="space-y-4">
                                             <div className="flex items-center space-x-3 p-3 rounded-lg">
                                                  <Mail className="w-5 h-5" />
                                                  <div>
                                                       <p className="text-xs font-medium text-gray-500">Email Address</p>
                                                       <p className="text-sm font-semibold">{session?.user.email}</p>
                                                  </div>
                                             </div>
                                             {/* <div className="flex items-center space-x-3 p-3  rounded-lg">
                    <Phone className="w-5 h-5" />
                    <div>
                      <p className="text-xs font-medium text-gray-500">Phone Number</p>
                      <p className="text-sm font-semibold">{session?.user.phone } </p>
                    </div>
                  </div> */}
                                        </div>
                                        <p className="mt-6 text-sm text-center italic text-gray-600">
                                             Your profile information is securely stored and cannot be updated from this view.
                                        </p>
                                   </div>
                            
    
  )
}

export default ProfileSection
