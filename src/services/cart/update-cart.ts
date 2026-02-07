'use server'
import getAccessToken from "../access-token";

export default async function updateCartItem({productId, count}: {productId: string, count: number}) {
    const token = await getAccessToken();
    if(!token){
        throw new Error('Unauthorized...')
    }
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart/${productId}`, {
        cache: 'no-store',
        method: 'PUT',
        headers: {
            token: token,
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            count: count
        })
    });
    const payload = await response.json();
    console.log(payload);
    return payload;

}

// server action : when modifying data like post, put, delete
// cant use server action with get
