import { createContext, useReducer } from "react";

export const RepairsContext = createContext();

export const RepairsReducer = (state, action) => {
    switch (action.type) {
        case "SET_Repairs":
            return {
                repairs: action.payload,
            }
        case "Create_Repair":
            return {
                repairs: [action.payload, ...state.repairs]
            }
        case "DELETE_REPAIR":
            return {
                ...state,
                repairs: state.repairs.filter((re) => re._id !== action.payload)
            }
         case 'UPDATE_REPAIR':
                return {
                    repairs: state.repairs.map(repair =>
                        repair._id === action.payload._id ? action.payload : repair
                    )
                }
        default:
            return state;
    }
};

export const RepairsContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(RepairsReducer, {
        repairs:[]
       
    });
    // dispatch({ type: "SET_LOADING", payload: false });

    return (
        <RepairsContext.Provider value={{...state, dispatch}}>
            {children}
        </RepairsContext.Provider>
    );
}