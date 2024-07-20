import axios from "axios";


export async function GET(res:any) {
  const krParam = res.nextUrl.searchParams.get("kr");
  const keywordValue = res.nextUrl.searchParams.get("keyword");
  const kr: string | undefined = process.env.KR
  const kyt: string | undefined = process.env.KYT 
  const BASE_YT_URL: string | undefined = process.env.BASE_YT_URL 
  if(kr === krParam && kyt!==undefined && BASE_YT_URL!==undefined && kr!==undefined)
  {
    const resp = await axios.get(`${BASE_YT_URL}?part=snippet&maxResults=10&q=Product Review ${keywordValue}&order=relevance&order=date&type=video&regionCode=US&key=${kyt}`)
    console.log(resp)
    return  Response.json(resp.data)
  } else{
    Response.json({data:[]})
  }
}