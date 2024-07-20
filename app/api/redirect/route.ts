import { NextResponse } from 'next/server';

export async function GET(req:any) {
  const krParam = req.nextUrl.searchParams.get("kr");
  const productTitle = req.nextUrl.searchParams.get("title");
  const kr = process.env.KR;
  if (kr === krParam && productTitle) {
    console.log("redirecting")
    return new NextResponse(null, {
      status: 302,
      headers: {
        Location: `https://www.amazon.com/s?k=${encodeURIComponent(productTitle)}`
      }
    });
  } else {
    return new NextResponse(JSON.stringify({ data: [] }), {
      status: 302,
      headers: {
        'Content-Type': 'application/json',
        Location: `https://www.amazon.com/s?k=${encodeURIComponent(productTitle)}`
      }
    });
  }
}
