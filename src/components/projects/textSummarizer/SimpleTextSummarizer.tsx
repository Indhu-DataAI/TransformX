import React, { useState } from 'react';
import { Upload, FileText, MessageCircle, Bot, User } from 'lucide-react';

const TextSummarizerComponent: React.FC = () => {
  const [step, setStep] = useState<'upload' | 'chat'>('upload');
  const [messages, setMessages] = useState<Array<{id: string, text: string, sender: 'user' | 'bot'}>>([]);
  const [currentMessage, setCurrentMessage] = useState('');

  const handleFileUpload = () => {
    setStep('chat');
    setMessages([{ id: '1', text: 'Hello! Your document has been uploaded. What would you like to know about it?', sender: 'bot' }]);
  };

  const handleSendMessage = () => {
    if (!currentMessage.trim()) return;
    
    const userMsg = { id: Date.now().toString(), text: currentMessage, sender: 'user' as const };
    const botResponse = { 
      id: (Date.now() + 1).toString(), 
      text: `I understand you're asking: "${currentMessage}". This is a demo response. The document processing system is working correctly!`, 
      sender: 'bot' as const 
    };

    setMessages(prev => [...prev, userMsg, botResponse]);
    setCurrentMessage('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-6">
        {step === 'upload' ? (
          <div className="bg-white rounded-xl shadow-sm border p-8 text-center">
            <FileText size={48} className="mx-auto text-blue-500 mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Upload Your Document</h2>
            <p className="text-gray-600 mb-6">
              Upload a PDF or DOCX file to start chatting with your document
            </p>
            <input
              type="file"
              accept=".pdf,.docx"
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 mb-4"
            />
            <button
              onClick={handleFileUpload}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors mx-auto"
            >
              <Upload size={16} />
              Upload & Start Chat (Demo)
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
            <div className="bg-gray-50 px-6 py-4 border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <MessageCircle size={20} className="text-blue-600" />
                  <h2 className="text-lg font-semibold text-gray-900">Chat with your Document</h2>
                </div>
                <button
                  onClick={() => {
                    setStep('upload');
                    setMessages([]);
                  }}
                  className="px-3 py-1.5 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors"
                >
                  New Chat
                </button>
              </div>
            </div>

            <div className="h-96 overflow-y-auto p-6 space-y-4">
              {messages.map((message) => (
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
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t p-4">
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={currentMessage}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type your question..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!currentMessage.trim()}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  Send
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