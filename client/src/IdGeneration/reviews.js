export async function generateReviewIdStr() {

    try {
        const response = await fetch('http://localhost:4000/api/reviews/');
        
        const reviews = await response.json();

        const ReviewId_Integer = reviews.map(review => parseInt(review.review_id_int));

        let newReviewId;

        if (ReviewId_Integer.length === 0) {
            newReviewId = 1;
        } else {
            const lastReviewId = Math.max(...ReviewId_Integer);
            newReviewId = lastReviewId + 1;
        }

        const ReviewId_String = "REV00" + newReviewId;

        return ReviewId_String;

    } catch (error) {
        console.error('Error fetching review IDs : ', error);
        return null;
    }
}

export async function generateReviewIdInt() {

    try {
        const response = await fetch('http://localhost:4000/api/reviews/');
        const reviews = await response.json();

        const ReviewId_Integer = reviews.map(review => parseInt(review.review_id_int));

        let newReviewId;

        if (ReviewId_Integer.length === 0) {
            newReviewId = 1;
        } else {
            const lastReviewId = Math.max(...ReviewId_Integer);
            newReviewId = lastReviewId + 1;
        }

        return newReviewId;

    } catch (error) {
        console.error('Error fetching review IDs : ', error);
        return null;
    }
}