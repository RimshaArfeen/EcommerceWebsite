
"use client"
import React, { useState } from 'react';
import { Heart, ShoppingBag } from 'lucide-react'; // Using lucide-react for icons
import { dealData } from './dealsData';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
/**
 * Senior Next.js Developer / UI/UX Design: Best Deals Section (Card View)
 * This component displays a "Best Deal" in a card-like format, matching the provided image.
 * It features an image with a promotional tag, deal title, price, add-to-cart button,
 * and a favorite icon. Designed for simple, default color integration.
 */

const DealCard = ({ idx, image, title, subtitle, tag, price }) => {
     const [favorite, isFavorite] = useState(false)

     const handleAddToCart = (dealId) => {
          console.log(`Added deal ${dealId} to cart!`);
          // Implement your cart logic here (e.g., dispatching an action to a Redux store or updating context)
     };

     const handleToggleFavorite = (dealId) => {
          console.log(`Toggled favorite for deal ${dealId}`);
          // Implement favorite toggle logic here (e.g., updating user preferences)
     };
     return (
          <div
               key={idx}
               className="relative flex  flex-row items-center  rounded-xl shadow-lg  border overflow-hidden p-4 md:p-6 w-[97%] max-w-2xl mx-auto h-64">

               {/* Left Section: Image with Tag */}
               <div className="relative w-full md:w-1/2 mb-4 md:mb-0 md:mr-6">
                    <img
                         src={image}
                         alt={title}
                         className="w-full h-48  object-cover rounded-lg"
                         onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/300x300/e2e8f0/334155?text=Image"; }}
                         loading="lazy"
                    />
                    {tag && (
                         <span className="absolute bottom-3 left-3 px-3 py-1 bg-red-600 text-xs font-semibold rounded-full shadow-md">
                              {tag}
                         </span>
                    )}
               </div>

               {/* Right Section: Details and Actions */}
               <div className="flex-grow flex flex-col items-start justify-center w-full md:w-1/2">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 leading-snug mb-1">
                         {title}
                    </h3>
                    <p className="text-base text-gray-600 mb-4">
                         {subtitle}
                    </p>

                    <span className="text-2xl font-extrabold text-red-600 mb-4">
                         {price}
                    </span>

                    {/* Action Buttons */}
                    <div className="flex items-center w-full justify-between">
                         <button
                              onClick={() => handleAddToCart(id)}
                              className="flex items-center justify-center px-6 py-3 bg-red-600 text-white font-semibold rounded-full shadow-md
                           hover:bg-red-700 transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-red-300 active:scale-95"
                              aria-label={`Add ${title} to cart`}
                         >
                              <ShoppingBag className="w-5 h-5 mr-2" />
                              Add To Cart
                         </button>

                         <button
                              onClick={() => handleToggleFavorite(id)}
                              className="p-3 text-gray-400 rounded-full hover:  hover:text-red-500 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gray-300"
                              aria-label="Add to favorites"
                         >
                              <Heart className="w-6 h-6" fill={isFavorite ? "currentColor" : "none"} />
                         </button>
                    </div>
               </div>
          </div>
     )
}

const BestDeals = () => {
const settings = {
  dots: true,
  infinite: true,
  slidesToShow: 2,
  slidesToScroll: 1,
//   autoplay: true,
  speed: 1000,
  autoplaySpeed: 2500,
  cssEase: "linear",
  responsive: [
    {
      breakpoint: 1040 , // medium screens (≤ 1024px)
      settings: {
        slidesToShow: 1,
      },
    },
    {
      breakpoint: 1039, // small screens (≤ 640px)
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};


     return (
          <section className="pb-8 font-sans">
               <div className="max-w-7xl mx-auto ">

                   
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-500">
            Don't Miss Out!
          </h2>
          <p className="mt-2 text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Today's Best Deals
          </p>
        </div>
       

                    {/* Single Deal Card */}
                    <div className="slider-container">
                         <Slider {...settings}>
                              {dealData.map((deal, idx) => (
                                   <DealCard
                                        key={idx}
                                        image={deal.image}
                                        title={deal.title}
                                        subtitle={deal.subtitle}
                                        price={deal.price}
                                        tag={deal.tag} />

                              ))}

                         </Slider>
                    </div>
               </div>
          </section>
     );
};

export default BestDeals;