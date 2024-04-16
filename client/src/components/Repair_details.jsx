import React from 'react';
//import { BsFillPencilFill, BsFillTrashFill } from 'react-icons/bs';
import { useRepairContext } from '../hooks/useRepairContext';

const Repair_details = ({repair}) => {

    const {dispatch} = useRepairContext();

    const handleClick = async () => {
        const response = await fetch(`http://localhost:4000/api/repair/` + repair._id, {
            method: 'DELETE',
        })
        
        const json = await response.json();

        if(response.ok){
            dispatch({type: 'DELETE_REPAIR', payload: repair._id});
        }
    }

    //edit repair request
    const handleEdit = async () => {
        const response = await fetch(`http://localhost:4000/api/repair/` + repair._id, {
            method: 'PATCH',
        })

        const json = await response.json();

        if(response.ok){
            dispatch({type: 'UPDATE_REPAIR', payload: repair});
        }
    }

    // console.log(repair);
    return (
        // JSX code for the component
          <>
                        {repair ?(
                        <tr className='hover:bg-blue-100 focus:bg-blue-300 font-semibold text-left'>
                            <td className='border border-gray-500'>{repair._id}</td>
                            <td className='border border-gray-500 pr-4'>{repair.name}</td>
                            <td className='border border-gray-500 pr-4'>{repair.email}</td>
                            <td className='border border-gray-500 pr-7'>{repair.contact}</td>
                            <td className='border border-gray-500 pr-12'>{new Date(repair.date).getFullYear()}-{('0' + (new Date(repair.date).getMonth() + 1)).slice(-2)}-{('0' + new Date(repair.date).getDate()).slice(-2)}</td>  
                            <td className='border border-gray-500'>{repair.device_brand}</td>
                            <td className='border border-gray-500'>{repair.device_model}</td>
                            <td className='border border-gray-500'>{repair.problem}</td>
                            <td className='border border-gray-500'>{repair.description}</td>
                            <td className='flex justify-center items-center'>
                                <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 mr-2" onClick={handleEdit}>
                                    Edit
                                </button>
                                <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500" onClick={handleClick}>
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