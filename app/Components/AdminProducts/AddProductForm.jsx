import React from 'react';
import { UploadCloud, X, Save } from 'lucide-react';
import "../../globals.css";

const InputField = ({ label, id, type = 'text', placeholder, required = true }) => (
     <div className="flex flex-col space-y-1">
          <label htmlFor={id} className="text-sm font-medium text-gray-700">
               {label}
               {required && <span className="text-red-500 ml-1">*</span>}
          </label>

          <input
               type={type}
               id={id}
               name={id}
               placeholder={placeholder}
               required={required}
               className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-black focus:border-black transition duration-150 ease-in-out"
          />
     </div>
);

const TextareaField = ({ label, id, placeholder, required = true }) => (
     <div className="flex flex-col space-y-1">
          <label htmlFor={id} className="text-sm font-medium text-gray-700">
               {label}
               {required && <span className="text-red-500 ml-1">*</span>}
          </label>

          <textarea
               id={id}
               name={id}
               rows="4"
               placeholder={placeholder}
               required={required}
               className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-black focus:border-black transition duration-150 ease-in-out resize-none"
          ></textarea>
     </div>
);

const AddProductForm = ({onClose}) => {
     return (
          <div className="primary_bg min-h-[60vh] w-full md:w-3/4 lg:w-1/3 p-5 md:p-10 flex justify-center items-center rounded-xl">
               <form className="w-full space-y-4">
                    <h2 className="text-2xl headings_on_red_bg font-bold mb-4">Create Product</h2>

                    <InputField
                         label="Product Name"
                         id="name"
                         placeholder="Product name"
                    />

                    <TextareaField
                         label="Description"
                         id="desc"
                         placeholder="Short description"
                    />

                    <InputField
                         label="Price"
                         id="price"
                         type="number"
                         placeholder="19.99"
                    />

                    <InputField
                         label="Image URL"
                         id="imgUrl"
                         placeholder="Paste image URL"
                    />

                    <div className="flex justify-end gap-3 pt-2">
                         <button
                         onClick={onClose}
                              type="button"
                              className="bg-red-700 hover:bg-red-800 px-4 py-2 border rounded-lg"
                         >
                              Cancel
                         </button>

                         <button
                              type="submit"
                              className="px-4 py-2 bg-black text-white rounded-lg"
                         >
                              Save
                         </button>
                    </div>
               </form>
          </div>
     );
};

export default AddProductForm;
