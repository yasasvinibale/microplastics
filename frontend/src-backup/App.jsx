import React from 'react';

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center text-blue-600">
          MicroPlastic Detector
        </h1>
        <p className="text-center text-gray-600">
          Welcome to the MicroPlastic Detection Platform
        </p>
        <div className="mt-6">
          <button 
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            onClick={() => alert('Application is working!')}
          >
            Test Button
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
