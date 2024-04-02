import React from 'react';

const SubmitRepair = () => {
    // Your component logic goes here

    return (
        <div>
            <form className="flex flex-col space-y-4 w-100 h-100">
                <input type="text" placeholder="Field 1" className="border border-gray-300 p-2" />
                <input type="text" placeholder="Field 2" className="border border-gray-300 p-2" />
                <input type="text" placeholder="Field 3" className="border border-gray-300 p-2" />
                <input type="text" placeholder="Field 4" className="border border-gray-300 p-2" />
                <input type="text" placeholder="Field 5" className="border border-gray-300 p-2" />
                <input type="text" placeholder="Field 6" className="border border-gray-300 p-2" />
                <input type="text" placeholder="Field 7" className="border border-gray-300 p-2" />
                <input type="text" placeholder="Field 8" className="border border-gray-300 p-2" />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
            </form>
        </div>
    );
};

export default SubmitRepair;