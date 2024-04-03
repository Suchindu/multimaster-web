import { useEffect, useState } from "react";
import { useReviewsContext } from "../hooks/useReviewsContext";

// Importing the components
import ReviewDetails from '../components/review_details';
import Form from '../components/review_form';

function ReviewForm() {
    // const [reviews, setReviews] = useState(null);
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
                
                // setReviews(json);

            } catch (error) {
                setError(error.message);
            }
        };

        fetchReviews();
    }, []);

    return (
        <>
        <div>
            <Form />
        </div>
        <div className="review-details p-4 bg-white-900 rounded-lg mt-2 ml-2 mr-2 shadow-md">
            <h2 className="text-xl font-bold mb-5 ">Reviews</h2>
            {error && <p className="text-red-500">{error}</p>}
            {reviews &&
                reviews.map((review) => (
                    <ReviewDetails key={review._id} review={review} />
                ))}
        </div>
        </>
    );
}

export default ReviewForm;