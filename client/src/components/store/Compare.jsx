import React from 'react';
import { useState, useEffect, useContext } from 'react';
import CompareProduct from './CompareProduct';
import axios from 'axios';
import { useCompare } from '../../context/CompareContext';

const ParentComponent = () => {

  const { compareList } = useCompare();
  const { clearCompare } = useCompare();

  return (
    <div className="m-4 p-4 border-2 border-gray-300 rounded-lg relative">
    <h1 className="text-center text-2xl font-bold mb-4">Product Comparison</h1>
    <div className="m-4 flex flex-col sm:flex-row">
      <div className="w-full md:w-1/4 mt-20 bg-white rounded-lg p-2 md:block hidden">
        <table className="table-auto w-full">
          <tbody className="text-center">
            <tr className="border-b-2 border-gray-200"><td className="py-4"></td></tr>
            <tr className="border-b-2 border-gray-200"><td className="py-4">Title</td></tr>
            <tr className="border-b-2 border-gray-200"><td className="py-4">Brand</td></tr>
            <tr className="border-b-2 border-gray-200"><td className="py-4">Price</td></tr>
            <tr className="border-b-2 border-gray-200"><td className="py-4">Description</td></tr>
          </tbody>
        </table>
      </div>
      <div className="w-full md:w-3/4 flex flex-col md:flex-row justify-between pl-4">
        {compareList.length > 0 && <CompareProduct id={compareList[0]}  />}
        <div className="hidden md:block border-l-2 border-gray-200"></div>
        {compareList.length > 1 && <CompareProduct id={compareList[1]}  />}
      </div>
    </div>
    <button className="bg-color4 text-white px-6 py-2 rounded-lg ml-2 hover:bg-indigo-500 focus:outline-none mt-2 sm:mt-0 w-full sm:w-auto" onClick={clearCompare}>Clear Compare List</button>
  </div>

  );
};

export default ParentComponent;