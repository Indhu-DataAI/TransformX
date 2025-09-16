// Mock QA system service for demonstration
export interface QARequest {
  input: string;
}

export interface QAResponse {
  response: string;
}

// Mock responses for demonstration
const mockResponses = [
  "Based on the document you uploaded, here's what I found...",
  "The document discusses several key points related to your question...",
  "According to the content in your document, the answer is...",
  "I can see in the uploaded material that...",
  "The document provides information about this topic in the following way...",
];

export const mockQASystem = async (request: QARequest): Promise<QAResponse> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
  
  // Generate a mock response
  const randomResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)];
  const contextualResponse = `${randomResponse} Your question was: "${request.input}"`;
  
  return {
    response: contextualResponse
  };
};

// For production, this would make actual API calls to your backend
export const qaSystemCall = async (input: string): Promise<string> => {
  try {
    // In development/demo mode, use mock
    if (process.env.NODE_ENV === 'development' || !process.env.VITE_QA_API_URL) {
      const result = await mockQASystem({ input });
      return result.response;
    }
    
    // In production, make real API call
    const response = await fetch(process.env.VITE_QA_API_URL || '/api/qa_system', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ input }),
    });
    
    if (!response.ok) {
      throw new Error(`QA API error: ${response.status}`);
    }
    
    const data = await response.json();
    return data.response || 'No response received from the system.';
    
  } catch (error) {
    console.error('QA System Error:', error);
    return 'I apologize, but I encountered an error processing your question. Please try again.';
  }
};