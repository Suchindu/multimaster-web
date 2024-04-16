import { useState } from "react";
import { useReviewsContext } from "../hooks/useReviewsContext";
import { formatDistanceToNow } from "date-fns/formatDistanceToNow";

export default function ReviewDetails({ review }) {

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

  const handleUpdate = async (event) => {
    event.preventDefault();

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
  }   

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUpdatedReview(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  // Formatting the date
  // const createdDate = formatDistanceToNow(new Date(review.createdAt), {addSuffix : true});

  return (
    <>
      <div className="grid grid-cols-1 gap-4 bg-gray-900 p-6 rounded-lg mb-5">
      <div className="flex justify-between items-center">
        <h3 className="text-xl text-white font-bold mb-2 text-center">{review.review_id_str}</h3>
        {/* <p className="mb-1 text-sm text-white">{createdDate}</p> */}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="border border-white p-4 rounded-lg">
            <p className="mb-1 text-white"><strong>Name : </strong> {review.name} </p>
            <p className="mb-1 text-white"><strong>Email : </strong> {review.email} </p>
            <p className="mb-1 text-white"><strong>Date Of Service : </strong> {review.date_of_service} </p>
        </div>
        <div className="border border-white p-4 rounded-lg">
            <p className="mb-1 text-white"><strong>Technician : </strong> {review.technician} </p>
            <p className="mb-1 text-white"><strong>Service Type : </strong> {review.service_type} </p>
            <p className="mb-1 text-white"><strong>Rating : </strong>{review.rating} </p>
        </div>
      </div>
      <div className="bg-gray-800 p-4 rounded-lg">
        <p className="mb-1 text-white"><strong>Review : </strong> {review.review_body} </p>
      </div>

      <div className="bg-gray-800 p-4 rounded-lg">
        <p className="mb-1 text-white"><strong>Technician's Reply : </strong> {review.technician_reply} </p>
      </div>

      <div className="flex justify-center">
      <div className="bg-white rounded-xl p-2 mr-2">
          <button className="material-symbols-outlined bg-transparent text-blue-500 font-semibold py-2 px-4 border border-blue-500 rounded-xl" onClick={handleDelete}>
              Delete
          </button>
      </div>
      <div className="bg-white rounded-xl p-2 mr-2">
          <button className="material-symbols-outlined bg-transparent text-blue-500 font-semibold py-2 px-4 border border-blue-500 rounded-xl" onClick={() => setIsUpdating(true)}>
              Edit
          </button>
      </div>
    </div>

    {isUpdating && (
      <div>
        <form>
          <div className="border-2 border-gray-300 rounded-lg p-4 max-w-xl mx-auto">
            <label className="block mb-1 text-white">Name</label>
            <input 
              type="text" 
              name="name" 
              required 
              value={updatedReview.name} 
              onChange={handleChange} 
              className="w-full py-2 px-4 mb-4 rounded-lg border border-gray-300 placeholder-gray-500 placeholder-opacity-50"/>

            <label className="block mb-1 text-white">Email</label>
            <input 
              type="email" 
              name="email" 
              required 
              value={updatedReview.email} 
              onChange={handleChange} 
              className="w-full py-2 px-4 mb-4 rounded-lg border border-gray-300 placeholder-gray-500 placeholder-opacity-50"/>

            <label className="block mb-1 text-white">Technician</label>
            <input 
              type="text" 
              name="technician" 
              required 
              value={updatedReview.technician}
              onChange={handleChange}
              className="w-full py-2 px-4 rounded-lg border border-gray-300 placeholder-gray-500 placeholder-opacity-50"/>

            <div className="flex mb-4 mt-5">
              <div className="w-1/3">
                <label className="block mb-1 text-white">Rating</label>
                <input 
                  type="number" 
                  name="rating" 
                  min={1} max={10} 
                  required 
                  value={updatedReview.rating} 
                  onChange={handleChange} 
                  className="w-full py-2 px-4 mb-4 rounded-lg border border-gray-300 placeholder-gray-500 placeholder-opacity-50"/>
              </div>
              <div className="w-1/3 pl-4">
                <label className="block mb-1 text-white">Date Of Service</label>
                <input 
                  type="date" 
                  name="date_of_service" 
                  required 
                  value={updatedReview.date_of_service} 
                  onChange={handleChange} 
                  className="w-full py-2 px-4 rounded-lg border border-gray-300 placeholder-gray-500 placeholder-opacity-50"/>
              </div>
              <div className="w-1/3 pl-4">
                <label className="block mb-1 text-white">Service Type</label>
                <input 
                  type="text" 
                  name="service_type" 
                  required 
                  value={updatedReview.service_type} 
                  onChange={handleChange} 
                  className="w-full py-2 px-4 rounded-lg border border-gray-300 placeholder-gray-500 placeholder-opacity-50"/>
              </div>
            </div>

            <label className="block mb-1 text-white">Review</label>
            <textarea 
              type="text" 
              name="review_body" 
              rows={5} cols={50} 
              required 
              value={updatedReview.review_body} 
              onChange={handleChange}
              className="w-full py-2 px-4 mb-4 rounded-lg border border-gray-300 placeholder-gray-500 placeholder-opacity-50"></textarea>
          
            <div className="flex justify-center">
              <div className="bg-white rounded-xl p-2 mr-2">
                <button className="material-symbols-outlined bg-transparent text-blue-500 font-semibold py-2 px-4 border border-blue-500 rounded-xl" 
                  onClick={handleUpdate}>
                    Update
                </button>
              </div>
              <div className="bg-white rounded-xl p-2 mr-2">
                <button className="material-symbols-outlined bg-transparent text-blue-500 font-semibold py-2 px-4 border border-blue-500 rounded-xl" 
                  onClick={() => setIsUpdating(true)}>
                    Cancel
                </button>
              </div>
            </div>

          </div>
        </form>

      </div>
    )}
    </div>
    </>
  );
}