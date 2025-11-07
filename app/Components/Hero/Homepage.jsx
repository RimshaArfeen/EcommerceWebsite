"use client"
import React from 'react';
import SliderComponent from './SliderComponent';
import Categories from '../Categories/Categories';
import BestDeals from '../BestDeals/BestDeals';
const Homepage = () => {
    
     return (
          // Full viewport height container with the background image


          <div id="default-carousel" className="relative w-full" data-carousel="slide">
             <SliderComponent />
              <Categories />
              <BestDeals />
          </div>

     );
};

export default Homepage;