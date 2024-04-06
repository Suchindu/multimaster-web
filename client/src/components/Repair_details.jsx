import React from 'react';
//import { BsFillPencilFill, BsFillTrashFill } from 'react-icons/bs';

function Repair_details() {
    // Your code here

    return (
        // JSX code for the component
        <>
        <div>
            <h1 className='text-center font-bold text-2xl'>Repair Requets</h1>
        </div>
        <div>
            <div className="flex justify-center mt-4">
                <input
                    type="text"
                    placeholder="Search"
                    onChange={handleFilter}
                    className="px-4 w-9/12 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="ml-2 justify-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    Search
                </button>
                </div>
            </div>
        <div className='mt-7 flex justify-center '>
          
        </div>
        </>
        
    );
}

export default Repair_details;