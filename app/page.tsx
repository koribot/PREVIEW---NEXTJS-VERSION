"use client";
import { useCallback, useRef, useState } from "react";
import axios from "axios";
import Skeleton from "./components/Skeleton";
import Link from "next/link";
import Image from "next/image";
import logo from "../public/logo.svg";
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


function Home() {
  const spinRef = useRef<HTMLButtonElement>(null);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [searchResult, setSearchResult] = useState<SearchResult[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [searchLength, setSearchLength] = useState<number>(0)
  const fetchData = async (event: React.FormEvent<HTMLFormElement>) => {
    setIsFetching(true);
    event.preventDefault();
    const Form = event.target as HTMLFormElement;
    if (Form) {
      const Input = Form.elements.namedItem("search") as HTMLInputElement;
      const keywordValue = Input.value;

      if(keywordValue.length > 0){
        const searchUrl = `/api/yt?kr=walid&keyword=${keywordValue}`;
        const result = await axios.get(searchUrl);
        // console.log(result.data.items);
        setSearchResult(result.data.items);
        setIsFetching(false);
        setSearchLength(keywordValue.length)
      }
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
        <Image
          src={logo}
          alt="Preview"
          width={50}
          height={50}
          className="w-[50px]"
        />
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
            <span className="flex w-[fit-content] rounded-lg bg-white p-2 justify-center items-center">
              {/* <h1 className="italic font-sans text-center text-lg font-bold">
                WELCOME TO PREVIEW - PRODUCT REVIEWS
              </h1> */}
              <svg
                className="w-full h-12 animate-text"
                viewBox="0 0 600 50"
                xmlns="http://www.w3.org/2000/svg"
              >
                <style>
                  {`
                    @keyframes text-animation {
                      0% {
                        opacity: 0;
                        transform: translateY(-20px);
                      }
                      100% {
                        opacity: 1;
                        transform: translateY(0);
                      }
                    }

                    .animate-text text {
                      animation: text-animation 1s ease-in-out forwards;
                    }
                  `}
                </style>
                <text
                  x="50%"
                  y="50%"
                  dominantBaseline="middle"
                  textAnchor="middle"
                  fontFamily="Pacifico, cursive"
                  fontSize="24"
                  fontWeight="bold"
                  fill="#666262"
                >
                  <tspan x="50%" dy="0em">
                    Welcome to Preview - Product Reviews
                  </tspan>
                </text>
              </svg>
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
              <input required name="search" className="w-full p-5 rounded-md" />
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
                          <Image
                            width={48}
                            height={48}
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
                            href={`https://www.amazon.com/s?k=${encodeURIComponent(item.snippet.title)}`}
                            target="_blank"
                            className="text-blue-500 hover:underline"
                          >
                            Search on Amazon
                          </a>
                          <a
                            href={`https://www.ebay.com/sch/i.html?_nkw=${encodeURIComponent(item.snippet.title)}`}
                            target="_blank"
                            className="text-blue-500 hover:underline"
                          >
                            Search on eBay
                          </a>
                          <a
                            href={`https://www.walmart.com/search/?query=${encodeURIComponent(item.snippet.title)}`}
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
                          <text
                            x="50%"
                            y="50%"
                            dominantBaseline="middle"
                            textAnchor="middle"
                            fontFamily="Pacifico, cursive"
                            fontSize="24"
                            fontWeight="bold"
                            fill="#666262"
                          >
                            {searchLength > 0 ? "No Available Reviews" : "Search Now"}
                          </text>
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
