import React from "react";

const Pagination = ({ pageNumber, goAhead, goPrev }) => {
  return (
    <div className="w-full flex justify-center mb-4">
      <button
        onClick={goPrev}
        className="p-2 border-2 border-indigo-500 text-indigo-500 border-r-0 rounded-l-xl"
      >
        Prev
      </button>
      <button className="p-2 border-2 border-indigo-500 text-indigo-500 bg-gray-300">
        {pageNumber}
      </button>
      <button
        onClick={goAhead}
        className="p-2 border-2 border-indigo-500 text-indigo-500 border-l-0 rounded-r-xl"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
