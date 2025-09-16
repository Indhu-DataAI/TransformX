import React, { useState, useRef, useEffect } from 'react';
import { Upload, Send, MessageCircle, FileText, Bot, User, Loader, Plus } from 'lucide-react';
import { API_CONFIG, apiCall } from '../../../config/api';
import { qaSystemCall } from '../../../services/qaSystem';

interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface PageContent {
  text: string;
  page_num: number;
  file_name: string;
}

const TextSummarizerComponent: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');
  const [showChat, setShowChat] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const chatBoxRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.pdf') && !file.name.endsWith('.docx')) {
      setUploadStatus('Only .pdf and .docx files are supported!');
      return;
    }

    setSelectedFile(file);
    setUploadStatus('');
  };

  const extractTextFromPdf = async (file: File): Promise<PageContent[]> => {
    // For demonstration purposes, we'll simulate PDF text extraction
    // In a real implementation, you would use a library like pdf-lib or pdf2pic
    // Or send the file to a backend service for processing
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => {
        // Simulated extraction - in reality, you'd use proper PDF parsing
        // You could integrate with libraries like pdf-parse or send to backend
        const simulatedPages: PageContent[] = [];
        
        // Create some sample pages based on file
        const pageCount = Math.floor(Math.random() * 5) + 1; // 1-5 pages
        
        for (let i = 1; i <= pageCount; i++) {
          simulatedPages.push({
            text: `[Extracted content from page ${i} of ${file.name}. This is simulated content for demonstration. In a real implementation, this would contain the actual extracted text from your PDF document.]`,
            page_num: i,
            file_name: file.name
          });
        }
        
        resolve(simulatedPages);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadStatus('Please select a file first.');
      return;
    }

    setIsUploading(true);
    setUploadStatus('Extracting and uploading...');

    try {
      const pagesContent = await extractTextFromPdf(selectedFile);
      
      const payload = {
        rawPath: '/upload',
        requestContext: { http: { method: 'POST' } },
        body: JSON.stringify(pagesContent)
      };

      const response = await apiCall(API_CONFIG.textSummarizer.uploadEndpoint, {
        method: 'POST',
        body: JSON.stringify(payload)
      });

      const result = await response;
      
      if (result.statusCode === 200) {
        setUploadStatus('Document successfully uploaded to the Vector Store!');
        setShowChat(true);
        addChatMessage('Welcome! Ask me anything about your document.', 'bot');
      } else {
        setUploadStatus('Upload failed. Please try again.');
      }
    } catch (error) {
      console.error('Upload error:', error);
      setUploadStatus('Upload failed. Please check your connection and try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const addChatMessage = (text: string, sender: 'user' | 'bot') => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      text,
      sender,
      timestamp: new Date()
    };
    setChatMessages(prev => [...prev, newMessage]);
  };

  const handleSendMessage = async () => {
    const message = currentMessage.trim();
    if (!message || isLoading) return;

    addChatMessage(message, 'user');
    setCurrentMessage('');
    setIsLoading(true);

    try {
      const response = await qaSystemCall(message);
      addChatMessage(response, 'bot');
    } catch (error) {
      console.error('QA fetch error:', error);
      addChatMessage('Sorry, something went wrong. Please try again later.', 'bot');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  const startNewChat = () => {
    setChatMessages([]);
    addChatMessage('Hi! How can I help you with your document?', 'bot');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {!showChat ? (
          // Upload Section
          <div className="bg-white rounded-xl shadow-sm border p-8 text-center">
            <div className="mb-6">
              <FileText size={48} className="mx-auto text-blue-500 mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Upload Your Document</h2>
              <p className="text-gray-600">
                Upload a PDF or DOCX file to start chatting with your document
              </p>
            </div>

            <div className="space-y-4">
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.docx"
                onChange={handleFileSelect}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              
              <p className="text-sm text-gray-500">
                Only PDF or DOCX file formats are supported (max 50 MB)
              </p>

              <button
                onClick={handleUpload}
                disabled={!selectedFile || isUploading}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors mx-auto"
              >
                {isUploading ? (
                  <Loader size={16} className="animate-spin" />
                ) : (
                  <Upload size={16} />
                )}
                {isUploading ? 'Uploading...' : 'Upload'}
              </button>

              {uploadStatus && (
                <div className={`p-4 rounded-lg text-sm ${
                  uploadStatus.includes('successfully') 
                    ? 'bg-green-50 text-green-800' 
                    : 'bg-red-50 text-red-800'
                }`}>
                  {uploadStatus}
                </div>
              )}
            </div>
          </div>
        ) : (
          // Chat Section
          <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
            {/* Chat Header */}
            <div className="bg-gray-50 px-6 py-4 border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <MessageCircle size={20} className="text-blue-600" />
                  <h2 className="text-lg font-semibold text-gray-900">Chat with your Document</h2>
                </div>
                <button
                  onClick={startNewChat}
                  className="flex items-center gap-2 px-3 py-1.5 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Plus size={14} />
                  New Chat
                </button>
              </div>
            </div>

            {/* Chat Messages */}
            <div 
              ref={chatBoxRef}
              className="h-96 overflow-y-auto p-6 space-y-4"
            >
              {chatMessages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-start gap-3 ${
                    message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                  }`}
                >
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    message.sender === 'user' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {message.sender === 'user' ? <User size={16} /> : <Bot size={16} />}
                  </div>
                  
                  <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}>
                    <p className="text-sm">{message.text}</p>
                    <p className={`text-xs mt-1 ${
                      message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center">
                    <Bot size={16} />
                  </div>
                  <div className="bg-gray-100 text-gray-900 px-4 py-2 rounded-lg">
                    <div className="flex items-center gap-1">
                      <Loader size={12} className="animate-spin" />
                      <span className="text-sm">Thinking...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Chat Input */}
            <div className="border-t p-4">
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={currentMessage}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your question..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  disabled={isLoading}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!currentMessage.trim() || isLoading}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TextSummarizerComponent;