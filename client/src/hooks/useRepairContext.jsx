import { RepairsContext } from "../context/RepairContext";
import { useContext } from "react";

export const useRepairContext = () => {
    const context = useContext(RepairsContext);

    if (!context) {
        throw Error("useRepairContext must be used within RepairsContextProvider") 
    }


    return context;
}