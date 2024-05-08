import React from 'react';
import { useState, useEffect, useContext } from 'react';
import CompareProduct from './CompareProduct';
import axios from 'axios';
import { useCompare } from '../../context/CompareContext';

const ParentComponent = () => {

  const { compareList } = useCompare();
  const { clearCompare } = useCompare();

  return (
    <div className="m-10 p-7 border-2 border-gray-300 rounded-lg shadow-lg relative">
    <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold mb-10">Product Comparison</h1>
        <button className="bg-color4 shadow-lg text-white px-6 py-2 rounded-md ml-2 hover:bg-indigo-500 focus:outline-none mt-2 sm:mt-0 w-full sm:w-auto " onClick={clearCompare}>Clear Comparison</button>
      </div>
    <div className="m-4 flex flex-col sm:flex-row">
      <div className="w-full md:w-1/4 mt-56 bg-white rounded-lg p-2 md:block hidden">
        <table className="table-auto w-full">
          <tbody className="text-center">
            <tr className="border-b-2 border-gray-200"><td className="py-4"></td></tr>
            <tr className="border-b-2 border-gray-200"><td className="py-4 font-bold">Title</td></tr>
            <tr className="border-b-2 border-gray-200"><td className="py-4 font-bold">Brand</td></tr>
            <tr className="border-b-2 border-gray-200"><td className="py-4 font-bold">Price</td></tr>
            <tr className="border-b-2 border-gray-200"><td className="py-16 font-bold">Description</td></tr>
          </tbody>
        </table>
      </div>
      <div className="w-full md:w-3/4 flex flex-col md:flex-row justify-between pl-4">
        {compareList.length > 0 && <CompareProduct id={compareList[0]}  />}
        <div className="hidden md:block border-l-2 border-gray-200"></div>
        {compareList.length > 1 && <CompareProduct id={compareList[1]}  />}
      </div>
    </div>
  </div>

  );
};

export default ParentComponent;