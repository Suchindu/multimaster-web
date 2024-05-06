import React from 'react';
import CompareProduct from './CompareProduct';

const ParentComponent = () => {
  return (
    <div className="m-4 p-4 border-2 border-gray-300 rounded-lg">
    <h1 className="text-center text-2xl font-bold mb-4">Product Comparison</h1>
    <div className="m-4 flex flex-col sm:flex-row">
      <div className="w-full md:w-1/4 mt-20 bg-white rounded-lg p-2 md:block hidden">
        <table className="table-auto w-full">
          <tbody className="text-center">
            <tr className="border-b-2 border-gray-200"><td className="py-4"></td></tr>
            <tr className="border-b-2 border-gray-200"><td className="py-4">Feature 2</td></tr>
            <tr className="border-b-2 border-gray-200"><td className="py-4">Feature 3</td></tr>
            <tr className="border-b-2 border-gray-200"><td className="py-4">Feature 4</td></tr>
            <tr className="border-b-2 border-gray-200"><td className="py-4">Feature 5</td></tr>
          </tbody>
        </table>
      </div>
      <div className="w-full md:w-3/4 flex flex-col md:flex-row justify-between pl-4">
        <CompareProduct />
        <div className="hidden md:block border-l-2 border-gray-200"></div>
        <CompareProduct />
      </div>
    </div>
  </div>

  );
};

export default ParentComponent;