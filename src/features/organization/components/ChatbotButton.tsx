import React from 'react';
import { X } from 'lucide-react';

interface ChatbotButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

export const ChatbotButton: React.FC<ChatbotButtonProps> = ({ isOpen, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`fixed bottom-6 right-6 z-50  w-24 h-24 rounded-full shadow-lg hover:shadow-xl
        transition-all duration-300 ease-out flex items-center justify-center
        ${isOpen ? 'bg-red-600 hover:bg-red-700' : 'bg-white hover:bg-gray-50'}
        ${isOpen ? 'text-white' : ''}
        transform hover:scale-110 active:scale-95 overflow-hidden`}
      aria-label={isOpen ? 'Close chatbot' : 'Open chatbot'}
    >
      {isOpen ? (
        <X size={24} className="transition-transform duration-300 text-white" />
      ) : (
        <img
          src="/images/chatbot.png"
          alt="Chatbot"
          className="w-full h-full object-cover transition-transform duration-300"
        />
      )}
    </button>
  );
};
