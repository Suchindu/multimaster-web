import { useState } from "react";
import { useReviewsContext } from "../hooks/useReviewsContext";

export default function AddReply({ review }) {

  const { dispatch } = useReviewsContext();
  const [isReplying, setIsReplying] = useState(false);
  const [updatedReview, setUpdatedReview] = useState({ ...review });

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
      setIsReplying(false);
    } else {
      alert("Review Can't be replied !");
    }
  }   

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUpdatedReview(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-4 bg-gray-900 p-6 rounded-lg mb-5">
      <div className="flex justify-between items-center">
        <h3 className="text-xl text-white font-bold mb-2 text-center">{review.review_id_str}</h3>
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
        <p className="mb-1 text-white"><strong>Review : </strong>{review.review_body} </p>
      </div>

      <div className="bg-gray-800 p-4 rounded-lg flex items-center justify-between">
      <p className="mb-1 text-white"><strong>Technician's Reply : </strong>{review.technician_reply}</p>
      <div className="bg-white rounded-xl p-2 mr-2">
          <button className="material-symbols-outlined bg-transparent text-blue-500 font-semibold py-2 px-4 border border-blue-500 rounded-xl" 
            onClick={() => setIsReplying(true)}>
              Reply
          </button>
      </div>
      </div>

      </div>

    {isReplying && (
      <div>
        <form>
          <div className="border-2 border-gray-300 rounded-lg mb-5 p-4 max-w-xl mx-auto">
            <label className="block mb-1 text-gray">Enter Technicians Reply</label><br />
            <input 
              type="text" 
              name="technician_reply" 
              required 
              value={updatedReview.technician_reply} 
              onChange={handleChange} 
              className="w-full py-2 px-4 mb-4 rounded-lg border border-gray-300 placeholder-gray-500 placeholder-opacity-50"/>
          
            <div className="flex justify-center">
              <div className="bg-white rounded-xl p-2 mr-2">
                <button className="material-symbols-outlined bg-transparent text-blue-500 font-semibold py-2 px-4 border border-blue-500 rounded-xl" 
                  onClick={handleUpdate}>
                    Reply
                </button>
              </div>
              <div className="bg-white rounded-xl p-2 mr-2">
                <button className="material-symbols-outlined bg-transparent text-blue-500 font-semibold py-2 px-4 border border-blue-500 rounded-xl" 
                  onClick={() => setIsReplying(true)}>
                    Cancel
                </button>
              </div>
            </div>

          </div>
        </form>

      </div>
    )}
    </>
  );
}