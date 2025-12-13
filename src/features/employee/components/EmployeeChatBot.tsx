import React from 'react';
import { ChatbotButton } from '../../organization/components/ChatbotButton';
import { ChatPanel } from '../../organization/components/ChatPanel';
import { useEmployeeChatbotState } from '../hooks/useEmployeeChatbotState';

/**
 * EmployeeChatBot - Specialized chatbot for employee dashboard
 *
 * This component provides a floating chatbot interface specifically designed
 * for employees to get help with:
 * - Attendance and leaves
 * - Payslips and salary information
 * - Tasks and projects
 * - Profile management
 * - HR policies and procedures
 *
 * It reuses the UI components from the organization chatbot but has its own
 * state management and RAG system focused on employee-related queries.
 *
 * @returns React component
 */
export const EmployeeChatBot: React.FC = () => {
  const { isOpen, messages, isTyping, sendMessage, toggleOpen } = useEmployeeChatbotState();

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

export default EmployeeChatBot;