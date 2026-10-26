import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || 'http://localhost:9000';
const PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || 'pk_d1d4eb809e191e41c5af08410e2e8b11214cdf8876e907fe3db4ed1cbd58c5d0';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!id) {
    return new NextResponse('Order ID is required', { status: 400 });
  }

  try {
    const res = await fetch(`${BACKEND_URL}/store/orders/${id}/invoice`, {
      headers: {
        'x-publishable-api-key': PUBLISHABLE_KEY,
      },
      cache: 'no-store',
    });

    if (!res.ok) {
      const err = await res.text();
      return new NextResponse(err, { 
        status: res.status,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const pdfBuffer = await res.arrayBuffer();

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="BeyondHumans-TaxInvoice-${id}.pdf"`,
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    });
  } catch (error) {
    console.error('[Storefront API] Failed to proxy invoice download:', error);
    return new NextResponse(JSON.stringify({ error: 'Failed to retrieve invoice from backend' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
