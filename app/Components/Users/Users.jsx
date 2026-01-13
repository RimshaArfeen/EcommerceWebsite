
"use client"
import React, { useId, useState } from 'react';
import { Search,Trash2, Users} from 'lucide-react';
import { useAdminUsers } from '@/app/context/UsersContext';
import { handleAddUser, deleteUserAction } from '@/app/actions/createInvoice';

// --- Utility Components ---
const TableHeader = ({ title }) => (
     <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider  ">
          {title}
     </th>
);

const UserRow = ({ user, onDelete }) => (
     <tr className="border-b hover:/50 transition duration-150">
          {/* User ID - Truncated for UI aesthetics but full text on hover/copy */}
          <td className="px-6 py-4 whitespace-nowrap text-sm font-mono ">
               <span title={user.id} className="cursor-help">{user.id.substring(0, 12)}...</span>
          </td>
          {/* Name & Email - Primary user identifier */}
          <td className="px-6 py-4 whitespace-nowrap">
               <div className="flex items-center">
                    <div>
                         <div className="text-sm font-medium ">{user.name}</div>
                         <div className="text-xs text-green-600 font-medium py-0.5 rounded-full inline-block mt-1 capitalize">{user.role}</div>
                         <div className="text-sm  mt-1 sm:mt-0">{user.email}</div>
                    </div>
               </div>
          </td>

          {/* Actions - Key Usability Feature */}
          <td className="py-4 whitespace-nowrap text-right text-sm font-medium">
               <div className="flex space-x-3 justify-center">
                    {/* <button
                         title="Edit User"
                         className="text-indigo-600 hover:text-indigo-900 p-2 rounded-full  transition"
                    >
                         <Edit size={18} />
                    </button> */}
                    <button
                         onClick={() => { onDelete(user.id) }}
                         title="Delete User"
                         className="text-red-600 hover:text-red-900 p-2 rounded-full hover: transition"
                    >
                         <Trash2 size={18} />
                    </button>
               </div>
          </td>
     </tr>
);

