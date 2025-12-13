import React from 'react';
import { ChatbotButton } from './ChatbotButton';
import { ChatPanel } from './ChatPanel';
import { useChatbotState } from '../hooks/useChatbotState';

/**
 * OrganizationChatBot - Persistent chatbot for organization dashboard
 *
 * This component provides a floating chatbot interface that appears on all
 * organization dashboard pages. It includes a floating action button and
 * an expandable chat panel.
 *
 * The chatbot is designed to help users navigate the dashboard and understand
 * features. The RAG (Retrieval Augmented Generation) system will be integrated
 * in the useChatbotState hook to provide intelligent responses.
 *
 * @returns React component
 */
export const OrganizationChatBot: React.FC = () => {
  const { isOpen, messages, isTyping, sendMessage, toggleOpen } = useChatbotState();

  return (
    <>
      {/* Floating Action Button */}
      <ChatbotButton isOpen={isOpen} onClick={toggleOpen} />

      {/* Chat Panel */}
      <ChatPanel
        isOpen={isOpen}
        messages={messages}
        isTyping={isTyping}
        onClose={toggleOpen}
        onSendMessage={sendMessage}
      />
    </>
  );
};

export default OrganizationChatBot;
