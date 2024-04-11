import React from "react";
import { useReviewsContext } from "../hooks/useReviewsContext";

export default function ReviewTable({ review }) {

    const { reviews, dispatch } = useReviewsContext();

    const handleDelete = async () => {
        const deleteReview = window.confirm("Are You Sure, you want to delete this review ? ");
        
        if(deleteReview){
          const response = await fetch("http://localhost:4000/api/reviews/" + review._id, {
          method: "DELETE"
        });
    
        if (response.ok) {
          dispatch({ type: 'DELETE_REVIEW', payload: review._id });
        } else {
          alert("No Such Review !");
        }
      }
    }


  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Reviews</h2>
      <table className="table-auto text-sm">
        <thead>
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Technician</th>
            <th className="px-4 py-2">Date Of Service</th>
            <th className="px-4 py-2">Service Type</th>
            <th className="px-4 py-2">Rating</th>
            <th className="px-4 py-2">Review</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((review) => (
            <tr key={review._id}>
              <td className="border px-4 py-2">{review.review_id}</td>
              <td className="border px-4 py-2">{review.name}</td>
              <td className="border px-4 py-2">{review.email}</td>
              <td className="border px-4 py-2">{review.technician}</td>
              <td className="border px-4 py-2">{review.date_of_service}</td>
              <td className="border px-4 py-2">{review.service_type}</td>
              <td className="border px-4 py-2">{review.rating}</td>
              <td className="border px-4 py-2">{review.review_body}</td>
              <td className="border px-4 py-2">
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}