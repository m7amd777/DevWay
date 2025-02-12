import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X, Minimize2, Maximize2 } from 'lucide-react';

const ChatBot = () => {
  // Add left position class
  const chatPosition = "fixed bottom-4 left-4 z-50";
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      content: 'Hello! I\'m DevBot, your AI ethics assistant. How can I help you today?',
      options: [
        'Learn about AI Ethics',
        'Regional Guidelines',
        'Development Goals',
        'About Devway'
      ]
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (userMessage) => {
    // Add user message
    const newMessages = [...messages, { type: 'user', content: userMessage }];
    setMessages(newMessages);
    setInputValue('');

    // Simulate bot response based on user input
    setTimeout(() => {
      let botResponse = {
        type: 'bot',
        content: '',
        options: []
      };

      const lowercaseMessage = userMessage.toLowerCase();

      if (lowercaseMessage.includes('ethics') || userMessage === 'Learn about AI Ethics') {
        botResponse.content = 'AI Ethics covers principles like fairness, transparency, and accountability. Would you like to learn more about:';
        botResponse.options = [
          'Fairness in AI',
          'AI Transparency',
          'AI Accountability',
          'Privacy Concerns'
        ];
      } else if (lowercaseMessage.includes('region') || userMessage === 'Regional Guidelines') {
        botResponse.content = 'We have information about AI regulations in different regions. Which area interests you?';
        botResponse.options = [
          'US Regulations',
          'EU Guidelines',
          'GCC Policies',
          'Global Standards'
        ];
      } else if (lowercaseMessage.includes('goal') || userMessage === 'Development Goals') {
        botResponse.content = 'Our development goals focus on responsible AI creation. What aspect would you like to explore?';
        botResponse.options = [
          'Ethical Development',
          'Safety Standards',
          'Best Practices',
          'Implementation Guidelines'
        ];
      } else if (lowercaseMessage.includes('about') || userMessage === 'About Devway') {
        botResponse.content = 'Devway is your comprehensive resource for AI ethics and guidelines. Would you like to know more about:';
        botResponse.options = [
          'Our Mission',
          'Team',
          'Services',
          'Contact Us'
        ];
      } else {
        botResponse.content = 'I can help you with information about AI ethics, guidelines, and development practices. What would you like to know?';
        botResponse.options = [
          'Learn about AI Ethics',
          'Regional Guidelines',
          'Development Goals',
          'About Devway'
        ];
      }

      setMessages([...newMessages, botResponse]);
    }, 1000);
  };

  const handleOptionClick = (option) => {
    handleSendMessage(option);
  };

  return (
    <div className={chatPosition}>
      {/* Chat Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-[#000C3D] text-white p-4 rounded-full shadow-lg hover:bg-[#001066] transition-colors"
        >
          <MessageCircle size={24} />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className={`bg-white rounded-lg shadow-xl w-80 ${isMinimized ? 'h-14' : 'h-96'} flex flex-col`}>
          {/* Chat Header */}
          <div className="bg-[#000C3D] text-white p-3 rounded-t-lg flex justify-between items-center">
            <div className="flex items-center gap-2">
              <MessageCircle size={20} />
              <span className="font-medium">DevBot</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="hover:text-[#66FF00] transition-colors"
              >
                {isMinimized ? <Maximize2 size={18} /> : <Minimize2 size={18} />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:text-[#66FF00] transition-colors"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Chat Messages */}
          {!isMinimized && (
            <>
              <div className="flex-1 overflow-y-auto p-4">
                {messages.map((message, index) => (
                  <div key={index} className="mb-4">
                    <div className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div
                        className={`rounded-lg p-3 max-w-[80%] ${
                          message.type === 'user'
                            ? 'bg-[#000C3D] text-white'
                            : 'bg-gray-100 text-black'
                        }`}
                      >
                        {message.content}
                      </div>
                    </div>
                    {message.options && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {message.options.map((option, optionIndex) => (
                          <button
                            key={optionIndex}
                            onClick={() => handleOptionClick(option)}
                            className="bg-gray-100 hover:bg-gray-200 text-sm px-3 py-1 rounded-full transition-colors"
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Chat Input */}
              <div className="p-3 border-t">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && inputValue.trim()) {
                        handleSendMessage(inputValue.trim());
                      }
                    }}
                    placeholder="Type your message..."
                    className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:border-[#000C3D]"
                  />
                  <button
                    onClick={() => {
                      if (inputValue.trim()) {
                        handleSendMessage(inputValue.trim());
                      }
                    }}
                    className="bg-[#000C3D] text-white p-2 rounded-full hover:bg-[#001066] transition-colors"
                  >
                    <Send size={20} />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ChatBot;