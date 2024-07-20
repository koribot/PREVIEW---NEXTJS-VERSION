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
        Location: `https://www.amazon.com/s?k=${encodeURIComponent(productTitle)}&camp=1789&creative=9325&linkCode=ur2&linkId=984c3849db69939faa311c4f30514b61&tag=wcawasa0f-20`
      }
    });
    // https://www.amazon.com/s?k=shoes&camp=1789&creative=9325&linkCode=ur2&linkId=984c3849db69939faa311c4f30514b61&tag=wcawasa0f-20
    // https://www.amazon.com/s?k=HP+206A+-+Yellow+Original+LaserJet+Toner+Cartridge+-+W2112A&tag=wcawasa0f-20
    // https://www.amazon.com/gp/search?ie=UTF8&tag=wcawasa-20&linkCode=ur2&linkId=4622022be3cea2a7eb59b51d6ce3ff8e&camp=1789&creative=9325&index=aps&keywords=%20HP%20206A%20-%20Yellow%20Original%20LaserJet%20Toner%20Cartridge%20-%20W2112A
  } else {
    return new NextResponse(JSON.stringify({ data: [] }), {
      status: 302,
      headers: {
        'Content-Type': 'application/json',
        Location: `https://www.amazon.com/s?k=${encodeURIComponent(productTitle)}&camp=1789&creative=9325&linkCode=ur2&linkId=984c3849db69939faa311c4f30514b61&tag=wcawasa0f-20`
      }
    });
  }
}
