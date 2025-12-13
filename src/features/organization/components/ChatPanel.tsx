import React, { useState, KeyboardEvent } from 'react';
import { X, Send } from 'lucide-react';
import { MessageList } from './MessageList';
import { Message } from '../types/chatbot.types';

interface ChatPanelProps {
  isOpen: boolean;
  messages: Message[];
  isTyping: boolean;
  onClose: () => void;
  onSendMessage: (text: string) => void;
}

export const ChatPanel: React.FC<ChatPanelProps> = ({
  isOpen,
  messages,
  isTyping,
  onClose,
  onSendMessage,
}) => {
  const [inputValue, setInputValue] = useState('');

  const handleSend = () => {
    if (inputValue.trim()) {
      onSendMessage(inputValue);
      setInputValue('');
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className={`fixed z-50 bg-white shadow-2xl
        transition-all duration-300 ease-out
        ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}

        /* Mobile: Full screen */
        inset-0

        /* Desktop: Floating panel */
        md:bottom-6 md:right-6 md:top-auto md:left-auto
        md:w-[400px] md:h-[600px] md:rounded-2xl

        /* Tablet: Slightly smaller */
        lg:w-[400px] lg:h-[600px]

        flex flex-col overflow-hidden`}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center overflow-hidden">
            <img
              src="/images/chatbot.png"
              alt="Dashboard Guide"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="font-semibold text-lg">Dashboard Guide</h3>
            <p className="text-xs text-blue-100">Your navigation assistant</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors"
          aria-label="Close chat"
        >
          <X size={20} />
        </button>
      </div>

      {/* Messages */}
      <MessageList messages={messages} isTyping={isTyping} />

      {/* Input Area */}
      <div className="border-t border-gray-200 p-4 bg-white">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything about the dashboard..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-full
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
              text-sm placeholder:text-gray-400"
          />
          <button
            onClick={handleSend}
            disabled={!inputValue.trim()}
            className={`w-12 h-12 rounded-full flex items-center justify-center
              transition-all duration-200 transform active:scale-95
              ${
                inputValue.trim()
                  ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            aria-label="Send message"
          >
            <Send size={20} />
          </button>
        </div>

        {/* Hint text */}
        <p className="text-xs text-gray-500 mt-2 text-center">
          Ask about features, navigation, or how to use the system
        </p>
      </div>
    </div>
  );
};
