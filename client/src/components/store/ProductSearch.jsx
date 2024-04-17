import React from 'react';
import { useState } from 'react';

export default function SearchBasicExample() {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = () => {
      console.log('Searching for:', searchTerm);
      // Here you can implement your search logic...
    };
  
    return (
      <div className="flex items-center justify-center mt-10">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="border-2 border-gray-300 bg-white h-10 px-5 pr-60 rounded-lg text-sm focus:outline-none"
        />
        <button 
        onClick={handleSearch}
        className="bg-blue-500 text-white px-6 py-2 rounded-lg ml-2 hover:bg-blue-600 focus:outline-none"
        >
            Search
        </button>
      </div>
    );
}