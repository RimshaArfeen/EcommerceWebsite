
import React from 'react'
import {AlertTriangle} from 'lucide-react';
const LowStockAlerts = () => {
     const mockLowStock = [
          { sku: 'SAUCE-INF-L', name: 'Inferno Sauce (Large)', stock: 5 },
          { sku: 'RUB-CHIP-S', name: 'Smoky Chipotle Rub (Small)', stock: 12 },
          { sku: 'PEP-REAP', name: 'Carolina Reaper Flakes', stock: 1 },
     ];

  return (
       <div className=" p-6 rounded-xl shadow-lg border border-gray-100 h-full">
            <div className="flex justify-between items-center mb-6 border-b pb-3">
                 <h3 className="text-xl font-bold text-gray-900 flex items-center">
                      <AlertTriangle className="w-6 h-6 mr-2 text-red-600" />
                      Low-Stock Alerts
                 </h3>
                 <a href="#" className="text-sm font-semibold text-black hover:text-gray-700 transition-colors cursor-not-allowed">
                      View All
                 </a>
            </div>

            <ul className="divide-y divide-gray-100">
                 {mockLowStock.map((item, index) => (
                      <li key={index} className="py-3 flex justify-between items-center hover:bg-red-950/20 px-2 rounded-lg transition-colors">
                           <div>
                                <p className="text-sm font-medium text-gray-900">{item.name}</p>
                                <p className="text-xs text-gray-500 font-mono">{item.sku}</p>
                           </div>
                           <span className={`text-sm font-bold p-1 rounded ${item.stock <= 5 ? 'text-red-600' : 'text-yellow-600'}`}>
                                {item.stock} in Stock
                           </span>
                      </li>
                 ))}
            </ul>

            {mockLowStock.length === 0 && (
                 <p className="text-gray-500 text-sm italic text-center py-6">No low stock items currently.</p>
            )}
       </div>
  )
}

export default LowStockAlerts
