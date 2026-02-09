// /app/api/orders/checkout-session/[cartId]/route.ts
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

        const body = await req.json();
        const { shippingAddress } = body;
        
        const { searchParams } = new URL(req.url);
        let returnUrl = searchParams.get('url') || body.returnUrl;
        
        if (!returnUrl) {
            returnUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
        }

        const fullReturnUrl = `${returnUrl}/order-confirmation`;

        if (!shippingAddress?.details || !shippingAddress?.phone || !shippingAddress?.city) {
            return NextResponse.json(
                { 
                    error: 'Missing required fields',
                    message: 'Please provide details, phone, and city in shippingAddress'
                },
                { status: 400 }
            );
        }

        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/orders/checkout-session/${cartId}?url=${encodeURIComponent(fullReturnUrl)}`,
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
        console.error('Create checkout session error:', error);
        return NextResponse.json(
            { 
                error: 'Internal server error',
                message: error.message || 'Something went wrong'
            },
            { status: 500 }
        );
    }
}