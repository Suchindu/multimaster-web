import React from 'react';
//import { BsFillPencilFill, BsFillTrashFill } from 'react-icons/bs';

const Repair_details = ({repair}) => {
    // console.log(repair);
    return (
        // JSX code for the component
        <>
                        {repair ?(
                        <tr>
                            <td className='border border-gray-500'>{repair.name}</td>
                            <td className='border border-gray-500'>{repair.email}</td>
                            <td className='border border-gray-500'>{repair.contact}</td>
                            <td className='border border-gray-500'>{repair.date}</td>
                            <td className='border border-gray-500'>{repair.device_brand}</td>
                            <td className='border border-gray-500'>{repair.device_model}</td>
                            <td className='border border-gray-500'>{repair.problem}</td>
                            <td className='border border-gray-500'>{repair.description}</td>
                            <td className='border border-gray-500 flex justify-center items-center'>
                                <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 mr-2">
                                    Edit
                                </button>
                                <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500">
                                    Delete
                                </button>
                            </td>
                        </tr>
                        ) : (
                            <tr>
                                <td colSpan={9}>No repair requests</td>
                            </tr>
                        )}
        </>
        
    );
}

export default Repair_details;