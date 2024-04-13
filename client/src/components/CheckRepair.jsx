// fetch details from the database and add the search bar to filter the data
import React, { useState, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
//components
import Header from './header';
import Footer from './footer';
//import multimasterLogo from '../../public/multimaster.svg';

const CheckRepair = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [data, setData] = useState(null);
    const componentRef = useRef();

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

    //search for repair details
    const handleSearch = (event) => {
        const searchTerm = event.target.value;
        setSearchTerm(searchTerm);
        if(searchTerm){
            fetchData(searchTerm);
        }
    };

    //download repair details
    const handleDownload = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: "Repair Details",
        onAfterPrint: () => console.log("after print")
    });

    //share repair details
    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: 'Repair Details',
                text: 'Here are the details of the repair.',
                url: window.location.href,
            })
            .then(() => console.log('Successful share'))
            .catch((error) => console.log('Error sharing', error));
        } else {
            console.log('Share not supported on this browser, do it the old way.');
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
                <div ref={componentRef} className="mt-8 p-6 bg-white rounded-lg shadow-2xl w-full max-w-md ml-4 border-l-4 border-blue-800">
                    <h2 className="text-lg font-bold mb-4 text-blue-800">Repair Details</h2>
                        <p className="text-md font-semibold"><strong>Name:</strong> {data.name || 'No name'}</p>
                        <p className="text-md font-semibold"><strong>Date:</strong> {data.date ? new Date(data.date).toISOString().split('T')[0] : 'No date'}</p>
                        <p className="text-md font-semibold"><strong>Device Model:</strong> {data.device_model || 'No device model'}</p>
                        <p className="text-md font-semibold"><strong>Device Brand:</strong> {data.device_brand || 'No device brand'}</p>
                        <p className="text-md font-semibold"><strong>Status:</strong> {data.status || 'No status'}</p>
                        <button onClick={handleDownload} className="mt-4 mr-2 px-4 py-2 bg-blue-800 text-white rounded-md shadow-lg hide-on-print">Download</button>
                        <button onClick={handleShare} className="mt-4 ml-2 px-4 py-2 bg-blue-800 text-white rounded-md shadow-lg hide-on-print">Share</button>
                </div>
            )}     
        </div>
        <Footer />
        </>
    );
}

export default CheckRepair;