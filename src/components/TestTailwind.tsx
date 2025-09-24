import React from 'react';

const TestTailwind: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 gradient-text">
          Tailwind CSS Test
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">Primary Card</h2>
            <p className="text-gray-600 mb-4">This is a test card with primary styling.</p>
            <button className="btn-primary">Primary Button</button>
          </div>
          
          <div className="card-premium">
            <h2 className="text-xl font-semibold mb-4">Premium Card</h2>
            <p className="text-gray-600 mb-4">This is a premium card with enhanced styling.</p>
            <button className="btn-accent">Accent Button</button>
          </div>
          
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">Secondary Card</h2>
            <p className="text-gray-600 mb-4">This is a secondary card with different styling.</p>
            <button className="btn-secondary">Secondary Button</button>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <div className="inline-block p-6 bg-white rounded-2xl shadow-lg">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full mx-auto mb-4 animate-pulse"></div>
            <h3 className="text-lg font-semibold mb-2">Animated Element</h3>
            <p className="text-gray-600">This element has animations applied!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestTailwind;