const AddUserForm = ({ handleCloseModal }) => {

     return (
          <div className="primary_bg w-full sm:w-3/4 lg:w-1/3 mx-auto px-4 sm:px-6 lg:px-8 py-10 rounded-xl">
               {/* Header */}
               <h1 className="text-3xl font-bold tracking-tight">Create New User</h1>

               {/* Form Card */}
               <div className="mt-6">
                    <form action={async (formData) => {
                         await handleAddUser(formData);
                         handleCloseModal();
                    }}>
                         <div className="space-y-6">
                              {/* Username Field */}
                              <div>
                                   <label htmlFor="username" className="block text-sm font-medium">Username</label>
                                   <input name='name' type="text" id="username" placeholder="Enter a unique username" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-2 focus:border-transparent" />
                              </div>

                              {/* Email Field */}
                              <div>
                                   <label htmlFor="email" className="block text-sm font-medium">Email Address</label>
                                   <input name='email' type="email" id="email" placeholder="user@example.com" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-2 focus:border-transparent" />
                              </div>

                              {/* Role (Read-Only) Field */}
                              <div>
                                   <label className="block text-sm font-medium">User Role</label>
                                   {/* Static badge visual for the role */}
                                   <span className="inline-flex items-center rounded-md px-3 py-1 text-sm font-medium bg-red headings_on_red_bg border mt-1">
                                        Administrator
                                   </span>
                                   {/* Hidden input name='name' for form submission data */}
                                   <input name='role' type="hidden" value="admin" />
                              </div>
                         </div>

                         {/* Actions */}
                         <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200 mt-8">
                              <button
                                   onClick={handleCloseModal}
                                   type="button" className="bg-white text-gray-600 hover:text-gray-900 font-semibold rounded-md py-2 px-4">
                                   Cancel
                              </button>
                              <button 
                              type="submit" className="bg-red  hover:bg-primary-600 text-white font-semibold py-2 px-4 rounded-md shadow-md">
                                   Create User
                              </button>
                         </div>
                    </form>
               </div>
          </div>
     )
}
// --- Main Component ---
const App = () => {
     const [searchTerm, setSearchTerm] = useState('');
     const [filterStatus, setFilterStatus] = useState('All');
     const [showModal, setShowModal] = useState(false)

     const { users, removeUser } = useAdminUsers();

     console.log("Users", users)

     const handleOpenModal = () => {
          setShowModal(true);
          console.log("Opened Modal")
     };

     const handleCloseModal = () => {
          setShowModal(false);
          setSelectedCustomer(null);
     };

     const handleDeleteUser = async (userId) => {
          if (!confirm("Delete this user?")) return;
          removeUser(userId);

          try {
               await deleteUserAction(userId);
          } catch (err) {
               console.error(err);
          }
     }; 
     // Filter logic (simplified for mockup)
     const filteredUsers = users.filter(user => {
          const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
               user.email.toLowerCase().includes(searchTerm.toLowerCase());
          const matchesStatus = filterStatus === 'All' || user.status === filterStatus;
          return matchesSearch && matchesStatus;
     });


     return (
          <div className="min-h-screen  p-4 sm:p-8 font-sans">
               <div className="max-w-7xl mx-auto">

                    {/* Header and Summary */}
                    <div className="flex items-center justify-between border-b  pb-5 mb-8">
                         <h1 className="text-3xl font-extrabold tracking-tight  flex items-center">
                              <Users className="w-8 h-8 mr-3 text-red-600" />
                              User Management
                         </h1>
                         <div className="hidden sm:flex text-sm font-medium  p-3 rounded-lg shadow-sm border">
                              Total Users: <span className="text-red-600 font-bold ml-1">{users.length}</span>
                         </div>
                    </div>

                    {/* Control Panel (Search & Filters) */}
                    <div className=" p-4 sm:p-6 rounded-xl shadow-lg mb-8 border">
                         <div className="flex flex-col sm:flex-row gap-4 items-center">

                              {/* Search Bar */}
                              <div className="relative flex-grow w-full sm:w-auto">
                                   <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <Search className="h-5 w-5 " />
                                   </div>
                                   <input name='name'
                                        type="text"
                                        placeholder="Search by name or email..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 border  rounded-lg focus:ring-red-500 focus:border-red-500 transition duration-150"
                                   />
                              </div>


                              {/* Action Button */}
                              <button
                                   onClick={handleOpenModal} className="w-full sm:w-auto px-6 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition duration-200 focus:outline-none focus:ring-4 focus:ring-red-500 focus:ring-opacity-50">
                                   + Add New User
                              </button>
                         </div>
                    </div>

                    {/* User Table (Desktop View) */}
                    <div className="hidden md:block shadow-xl overflow-hidden rounded-xl border ">
                         <table className="min-w-full divide-y divide-gray-200">
                              <thead className="">
                                   <tr>
                                        <TableHeader title="User ID" />
                                        <TableHeader title="Name / Email" />
                                        <TableHeader title="Actions" />
                                   </tr>
                              </thead>
                              <tbody

                                   className=" divide-y divide-gray-100">
                                   {filteredUsers.length > 0 ? (
                                        filteredUsers.map((user) =>
                                             <UserRow
                                                  key={user.id}
                                                  user={user}
                                                  onDelete={handleDeleteUser}
                                             />)
                                   ) : (
                                        <tr>
                                             <td colSpan="4" className="px-6 py-8 text-center  text-lg">
                                                  No users found matching your criteria.
                                             </td>
                                        </tr>
                                   )}
                              </tbody>
                         </table>
                    </div>

                    {/* User Cards (Mobile View - Superior Usability) */}
                    <div className="md:hidden space-y-4">
                         <h3 className="text-lg font-bold  mb-3">User List</h3>
                         {filteredUsers.length > 0 ? (
                              filteredUsers.map((user) => (
                                   <div key={user.id} className=" p-4 rounded-xl shadow-md border ">
                                        <div className="flex justify-between items-start mb-2">
                                             {/* <StatusBadge status={user.role} /> */}
                                             <div className="flex space-x-2">

                                                  <button title="Delete" className="text-red-600 hover:text-red-900"><Trash2 size={16} /></button>
                                             </div>
                                        </div>
                                        <div className="font-semibold  text-lg">{user.name}</div>
                                        <div className="text-sm  break-all">{user.email}</div>
                                        <div className="text-xs font-mono  mt-2">ID: {user.id}</div>
                                        <div className="text-xs text-red-600 font-medium  px-2 py-0.5 rounded-full inline-block mt-2">{user.role}</div>
                                   </div>
                              ))
                         ) : (
                              <div className="text-center py-8 rounded-lg shadow-md ">
                                   No users found matching your search.
                              </div>
                         )}
                    </div>


               </div>
               {/* --- MODAL STRUCTURE MODIFIED (High-Fidelity UI/UX) --- */}
               {showModal && (
                    <div className=" fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 ">
                         <AddUserForm handleCloseModal={handleCloseModal} />
                    </div>
               )}
          </div>
     );
};

export default App;