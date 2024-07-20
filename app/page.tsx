
"use client"
import { useCallback, useRef, useState } from "react";
import axios from "axios";
import Skeleton from "./components/Skeleton";
import Link from "next/link";
import Image from "next/image";
import logo from "../public/logo.svg"
interface SearchResultSnippet {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: {
    default: {
      url: string;
      width: number;
      height: number;
    };
    medium: {
      url: string;
      width: number;
      height: number;
    };
    high: {
      url: string;
      width: number;
      height: number;
    };
  };
  channelTitle: string;
  liveBroadcastContent: string;
  publishTime: string;
}

interface SearchResult {
  kind: string;
  etag: string;
  id: {
    kind: string;
    videoId: string;
  };
  snippet: SearchResultSnippet;
}

// const dummyData: SearchResult[] = [
//   {
//     "kind": "youtube#searchResult",
//     "etag": "EYJWwZHSgezLrQEKGfCWZ7kSYYs",
//     "id": {
//       "kind": "youtube#video",
//       "videoId": "PsoE8OfIQeg"
//     },
//     "snippet": {
//       "publishedAt": "2023-09-27T23:27:51Z",
//       "channelId": "UC8RhCutmRSEUeKz7_Iamk2A",
//       "title": "I Bought The CHEAPEST SHOES From Temu And This Happened...",
//       "description": "I Bought The CHEAPEST SHOES From Temu And This Happened...! - In this video, I actually tried to buy cheap shoes and you ...",
//       "thumbnails": {
//         "default": {
//           "url": "https://i.ytimg.com/vi/PsoE8OfIQeg/default.jpg",
//           "width": 120,
//           "height": 90
//         },
//         "medium": {
//           "url": "https://i.ytimg.com/vi/PsoE8OfIQeg/mqdefault.jpg",
//           "width": 320,
//           "height": 180
//         },
//         "high": {
//           "url": "https://i.ytimg.com/vi/PsoE8OfIQeg/hqdefault.jpg",
//           "width": 480,
//           "height": 360
//         }
//       },
//       "channelTitle": "Xavier Kickz",
//       "liveBroadcastContent": "none",
//       "publishTime": "2023-09-27T23:27:51Z"
//     }
//   },
//   {
//     "kind": "youtube#searchResult",
//     "etag": "CYCwT-PyLFA3sJByAcJfw2VgqeI",
//     "id": {
//       "kind": "youtube#video",
//       "videoId": "Hmzwfq3Bs7U"
//     },
//     "snippet": {
//       "publishedAt": "2019-04-04T13:41:05Z",
//       "channelId": "UCUTnidTCb_w_GGptmZWdC2w",
//       "title": "Product Review: KEEN Utility San Jose Work Boots | Mister Safety Shoes",
//       "description": "We're the experts on fit and comfort for safety shoes and work boots. Check out our review of the new San Jose work boots from ...",
//       "thumbnails": {
//         "default": {
//           "url": "https://i.ytimg.com/vi/Hmzwfq3Bs7U/default.jpg",
//           "width": 120,
//           "height": 90
//         },
//         "medium": {
//           "url": "https://i.ytimg.com/vi/Hmzwfq3Bs7U/mqdefault.jpg",
//           "width": 320,
//           "height": 180
//         },
//         "high": {
//           "url": "https://i.ytimg.com/vi/Hmzwfq3Bs7U/hqdefault.jpg",
//           "width": 480,
//           "height": 360
//         }
//       },
//       "channelTitle": "Mister Safety Shoes ",
//       "liveBroadcastContent": "none",
//       "publishTime": "2019-04-04T13:41:05Z"
//     }
//   },
//   {
//     "kind": "youtube#searchResult",
//     "etag": "jd4HqPuoddZ0SIsyheQLZuFjCgs",
//     "id": {
//       "kind": "youtube#video",
//       "videoId": "-w9EWE0eNJ0"
//     },
//     "snippet": {
//       "publishedAt": "2020-11-27T19:57:47Z",
//       "channelId": "UCUTnidTCb_w_GGptmZWdC2w",
//       "title": "Product Review: Terra Findlay Work Boots | Mister Safety Shoes",
//       "description": "Link to Product | Terra Findlay: ...",
//       "thumbnails": {
//         "default": {
//           "url": "https://i.ytimg.com/vi/-w9EWE0eNJ0/default.jpg",
//           "width": 120,
//           "height": 90
//         },
//         "medium": {
//           "url": "https://i.ytimg.com/vi/-w9EWE0eNJ0/mqdefault.jpg",
//           "width": 320,
//           "height": 180
//         },
//         "high": {
//           "url": "https://i.ytimg.com/vi/-w9EWE0eNJ0/hqdefault.jpg",
//           "width": 480,
//           "height": 360
//         }
//       },
//       "channelTitle": "Mister Safety Shoes ",
//       "liveBroadcastContent": "none",
//       "publishTime": "2020-11-27T19:57:47Z"
//     }
//   },
//   {
//     "kind": "youtube#searchResult",
//     "etag": "DoTUMzbm_tM2BzdHt_B0Tx1EbUQ",
//     "id": {
//       "kind": "youtube#video",
//       "videoId": "mxY3TwGev5M"
//     },
//     "snippet": {
//       "publishedAt": "2022-05-23T21:22:13Z",
//       "channelId": "UCCAFgzfT2IvumifGYr1Mp9g",
//       "title": "Kizik Shoes Product Review",
//       "description": "In this video Cindy, AECorner's Physical Therapist reviews Kizik footwear. We had a viewer tell us they were having difficulty ...",
//       "thumbnails": {
//         "default": {
//           "url": "https://i.ytimg.com/vi/mxY3TwGev5M/default.jpg",
//           "width": 120,
//           "height": 90
//         },
//         "medium": {
//           "url": "https://i.ytimg.com/vi/mxY3TwGev5M/mqdefault.jpg",
//           "width": 320,
//           "height": 180
//         },
//         "high": {
//           "url": "https://i.ytimg.com/vi/mxY3TwGev5M/hqdefault.jpg",
//           "width": 480,
//           "height": 360
//         }
//       },
//       "channelTitle": "Adaptive Equipment Corner",
//       "liveBroadcastContent": "none",
//       "publishTime": "2022-05-23T21:22:13Z"
//     }
//   },
//   {
//     "kind": "youtube#searchResult",
//     "etag": "v1A5K1gT_lRItdo9Y2CsekuUFBY",
//     "id": {
//       "kind": "youtube#video",
//       "videoId": "DD3-rjml1uQ"
//     },
//     "snippet": {
//       "publishedAt": "2021-09-14T18:45:03Z",
//       "channelId": "UCUTnidTCb_w_GGptmZWdC2w",
//       "title": "Product Review: Reebok Work BB4500 Safety Shoes | Mister Safety Shoes",
//       "description": "Link to Product | Reebok Work BB4500 Safety Shoes: https://shop.mistersafetyshoes.com/products/bb4500-work-ib4132?",
//       "thumbnails": {
//         "default": {
//           "url": "https://i.ytimg.com/vi/DD3-rjml1uQ/default.jpg",
//           "width": 120,
//           "height": 90
//         },
//         "medium": {
//           "url": "https://i.ytimg.com/vi/DD3-rjml1uQ/mqdefault.jpg",
//           "width": 320,
//           "height": 180
//         },
//         "high": {
//           "url": "https://i.ytimg.com/vi/DD3-rjml1uQ/hqdefault.jpg",
//           "width": 480,
//           "height": 360
//         }
//       },
//       "channelTitle": "Mister Safety Shoes ",
//       "liveBroadcastContent": "none",
//       "publishTime": "2021-09-14T18:45:03Z"
//     }
//   },
//   {
//     "kind": "youtube#searchResult",
//     "etag": "h__aHZtt8aJHhVY3m6uXY4ULrYA",
//     "id": {
//       "kind": "youtube#video",
//       "videoId": "3YypQEBI1B0"
//     },
//     "snippet": {
//       "publishedAt": "2021-09-14T18:44:56Z",
//       "channelId": "UCUTnidTCb_w_GGptmZWdC2w",
//       "title": "Product Review: CAT Excavator Superlite Work Boots | Mister Safety Shoes",
//       "description": "Product Review: CAT Excavator Superlite Work Boots Visit our official website for more safety shoes and boots: ...",
//       "thumbnails": {
//         "default": {
//           "url": "https://i.ytimg.com/vi/3YypQEBI1B0/default.jpg",
//           "width": 120,
//           "height": 90
//         },
//         "medium": {
//           "url": "https://i.ytimg.com/vi/3YypQEBI1B0/mqdefault.jpg",
//           "width": 320,
//           "height": 180
//         },
//         "high": {
//           "url": "https://i.ytimg.com/vi/3YypQEBI1B0/hqdefault.jpg",
//           "width": 480,
//           "height": 360
//         }
//       },
//       "channelTitle": "Mister Safety Shoes ",
//       "liveBroadcastContent": "none",
//       "publishTime": "2021-09-14T18:44:56Z"
//     }
//   },
//   {
//     "kind": "youtube#searchResult",
//     "etag": "DcdYY_CaYxMVITuCAmZSgnV7L-4",
//     "id": {
//       "kind": "youtube#video",
//       "videoId": "J2_B6UnbheM"
//     },
//     "snippet": {
//       "publishedAt": "2022-05-10T09:31:08Z",
//       "channelId": "UCA3PF5YZzC1my6ontNTnYrQ",
//       "title": "PRODUCT REVIEW - SHOES MH500",
//       "description": "",
//       "thumbnails": {
//         "default": {
//           "url": "https://i.ytimg.com/vi/J2_B6UnbheM/default.jpg",
//           "width": 120,
//           "height": 90
//         },
//         "medium": {
//           "url": "https://i.ytimg.com/vi/J2_B6UnbheM/mqdefault.jpg",
//           "width": 320,
//           "height": 180
//         },
//         "high": {
//           "url": "https://i.ytimg.com/vi/J2_B6UnbheM/hqdefault.jpg",
//           "width": 480,
//           "height": 360
//         }
//       },
//       "channelTitle": "Quechua",
//       "liveBroadcastContent": "none",
//       "publishTime": "2022-05-10T09:31:08Z"
//     }
//   },
//   {
//     "kind": "youtube#searchResult",
//     "etag": "y9YlSsBneykJKDUNE4tdy9yKnRM",
//     "id": {
//       "kind": "youtube#video",
//       "videoId": "HN2K18kBPFY"
//     },
//     "snippet": {
//       "publishedAt": "2020-11-27T19:56:45Z",
//       "channelId": "UCUTnidTCb_w_GGptmZWdC2w",
//       "title": "Product Review: STC Trainer Safety Shoes | Mister Safety Shoes",
//       "description": "Link to Product | STC Trainer: https://shop.mistersafetyshoes.com/products/trainer-29029?_pos=1&_sid=827706aa7&_ss=r Visit ...",
//       "thumbnails": {
//         "default": {
//           "url": "https://i.ytimg.com/vi/HN2K18kBPFY/default.jpg",
//           "width": 120,
//           "height": 90
//         },
//         "medium": {
//           "url": "https://i.ytimg.com/vi/HN2K18kBPFY/mqdefault.jpg",
//           "width": 320,
//           "height": 180
//         },
//         "high": {
//           "url": "https://i.ytimg.com/vi/HN2K18kBPFY/hqdefault.jpg",
//           "width": 480,
//           "height": 360
//         }
//       },
//       "channelTitle": "Mister Safety Shoes ",
//       "liveBroadcastContent": "none",
//       "publishTime": "2020-11-27T19:56:45Z"
//     }
//   },
//   {
//     "kind": "youtube#searchResult",
//     "etag": "6x8HBHcNsWn-2_B7nH1w80hOZcE",
//     "id": {
//       "kind": "youtube#video",
//       "videoId": "gth4yPiP89k"
//     },
//     "snippet": {
//       "publishedAt": "2024-07-18T20:00:13Z",
//       "channelId": "UCaLCftFerly9xQl4hBkApOw",
//       "title": "Fitville Low Top Sturdy Core Hiking Shoes : Unboxing and Review",
//       "description": "The folks at FITVILLE have provided me a pair of their Low Top Sturdy Core Hiking Shoes for free, for me to unbox and review.",
//       "thumbnails": {
//         "default": {
//           "url": "https://i.ytimg.com/vi/gth4yPiP89k/default.jpg",
//           "width": 120,
//           "height": 90
//         },
//         "medium": {
//           "url": "https://i.ytimg.com/vi/gth4yPiP89k/mqdefault.jpg",
//           "width": 320,
//           "height": 180
//         },
//         "high": {
//           "url": "https://i.ytimg.com/vi/gth4yPiP89k/hqdefault.jpg",
//           "width": 480,
//           "height": 360
//         }
//       },
//       "channelTitle": "DC Outdoors",
//       "liveBroadcastContent": "none",
//       "publishTime": "2024-07-18T20:00:13Z"
//     }
//   },
//   {
//     "kind": "youtube#searchResult",
//     "etag": "PwL4O-4zw5OjW0cKn-RkJMecfKc",
//     "id": {
//       "kind": "youtube#video",
//       "videoId": "Wpfd2MYwmhY"
//     },
//     "snippet": {
//       "publishedAt": "2021-12-15T03:12:50Z",
//       "channelId": "UCa0tjrOzJSvifXmikpZZsbg",
//       "title": "Braille Skate Shoes - Do They Suck? - Skateboarding Product Review",
//       "description": "Non-paid Review by Park Sharks of Braille's \"First Try\" skate shoes! Please consider joining our Patreon to help us with our show!",
//       "thumbnails": {
//         "default": {
//           "url": "https://i.ytimg.com/vi/Wpfd2MYwmhY/default.jpg",
//           "width": 120,
//           "height": 90
//         },
//         "medium": {
//           "url": "https://i.ytimg.com/vi/Wpfd2MYwmhY/mqdefault.jpg",
//           "width": 320,
//           "height": 180
//         },
//         "high": {
//           "url": "https://i.ytimg.com/vi/Wpfd2MYwmhY/hqdefault.jpg",
//           "width": 480,
//           "height": 360
//         }
//       },
//       "channelTitle": "Park Sharks",
//       "liveBroadcastContent": "none",
//       "publishTime": "2021-12-15T03:12:50Z"
//     }
//   }
// ]

