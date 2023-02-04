import React from "react";

const Graph = () => {
  const graphData = {
    InProgress: 12,
    InReview: 9,
    Completed: 20,
    Rejected: 12,
  };
  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-transparent/70">
      <div className="h-11/12 w-11/12 md:h-[500px] md:w-[500px] z-50 bg-white p-2">
        <div className="relative ml-auto w-20 top-0 border border-primary-color-5 bg-primary-color-3 px-4 py-2 rounded-md font-semibold text-lg">
          Close
        </div>
        <div className="">{JSON.stringify(graphData)}</div>
      </div>
    </div>
  );
};

export default Graph;
