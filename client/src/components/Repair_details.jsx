import React from 'react';
import { useState } from 'react';
//import { BsFillPencilFill, BsFillTrashFill } from 'react-icons/bs';
import { useRepairContext } from '../hooks/useRepairContext';

const Repair_details = ({repair}) => {

    const [isUpdating, setIsUpdating] = useState(false);
    const [updatedRepair, setUpdatedRepair] = useState({ ...repair });
    const {dispatch} = useRepairContext();


    //delete repair request
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
    const handleUpdate = async () => {
        try{
        const response = await fetch("http://localhost:4000/api/repair/" + repair._id, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(updatedRepair)
        });
    
        if (response.ok) {
          dispatch({ type: 'UPDATE_Repair', payload: updatedRepair });
          setIsUpdating(false);
        } else {
          alert("Repair Can't be updated !");
        }
    } catch (error) {
        console.error(error);
    }
    }
    const handleChange = (event) => {
        const { name, value } = event.target;
        setUpdatedRepair(prevState => ({
          ...prevState,
          [name]: value
        }));
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
                                <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 mr-2" onClick={() => setIsUpdating(true)}>
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
                        {isUpdating && (
                            <tr>
                            <td colSpan={9}>
                                <div className="my-5 border-b-2 border-gray-400"></div>
                                <form className="w-full max-w-lg mx-auto border-2 border-gray-400 pl-5 pb-7 mt-5 bg-indigo-500 rounded-md" onSubmit={handleUpdate}>
                                    <div>
                                        <label className='mb-1' htmlFor="name">Name:</label>
                                        <input type="text" id="name" name="name" value={updatedRepair.name} onChange={handleChange} />
                                    </div>
                                    <div>
                                        <label className='mb-1' htmlFor="email">Email:</label>
                                        <input type="email" id="email" name="email" value={updatedRepair.email} onChange={handleChange} />
                                    </div>
                                    <div>
                                        <label className='mb-1'>Date:</label>
                                        <input type="date" id="date" name="date" value={updatedRepair.date} onChange={handleChange} />
                                    </div>
                                    <div>
                                        <label className='mb-1' htmlFor="contact">Contact:</label>
                                        <input type="tel" id="contact" name="contact" value={updatedRepair.contact} onChange={handleChange} />
                                    </div>
                                    <div>
                                        <label className='mb-1' htmlFor="device_brand">Device Brand:</label>
                                        <input type="text" id="device_brand" name="device_brand" value={updatedRepair.device_brand} onChange={handleChange} />
                                    </div>
                                    <div>
                                        <label className='mb-1' htmlFor="device_model">Device Model:</label>
                                        <input type="text" id="device_model" name="device_model" value={updatedRepair.device_model} onChange={handleChange} />
                                    </div>
                                    <div>
                                        <label className='mb-1' htmlFor="device_model">Problem:</label>
                                        <input type="text" id="problem" name="problem" value={updatedRepair.problem} onChange={handleChange} />
                                    </div>
                                    <div>
                                        <label className='mb-1'>Description:</label>
                                        <input type="text" id="description" name="description" value={updatedRepair.description} onChange={handleChange} />
                                    </div>
                                    <div>
                                        <label className='mb-1'>Status:</label>
                                        <input type="text" id="status" name="status" value={updatedRepair.status} onChange={handleChange} />
                                    </div>
                                    
                                    <button
                                        type="submit"
                                        className="mt-4 px-4 py-2 font-semibold bg-blue-800 text-white rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:bg-blue-800 focus:ring-opacity-50 transform motion-safe:hover:scale-110"
                                    >
                                       Update
                                    </button>
                                </form>
                            </td>
                        </tr>
                        )}
                    </>
                            
                                                                     // Add closing parenthesis here
                    );}                                                             
                                               
                    
                    
 export default Repair_details;
