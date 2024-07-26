import { NextResponse } from "next/server";

export async function GET(req: any) {
  const krParam = req.nextUrl.searchParams.get("kr");
  const productTitle = req.nextUrl.searchParams.get("title");
  const mode = req.nextUrl.searchParams.get("mode") || ""; // THIS IS FOR EXTENSIONS SOA, SOE not on ebextractor
  const origin = req.nextUrl.searchParams.get("origin") || "";
  const kr: string | undefined = process.env.KR || undefined;
  const tag: string | undefined = process.env.TAG || undefined;
  if (kr === krParam && productTitle && tag !== undefined) {
    console.log("redirecting");
    return new NextResponse(null, {
      status: 302,
      headers: {
        Location:
          mode !== "SOA" && origin === ""
            ? `https://www.amazon.com/s?k=${encodeURIComponent(
                productTitle
              )}${tag}`
            : `${origin}/s?k=${encodeURIComponent(productTitle)}${tag}`,
      },
    });
  } else {
    console.log("ENV NOT FOUND --- redirecting");
    return new NextResponse(JSON.stringify({ data: [] }), {
      status: 302,
      headers: {
        "Content-Type": "application/json",
        Location:
          mode !== "SOA" && origin === ""
            ? `https://www.amazon.com/s?k=${encodeURIComponent(
                productTitle
              )}${tag}`
            : `${origin}/s?k=${encodeURIComponent(productTitle)}${tag}`,
      },
    });
  }
}
