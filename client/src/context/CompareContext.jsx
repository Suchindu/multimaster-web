import React from "react";  
import { createContext, useState, useEffect, useContext } from "react";
import { useToast } from "@chakra-ui/react";

const CompareContext = createContext();


export function CompareProvider({ children }) {
    const [compareList, setCompareList] = useState([]);
    const toast = useToast();

    const addToCompare = (id) => {
        // setCompareList((prevList) => [...prevList, id]);
         if (compareList.length >= 2) {
      toast({
        title: "Limit Reached.",
        description: "You have already selected two products for comparison.",
        status: "info",
        duration: 5000,
        isClosable: true,
      });
    } else if (compareList.includes(id)) {
      toast({
        title: "Already Selected.",
        description: "This product has already been selected for comparison.",
        status: "info",
        duration: 5000,
        isClosable: true,
      });
    } else {
      setCompareList((prevList) => [...prevList, id]);
    }
    };

    const clearCompare = () => {
        setCompareList([]);toast({
            title: "Comparison Cleared.",
            description: "The comparison list has been cleared.",
            status: "info",
            duration: 1000,
            isClosable: true,
          });
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