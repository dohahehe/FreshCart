import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
    req: NextRequest,
    context: { params: Promise<{ cartId: string }> }
) {
    try {
        const token = await getToken({ req });
        const { cartId } = await context.params;
        
        if (!token) {
            return NextResponse.json(
                { error: 'Unauthorized', status: 401 },
                { status: 401 }
            );
        }

        // Get shipping address from request body
        const body = await req.json();
        const { shippingAddress } = body;

        if (!shippingAddress?.details || !shippingAddress?.phone || !shippingAddress?.city) {
            return NextResponse.json(
                { 
                    error: 'Missing required fields',
                    message: 'Please provide details, phone, and city in shippingAddress'
                },
                { status: 400 }
            );
        }

        // Call external API to create cash order
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/orders/${cartId}`,
            {
                method: 'POST',
                headers: {
                    'token': token.token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ shippingAddress })
            }
        );

        const payload = await response.json();

        return NextResponse.json(payload, { status: response.status });

    } catch (error: any) {
        console.error('Create cash order error:', error);
        return NextResponse.json(
            { 
                error: 'Internal server error',
                message: error.message || 'Something went wrong'
            },
            { status: 500 }
        );
    }
}