
"use client"
import React, { useState } from 'react';
import { Heart, ShoppingBag } from 'lucide-react'; // Using lucide-react for icons
import { dealData } from './dealsData';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const DealCard = ({ id, imgUrl, title, subtitle, tag, price }) => {
     const [isFavorite, setIsFavorite] = useState(false);
     // const { addToCart } = useCart();
     // const { addToWishlist, likedItems } = useWishlist()

     // // const handleAddToCart = () => {
     // //      addToCart(
     // //           {
     // //                _id: id,          // 👈 IMPORTANT
     // //                title,
     // //                subtitle,
     // //                price,
     // //                imgUrl,
     // //                tag
     // //           },
     // //           1
     // //      );
     // // };

     // // DealCard.jsx
     // const handleAddToCart = () => {
     //      addToCart({
     //           _id: id,        // deal ID
     //           bestDealId: id, // important for order storage
     //           type: "bestDeal",
     //           title,
     //           subtitle,
     //           price,
     //           imgUrl,
     //           tag,
     //      }, 1);
     // };

     // const handle_wishlist = (params) => {
     //      addToWishlist({
     //           _id: id,          // 👈 IMPORTANT
     //           title,
     //           subtitle,
     //           price,
     //           imgUrl,
     //           tag
     //      }, 1)
     //      setIsFavorite(!isFavorite);
     // }


     return (
          <div className=" mx-4 relative flex rounded-xl shadow-lg border p-4 h-fit">
               <div className=" w-1/2 mr-6">
                    <img src={imgUrl} alt={title} className="h-48 object-cover w-full   transition-all duration-500 group-hover:scale-[1.05] group-hover:opacity-90" />
                    {tag && (
                         <span className="absolute top-6 left-6 bg-red-600 px-3 py-1 text-xs rounded-full">
                              {tag}
                         </span>
                    )}
               </div>

               <div className="flex flex-col justify-center w-1/2">
                    <h3 className="text-xl font-bold ">{title}</h3>
                    <p className="text-gray-600">{subtitle}</p>

                    <span className="text-2xl font-bold text-red-600">
                         Rs. {price}
                    </span>

                    <div className="flex justify-between mt-4">
                         <button
                              className="w-full flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-red-600 rounded-lg shadow-md
      transition-all duration-300 hover:bg-red-700 active:scale-98 focus:outline-none focus:ring-4 focus:ring-red-300 hover:cursor-pointer"
                         >
                              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                   <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                                   <line x1="3" y1="6" x2="21" y2="6" />
                                   <path d="M16 10a4 4 0 0 1-8 0" />
                              </svg>
                              Add to Cart
                         </button>
                         <button
                              className={`absolute top-3 right-3 p-2 rounded-full transition-colors duration-300 hover:cursor-pointer z-10 ${isFavorite
                                   ? "bg-red-500 text-white" // <-- **Turns RED when true**
                                   : "bg-white text-gray-400 hover:text-red-500 shadow-lg"
                                   }`}
                              aria-label="Add to wishlist"
                         >
                              {/* Heart icon SVG */}
                              <svg
                                   xmlns="http://www.w3.org/2000/svg"
                                   className="w-5 h-5"
                                   viewBox="0 0 24 24"
                                   fill={isFavorite ? "currentColor" : "none"} // <-- **Fills the heart when true**
                                   stroke="currentColor"
                                   strokeWidth="2"
                                   strokeLinecap="round"
                                   strokeLinejoin="round"
                              >
                                   <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                              </svg>
                         </button>
                    </div>
               </div>
          </div>
     );
};


const BestDeals = () => {


     const settings = {
          dots: true,
          infinite: true,
          slidesToScroll: 1,
          autoplay: true,
          speed: 1000,
          autoplaySpeed: 2500,
          cssEase: "linear",
          slidesToShow: 2, // default for large screens
          responsive: [
               {
                    breakpoint: 1024, // <= large screens (tablet)
                    settings: {
                         slidesToShow: 1, // 1 slide for medium/small screens
                    },
               },
               {
                    breakpoint: 640, // <= small screens (mobile)
                    settings: {
                         slidesToShow: 1, // still 1 slide
                    },
               },
          ],
     };

     return (
          <section className="py-24 font-sans">
               < div className="max-w-7xl mx-auto " >


                    <div className="text-center mb-8 md:mb-12" >
                         <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-500" >
                              Don't Miss Out!
                         </h2 >
                         <p className="mt-2 text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight" >
                              Today's Best Deals
                         </p >
                    </div >


                    {/* Single Deal Card */}
                    < div className="slider-container" >
                         <Slider {...settings}>
                              {dealData.map((deal) => (
                                   <DealCard
                                        key={deal.id}
                                        id={deal.id}
                                        imgUrl={deal.imgUrl}
                                        title={deal.title}
                                        subtitle={deal.subtitle}
                                        price={deal.price}
                                        tag={deal.tag} />

                              ))}

                         </Slider>
                    </div >
               </div >
          </section >
     );
};

export default BestDeals;