
import React from 'react'
import { ProdCard } from '../Components/ProdCard/ProdCard';
import { mockProducts } from '../foodItems';

const page = () => {

    

     return (
          <section className="py-12 md:py-20 px-6 lg:px-20  font-sans min-h-screen">
               <div className="max-w-7xl mx-auto">

                    {/* Section Header */}
                    <div className="text-center mb-10 md:mb-14">
                         <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-500">
                              Our Full Collection
                         </h2>
                         <p className="mt-2 text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
                              All Items
                         </p>
                    </div>

                    {/* Products Grid */}
                    <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 md:gap-8">
                         {mockProducts.map((product) => (
                              <ProdCard key={product.id} product={product} />
                         ))}
                    </div>
               </div>
          </section>
     );
}

export default page
