function ReviewsTable({ reviews }) {

  return (
    <div className="p-4 mt-5">
      <table className="table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Technician</th>
            <th className="px-4 py-2">Serviced Date</th>
            <th className="px-4 py-2">Service</th>
            <th className="px-4 py-2">Rating</th>
            <th className="px-4 py-2">Review</th>
            <th className="px-4 py-2">Operations</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map(review => (
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
                <button className="border px-4 py-2">Edit</button>
                <button className="border px-4 py-2">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ReviewsTable;