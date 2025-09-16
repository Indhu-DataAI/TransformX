import React from 'react';

const TextSummarizerComponent: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm border p-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Text Summarizer - Test Component
          </h1>
          <p className="text-gray-600">
            This is a test component to verify the integration is working.
            If you can see this message, the component is loading correctly!
          </p>
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-800">
              ✅ Component successfully loaded and rendered
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextSummarizerComponent;