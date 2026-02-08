async function getProducts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
    method: 'GET',
    // cache: 'force-cache'  SSG
    // cache: 'no-store'     SSR
    next: {
      revalidate: 60      // ISR
    }
  });
  const responseData = await res.json();
  // console.log(responseData)
  return responseData.data;
}

export default getProducts