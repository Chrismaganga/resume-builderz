import React from 'react';

const TestResponsive: React.FC = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold text-blue-600 mb-4">
        Responsive Test
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-red-500 p-4 text-white rounded">
          <p className="text-sm md:text-base lg:text-lg">Small on mobile, medium on tablet, large on desktop</p>
        </div>
        <div className="bg-green-500 p-4 text-white rounded">
          <p className="text-sm md:text-base lg:text-lg">This should stack on mobile</p>
        </div>
        <div className="bg-blue-500 p-4 text-white rounded">
          <p className="text-sm md:text-base lg:text-lg">And be in a row on larger screens</p>
        </div>
      </div>
      <div className="mt-8">
        <button className="w-full md:w-auto px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700">
          Full width on mobile, auto on desktop
        </button>
      </div>
    </div>
  );
};

export default TestResponsive;
