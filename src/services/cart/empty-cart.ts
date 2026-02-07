'use server'
import getAccessToken from "../access-token";

export default async function emptyCart() {
    const token = await getAccessToken();
    if(!token){
        throw new Error('Unauthorized...')
    }
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart`, {
        cache: 'no-store',
        method: 'DELETE',
        headers: {
            token: token,
            'content-type': 'application/json'
        }
    });
    const payload = await response.json();
    console.log(payload);
    return payload;

}

// server action : when modifying data like post, put, delete
// cant use server action with get
