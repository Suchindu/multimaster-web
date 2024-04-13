import { useEffect, useRef, useState} from "react";
import {useReactToPrint} from "react-to-print";
//components
import Repair_details from "../components/Repair_details";
//hooks
import { useRepairContext } from "../hooks/useRepairContext";


const Repair_table = () => {
    const componentPdf = useRef();
    // const[repairs, setRepairs] = useState(null);
    const {repairs, dispatch} = useRepairContext();
    const [filteredRepairs, setFilteredRepairs] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        //fetch repairs from the database
        const fetchRepair = async () => {
             
                const response = await fetch('http://localhost:4000/api/repair');
                const json = await response.json();
                console.log(json);
                if (response.ok) {
                    // setRepairs(json);
                    dispatch({ type: "SET_Repairs", payload: json });
                }
            }

        fetchRepair();
    }, []);

    //generate pdf
    const generatePdf = useReactToPrint({
        content: () => componentPdf.current,
        documentTitle: "Repair Requests",
        onAfterPrint: () => console.log("after print")
    });
    
    //search
    useEffect(() => {
        if (search.trim() !== '') {
            const filtered = repairs.filter((repair) => {
                return repair.name.toLowerCase().includes(search.toLowerCase()) ||
                repair.email.toLowerCase().includes(search.toLowerCase()) ||
                repair.date.toLowerCase().includes(search.toLowerCase()) ||
                repair.status.toLowerCase().includes(search.toLowerCase());
                //repair.contact.toLowerCase().includes(search.toLowerCase()) ||
                // repair.device_brand.toLowerCase().includes(search.toLowerCase()) ||
                // repair.device_model.toLowerCase().includes(search.toLowerCase()) ||
                // repair.problem.toLowerCase().includes(search.toLowerCase()) ||
                // repair.description.toLowerCase().includes(search.toLowerCase());
            });
            setFilteredRepairs(filtered);
        } else {
            setFilteredRepairs(repairs);
        }
    }, [repairs, search]);



    return (
        <>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
            <h1 className='text-center font-bold text-2xl my-6'>Repair Requets</h1>
        </div>
        <div>
            <div className="flex justify-center my-4">
                <input 
                    onChange={(e) => setSearch(e.target.value)}
                    type="text"
                    placeholder="Search"
                    // onChange={handleFilter}
                    className="px-4 w-9/12 md:w-2/3 lg:w-1/2 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {/* <button className="ml-2 justify-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    Search
                </button> */}
                </div>
            </div>
        <div ref={componentPdf} className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-300 shadow-sm">
                <thead className="bg-gray-50">
                    <tr className="dark:bg-gray-300 text-left">
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Device Brand</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Device Model</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Problem</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th> 
                         
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {filteredRepairs && filteredRepairs.map((repair) => (
                        <Repair_details repair={repair} key={repair._id} />
                    ))}
                </tbody>
            </table>
        </div>
        <div className="flex justify-end pl-1 my-4">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50" onClick={generatePdf}>
                Download
            </button>
        </div>
        </>
    );
};


export default Repair_table;

