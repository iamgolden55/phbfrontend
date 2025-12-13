import { useState, useCallback } from 'react';
import { Message } from '../types/chatbot.types';

const welcomeMessage: Message = {
  id: 'welcome-1',
  text: '👋 Hi! I\'m your dashboard guide. I can help you navigate the system and answer questions about features.\n\n(RAG system will be integrated here to provide intelligent responses)',
  sender: 'bot',
  timestamp: new Date(),
};

export const useChatbotState = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([welcomeMessage]);
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text: text.trim(),
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate typing delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // TODO: RAG INTEGRATION POINT
    // This is where the RAG system will be called
    // Example: const response = await ragService.query(text);
    // For now, using placeholder response

    const botMessage: Message = {
      id: `bot-${Date.now()}`,
      text: 'RAG system will provide intelligent responses here based on the entire project context. Your message: "' + text + '"',
      sender: 'bot',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, botMessage]);
    setIsTyping(false);
  }, []);

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const clearHistory = useCallback(() => {
    setMessages([welcomeMessage]);
  }, []);

  return {
    isOpen,
    messages,
    isTyping,
    sendMessage,
    toggleOpen,
    clearHistory,
  };
};
