import React from "react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="relative w-24 h-24">
        <div className="absolute inset-0 border-4 border-blue-500 rounded-full animate-spin border-t-transparent"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold text-blue-500">S</span>
        </div>
      </div>
    </div>
  );
};

export default Loading;
