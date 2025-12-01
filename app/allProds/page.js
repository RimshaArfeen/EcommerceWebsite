
"use client"
import React from 'react'
import { ProdCard } from '../Components/ProdCard/ProdCard'
import { useProducts } from '@/app/context/ProdContext';
const page = () => {
  const products = useProducts();
  return (
     <section className="py-12 md:py-24 px-6 lg:px-20 min-h-screen">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10 md:mb-14">
              <h2 className="text-4xl lg:text-5xl font-extrabold uppercase tracking-tight text-gray-500">
                Our Full Collection
              </h2>
              
            </div>
    
            {!products?.length && <p>No products found.</p>}
    
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProdCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
  )
}

export default page
