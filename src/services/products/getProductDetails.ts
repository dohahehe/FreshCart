async function getProductDetails(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`);
  const responseData = await res.json();
  return responseData.data;
}

export default getProductDetails