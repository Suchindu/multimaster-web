import { useState } from 'react'
import { Dialog, RadioGroup } from '@headlessui/react'
import { Bars3Icon, XMarkIcon as XMarkIconOutline } from '@heroicons/react/24/outline'
import { CheckIcon, XMarkIcon as XMarkIconMini } from '@heroicons/react/20/solid'


export default function Example(features) {
  

  return (
    <div className="bg-white">
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Feature
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">
                      Product 1
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product 2
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {/* Map over your features array here */}
                  
                    <tr >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {/* {feature.name} */}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {/* {feature.product1} */}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {/* {feature.product2} */}
                      </td>
                    </tr>
                 
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
