export async function generateRepairIdStr() {

    try {
        const response = await fetch('http://localhost:4000/api/repair/');
        const repairs = await response.json();

        const RepairId_Integer = repairs.map(repair => parseInt(repair.repair_id_int));

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
        const response = await fetch('http://localhost:4000/api/repair/');
        const repairs = await response.json();

        const RepairIDInteger = repairs.map(repair => parseInt(repair.repair_id_int));

        let newRepairId;

        if (RepairIDInteger.length === 0) {
            newRepairId = 1;
        } else {
            const lastRepairId = Math.max(...RepairIDInteger);
            newRepairId = lastRepairId + 1;
        }

        return newRepairId;

    } catch (error) {
        console.error('Error fetching review IDs : ', error);
        return null;
    }
}