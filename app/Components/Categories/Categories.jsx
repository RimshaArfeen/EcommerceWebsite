
import React from 'react'
import "../../globals.css"
import { categoriesData } from './CategoriesData'



/**
 * Senior Next.js Developer / UI/UX Design: Spicy Food E-commerce Category Section
 * This component provides a clean, responsive grid layout for product categories.
 * It uses simple, accessible, default Tailwind colors and includes an interactive
 * card hover effect for improved user experience.
 */
const Categories = () => {
  // Simple handleClick for demonstration
  const handleClick = (title) => {
    console.log(`Navigating to category: ${title}`);
    // In a real Next.js Categories, this would be router.push('/categories/' + slug)
  };

  return (
    <section className="py-24 font-sans ">
      <div className="max-w-7xl mx-auto">
        
      

        {/* Categories Grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 lg:grid-cols-4 xl:grid-cols-6 xl:gap-8">
          {categoriesData.map((category, index) => (
            <div
              key={index}
              onClick={() => handleClick(category.title)}
              className="group cursor-pointer rounded-l overflow-hidden e shadow-lg border border-gray-100 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-gray-300"
            >
              {/* Image Container */}
              <div className="relative aspect-w-4 aspect-h-3 h-40 overflow-hidden">
                {/* Using a placeholder image. When you integrate this, replace the 
                  `src` with your actual category image URL.
                */}
                <img
                  src={category.image}
                  alt={category.title}
                  className="object-cover w-full h-full transition duration-500 group-hover:scale-[1.05] group-hover:opacity-90"
                  // Fallback placeholder image URL
                  onError={(e) => {
                    e.target.onerror = null; 
                    e.target.src = `https://placehold.co/600x400/e2e8f0/334155?text=${category.title}`;
                  }}
                  loading="lazy"
                />
              </div>

              {/* Title and Description */}
              <div className="p-3 sm:p-4 text-center">
                <h3 className="text-lg font-bold tracking-tight leading-snug truncate">
                  {category.title}
                </h3>
                {/* Hiding the description on small screens to keep mobile UI clean */}
                <p className="text-sm mt-1 hidden sm:block">
                  {category.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;