import { useEffect, useState } from "react";
import { useReviewsContext } from "../hooks/useReviewsContext";

import ReviewDetails from '../components/ReviewsDetails';
import ReviewsForm from "../components/ReviewsForm"
import ReviewTable from "../components/ReviewsTable";

function ReviewForm() {
    
    const [error, setError] = useState(null);

    const { reviews, dispatch } = useReviewsContext();

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await fetch('http://localhost:4000/api/reviews');
                if (!response.ok) {
                    throw new Error('failed to fetch reviews');
                }
                const json = await response.json();
                dispatch({ type : 'SET_REVIEWS', payload : json});

            } catch (error) {
                setError(error.message);
            }
        };

        fetchReviews();
    }, []);

    return (
        <>
        <div>
            <h2 className="text-xl font-bold mb-5 ">Reviews Submitting Form</h2>
                <ReviewsForm/>
        </div>
        <div className="review-details p-4 bg-white-900 rounded-lg mt-2 ml-2 mr-2 shadow-xl">
            <h2 className="text-xl font-bold mb-5 ">Submitted Reviews</h2>
            {error && <p className="text-red-500">{error}</p>}
            {reviews &&
                reviews.map((review) => (
                    <ReviewDetails key={review._id} review={review} />
                ))}
            {reviews && <ReviewTable review={reviews} />}
        </div>
        </>
    );
}

export default ReviewForm;