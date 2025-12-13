import React, { useEffect, useRef } from 'react';
import { User } from 'lucide-react';
import { Message } from '../types/chatbot.types';

interface MessageListProps {
  messages: Message[];
  isTyping?: boolean;
}

export const MessageList: React.FC<MessageListProps> = ({ messages, isTyping = false }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex items-start gap-3 ${
            message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
          }`}
        >
          {/* Avatar */}
          <div
            className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center overflow-hidden ${
              message.sender === 'user'
                ? 'bg-blue-600 text-white'
                : 'bg-white border border-gray-200'
            }`}
          >
            {message.sender === 'user' ? (
              <User size={18} />
            ) : (
              <img
                src="/images/chatbot.png"
                alt="Assistant"
                className="w-full h-full object-cover"
              />
            )}
          </div>

          {/* Message Bubble */}
          <div
            className={`flex-1 max-w-[80%] ${
              message.sender === 'user' ? 'text-right' : 'text-left'
            }`}
          >
            <div
              className={`inline-block px-4 py-2 rounded-2xl ${
                message.sender === 'user'
                  ? 'bg-blue-600 text-white rounded-tr-none'
                  : 'bg-gray-100 text-gray-900 rounded-tl-none'
              }`}
            >
              <p className="text-sm whitespace-pre-wrap break-words">{message.text}</p>
            </div>
            <p className="text-xs text-gray-500 mt-1 px-2">
              {message.timestamp.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
          </div>
        </div>
      ))}

      {/* Typing Indicator */}
      {isTyping && (
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center overflow-hidden">
            <img
              src="/images/chatbot.png"
              alt="Assistant"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="bg-gray-100 px-4 py-3 rounded-2xl rounded-tl-none">
            <div className="flex gap-1">
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
            </div>
          </div>
        </div>
      )}

      {/* Auto-scroll anchor */}
      <div ref={messagesEndRef} />
    </div>
  );
};
