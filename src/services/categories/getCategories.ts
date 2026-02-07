async function getCategories() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`);
  const responseData = await res.json();
  return responseData;
}

export default getCategories