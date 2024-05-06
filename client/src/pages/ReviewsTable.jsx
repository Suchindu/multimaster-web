// AdminReviewsTable.js
import React, { useEffect, useState } from "react";
import { useReviewsContext } from "../hooks/useReviewsContext";
import ReviewsTable from "../components/ReviewsTable";

function AdminReviewsTable() {
    const [error, setError] = useState(null);
    const { reviews, dispatch } = useReviewsContext();

    const handleDelete = async (reviewId) => {
        const deleteReview = window.confirm("Are you sure you want to delete this review?");
        
        if (deleteReview) {
            try {
                const response = await fetch("http://localhost:4000/api/reviews/" + reviewId, {
                    method: "DELETE"
                });

                if (response.ok) {
                    dispatch({ type: 'DELETE_REVIEW', payload: reviewId });
                } else {
                    throw new Error("No such review!");
                }
            } catch (error) {
                setError(error.message);
            }
        }
    }

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await fetch('http://localhost:4000/api/reviews');
                if (!response.ok) {
                    throw new Error('Failed to fetch reviews');
                }

                const json = await response.json();
                dispatch({ type: 'SET_REVIEWS', payload: json });

            } catch (error) {
                setError(error.message);
            }
        };

        fetchReviews();
    }, [dispatch]);

    return (
        <div className="review-details p-4 bg-white-900 rounded-lg mt-2 ml-2 mr-2 shadow-xl">
            <h2 className="text-xl font-bold mb-5">Tabular Mode of Submitted Reviews</h2>
            {error && <p className="text-red-500">{error}</p>}
            {reviews && <ReviewsTable reviews={reviews} onDelete={handleDelete} />}
        </div>
    );
}

export default AdminReviewsTable;