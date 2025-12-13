import { useState, useCallback } from 'react';
import { Message } from '../../organization/types/chatbot.types';

const welcomeMessage: Message = {
  id: 'welcome-employee-1',
  text: '👋 Hi! I\'m your Employee Assistant. I can help you with:\n\n• Checking your attendance and leaves\n• Viewing your payslips and salary details\n• Managing your tasks and projects\n• Updating your profile\n• Understanding HR policies\n\n(RAG system will be integrated here to provide intelligent responses about employee features)',
  sender: 'bot',
  timestamp: new Date(),
};

export const useEmployeeChatbotState = () => {
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

    // TODO: RAG INTEGRATION POINT FOR EMPLOYEE FEATURES
    // This is where the employee-specific RAG system will be called
    // Focus areas:
    // - Attendance tracking and management
    // - Leave requests and approvals
    // - Payroll and salary information
    // - Project and task management
    // - Performance reviews
    // - Training and development
    // Example: const response = await employeeRagService.query(text);

    // Placeholder response with employee context
    let responseText = '';

    // Simple keyword detection for employee-related queries
    const lowerText = text.toLowerCase();

    if (lowerText.includes('leave') || lowerText.includes('vacation') || lowerText.includes('time off')) {
      responseText = '📅 **Leave Management:**\n\nTo request leave:\n1. Go to Leaves page from the sidebar\n2. Click "Request Leave"\n3. Select leave type and dates\n4. Add a reason and submit\n\nYour manager will be notified for approval.\n\n(Detailed leave policies will be available through the RAG system)';
    } else if (lowerText.includes('attendance') || lowerText.includes('check in') || lowerText.includes('clock')) {
      responseText = '🕒 **Attendance:**\n\nView your attendance records on the Attendance page. You can:\n• See your daily check-in/check-out times\n• View monthly attendance summary\n• Track your working hours\n• Export attendance reports\n\n(RAG system will provide detailed attendance policies and procedures)';
    } else if (lowerText.includes('payslip') || lowerText.includes('salary') || lowerText.includes('payment')) {
      responseText = '💰 **Payslips:**\n\nAccess your payslips on the Payslips page. You can:\n• View current and past payslips\n• Download PDF copies\n• See salary breakdown (basic, allowances, deductions)\n• Check tax information\n\n(RAG system will explain salary components and benefits)';
    } else if (lowerText.includes('task') || lowerText.includes('project') || lowerText.includes('assignment')) {
      responseText = '📋 **Tasks & Projects:**\n\nManage your work on the Tasks and Projects pages:\n• View assigned tasks\n• Update task status\n• Track project progress\n• Collaborate with team members\n\n(RAG system will provide project management guidance)';
    } else if (lowerText.includes('profile') || lowerText.includes('update') || lowerText.includes('personal')) {
      responseText = '👤 **My Profile:**\n\nUpdate your information on the Profile page:\n• Personal details\n• Contact information\n• Emergency contacts\n• Bank account details\n• Documents\n\n(RAG system will guide you through profile updates)';
    } else {
      responseText = `I received your message: "${text}"\n\nRAG system will provide intelligent responses about employee features based on the entire project context.\n\nPopular topics I can help with:\n• Leave requests\n• Attendance tracking\n• Payslip information\n• Task management\n• Profile updates`;
    }

    const botMessage: Message = {
      id: `bot-${Date.now()}`,
      text: responseText,
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