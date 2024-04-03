
function review_details({ review }) {

    return (
      <>
        <div className="review-details p-4 mt-5 bg-color1 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-2 ">{review._id}</h3>
          <p className="mb-1"><strong>Name:</strong> {review.name}</p>
          <p className="mb-1"><strong>Email:</strong> {review.email}</p>
          <p className="mb-1"><strong>Technician:</strong> {review.technician}</p>
          <p className="mb-1"><strong>Date Of Service:</strong> {review.date_of_service}</p>
          <p className="mb-1"><strong>Service Type:</strong> {review.service_type}</p>
          <p className="mb-1"><strong>Rating:</strong> {review.rating}</p>
          <p className="mb-1"><strong>Review:</strong> {review.review_body}</p>
          <p className="mb-1"><strong>Review Created At:</strong> {review.createdAt}</p>
        </div>        
      </>
    );
  }
  
export default review_details;