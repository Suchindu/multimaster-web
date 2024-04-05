import { useState } from "react";
import { useReviewsContext } from "../hooks/useReviewsContext";

function ReviewDetails({ review }) {
  const { dispatch } = useReviewsContext();
  const [isUpdating, setIsUpdating] = useState(false);
  const [updatedReview, setUpdatedReview] = useState({ ...review });

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

  const handleUpdate = async () => {
    const response = await fetch("http://localhost:4000/api/reviews/" + review._id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedReview)
    });

    if (response.ok) {
      dispatch({ type: 'UPDATE_REVIEW', payload: updatedReview });
      setIsUpdating(false);
    } else {
      alert("Review Can't be updated !");
    }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUpdatedReview(prevState => ({
      ...prevState,
      [name]: value
    }));
  }
}

  return (
    <>
      <div className="review-details p-4 mt-5 bg-color1 rounded-lg shadow-md">
        
        <h3 className="text-xl text-white font-bold mb-2">{review._id}</h3>
        <p className="mb-1 text-white"><strong>Name:</strong> {review.name}</p>
        <p className="mb-1 text-white"><strong>Email:</strong> {review.email}</p>
        <p className="mb-1 text-white"><strong>Technician:</strong> {review.technician}</p>
        <p className="mb-1 text-white"><strong>Date Of Service:</strong> {review.date_of_service}</p>
        <p className="mb-1 text-white"><strong>Service Type:</strong> {review.service_type}</p>
        <p className="mb-1 text-white"><strong>Rating:</strong> {review.rating}</p>
        <p className="mb-1 text-white"><strong>Review:</strong> {review.review_body}</p>
        <p className="mb-1 text-white"><strong>Review Created At:</strong> {review.createdAt}</p>
        
        <button className="bg-color5 rounded-lg w-20" 
          onClick={handleDelete}>Delete</button>
        <button className="bg-color5 rounded-lg w-20 ml-2 mt-5" 
          onClick={() => setIsUpdating(true)}>Update</button>

        {isUpdating && (
        <div>
          <form>
            <label className="mb-1 text-white">
              Name</label><br />
            <input
              type="text"
              name="name"
              required
              value={updatedReview.name}
              onChange={handleChange} /><br />

            <label label className="mb-1 text-white">
              Email</label><br />
            <input
              type="email"
              name="email"
              required
              value={updatedReview.email}
              onChange={handleChange} /><br />

            <label label className="mb-1 text-white"
              >Technician</label><br />
            <input
              type="text"
              name="technician"
              required
              value={updatedReview.technician}
              onChange={handleChange} /><br />

            <label label className="mb-1 text-white" 
              >Date Of Service</label><br />
            <input
              type="date"
              name="date_of_service"
              required
              value={updatedReview.date_of_service}
              onChange={handleChange} /><br />

            <label label className="mb-1 text-white" 
              >Service Type</label><br />
            <input
              type="text"
              name="service_type"
              required
              value={updatedReview.service_type}
              onChange={handleChange} /><br />

            <label label className="mb-1 text-white" 
              >Rating</label><br />
            <input
              type="number"
              name="rating"
              min={1}
              max={10}
              required
              value={updatedReview.rating}
              onChange={handleChange} /><br />

            <label label className="mb-1 text-white"
              >Review</label><br />
            <textarea
              type="text"
              name="review_body"
              rows={5}
              cols={50}
              required
              value={updatedReview.review_body}
              onChange={handleChange}>
                </textarea><br />

            <button className="bg-color5 rounded-lg w-20 mt-5"
              type="button" 
              onClick={handleUpdate}>Save</button>
            <button className="bg-color5 rounded-lg w-20 ml-5" 
              type="button" 
              onClick={() => setIsUpdating(false)}>Cancel</button>

          </form>
        </div>
      )}
      </div>
      
    </>
  );
}

export default ReviewDetails;