import { useReviewsContext } from "../hooks/useReviewsContext";
import {useState,useEffect,useRef} from 'react';
import ReactToPrint from 'react-to-print';

function ReviewsTable({ reviews, onDelete }) {
  
  const { dispatch } = useReviewsContext();

  const componentRef = useRef(); 

  const [filteredReviews, setFilteredReviews] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
        if (search.trim() !== '') {
            const filtered = reviews.filter((review) => {
                return review.name.toLowerCase().includes(search.toLowerCase()) ||
                review.email.toLowerCase().includes(search.toLowerCase()) ||
                review.technician.toLowerCase().includes(search.toLowerCase()) ||
                review.date_of_service.toLowerCase().includes(search.toLowerCase()) ||
                review.review_id_str.toLowerCase().includes(search.toLowerCase())
                // repair.device_model.toLowerCase().includes(search.toLowerCase()) ||
                // repair.problem.toLowerCase().includes(search.toLowerCase()) ||
                // repair.description.toLowerCase().includes(search.toLowerCase());
            });
            setFilteredReviews(filtered);
        } else {
            setFilteredReviews(reviews);
        }
    }, [reviews, search]);

  return (
    <>
    <div className="flex justify-center mt-4 mb-5">
      <input 
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Search"
          className="px-4 w-9/12 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
    <table className="table-auto text-sm" ref={componentRef}>
      <thead>
        <tr>
          <th className="border px-4 py-2 bg-color1 text-white">ID</th>
          <th className="border px-4 py-2 bg-color1 text-white">Name</th>
          <th className="border px-4 py-2 bg-color1 text-white">Email</th>
          <th className="border px-4 py-2 bg-color1 text-white">Technician</th>
          <th className="border px-4 py-2 bg-color1 text-white">Date Of Service</th>
          <th className="border px-4 py-2 bg-color1 text-white">Service Type</th>
          <th className="border px-4 py-2 bg-color1 text-white">Rating</th>
          <th className="border px-4 py-2 bg-color1 text-white">Review</th>
          <th className="border px-4 py-2 bg-color1 text-white">Technician's Reply</th>
          <th className="border px-4 py-2 bg-color1 text-white hide-on-print">Actions</th>
        </tr>
      </thead>
      <tbody>
        {filteredReviews && filteredReviews.map((review) => (
          <tr key={review._id}>
            <td className="border px-4 py-2">{review.review_id_str}</td>
            <td className="border px-4 py-2">{review.name}</td>
            <td className="border px-4 py-2">{review.email}</td>
            <td className="border px-4 py-2">{review.technician}</td>
            <td className="border px-4 py-2">{review.date_of_service}</td>
            <td className="border px-4 py-2">{review.service_type}</td>
            <td className="border px-4 py-2">{review.rating}</td>
            <td className="border px-4 py-2">{review.review_body}</td>
            <td className="border px-4 py-2">{review.technician_reply}</td>
            <td className="border px-4 py-2">
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded hide-on-print"
                onClick={() => onDelete(review._id)}
              >
                Delete
              </button>
            </td>
          </tr>
          
        ))}
      </tbody>
    </table>
    <ReactToPrint
        trigger={() => (
          <button
            type="button"
            
            className="block rounded-md bg-green-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 mt-2"
          >
            Print as PDF
          </button>
          )}
          content={() => componentRef.current}
          />
    </>
  );
}

export default ReviewsTable;