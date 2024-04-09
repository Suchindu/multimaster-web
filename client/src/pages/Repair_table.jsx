import { useEffect, useState } from "react";
//components
import Repair_details from "../components/Repair_details";
const Repair_table = () => {
    const[repairs, setRepairs] = useState(null);

    useEffect(() => {
        //fetch repairs from the database
        const fetchRepair = async () => {
             
                const response = await fetch('http://localhost:4000/api/repair');
                const json = await response.json();
                console.log(json);
                if (response.ok) {
                    setRepairs(json);
                }
            }

        fetchRepair();
    }, []);

    return (
        <>
        <div>
            <h1 className='text-center font-bold text-2xl'>Repair Requets</h1>
        </div>
        <div>
            <div className="flex justify-center mt-4">
                <input
                    type="text"
                    placeholder="Search"
                    // onChange={handleFilter}
                    className="px-4 w-9/12 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="ml-2 justify-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    Search
                </button>
                </div>
            </div>
        <div>
            <table className="border border-collapse mt-10 table-auto w-full border-gray-400">
                <thead>
                    <tr>
                        <th className="border border-gray-500 px-4 py-2">Name</th>
                        <th className="border border-gray-500 px-4 py-2">Email</th>
                        <th className="border border-gray-500 px-4 py-2">Contact</th>
                        <th className="border border-gray-500 px-4 py-2">Date</th>
                        <th className="border border-gray-500 px-4 py-2">Device Brand</th>
                        <th className="border border-gray-500 px-4 py-2">Device Model</th>
                        <th className="border border-gray-500 px-4 py-2">Problem</th>
                        <th className="border border-gray-500 px-4 py-2">Description</th>
                        <th className="border border-gray-500 px-4 py-2">Actions</th> 
                    </tr>
                </thead>
                <tbody>
                    {repairs && repairs.map((repair) => (
                        <Repair_details repair={repair} key={repair._id} />
                    ))}
                </tbody>
            </table>
        </div>
        </>
    );
};


export default Repair_table;