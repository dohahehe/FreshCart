async function getProductsBySubcategory(subcategoryId: string, limit: number = 8) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products?category[in]=${subcategoryId}&limit=${limit}&sort=-sold`
  );
  
  const productsData = await response.json();
  console.log('from function', productsData);
  
  return productsData.data || []; 
}

export default getProductsBySubcategory;