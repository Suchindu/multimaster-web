async function generateID() {
    
    try {
        const response = await fetch('http://localhost:4000/api/reviews/');
        const reviews = await response.json();

        // Extract review_ids from the reviews
        const existingReviewIds = reviews.map(review => parseInt(review.review_id));
        console.log(existingReviewIds);

        let newReviewId;

        if (existingReviewIds.length === 0) {
            newReviewId = 1;
        } else {
            // Get the last review_id and increment its number
            const lastReviewId = Math.max(...existingReviewIds);
            newReviewId = lastReviewId + 1;
        }

        return newReviewId;
    } catch (error) {
        console.error('Error fetching review IDs:', error);
        return null;
    }
}

export default generateID;