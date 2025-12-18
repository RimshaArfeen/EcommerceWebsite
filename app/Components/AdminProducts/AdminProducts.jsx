
"use client";
import React from 'react';
import {
     Plus, Search, Edit, Trash, ChevronDown
} from 'lucide-react';
import { useProducts } from '@/app/context/ProdContext';
import AddProductForm from './AddProductForm';
import { deleteProduct } from '@/app/actions/createInvoice';
const categories = ['All Categories', 'DessertShakes', 'Desi tarka', 'Starter', 'Fastfood'];


/* Product Table Component - The main data display area.*/
const ProductsTable = ({ products, query, pageNo, onDelete, selectedCategory }) => {

     const [sortKey, setSortKey] = React.useState('title');
     const [sortDirection, setSortDirection] = React.useState('asc');
     const [editingId, setEditingId] = React.useState(null); // currently editing product
     const [newPrice, setNewPrice] = React.useState("");      // new price input

     const headers = [
          { key: 'image', label: 'Product' },
          { key: 'price', label: 'Price', align: 'text-right' },
          { key: 'status', label: 'Status' },
          { key: 'actions', label: 'Actions', align: 'text-center' },
     ];

     const handleEditProduct = (product) => {
          console.log("Edit Button clicked , product ", product)
          setEditingId(product.id);
          setNewPrice(product.price); // populate input with current price
     };

     const handleSavePrice = async (productId) => {
          try {
               const res = await fetch(`/api/admin/products/${productId}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ price: Number(newPrice) }),
               });

               if (!res.ok) throw new Error("Failed to update price");

               alert("Price updated!");
               setEditingId(null);
          } catch (err) {
               console.error(err);
               alert("Error updating price");
          }
     };

     const handleSort = (key) => {
          if (key === sortKey) {
               setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
          } else {
               setSortKey(key);
               setSortDirection('asc');
          }
          // No actual sorting logic needed for UI/UX focus
     };

     const getSortIcon = (key) => {
          if (key !== sortKey) return null;
          return sortDirection === 'asc' ? <ChevronDown className="w-3 h-3 rotate-180" /> : <ChevronDown className="w-3 h-3" />;
     };

     const filteredProducts = products.filter(product => {
          const matchesSearch = product.title
               .toLowerCase()
               .includes(query.toLowerCase());

          const matchesCategory =
               selectedCategory === "all" ||
               product.category?.slug?.toLowerCase() === selectedCategory;

          return matchesSearch && matchesCategory;
     });

     const paginatedProducts =
          pageNo === 1
               ? filteredProducts.slice(0, 10)
               : filteredProducts.slice(10, 20);

     return (
          <div className="primary_bg  rounded-xl shadow-lg border  overflow-x-auto scrollbar-colored">
               <table className="min-w-full divide-y divide-red-500/10">
                    <thead className=" bg-red headings_on_red_bg ">
                         <tr>
                              {headers.map((header) => (
                                   <th
                                        key={header.key}
                                        // Adjusted styling for dark header
                                        className={`px-6 py-3 text-xs font-bold uppercase tracking-wider whitespace-nowrap ${header.align || 'text-left'} ${header.key !== 'actions' ? 'cursor-pointer hover:bg-red/90  transition-colors' : ''}`}
                                        onClick={() => header.key !== 'image' && header.key !== 'actions' && handleSort(header.key)}
                                   >
                                        <div className={`flex items-center ${header.align === 'text-right' ? 'justify-end' : ''} ${header.align === 'text-center' ? 'justify-center' : ''}`}>
                                             <span>{header.label}</span>
                                             {getSortIcon(header.key)}
                                        </div>
                                   </th>
                              ))}
                         </tr>
                    </thead>
                    <tbody className="divide-y divide-red-500/10">
                         {paginatedProducts.length === 0 ? (
                              <tr>
                                   <td colSpan={4} className="text-center py-6">
                                        No products found
                                   </td>
                              </tr>
                         ) : (
                              paginatedProducts.map(product => (
                                   <tr key={product.id} className="hover:bg-red-500/10 transition-colors">

                                        {/* Product Info (Image & Name) */}
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium ">
                                             <div className="flex items-center space-x-3">
                                                  <img
                                                       className="h-10 w-10 rounded-lg object-cover border  shadow-sm"
                                                       src={product.imageUrl}
                                                       alt={product.title}
                                                       onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/50x50/333333/ffffff?text=N/A" }}
                                                  />
                                                  <span className="font-semibold text-muted-brown">{product.title}</span>
                                             </div>
                                        </td>

                                        {/* Price */}
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-right">
                                             {editingId === product.id ? (
                                                  <div className="flex items-center space-x-2 justify-end">
                                                       <input
                                                            type="number"
                                                            value={newPrice}
                                                            onChange={(e) => setNewPrice(e.target.value)}
                                                            className="w-20 p-1 rounded border text-right"
                                                       />
                                                       <button
                                                            onClick={() => handleSavePrice(product.id)}
                                                            className="px-2 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                                                       >
                                                            Save
                                                       </button>
                                                       <button
                                                            onClick={() => setEditingId(null)}
                                                            className="px-2 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
                                                       >
                                                            Cancel
                                                       </button>
                                                  </div>
                                             ) : (
                                                  `$${product.price.toFixed(2)}`
                                             )}
                                        </td>

                                        {/* Status (Hardcoded as Active for UI example) */}
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                             <span className="px-2 py-1 inline-flex text-xs leading-5 font-medium rounded-full text-green-800 bg-green-100">
                                                  Active
                                             </span>
                                        </td>

                                        {/* Actions (Edit & Delete) */}
                                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                                             <div className="flex justify-center space-x-3">
                                                  {/* Edit Button */}
                                                  <button
                                                       className="text-blue-500 hover:text-blue-600 hover:cursor-pointer p-2 rounded-full transition-colors group hover:bg-blue-50"
                                                       title="Edit Product"
                                                       onClick={() => handleEditProduct(product
                                                       )}
                                                  >
                                                       <Edit className="w-5 h-5" />
                                                  </button>

                                                  {/* Delete Button (Destructive action) */}
                                                  <button
                                                       className="text-red-500 hover:text-red-600 hover:cursor-pointer p-2 rounded-full transition-colors group hover:bg-red-50"
                                                       title="Delete Product"
                                                       onClick={() => onDelete(product.id)}
                                                  >
                                                       <Trash className="w-5 h-5" />
                                                  </button>
                                             </div>
                                        </td>
                                   </tr>
                              ))
                         )}
                    </tbody>
               </table>
          </div>
     );
};


/* Main App Component: Admin Products Page.*/
const AdminProducts = () => {
     // Using the mock hook created above
     const products = useProducts();
     const [query, setQuery] = React.useState("");
     const [pageNo, setPageNo] = React.useState(1);
     const [showProdForm, setShowProdForm] = React.useState(false)
     const [selectedCategory, setSelectedCategory] = React.useState("all");

     const handleQuery = (value) => {
          setQuery(value);
          setPageNo(1); // Reset to first page on new search
          console.log("Search Query:", value);
     }

     const handleAddProduct = (params) => {
          setShowProdForm(true)
     }


     const handleDeleteProduct = async (prodId) => {
          if (!confirm("Delete this Product?")) return;
          // removeUser(prodId);

          try {
               await deleteProduct(prodId);
          } catch (err) {
               console.error(err);
          }
     };


     return (
          <>
               <div className="min-h-screen  font-sans p-4 sm:p-8 lg:p-16">
                    <div className="max-w-7xl mx-auto">

                         {/* Header and Primary CTA (Add Product) */}
                         <header className="flex justify-between items-center mb-10 pb-4 ">
                              <div>
                                   <h1 className="text-3xl font-extrabold tracking-tight  sm:text-4xl">
                                        🌶️ Product Catalog
                                   </h1>
                                   <p className="text-muted-brown mt-1">
                                        Manage all inventory items and spicy blends for Spicy Bazaar.
                                   </p>
                              </div>

                              {/* Prominent "Add a Product" Button - High Contrast Red */}
                              <button
                                   className=" bg-red headings_on_red_bg hover:cursor-pointer flex items-center space-x-2 px-6 py-2.5 text-base font-bold rounded-xl  transition-all transform hover:scale-[1.02] active:scale-[0.98] ring-4 ring-red-300/50"
                                   onClick={handleAddProduct}
                              >
                                   <Plus className="w-5 h-5" />
                                   <span>Add New Product</span>
                              </button>
                         </header>

                         {/* Filter and Search Bar (Secondary Navigation) */}
                         <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-8">

                              {/* Search Input */}
                              <div className="w-full sm:w-80 relative">
                                   <Search
                                        className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                   <input
                                        value={query}
                                        onChange={(e) => { handleQuery(e.target.value) }}
                                        type="text"
                                        placeholder="Search by product name..."
                                        className="w-full pl-10 pr-4 py-2 border  rounded-lg focus:ring-red-500 focus transition-all shadow-sm"
                                   />
                              </div>

                              {/* Category Filter Dropdown (Styled native select) */}
                              <div className="flex space-x-3 items-center">
                                   <label className="text-sm font-medium text-gray-600 hidden sm:block">Category:</label>
                                   <div className="relative">
                                        <select
                                             value={selectedCategory}
                                             onChange={(e) => setSelectedCategory(e.target.value)}
                                             className="appearance-none block w-full primary_bg border rounded-lg py-2 pl-3 pr-8 text-sm font-medium"
                                        >
                                             <option value="all">All Categories</option>
                                             {categories.slice(1).map((cat) => (
                                                  <option
                                                       key={cat}
                                                       value={cat.toLowerCase().replace(/ /g, "-")} // match the slug format
                                                  >
                                                       {cat}
                                                  </option>
                                             ))}
                                        </select>


                                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                                   </div>
                              </div>
                         </div>

                         {/* Products List / Table */}
                         <ProductsTable
                              products={products} query={query} pageNo={pageNo}
                              onDelete={handleDeleteProduct}
                              selectedCategory={selectedCategory}

                         />

                         {/* Pagination Placeholder */}
                         <div className="mt-10 flex justify-center">
                              <div className="flex items-center space-x-2 text-gray-600 text-sm">
                                   {/* Previous button */}
                                   <button
                                        onClick={() => setPageNo(pageNo - 1)}
                                        className={`px-3 py-1 border rounded-lg hover:transition-colors ${pageNo === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                                        disabled={pageNo === 1}
                                   >
                                        Previous
                                   </button>

                                   {/* Current page */}
                                   <span className="px-3 py-1 font-bold border rounded-lg bg-red-50 text-red-700">
                                        {pageNo}
                                   </span>

                                   {/* Next button */}
                                   <button
                                        onClick={() => setPageNo(pageNo + 1)}
                                        className={`px-3 py-1 border rounded-lg hover:transition-colors cursor-pointer ${pageNo === 2 ? 'opacity-50 cursor-not-allowed' : ''}`}
                                        disabled={pageNo === 2}
                                   >
                                        Next
                                   </button>
                              </div>
                         </div>


                    </div>
               </div>
               {showProdForm && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                         <AddProductForm onClose={() => setShowProdForm(false)} />
                    </div>
               )}
          </>

     );
};

export default AdminProducts;

