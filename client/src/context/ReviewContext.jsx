import { createContext, useReducer } from "react";

export const ReviewsContext = createContext();

export const ReviewsReducer = (state, action) => {
    switch(action.type){
        case 'SET_REVIEWS': 
            return {
                reviews : action.payload
            }

        case 'CREATE_REVIEW':
            return {
                reviews : [ action.payload, ...state.reviews ]
            }
        
        case 'DELETE_REVIEW':
            return {
                reviews : state.reviews.filter((r) => r._id !== action.payload)
            }
            
        case 'UPDATE_REVIEW':
            return {
                reviews: state.reviews.map(review =>
                    review._id === action.payload._id ? action.payload : review
                )
            }

        default:
            return state;
    }
}

export const ReviewsContextProvider = ( {children} ) => {

    const [state, dispatch] = useReducer(ReviewsReducer, {
        reviews : null
    });

    return (
        <ReviewsContext.Provider value={{...state, dispatch}}>
            {children}
        </ReviewsContext.Provider>
    );
}