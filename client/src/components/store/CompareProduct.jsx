import React from 'react';

const CompareProduct = () => {
    return (
        <div className="m-4  border-gray-300 bg-white rounded-lg p-2">
        <div className="mb-4 flex justify-center items-center">
            <input 
            type="text" 
            placeholder="Search..." 
            className="border-2 border-gray-300 bg-white h-9 px-5 pr-16 rounded-lg text-sm focus:outline-none"
            />
            <button className="block  bg-color4  py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 px-4 rounded-md ml-4">
            Add Product
            </button>
        </div>
        <table className="table-auto w-full">
            <tbody className="text-center">
            <tr className="border-b-2 border-gray-200"><td className="py-4">Row 1</td></tr>
            <tr className="border-b-2 border-gray-200"><td className="py-4">Row 2</td></tr>
            <tr className="border-b-2 border-gray-200"><td className="py-4">Row 3</td></tr>
            <tr className="border-b-2 border-gray-200"><td className="py-4">Row 4</td></tr>
            <tr className="border-b-2 border-gray-200"><td className="py-4">Row 5</td></tr>
            </tbody>
        </table>
        </div>
    );
    };

export default CompareProduct;