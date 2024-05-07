import React from "react";  
import { createContext, useState, useEffect, useContext } from "react";

const CompareContext = createContext();


export function CompareProvider({ children }) {
    const [compareList, setCompareList] = useState([]);

    const addToCompare = (id) => {
        setCompareList((prevList) => [...prevList, id]);
    };

    const clearCompare = () => {
        setCompareList([]);
      };

    return (
        <CompareContext.Provider value={{ 
            compareList, addToCompare , clearCompare
            
            }}>

        {children}
        </CompareContext.Provider>
    );

}

export function useCompare() {
    const context = useContext(CompareContext);
    if (!context) {
        throw new Error('useCompare must be used within a CompareProvider');
    }
    return context;
    }

export default CompareContext;