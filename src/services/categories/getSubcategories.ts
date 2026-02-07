async function getSubcategories(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories/${id}/subcategories`);
  const responseData = await res.json();
  
  return responseData || [];
}

export default getSubcategories