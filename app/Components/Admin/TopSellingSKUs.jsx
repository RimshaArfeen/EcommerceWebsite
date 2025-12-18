
import React from 'react'
import { TrendingUp } from 'lucide-react';
import { useAdmin } from '@/app/context/AdminContext';


const TopSellingProducts = () => {
     const { topSelling } = useAdmin();
     console.log("Top SKUs:", topSelling);

     return (
          <div className="p-6 rounded-xl shadow-lg border border-gray-100">
               < div className="flex justify-between items-center mb-6 border-b pb-3" >
                    <h3 className="text-xl font-bold text-gray-900 flex items-center" >
                         <TrendingUp className="w-6 h-6 mr-2 text-green-600" />
                         Top - Selling Products
                    </h3 >
                   
               </div >

               <table className="min-w-full divide-y divide-gray-200" >
                    <thead>
                         <tr className="text-left text-xs font-medium text-[#FFB300] uppercase tracking-wider">
                              <th className="py-2">Rank</th>
                              <th className="py-2" > Product Name</th >
                              <th className="py-2 text-right" > Revenue(30d)</th >
                         </tr >
                    </thead >
                    <tbody className="divide-y divide-red-900/50  p-3 space-y-3.5" >
                         {topSelling.map((sku, index) => (
                              <tr key={sku.productId}>
                                   <td>{index + 1}</td>

                                   <td>
                                        {sku.product?.title ?? "Product deleted"}
                                   </td>

                                   <td className="text-right">
                                        Rs. {sku.revenue.toLocaleString()}
                                   </td>
                              </tr>
                         ))}

                    </tbody >
               </table >
          </div >
     )
}

export default TopSellingProducts
