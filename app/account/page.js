"use client";
import React, { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { User, ShoppingBag, Home, LogOut, ChevronRight, Mail, } from "lucide-react";
import { Locate } from "lucide-react";
import OrderHistory from "../Components/AccountPage/OrderHistory";
import ProfileSection from "../Components/AccountPage/ProfileSection";
import AddressLayout from "../Components/AccountPage/AddressLayout";


const sidebarOptions = [
     {
          title: "Profile",
          icon: User,
          link: "#",
          isActive: "False"
     },
     {
          title: "Orders",
          icon: ShoppingBag,
          link: "#",
          isActive: "False"
     },
     {
          title: "Addresses",
          icon: Locate,
          link: "#",
          isActive: "False"
     },
];



export const LeftSideBar = ({ onSelect }) => {
     return (
          <nav className="lg:col-span-3">
               < div className="lg:sticky lg:top-8 space-y-2 p-4 rounded-2xl shadow-xl border border-gray-100" >

                    {
                         sidebarOptions.map((item, index) => {
                              const Icon = item.icon; // assign the icon component
                              return (
                                   <button
                                        key={index}
                                        onClick={(e) => { onSelect(item.title) }}
                                        className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50/10 cursor-pointer"
                                   >
                                        <div className="flex items-center space-x-2">
                                             <Icon size={16} />  {/* render the icon here */}
                                             <span className="text-sm">{item.title}</span>
                                        </div >
                                        <ChevronRight className="w-4 h-4" />
                                   </button >
                              );
                          })}


                    <div className="pt-4 border-t border-gray-100 mt-2">
                         <button
                              onClick={() => signOut({ redirectTo: "/login" })}
                              className=" w-full flex items-center p-3 rounded-lg cursor-pointer text-white  bg-red-900 hover:bg-red-800 hover:text-white transition-colors">
                              <LogOut className="w-5 h-5 mr-3" />
                              <span className="text-sm font-bold">Sign Out</span>
                         </button >
                    </div >
               </div >
          </nav >
     )
}


const Page = () => {
     const { data: session } = useSession();
     const [activeSection, setActiveSection] = useState("Profile")
     console.log(session)


     const handleComponent = (section) => {
          console.log(section);
          setActiveSection(section);

     }

     return (
          <div className="min-h-screen font-sans py-12 sm:py-16">
               < div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" >

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10" >

                         {/* LEFT SIDEBAR */}
                         < LeftSideBar onSelect={handleComponent} />

                         {/* RIGHT CONTENT */}
                         < main className="lg:col-span-9" >
                              <div className="space-y-10" >

                                   {/* HEADER */}
                                   {/* <div   className="mb-8 pb-4 border-b border-gray-200">
                <h1   className="text-3xl font-bold tracking-tight sm:text-4xl">Profile Info</h1>
                <p   className="mt-1 text-gray-600">View your secure personal details.</p>
              </div> */}

                                   {/* SECTIONS */}
                                   {
                                        activeSection == "Profile" && (
                                             <ProfileSection session={session} />
                                        )
                                   }
                                   {
                                        activeSection == "Orders" && (
                                             <OrderHistory />
                                        )
                                   }
                                   {
                                        activeSection == "Addresses" && (
                                             <AddressLayout />
                                        )
                                   }

                              </div >
                         </main >
                    </div >
               </div >
          </div >
     );
};

export default Page;
