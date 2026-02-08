async function getSingleBrand(id: string) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/brands/${id}`);
        const responseData = await res.json();
        // console.log(responseData);        
        return responseData.data;
    } catch (error) {
        console.error('Error fetching brands:', error);
        return {};
    }
  
}

export default getSingleBrand