// Configuration for API endpoints
export const API_CONFIG = {
  // Text Summarizer endpoints
  textSummarizer: {
    uploadEndpoint: 'https://l3xxqcqfo0.execute-api.us-east-1.amazonaws.com/Development',
    qaEndpoint: '/qa_system', // This would be proxied through your backend
  },
  
  // Other service endpoints
  ragEvaluator: {
    baseUrl: process.env.VITE_RAG_API_BASE_URL || 'http://localhost:3001',
  },
};

// API utility functions
export const apiCall = async (url: string, options: RequestInit = {}) => {
  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, defaultOptions);
    
    if (!response.ok) {
      throw new Error(`API call failed: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API call error:', error);
    throw error;
  }
};

export default API_CONFIG;