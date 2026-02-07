'use server'
import getAccessToken from "../access-token";

export default async function addToCart(productId: string) {
    const token = await getAccessToken();
    if(!token){
        throw new Error('Unauthorized...')
    }
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart`, {
        cache: 'no-store',
        method: 'POST',
        headers: {
            token: token,
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            productId
        })
    });
    const payload = await response.json();
    console.log(payload);
    return payload;

}

// server action : when modifying data like post, put, delete
// cant use server action with get
