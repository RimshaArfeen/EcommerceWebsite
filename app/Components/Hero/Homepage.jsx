// "use client"
import React from 'react';
import SliderComponent from './SliderComponent';
import Categories from '../Categories/Categories';
import BestDeals from '../BestDeals/BestDeals';
import { ProdCard } from '../ProdCard/ProdCard';
import { mockProducts } from '@/app/foodItems';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';


const Homepage = () => {

     return (
          // Full viewport height container with the background image


          <div id="default-carousel" className="relative w-full " data-carousel="slide">
               <SliderComponent />
               <Categories />
               <BestDeals />
               {/* Products */}
               <div className="pt-16 pb-24">
                    {/* Heading and View All Link */}
                    <div className="flex justify-between items-end border-b pb-4 mb-8">
                         <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                              Featured Heat
                         </h2>
                         <div className="">
                              {/* Button/Link styled to look like a link */}
                              <Link
                                   href="/allProds"
                                   className="text-lg font-semibold text-black hover:text-gray-700 transition-colors hover:cursor-pointer flex items-center">
                                   View all products <ChevronRight className="w-4 h-4 ml-1" />
                              </Link>
                         </div>
                    </div>

                    {/* Products Grid (User provided JSX structure) */}
                    {/* Note: The user provided a large vertical padding, which is kept here */}
                    <div className="py-24 grid w-[95%] mx-auto sm:w-full sm:grid-cols-2 gap-6 md:grid-cols-3  xl:grid-cols-4 md:gap-8">
                         {mockProducts.slice(0, 8).map((product, idx) => (
                              <ProdCard key={idx} product={product} />
                         ))}
                    </div>
               </div>
               </div>
     );
};

               export default Homepage;