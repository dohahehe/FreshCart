async function getAllBrands() {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/brands`, {
        method: 'GET',
        next: {
        revalidate: 60      // ISR
        }
    });
    const responseData = await res.json();
    // console.log(responseData)
    return responseData.data;
    } catch (error) {
        console.error('Error fetching brands:', error);
        return [];
    } 
}

export default getAllBrands