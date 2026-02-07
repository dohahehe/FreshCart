async function getProductsByCategory(categoryId: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products?category[in]=${categoryId}&limit=8&sort=-sold`
  )
  const productsData = await response.json()    
  return productsData.data || []
}

export default getProductsByCategory