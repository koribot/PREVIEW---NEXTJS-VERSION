import React from "react";

type SpinningProps = {
  children: React.ReactNode;
  isLoading: boolean;
};

const Skeleton: React.FC<SpinningProps> = ({ isLoading, children }) => {
  return (
    <div className="w-full" style={{ minHeight: "inherit!important" }}>
      {!isLoading ? (
        children
      ) : (
        <div
          className="flex justify-center items-center w-full flex-col"
          style={{ minHeight: "inherit!important" }}
        >
          {/* <img className='w-[50px] absolute' src="public/spinning.svg" alt="" /> */}
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="flex flex-col w-full items-center bg-gray-100 p-4 rounded-lg shadow-md animate-skeleton"
            >
              <div className="w-full h-48 bg-gray-300 mb-4"></div>
              <div className="w-3/4 h-6 bg-gray-300 mb-2"></div>
              <div className="w-full h-4 bg-gray-300 mb-2"></div>
              <div className="w-full h-4 bg-gray-300 mb-2"></div>
              <div className="w-full h-4 bg-gray-300"></div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Skeleton;
