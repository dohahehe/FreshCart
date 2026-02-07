async function getSingleCategory(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories/${id}`);
  const responseData = await res.json();
  return responseData || [];
}

export default getSingleCategory