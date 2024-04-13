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
                repair.date.toLowerCase().includes(search.toLowerCase());
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
        <div>
            <h1 className='text-center font-bold text-2xl'>Repair Requets</h1>
        </div>
        <div>
            <div className="flex justify-center mt-4">
                <input 
                    onChange={(e) => setSearch(e.target.value)}
                    type="text"
                    placeholder="Search"
                    // onChange={handleFilter}
                    className="px-4 w-9/12 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {/* <button className="ml-2 justify-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    Search
                </button> */}
                </div>
            </div>
        <div ref={componentPdf} >
            <table className="border border-collapse mt-10 table-auto w-full border-gray-600">
                <thead>
                    <tr className="dark:bg-gray-300 text-left">
                        <th className="border border-gray-500 px-4 py-2">ID</th>
                        <th className="border border-gray-500 px-4 py-2">Name</th>
                        <th className="border border-gray-500 px-4 py-2">Email</th>
                        <th className="border border-gray-500 px-4 py-2">Contact</th>
                        <th className="border border-gray-500 px-4 py-2">Date</th>
                        <th className="border border-gray-500 px-4 py-2">Device Brand</th>
                        <th className="border border-gray-500 px-4 py-2">Device Model</th>
                        <th className="border border-gray-500 px-4 py-2">Problem</th>
                        <th className="border border-gray-500 px-4 py-2">Description</th>
                        <th className="border border-gray-500 px-4 py-2">Actions</th> 
                        <th className="border border-gray-500 px-4 py-2">Status</th> 
                    </tr>
                </thead>
                <tbody>
                    {filteredRepairs && filteredRepairs.map((repair) => (
                        <Repair_details repair={repair} key={repair._id} />
                    ))}
                </tbody>
            </table>
        </div>
        <div className="flex justify-end">
            <button className="mt-4 mr-3 px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500" onClick={generatePdf}>
                Download
            </button>
        </div>
        </>
    );
};


export default Repair_table;