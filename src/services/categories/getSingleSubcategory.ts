async function getSingleSubcategory(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/subcategories/${id}`);
  const responseData = await res.json();
  
  return responseData || [];
}

export default getSingleSubcategory