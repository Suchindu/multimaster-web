// fetch details from the database and add the search bar to filter the data
import React, { useState } from 'react';
//components
import Header from './header';
import Footer from './footer';
//import multimasterLogo from '../../public/multimaster.svg';

const CheckRepair = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [data, setData] = useState(null);

    const fetchData = async (_id) => {
        try{
            const response = await fetch(`http://localhost:4000/api/repair/${_id}`);
            const data = await response.json();
            console.log('Respnse data: ', data)
            setData(data);
            console.log('State data: ', data);
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    }

    const handleSearch = (event) => {
        const searchTerm = event.target.value;
        setSearchTerm(searchTerm);
        if(searchTerm){
            fetchData(searchTerm);
        }
    };

    return (
        <>
        <Header />
        <div className='"bg-gray-50 min-h-screen"'>
            <h1 className='mt-40 ml-60 text-2xl font-semibold text-blue-800'>Check Repair</h1>
            <input type="text" value={searchTerm} className='mt-2.5 ml-60 w-1/3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-800 shadow-lg' onChange={handleSearch} placeholder="Search by ID" />
            {/* Render filtered data here */}
            {data && (
                <div className="mt-8 p-4 bg-white rounded-lg shadow-lg w-1/3">
                    <h2 className="text-lg font-bold mb-4">Repair Details</h2>
                        <p><strong>Name:</strong> {data.name || 'No name'}</p>
                        <p><strong>Date:</strong> {data.date || 'No date'}</p>
                        <p><strong>Device Model:</strong> {data.device_model || 'No device model'}</p>
                        <p><strong>Device Brand:</strong> {data.device_brand || 'No device brand'}</p>
                        <p><strong>Status:</strong> {data.status || 'No status'}</p>
                </div>
            )}     
        </div>
        <Footer />
        </>
    );
}

export default CheckRepair;