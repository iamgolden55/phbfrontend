export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export interface ChatbotState {
  isOpen: boolean;
  messages: Message[];
}

export interface ChatbotProps {
  // Future props for RAG configuration
  ragEndpoint?: string;
  projectContext?: string;
}
