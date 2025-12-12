import React from 'react';
import { X } from 'lucide-react';
import "../../globals.css";
// NOTE: Assuming createInvoice action is correct for product creation based on form fields.
import { createInvoice } from "@/app/actions/createInvoice";

// Reusing InputField and TextareaField components for consistency and simplicity.

const InputField = ({ label, id, name, type = "text", placeholder, required = true, className = "" }) => (
     <div className={`flex flex-col space-y-1 ${className}`}>
          <label htmlFor={id} className="text-xs font-medium text-gray-700">
               {label}
               {required && <span className="text-red-500 ml-1">*</span>}
          </label>

          <input
               type={type}
               id={id}
               name={name}
               placeholder={placeholder}
               required={required}
               // Reduced vertical padding (py-1.5 instead of py-2)
               className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md shadow-sm 
     focus:ring-black focus:border-black transition duration-150 ease-in-out"
          />
     </div>
);

const TextareaField = ({ label, id, name, placeholder, required = true }) => (
     <div className="flex flex-col space-y-1">
          <label htmlFor={id} className="text-xs font-medium text-gray-700">
               {label}
               {required && <span className="text-red-500 ml-1">*</span>}
          </label>

          <textarea
               id={id}
               name={name}
               // Reduced rows for a smaller default height
               rows="3"
               placeholder={placeholder}
               required={required}
               // Reduced vertical padding (py-1.5 instead of py-2)
               className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md shadow-sm 
     focus:ring-black focus:border-black transition duration-150 ease-in-out resize-none"
          ></textarea>
     </div>
);

const AddProductForm = ({ onClose }) => {
     return (
          // Main container: min-height is 60vh, relative for absolute positioning of close button
          <div className="primary_bg min-h-[70vh] max-h-[90vh] w-full md:w-3/4 lg:w-1/3 p-4 md:p-6 rounded-xl relative shadow-2xl">

               {/* Floating Close Button */}
               <button
                    onClick={onClose}
                    type="button"
                    className="absolute top-3 right-3 p-1 rounded-full text-gray-500 hover:text-black transition-colors z-10"
                    aria-label="Close form"
               >
                    <X size={20} />
               </button>

               <h2 className="text-xl headings_on_red_bg font-bold mb-4 pt-2">Create Product</h2>

               {/* Form Container with max-height and scrolling */}
               <form
                    action={createInvoice}
                    // Set max height to slightly less than 60vh to account for header/footer padding and allow scrolling
                    className="w-full space-y-3 overflow-y-auto max-h-[calc(70vh-7rem)] md:max-h-[calc(70vh-8rem)] pr-2"
               >

                    {/* Product Title - Single Column */}
                    <InputField
                         id="title"
                         name="title"
                         label="Product Name"
                         placeholder="Product name"
                    />

                    {/* Description - Single Column */}
                    <TextareaField
                         id="description"
                         name="desc"
                         label="Description"
                         placeholder="Short description"
                    />

                    {/* Grouped Fields - Two-Column Layout for efficiency */}
                    <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                         {/* Price */}
                         <InputField
                              id="price"
                              name="price"
                              type="number"
                              label="Price"
                              placeholder="19.99"
                         />

                         {/* Stock */}
                         <InputField
                              id="stock"
                              name="stock"
                              type="number"
                              label="Stock Quantity"
                              placeholder="0"
                         />

                         {/* Category ID (Less important/optional, smaller text) */}
                         <InputField
                              id="categoryId"
                              name="categoryId"
                              label="Category ID"
                              placeholder="Category ObjectId"
                              required={false}
                              // Added className to make label/input slightly smaller for less importance
                              className="text-xs"
                         />

                         {/* Category */}
                         <InputField
                              id="category"
                              name="category"
                              label="Category"
                              placeholder="Category name"
                              required={true}
                         />
                    </div>

                    {/* Image URL - Single Column */}
                    <InputField
                         id="imageUrl"
                         name="imageUrl"
                         label="Image URL"
                         placeholder="Paste image URL"
                    />

                    {/* Is Deleted - Minimized space */}
                    <div className="flex items-center gap-2 pt-1">
                         <input type="checkbox" id="isDeleted" name="isDeleted" className="w-4 h-4" />
                         <label htmlFor="isDeleted" className="text-sm font-medium text-gray-700">
                              Is Deleted
                         </label>
                    </div>

                    {/* Hidden Auto Fields - Kept at the end of form */}
                    <input type="hidden" name="createdAt" value={new Date().toISOString()} />
                    <input type="hidden" name="updatedAt" value={new Date().toISOString()} />

                    {/* Buttons - Placed outside the scrolling area (visually at the bottom) */}
                    {/* NOTE: Placing buttons here is good for UX, but technically they are inside the form tag. 
                       If the form content is scrolled, these buttons will scroll with it. 
                       For a fixed footer, the form would need restructuring, but to adhere to fitting in 60vh, 
                       we keep them here for now, minimizing the space above them.
                    */}
                    <div className="flex justify-end gap-3 pt-3 border-t mt-3 border-gray-200 sticky bottom-0 primary_bg">
                         <button
                              onClick={onClose}
                              type="button"
                              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-1.5 text-sm rounded-md transition-colors"
                         >
                              Cancel
                         </button>

                         <button type="submit" className="px-3 py-1.5 text-sm bg-black text-white rounded-md hover:bg-gray-800 transition-colors">
                              Save Product
                         </button>
                    </div>
               </form>
          </div>
     );
};

export default AddProductForm;