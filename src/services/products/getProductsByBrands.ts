async function getProductsByBrands(id: string) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products?brand=${id}`);
        const responseData = await res.json();
        return responseData.data;
    } catch (error) {
        console.error('Error fetching ProductsByBrands:', error);
        return [];
    }
 
}

export default getProductsByBrands