function Home() {
  const spinRef = useRef<HTMLButtonElement>(null);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [searchResult, setSearchResult] = useState<SearchResult[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const fetchData = async (event: React.FormEvent<HTMLFormElement>) => {
    setIsFetching(true);
    event.preventDefault();
    const Form = event.target as HTMLFormElement;
    if (Form) {
      const Input = Form.elements.namedItem("search") as HTMLInputElement;
      const keywordValue = Input.value;
      // const searchUrl = `${baseURl}?part=snippet&maxResults=10&q=Product Review ${keywordValue}&order=relevance&order=date&type=video&regionCode=US&key=${key}`;
      const searchUrl = `/api/yt?kr=walid&keyword=${keywordValue}`;
      const result = await axios.get(searchUrl);
      // console.log(result.data.items);
      setSearchResult(result.data.items);
      setIsFetching(false);
    }
  };

  const spin = useCallback(() => {
    // const key = import.meta.env.VITE_K;
    if (navigator.geolocation) {
      // navigator.geolocation.getCurrentPosition(function(position) {
      //   const lat = position.coords.latitude;
      //   const lon = position.coords.longitude;
      //   console.log(`User's latitude: ${lat}, longitude: ${lon}`);
      // });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }

    setIsSpinning(true);
    if (spinRef.current) {
      const div = spinRef.current;
      let angle = 0;
      const interval = setInterval(() => {
        angle += 10;
        div.style.transform = `rotateX(${angle}deg)`;
      }, 28);
      setTimeout(() => {
        clearInterval(interval);
        setIsSpinning(false);
      }, 1000);

      // 1000 / 28 = 35.7 round
      // 36 x 10 = 360deg
    }
  }, []);

  return (
    <>
      {/* MAIN BACKGROUND WITH DOTS */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        width="100%"
        height="100%"
        style={{ position: "fixed", top: 0, left: 0, zIndex: -1 }}
      >
        <defs>
          <pattern
            id="dots"
            x="0"
            y="0"
            width="10"
            height="10"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="5" cy="5" r="1" fill="#000000" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="#f2f2f2" />
        <rect width="100%" height="100%" fill="url(#dots)" opacity="0.2" />
      </svg>
      {/* END OF MAIN BACKGROUND */}


      {/* logo */}
      <Link href="/">
        <Image src={logo} alt="Preview" width={50} height={50} className="w-[50px]"/>
      </Link>
      {/* logo */}


      <div className="min-h-[100dvh] flex flex-col">
        <div className="p-16 flex justify-start h-[400px] items-center w-full relative flex-col">
          <button
            disabled={isSpinning}
            ref={spinRef && spinRef}
            onClick={spin}
            className="z-50"
          >
            <span className="flex w-[fit-content] rounded-lg bg-white p-5 justify-center items-center">
              <h1 className="italic font-sans text-center text-lg font-bold">
                WELCOME TO PREVIEW - PRODUCT REVIEWS
              </h1>
            </span>
          </button>

          <span className="absolute top-[100px] left-0 w-full h-0.5 bg-[#666262]">
            <span className="absolute top-0 left-[30%] w-0.5 h-[200px] bg-[#666262]"></span>
            <span className="absolute top-0 left-[70%] w-0.5 h-[200px] bg-[#666262]"></span>
          </span>
          <div></div>
          <div className="relative top-[130px] flex flex-col items-center w-full">
            <h1 className="text-[20px]">Search</h1>
            <form onSubmit={fetchData} className="w-full  bg-white">
              <input name="search" className="w-full p-5 rounded-md" />
            </form>
          </div>
        </div>
        <div className="p-16 h-full">
          <div className="bg-white p-5 rounded-lg border-2 h-full">
            <Skeleton isLoading={isFetching}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {searchResult.length > 0
                  ? searchResult.map((item) => (
                      <div
                        key={item.id.videoId}
                        className="flex flex-col items-center bg-gray-100 p-4 rounded-lg shadow-md"
                      >
                        <a
                          href={`https://www.youtube.com/watch?v=${item.id.videoId}`}
                          target="_blank"
                        >
                          <img
                            className="w-full h-48 object-contain mb-4"
                            src={item.snippet.thumbnails.high.url}
                            alt={item.snippet.title}
                          />
                        </a>
                        <h2 className="text-lg font-semibold mb-2">
                          {item.snippet.title}
                        </h2>
                        <div className="flex flex-col gap-2 w-full">
                          <a
                            href={`https://www.amazon.com/s?k=${item.snippet.title}`}
                            target="_blank"
                            className="text-blue-500 hover:underline"
                          >
                            Search on Amazon
                          </a>
                          <a
                            href={`https://www.ebay.com/sch/i.html?_nkw=${item.snippet.title}`}
                            target="_blank"
                            className="text-blue-500 hover:underline"
                          >
                            Search on eBay
                          </a>
                          <a
                            href={`https://www.walmart.com/search/?query=${item.snippet.title}`}
                            target="_blank"
                            className="text-blue-500 hover:underline"
                          >
                            Search on Walmart
                          </a>
                        </div>
                      </div>
                    ))
                  : Array.from({ length: 3 }).map((_, index) => (
                      <div
                        key={index}
                        className="flex flex-col items-center bg-gray-100 p-4 rounded-lg shadow-md"
                      >
                        <svg
                          className="w-full h-48 mb-4"
                          viewBox="0 0 300 200"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect width="100%" height="100%" fill="#cbd5e0" />
                          <rect
                            x="20"
                            y="20"
                            width="260"
                            height="160"
                            fill="#e2e8f0"
                          />
                        </svg>
                        <div className="w-3/4 h-6 bg-gray-300 mb-2"></div>
                        <div className="w-full h-4 bg-gray-300 mb-2"></div>
                        <div className="w-full h-4 bg-gray-300 mb-2"></div>
                        <div className="w-full h-4 bg-gray-300"></div>
                      </div>
                    ))}
              </div>
            </Skeleton>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
