
import React from 'react'

const MetricCard = ({ title, value, icon: Icon, statusColor }) => {

     return (
          <div className="primary_bg p-6 rounded-xl shadow-lg transition-shadow hover:shadow-xl">
               < div className="flex justify-between items-start" >
                    <p className="text-sm font-medium text-gray-500" > {title}</p >
                    <div className={`p-2 rounded-full ${statusColor}`}>
                         <Icon className="w-5 h-5" />
                    </div>
               </div >

               <div className="mt-4" >
                    <p className="text-3xl font-extrabold text-gray-900" > {value}</p >
                    {/* {change && (
                      <p   className={`text-sm font-semibold mt-1 ${statusColor}`}>
                           {change} <span   className="text-gray-500 font-normal">vs last period</span>
                      </p>
                 )} */}
               </div >
          </div >
     )
}

export default MetricCard
