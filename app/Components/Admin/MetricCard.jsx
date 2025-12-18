
import React from 'react'

// const MetricCard = ({ title, value}) => {

//      return (
//           <div className="primary_bg p-6 rounded-xl shadow-lg transition-shadow hover:shadow-xl">
//                < div className="flex justify-between items-start" >
//                     <p className="text-sm font-medium text-gray-500" > {title}</p >
//                     {/* <div className={`p-2 rounded-full ${statusColor}`}>
//                          <Icon className="w-5 h-5" />
//                     </div> */}
//                </div >

//                <div className="mt-4" >
//                     <p className="text-3xl font-extrabold text-gray-900" > {value}</p >
//                     {/* {change && (
//                       <p   className={`text-sm font-semibold mt-1 ${statusColor}`}>
//                            {change} <span   className="text-gray-500 font-normal">vs last period</span>
//                       </p>
//                  )} */}
//                </div >
//           </div >
//      )
// }

// 


// MetricCard.jsx - Required Component Modification

const MetricCard = ({ title, value, icon: Icon, color, bgColor }) => {
     return (
          // UI/UX: Added hover effects for interaction feedback and on-brand colors
          <div
               className={`
        p-6 rounded-xl 
        shadow-lg dark:shadow-2xl 
        primary_bg dark:bg-gray-800 
        border-b-4 border-red-600/50 
        transition duration-300 
        hover:shadow-red-500/30 hover:-translate-y-1 
        cursor-pointer
      `}
          >
               <div className="flex items-start justify-between">
                    {/* The icon utilizes the dynamic color and background color */}
                    <div className={`p-3 rounded-full ${bgColor} ${color}`}>
                         {Icon && <Icon className="w-6 h-6" />}
                    </div>

                    {/* Title */}
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                         {title}
                    </p>
               </div>

               <div className="mt-4">
                    {/* Value - Bold and high contrast */}
                    <p className="text-3xl font-extrabold text-gray-900 dark:text-white">
                         {value}
                    </p>
                    {/* Optional: Add a subtle status change indicator/text here if needed */}
               </div>
          </div>
     );
};
export default MetricCard