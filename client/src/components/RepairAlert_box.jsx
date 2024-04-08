import React from 'react';

const RepairAlert_box = ({ message }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center">
            <div className="bg-blue-600 p-6 rounded-md shadow-md">
                <p className="text-lg text-center">{message}</p>
            </div>
        </div>
    );
};

export default RepairAlert_box;