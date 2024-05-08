export async function generateProductIdStr(category) {

    try {
        const response = await fetch('http://localhost:4000/api/products/');
        
        const products = await response.json();

        const productIdInteger = products.map(product => parseInt(product.category));

        let newProductId;

        if (productIdInteger.length === 0) {
            newProductId = 1;
        } else {
            const lastProductId = Math.max(...productIdInteger);
            newProductId = lastProductId + 1;
        }

        const ProductIdInt = "PRO00" + newProductId;

        return ProductIdInt;

    } catch (error) {
        console.error('Error fetching review IDs : ', error);
        return null;
    }
}

export async function generateProductIdInt() {

    try {
        const response = await fetch('http://localhost:4000/api/products/');
        const products = await response.json();

        const productIdInteger = products.map(product => parseInt(product.product_id_int));

        let newProductId;

        if (productIdInteger.length === 0) {
            newProductId = 1;
        } else {
            const lastProductId = Math.max(...productIdInteger);
            newProductId = lastProductId + 1;
        }

        return newProductId;

    } catch (error) {
        console.error('Error fetching review IDs : ', error);
        return null;
    }
}