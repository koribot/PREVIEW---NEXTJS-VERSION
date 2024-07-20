import { NextResponse } from 'next/server';

export async function GET(req:any) {
  const krParam = req.nextUrl.searchParams.get("kr");
  const productTitle = req.nextUrl.searchParams.get("title");
  const kr: string | undefined = process.env.KR || undefined;
  const tag: string | undefined = process.env.TAG || undefined;
  if (kr === krParam && productTitle && tag!==undefined) {
    console.log("redirecting")
    return new NextResponse(null, {
      status: 302,
      headers: {
        Location: `https://www.amazon.com/s?k=${decodeURIComponent(productTitle)}${tag}`
      }
    });
  } else {
    console.log("ENV NOT FOUND --- redirecting")
    return new NextResponse(JSON.stringify({ data: [] }), {
      status: 302,
      headers: {
        'Content-Type': 'application/json',
        Location: `https://www.amazon.com/s?k=${decodeURIComponent(productTitle)}${tag}`
      }
    });
  }
}
