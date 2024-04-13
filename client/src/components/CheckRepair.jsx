// fetch details from the database and add the search bar to filter the data
import React, { useState } from 'react';
//components
import Header from './header';
import Footer from './footer';

const CheckRepair = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        // Perform filtering logic here
    };

    return (
        <>
        <Header />
        <div>
            
            <h1 className='mt-40 ml-60 text-2xl font-semibold flex-auto text-blue-800'>Check Repair</h1>
            <input type="text" value={searchTerm} className='mt-2.5 ml-60 w-1/3  border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-800 shadow-lg' onChange={handleSearch} placeholder="Search..." />
            {/* Render filtered data here */}
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim, labore et, quam provident assumenda ea voluptates nisi minus aperiam consequuntur in esse ducimus voluptatem pariatur officiis doloremque vero molestias iste.</p>
            
        </div>
        <Footer />
        </>
    );
}

export default CheckRepair;