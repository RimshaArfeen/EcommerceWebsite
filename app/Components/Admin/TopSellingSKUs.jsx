
import React from 'react'
import { TrendingUp} from 'lucide-react';
import { useAdmin } from '@/app/context/AdminContext';


const TopSellingSKUs = () => {
     const { topSKUs } = useAdmin();
     // console.log("Top SKUs:", topSKUs);

  return (
       <div className="p-6 rounded-xl shadow-lg border border-gray-100">
            <div className="flex justify-between items-center mb-6 border-b pb-3">
                 <h3 className="text-xl font-bold text-gray-900 flex items-center">
                      <TrendingUp className="w-6 h-6 mr-2 text-green-600" />
                      Top-Selling SKUs
                 </h3>
                 <a href="#" className="text-sm font-semibold text-black hover:text-gray-700 transition-colors cursor-not-allowed">
                      Report
                 </a>
            </div>

            <table className="min-w-full divide-y divide-gray-200">
                 <thead>
                      <tr className="text-left text-xs font-medium text-[#FFB300] uppercase tracking-wider">
                           <th className="py-2">Rank</th>
                           <th className="py-2">Product Name</th>
                           <th className="py-2 text-right">Revenue (30d)</th>
                      </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-100  p-3">
                      {topSKUs.map((sku) => (
                           <tr key={sku.rank} className="hover:bg-red-950/20 transition-colors duration-200 hover:p-2 rounded-lg">
                                <td className="py-3 font-semibold dark:text-gray-300">{sku.rank}</td>
                                <td className="py-3 text-sm dark:text-gray-500">{sku.name}</td>
                                <td className="py-3 text-sm font-bold dark:text-gray-300 text-right">{sku.revenue}</td>
                           </tr>
                      ))}
                 </tbody>
            </table>
       </div>
  )
}

export default TopSellingSKUs
