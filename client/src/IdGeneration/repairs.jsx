export async function generateRepairIdStr() {

    try {
        const response = await fetch('http://localhost:4000/api/reviews/');
        const repairs = await response.json();

        const RepairId_Integer = repairs.map(review => parseInt(review.repair_id_int));

        let newRepairId;

        if (RepairId_Integer.length === 0) {
            newRepairId = 1;
        } else {
            const lastRepairId = Math.max(...RepairId_Integer);
            newRepairId = lastRepairId + 1;
        }

        const RepairId_String = "REP00" + newRepairId;

        return RepairId_String;

    } catch (error) {
        console.error('Error fetching review IDs : ', error);
        return null;
    }
}

export async function generateRepairIdInt() {

    try {
        const response = await fetch('http://localhost:4000/api/reviews/');
        const reviews = await response.json();

        const ReviewId_Integer = reviews.map(review => parseInt(review.review_id_int));

        let newRepairId;

        if (ReviewId_Integer.length === 0) {
            newRepairId = 1;
        } else {
            const lastRepairId = Math.max(...ReviewId_Integer);
            newRepairId = lastRepairId + 1;
        }

        return newRepairId;

    } catch (error) {
        console.error('Error fetching review IDs : ', error);
        return null;
    }
}