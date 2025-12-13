# Organization Dashboard Chatbot - Architecture & Implementation Guide

## 📋 Table of Contents
1. [Overview](#overview)
2. [Current Architecture](#current-architecture)
3. [Component Evolution Guide](#component-evolution-guide)
4. [RAG System Integration](#rag-system-integration)
5. [Navigation & Routing System](#navigation--routing-system)
6. [Knowledge Base Structure](#knowledge-base-structure)
7. [Intent Detection System](#intent-detection-system)
8. [Quick Actions Implementation](#quick-actions-implementation)
9. [Implementation Roadmap](#implementation-roadmap)
10. [Code Examples](#code-examples)

---

## 📖 Overview

The Organization Dashboard Chatbot is a persistent, intelligent guide designed to help healthcare professionals navigate the hospital management system. It combines:

- **RAG (Retrieval Augmented Generation)** for context-aware responses
- **Smart Navigation** to guide users to specific pages
- **Intent Detection** to understand user queries
- **Quick Actions** for common tasks
- **Page Context Awareness** to provide relevant help

### Core Capabilities (Future)
1. ✅ Answer questions about system features
2. ✅ Navigate users to specific pages
3. ✅ Provide step-by-step tutorials
4. ✅ Detect medical vs. system questions
5. ✅ Execute quick actions (create patient, book appointment)
6. ✅ Context-aware suggestions based on current page
7. ✅ Troubleshooting guidance

---

## 🏗️ Current Architecture

### File Structure
```
src/features/organization/
├── components/
│   ├── OrganizationChatBot.tsx         # Main container
│   ├── ChatbotButton.tsx               # Floating action button
│   ├── ChatPanel.tsx                   # Chat interface
│   └── MessageList.tsx                 # Message display
├── hooks/
│   └── useChatbotState.ts              # State management
└── types/
    └── chatbot.types.ts                # TypeScript interfaces

src/layouts/
└── ModernOrganizationLayout.tsx        # Integration point
```

### Current State
- ✅ UI components fully functional
- ✅ Persistent across all organization pages
- ✅ Responsive design (mobile + desktop)
- ✅ Placeholder for RAG integration
- ⏳ RAG system (to be implemented)
- ⏳ Navigation logic (to be implemented)
- ⏳ Intent detection (to be implemented)
- ⏳ Knowledge base (to be implemented)

---

## 🔮 Component Evolution Guide

### 1. OrganizationChatBot.tsx
**Current Purpose**: Main container component that renders the button and panel.

**Future Evolution**:
```tsx
// Future: Add context providers and advanced state
import { ChatbotProvider } from '../contexts/ChatbotContext';
import { useLocation } from 'react-router-dom';

export const OrganizationChatBot: React.FC = () => {
  const location = useLocation();
  const currentPage = location.pathname;

  return (
    <ChatbotProvider currentPage={currentPage}>
      <ChatbotButton />
      <ChatPanel />
    </ChatbotProvider>
  );
};
```

**Future Responsibilities**:
- Provide global chatbot context
- Track current page for context-aware responses
- Manage chatbot analytics
- Handle page-specific suggestions
- Initialize RAG service on mount

**New Props to Add**:
- `onNavigate`: Callback for navigation actions
- `currentUser`: User context for personalized responses
- `organizationType`: Hospital/NGO/Pharmacy for tailored content

---

### 2. ChatbotButton.tsx
**Current Purpose**: Floating action button with custom image.

**Future Evolution**:
```tsx
// Future: Add notification badges and page-specific hints
export const ChatbotButton: React.FC<ChatbotButtonProps> = ({
  isOpen,
  onClick,
  hasUnreadMessages = false,
  showHint = false,
  hintText = "Need help?"
}) => {
  return (
    <>
      <button>
        {/* Current image/icon */}

        {/* NEW: Notification badge */}
        {hasUnreadMessages && (
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500
            rounded-full animate-pulse" />
        )}
      </button>

      {/* NEW: Contextual hint tooltip */}
      {showHint && !isOpen && (
        <div className="fixed bottom-20 right-6 bg-black text-white
          px-4 py-2 rounded-lg text-sm shadow-lg animate-bounce">
          {hintText}
        </div>
      )}
    </>
  );
};
```

**Future Responsibilities**:
- Show notification badges for proactive tips
- Display contextual hints (e.g., "New to this page?")
- Pulse animation for first-time visitors
- Track button clicks for analytics

**New Features to Add**:
- Keyboard shortcut support (Ctrl+K to open)
- Voice activation trigger
- Accessibility improvements (ARIA labels)

---

### 3. ChatPanel.tsx
**Current Purpose**: Main chat interface with messages and input.

**Future Evolution**:
```tsx
// Future: Add suggested prompts, quick actions, and rich content
export const ChatPanel: React.FC<ChatPanelProps> = ({
  // ... existing props
  suggestedPrompts = [],
  quickActions = [],
  onQuickAction,
}) => {
  return (
    <div>
      {/* Header */}

      {/* NEW: Suggested Prompts Section */}
      {suggestedPrompts.length > 0 && messages.length === 1 && (
        <SuggestedPrompts
          prompts={suggestedPrompts}
          onSelect={(prompt) => onSendMessage(prompt)}
        />
      )}

      {/* Messages */}
      <MessageList />

      {/* NEW: Quick Actions Grid */}
      {quickActions.length > 0 && (
        <QuickActionsGrid
          actions={quickActions}
          onAction={onQuickAction}
        />
      )}

      {/* Input */}
    </div>
  );
};
```

**Future Responsibilities**:
- Display context-aware suggested prompts
- Show quick action buttons based on current page
- Support rich message types (cards, buttons, images)
- Voice input support
- File attachment support (for troubleshooting screenshots)
- Export chat history

**New Components to Create**:
- `SuggestedPrompts.tsx`: Chip-based suggestions
- `QuickActionsGrid.tsx`: Action buttons
- `RichMessageCard.tsx`: Card-based responses
- `NavigationCard.tsx`: Page navigation cards
- `TutorialCard.tsx`: Step-by-step guides

---

### 4. MessageList.tsx
**Current Purpose**: Display chat messages with typing indicator.

**Future Evolution**:
```tsx
// Future: Support multiple message types and interactive elements
interface MessageProps {
  message: Message;
  onNavigate?: (path: string) => void;
  onAction?: (action: Action) => void;
}

const MessageItem: React.FC<MessageProps> = ({ message, onNavigate }) => {
  // Render different types of messages
  switch (message.type) {
    case 'text':
      return <TextMessage content={message.text} />;

    case 'navigation':
      return (
        <NavigationCard
          title={message.title}
          description={message.description}
          path={message.path}
          onNavigate={onNavigate}
        />
      );

    case 'tutorial':
      return (
        <TutorialCard
          steps={message.steps}
          currentStep={message.currentStep}
        />
      );

    case 'quick-action':
      return (
        <QuickActionMessage
          actions={message.actions}
          onAction={onAction}
        />
      );

    case 'error':
      return <ErrorMessage error={message.error} />;

    default:
      return <TextMessage content={message.text} />;
  }
};
```

**Future Responsibilities**:
- Render multiple message types (text, cards, buttons, tutorials)
- Handle interactive message actions
- Support markdown formatting
- Code syntax highlighting
- Image previews
- Link previews with metadata

**New Message Types to Support**:
- `text`: Plain text messages
- `navigation`: Navigation cards with Go button
- `tutorial`: Step-by-step guides
- `quick-action`: Action buttons
- `error`: Error messages with solutions
- `warning`: Warning messages
- `success`: Success confirmations
- `code`: Code snippets
- `image`: Image attachments
- `file`: File attachments

---

### 5. useChatbotState.ts
**Current Purpose**: Basic state management with placeholder response.

**Future Evolution - This is the CORE file for RAG integration**:

```tsx
import { useState, useCallback, useRef } from 'react';
import { Message } from '../types/chatbot.types';
import { useLocation, useNavigate } from 'react-router-dom';
import { ragService } from '../services/ragService';
import { intentClassifier } from '../services/intentClassifier';
import { knowledgeBaseService } from '../services/knowledgeBaseService';
import { navigationService } from '../services/navigationService';

export const useChatbotState = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([welcomeMessage]);
  const [isTyping, setIsTyping] = useState(false);
  const [suggestedPrompts, setSuggestedPrompts] = useState<string[]>([]);
  const [quickActions, setQuickActions] = useState<QuickAction[]>([]);

  // Initialize RAG service (loads embeddings on mount)
  useEffect(() => {
    ragService.initialize();
  }, []);

  // Update suggestions when page changes
  useEffect(() => {
    const pageSuggestions = knowledgeBaseService.getPageSuggestions(
      location.pathname
    );
    setSuggestedPrompts(pageSuggestions);

    const pageActions = knowledgeBaseService.getPageQuickActions(
      location.pathname
    );
    setQuickActions(pageActions);
  }, [location.pathname]);

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text: text.trim(),
      sender: 'user',
      timestamp: new Date(),
      type: 'text',
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    try {
      // STEP 1: Detect intent
      const intent = await intentClassifier.detectIntent(text, location.pathname);

      // STEP 2: Handle based on intent
      let response: Message;

      switch (intent.type) {
        case 'navigation':
          response = await handleNavigationIntent(intent);
          break;

        case 'feature_question':
          response = await handleFeatureQuestion(intent, text);
          break;

        case 'medical_query':
          response = handleMedicalQueryRedirect();
          break;

        case 'quick_action':
          response = await handleQuickAction(intent);
          break;

        case 'troubleshooting':
          response = await handleTroubleshooting(intent, text);
          break;

        default:
          // RAG fallback for general queries
          response = await ragService.query(text, {
            currentPage: location.pathname,
            conversationHistory: messages.slice(-5),
          });
      }

      setMessages((prev) => [...prev, response]);

      // STEP 3: Update suggestions based on response
      updateSuggestedPrompts(response);

    } catch (error) {
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        text: 'Sorry, I encountered an error. Please try again.',
        sender: 'bot',
        timestamp: new Date(),
        type: 'error',
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  }, [location.pathname, messages, navigate]);

  // Handle navigation intent
  const handleNavigationIntent = async (intent: Intent): Promise<Message> => {
    const targetPage = navigationService.findPage(intent.entities);

    if (!targetPage) {
      return {
        id: `bot-${Date.now()}`,
        text: "I couldn't find that page. Could you be more specific?",
        sender: 'bot',
        timestamp: new Date(),
        type: 'text',
      };
    }

    return {
      id: `bot-${Date.now()}`,
      type: 'navigation',
      sender: 'bot',
      timestamp: new Date(),
      title: targetPage.label,
      description: targetPage.description,
      path: targetPage.path,
      icon: targetPage.icon,
      quickActions: targetPage.quickActions,
    };
  };

  // Handle feature question using RAG
  const handleFeatureQuestion = async (
    intent: Intent,
    query: string
  ): Promise<Message> => {
    const response = await ragService.query(query, {
      currentPage: location.pathname,
      intent: intent.type,
      entities: intent.entities,
    });

    return response;
  };

  // Handle medical query redirect
  const handleMedicalQueryRedirect = (): Message => {
    return {
      id: `bot-${Date.now()}`,
      type: 'warning',
      sender: 'bot',
      timestamp: new Date(),
      text: 'I detected this might be a medical or clinical question...',
      actions: [
        {
          label: 'Talk to Medical AI',
          path: '/medical-ai',
          type: 'navigate',
        },
        {
          label: 'View Clinical Guidelines',
          path: '/organization/clinical/guidelines',
          type: 'navigate',
        },
      ],
    };
  };

  return {
    isOpen,
    messages,
    isTyping,
    suggestedPrompts,
    quickActions,
    sendMessage,
    toggleOpen,
    clearHistory,
  };
};
```

**Future Responsibilities**:
- Integrate RAG service for intelligent responses
- Call intent classifier for query understanding
- Manage conversation context and history
- Track user interactions for analytics
- Handle navigation actions
- Manage quick actions
- Update suggestions dynamically

**Key Integration Points**:
- Line 30-38: RAG service call
- Line 40-60: Intent detection logic
- Line 62-100: Response generation based on intent
- Line 102-120: Navigation handling
- Line 122-140: Feature question handling

---

## 🧠 RAG System Integration

### What is RAG?
**Retrieval Augmented Generation** combines:
1. **Retrieval**: Finding relevant context from knowledge base
2. **Augmentation**: Enriching the query with context
3. **Generation**: Using LLM to generate responses

### RAG Service Architecture

**File to Create**: `src/features/organization/services/ragService.ts`

```typescript
import OpenAI from 'openai';
// or import Anthropic from '@anthropic-ai/sdk';

interface RAGContext {
  currentPage: string;
  conversationHistory: Message[];
  intent?: string;
  entities?: Entity[];
}

class RAGService {
  private embeddings: Map<string, number[]>;
  private knowledgeBase: KnowledgeBaseItem[];
  private llm: OpenAI; // or Anthropic

  constructor() {
    this.embeddings = new Map();
    this.knowledgeBase = [];
    this.llm = new OpenAI({
      apiKey: import.meta.env.VITE_OPENAI_API_KEY,
      dangerouslyAllowBrowser: true, // For client-side usage
    });
  }

  // Initialize: Load embeddings and knowledge base
  async initialize() {
    console.log('Initializing RAG service...');

    // Load knowledge base from JSON or API
    this.knowledgeBase = await this.loadKnowledgeBase();

    // Generate embeddings for all knowledge items
    await this.generateEmbeddings();

    console.log('RAG service initialized ✓');
  }

  // Load knowledge base
  private async loadKnowledgeBase(): Promise<KnowledgeBaseItem[]> {
    // Option 1: Load from static JSON
    const response = await fetch('/data/knowledge-base.json');
    return response.json();

    // Option 2: Load from API
    // const response = await apiClient.get('/api/chatbot/knowledge-base');
    // return response.data;
  }

  // Generate embeddings for knowledge base
  private async generateEmbeddings() {
    for (const item of this.knowledgeBase) {
      const embedding = await this.createEmbedding(item.content);
      this.embeddings.set(item.id, embedding);
    }
  }

  // Create embedding for text
  private async createEmbedding(text: string): Promise<number[]> {
    const response = await this.llm.embeddings.create({
      model: 'text-embedding-3-small',
      input: text,
    });

    return response.data[0].embedding;
  }

  // Retrieve relevant context
  private async retrieveContext(
    query: string,
    context: RAGContext,
    topK: number = 5
  ): Promise<KnowledgeBaseItem[]> {
    // Generate embedding for query
    const queryEmbedding = await this.createEmbedding(query);

    // Calculate similarity scores
    const scores = new Map<string, number>();

    for (const [id, embedding] of this.embeddings) {
      const similarity = this.cosineSimilarity(queryEmbedding, embedding);
      scores.set(id, similarity);
    }

    // Sort by similarity and take top K
    const sortedIds = Array.from(scores.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, topK)
      .map(([id]) => id);

    // Filter knowledge base items
    const relevantItems = this.knowledgeBase.filter(item =>
      sortedIds.includes(item.id)
    );

    // Boost score for items matching current page
    const boostedItems = relevantItems.map(item => {
      if (item.pages?.includes(context.currentPage)) {
        return { ...item, score: scores.get(item.id)! * 1.5 };
      }
      return { ...item, score: scores.get(item.id)! };
    });

    return boostedItems
      .sort((a, b) => b.score - a.score)
      .slice(0, topK);
  }

  // Cosine similarity calculation
  private cosineSimilarity(a: number[], b: number[]): number {
    const dotProduct = a.reduce((sum, val, i) => sum + val * b[i], 0);
    const magnitudeA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
    const magnitudeB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
    return dotProduct / (magnitudeA * magnitudeB);
  }

  // Main query method
  async query(
    userQuery: string,
    context: RAGContext
  ): Promise<Message> {
    try {
      // Retrieve relevant context
      const relevantItems = await this.retrieveContext(userQuery, context);

      // Build context string
      const contextString = relevantItems
        .map(item => `${item.title}:\n${item.content}`)
        .join('\n\n---\n\n');

      // Build prompt with context
      const prompt = this.buildPrompt(userQuery, contextString, context);

      // Generate response using LLM
      const completion = await this.llm.chat.completions.create({
        model: 'gpt-4o-mini', // or gpt-4o for better quality
        messages: [
          {
            role: 'system',
            content: this.getSystemPrompt(),
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 500,
      });

      const responseText = completion.choices[0].message.content ||
        'Sorry, I could not generate a response.';

      return {
        id: `bot-${Date.now()}`,
        text: responseText,
        sender: 'bot',
        timestamp: new Date(),
        type: 'text',
        sources: relevantItems.map(item => ({
          title: item.title,
          path: item.path,
        })),
      };

    } catch (error) {
      console.error('RAG query error:', error);
      throw error;
    }
  }

  // Build prompt with context
  private buildPrompt(
    query: string,
    contextString: string,
    context: RAGContext
  ): string {
    const conversationContext = context.conversationHistory
      .slice(-3)
      .map(msg => `${msg.sender}: ${msg.text}`)
      .join('\n');

    return `
Current Page: ${context.currentPage}

Recent Conversation:
${conversationContext}

Relevant Context:
${contextString}

User Question: ${query}

Please provide a helpful, concise response based on the context above.
If the context doesn't contain enough information, acknowledge this and provide general guidance.
If navigation is needed, mention the relevant page path.
    `.trim();
  }

  // System prompt
  private getSystemPrompt(): string {
    return `
You are a helpful assistant for the PHB Hospital Management System.
Your role is to help healthcare professionals navigate the system and understand features.

Guidelines:
1. Be concise and clear
2. Provide step-by-step instructions when needed
3. Suggest relevant pages for further actions
4. Never provide medical advice
5. If the question is medical, politely redirect to appropriate resources
6. Use the context provided to give accurate, specific answers
7. Format responses with bullet points and clear structure
8. Always maintain a professional, helpful tone
    `.trim();
  }
}

export const ragService = new RAGService();
```

### RAG Implementation Steps:

1. **Choose LLM Provider**:
   - OpenAI (GPT-4o, GPT-4o-mini)
   - Anthropic (Claude 3.5 Sonnet, Haiku)
   - Local models (Ollama, LM Studio)

2. **Create Knowledge Base** (`public/data/knowledge-base.json`):
```json
{
  "items": [
    {
      "id": "patients-001",
      "title": "Patient Management Overview",
      "content": "The Patient Management section allows you to register new patients, view patient records, manage admissions, and track patient history. Key features include...",
      "pages": ["/organization/patients"],
      "keywords": ["patient", "register", "admission", "records"],
      "category": "patients"
    },
    {
      "id": "appointments-001",
      "title": "Booking Appointments",
      "content": "To book an appointment: 1. Navigate to Appointments page 2. Click 'New Appointment' button 3. Select patient 4. Choose doctor and time slot 5. Confirm booking...",
      "pages": ["/organization/appointments"],
      "keywords": ["appointment", "booking", "schedule", "doctor"],
      "category": "appointments"
    }
  ]
}
```

3. **Set up API Keys** (`.env`):
```env
VITE_OPENAI_API_KEY=sk-...
# or
VITE_ANTHROPIC_API_KEY=sk-ant-...
```

4. **Install Dependencies**:
```bash
npm install openai
# or
npm install @anthropic-ai/sdk
```

---

## 🧭 Navigation & Routing System

### Navigation Service

**File to Create**: `src/features/organization/services/navigationService.ts`

```typescript
import { NavigationItem } from '../types/chatbot.types';
import { NavigateFunction } from 'react-router-dom';

const navigationMap: NavigationItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    path: '/organization/dashboard',
    description: 'Overview of key metrics and recent activity',
    keywords: ['dashboard', 'home', 'overview', 'main', 'start'],
    icon: 'LayoutDashboard',
    category: 'main',
    quickActions: [
      {
        id: 'view-stats',
        label: 'View Statistics',
        type: 'scroll',
        target: '#statistics-section',
      },
    ],
  },
  {
    id: 'patients',
    label: 'Patients',
    path: '/organization/patients',
    description: 'Register and manage patient records',
    keywords: ['patient', 'register', 'admission', 'records', 'medical history'],
    icon: 'Users',
    category: 'main',
    subPages: [
      {
        id: 'patients-new',
        label: 'New Patient',
        path: '/organization/patients/new',
        description: 'Register a new patient',
        keywords: ['new patient', 'register patient', 'add patient'],
      },
      {
        id: 'patients-admissions',
        label: 'Admissions',
        path: '/organization/patients/admissions',
        description: 'Manage patient admissions',
        keywords: ['admission', 'admit patient', 'inpatient'],
      },
    ],
    quickActions: [
      {
        id: 'new-patient',
        label: 'Register Patient',
        type: 'navigate',
        target: '/organization/patients/new',
        icon: 'UserPlus',
      },
      {
        id: 'view-admissions',
        label: 'View Admissions',
        type: 'navigate',
        target: '/organization/patients/admissions',
        icon: 'Bed',
      },
    ],
  },
  {
    id: 'appointments',
    label: 'Appointments',
    path: '/organization/appointments',
    description: 'Schedule and manage doctor appointments',
    keywords: ['appointment', 'booking', 'schedule', 'doctor', 'consultation'],
    icon: 'Calendar',
    category: 'main',
    quickActions: [
      {
        id: 'new-appointment',
        label: 'Book Appointment',
        type: 'navigate',
        target: '/organization/appointments/new',
        icon: 'CalendarPlus',
      },
    ],
  },
  // Add all other pages...
];

class NavigationService {
  private navigationMap: NavigationItem[];

  constructor() {
    this.navigationMap = navigationMap;
  }

  // Find page by keywords
  findPage(query: string): NavigationItem | null {
    const normalizedQuery = query.toLowerCase().trim();

    // Exact path match
    const exactMatch = this.navigationMap.find(
      item => item.path === normalizedQuery
    );
    if (exactMatch) return exactMatch;

    // Keyword matching with fuzzy search
    const matches = this.navigationMap
      .map(item => ({
        item,
        score: this.calculateMatchScore(normalizedQuery, item),
      }))
      .filter(match => match.score > 0.3)
      .sort((a, b) => b.score - a.score);

    return matches.length > 0 ? matches[0].item : null;
  }

  // Calculate match score
  private calculateMatchScore(query: string, item: NavigationItem): number {
    let score = 0;

    // Exact label match (highest score)
    if (item.label.toLowerCase() === query) {
      return 1.0;
    }

    // Partial label match
    if (item.label.toLowerCase().includes(query)) {
      score += 0.7;
    }

    // Keyword matching
    const matchedKeywords = item.keywords.filter(keyword =>
      keyword.includes(query) || query.includes(keyword)
    );
    score += matchedKeywords.length * 0.2;

    // Description match
    if (item.description.toLowerCase().includes(query)) {
      score += 0.3;
    }

    return Math.min(score, 1.0);
  }

  // Get page suggestions for current page
  getPageSuggestions(currentPath: string): string[] {
    const currentPage = this.navigationMap.find(
      item => item.path === currentPath
    );

    if (!currentPage) return [];

    // Return contextual suggestions
    return [
      `What can I do on this page?`,
      `Show me quick actions`,
      `How do I navigate from here?`,
    ];
  }

  // Get quick actions for current page
  getPageQuickActions(currentPath: string): QuickAction[] {
    const currentPage = this.navigationMap.find(
      item => item.path === currentPath
    );

    return currentPage?.quickActions || [];
  }

  // Navigate to page
  navigateTo(path: string, navigate: NavigateFunction) {
    navigate(path);
  }
}

export const navigationService = new NavigationService();
```

### How to Use Navigation in Chat:

```typescript
// In useChatbotState.ts

const handleNavigationIntent = async (intent: Intent): Promise<Message> => {
  const targetPage = navigationService.findPage(intent.query);

  if (!targetPage) {
    return createTextMessage("I couldn't find that page...");
  }

  // Return navigation card
  return {
    id: `bot-${Date.now()}`,
    type: 'navigation',
    sender: 'bot',
    timestamp: new Date(),
    title: targetPage.label,
    description: targetPage.description,
    path: targetPage.path,
    icon: targetPage.icon,
    // When user clicks "Go to Page" button:
    onNavigate: () => {
      navigate(targetPage.path);
      // Add confirmation message
      setMessages(prev => [...prev, {
        id: `bot-${Date.now()}`,
        text: `Navigating to ${targetPage.label}...`,
        sender: 'bot',
        timestamp: new Date(),
        type: 'success',
      }]);
    },
  };
};
```

---

## 📚 Knowledge Base Structure

### File to Create: `public/data/knowledge-base.json`

```json
{
  "version": "1.0.0",
  "lastUpdated": "2025-01-10",
  "items": [
    {
      "id": "dashboard-overview",
      "title": "Dashboard Overview",
      "category": "dashboard",
      "content": "The dashboard provides a comprehensive overview of your organization's key metrics including active patients, appointments today, revenue, bed occupancy, and recent activity. You can view detailed statistics, access quick actions, and monitor real-time updates.",
      "pages": ["/organization/dashboard"],
      "keywords": ["dashboard", "overview", "statistics", "metrics", "home"],
      "relatedPages": ["/organization/reports", "/organization/analytics"],
      "quickActions": ["view-stats", "recent-activity"],
      "faqs": [
        {
          "question": "How do I view today's appointments?",
          "answer": "Click on the 'Appointments Today' card on the dashboard, or navigate to the Appointments page from the sidebar."
        }
      ]
    },
    {
      "id": "patient-registration",
      "title": "Patient Registration Process",
      "category": "patients",
      "content": "To register a new patient:\n1. Navigate to Patients > New Patient\n2. Fill in required information: Name, Date of Birth, Gender, Contact Details\n3. Add optional information: Address, Emergency Contact, Insurance Details\n4. Upload identification documents if available\n5. Assign a unique Patient ID (auto-generated)\n6. Click 'Register Patient'\n\nAfter registration, you can:\n- Add medical history\n- Schedule appointments\n- Admit to hospital\n- View patient records",
      "pages": ["/organization/patients", "/organization/patients/new"],
      "keywords": ["register patient", "new patient", "patient registration", "add patient", "patient intake"],
      "relatedPages": ["/organization/patients/admissions"],
      "quickActions": ["new-patient"],
      "faqs": [
        {
          "question": "What information is required to register a patient?",
          "answer": "Minimum required: Full name, date of birth, gender, and contact phone number. Additional information like address and emergency contact is recommended."
        },
        {
          "question": "Can I register a patient without insurance?",
          "answer": "Yes, insurance information is optional. You can add it later when updating the patient profile."
        }
      ]
    },
    {
      "id": "appointment-booking",
      "title": "Booking Appointments",
      "category": "appointments",
      "content": "Appointment booking process:\n1. Go to Appointments page\n2. Click 'New Appointment' button\n3. Search and select patient (or register new)\n4. Choose appointment type (consultation, follow-up, surgery)\n5. Select doctor from available list\n6. Pick date and available time slot\n7. Add appointment notes (optional)\n8. Confirm booking\n\nThe system will:\n- Send SMS confirmation to patient\n- Notify assigned doctor\n- Add to calendar\n- Create appointment record",
      "pages": ["/organization/appointments"],
      "keywords": ["appointment", "booking", "schedule", "doctor", "consultation", "time slot"],
      "relatedPages": ["/organization/clinical", "/organization/patients"],
      "quickActions": ["new-appointment"],
      "faqs": [
        {
          "question": "How do I reschedule an appointment?",
          "answer": "Find the appointment in the list, click the 3-dot menu, select 'Reschedule', choose new date/time, and confirm."
        },
        {
          "question": "Can patients book their own appointments?",
          "answer": "Yes, if patient portal is enabled, patients can book appointments online. Staff can also book on their behalf."
        }
      ]
    },
    {
      "id": "pharmacy-dispensing",
      "title": "Pharmacy Dispensing",
      "category": "pharmacy",
      "content": "Dispensing medications:\n1. Navigate to Pharmacy page\n2. Click 'Dispense Medication'\n3. Enter prescription ID or patient name\n4. Verify prescription details\n5. Check drug availability in inventory\n6. Scan or select medications\n7. Enter quantity and dosage instructions\n8. Process payment if applicable\n9. Print receipt and label\n10. Update inventory automatically\n\nImportant:\n- Verify patient allergies before dispensing\n- Check drug interactions\n- Counsel patient on usage\n- Record dispense in patient's medication history",
      "pages": ["/organization/pharmacy"],
      "keywords": ["pharmacy", "dispense", "medication", "prescription", "drugs", "medicine"],
      "relatedPages": ["/organization/billing", "/organization/clinical"],
      "quickActions": ["dispense-medication", "check-inventory"],
      "faqs": [
        {
          "question": "What if a medication is out of stock?",
          "answer": "The system will show stock status. You can place an order for restock or suggest an alternative medication to the prescribing doctor."
        }
      ]
    },
    {
      "id": "billing-invoices",
      "title": "Billing and Invoices",
      "category": "billing",
      "content": "Managing billing:\n1. Navigate to Billing page\n2. View pending, paid, and overdue invoices\n3. Create new invoice:\n   - Select patient\n   - Add services/items\n   - Apply insurance if applicable\n   - Calculate total\n4. Process payment:\n   - Cash, card, mobile money, or insurance\n   - Print receipt\n   - Send via SMS/email\n5. Track payments and outstanding balances\n\nFeatures:\n- Automatic invoice generation from services\n- Insurance claim processing\n- Payment plans for large bills\n- Financial reports",
      "pages": ["/organization/billing"],
      "keywords": ["billing", "invoice", "payment", "charges", "receipt", "insurance claim"],
      "relatedPages": ["/organization/reports", "/organization/patients"],
      "quickActions": ["new-invoice", "process-payment"],
      "faqs": [
        {
          "question": "How do I process an insurance claim?",
          "answer": "Select the invoice, click 'Process Insurance', enter insurance details, attach required documents, and submit claim. You'll receive updates on claim status."
        }
      ]
    }
  ]
}
```

---

## 🔍 Intent Detection System

### File to Create: `src/features/organization/services/intentClassifier.ts`

```typescript
interface Intent {
  type: IntentType;
  confidence: number;
  entities: Entity[];
  query: string;
}

type IntentType =
  | 'navigation'
  | 'feature_question'
  | 'troubleshooting'
  | 'quick_action'
  | 'medical_query'
  | 'general_help';

interface Entity {
  type: 'page' | 'feature' | 'action' | 'role';
  value: string;
  confidence: number;
}

class IntentClassifier {
  // Medical terms that trigger medical query detection
  private medicalKeywords = [
    'diagnosis', 'treatment', 'medication', 'symptoms', 'disease',
    'prescription', 'dosage', 'side effects', 'cure', 'therapy',
    'patient care', 'clinical decision', 'drug interaction',
    'allergy', 'contraindication', 'prognosis', 'differential diagnosis'
  ];

  // Navigation patterns
  private navigationPatterns = [
    /(?:show|take|bring|go to|navigate|open|view|find|where is)\s+(?:me\s+)?(.+)/i,
    /how (?:do I|can I) (?:get to|access|reach|find) (.+)/i,
    /(.+) page/i,
  ];

  // Question patterns
  private questionPatterns = [
    /(?:what|how|why|when|where|can|is|does|do) .+\?/i,
    /tell me about (.+)/i,
    /explain (.+)/i,
  ];

  // Quick action patterns
  private actionPatterns = [
    /(?:create|add|new|register|book|schedule) (.+)/i,
    /(?:update|edit|modify|change) (.+)/i,
    /(?:delete|remove|cancel) (.+)/i,
  ];

  // Troubleshooting patterns
  private troubleshootingPatterns = [
    /(?:why|how come|what's wrong|issue|problem|error|not working|doesn't work)/i,
    /can't|cannot|unable to|failed to/i,
  ];

  async detectIntent(query: string, currentPage: string): Promise<Intent> {
    const normalizedQuery = query.toLowerCase().trim();

    // PRIORITY 1: Medical query detection (highest priority)
    if (this.isMedicalQuery(normalizedQuery)) {
      return {
        type: 'medical_query',
        confidence: 1.0,
        entities: [],
        query,
      };
    }

    // PRIORITY 2: Navigation intent
    const navigationMatch = this.matchNavigationPattern(normalizedQuery);
    if (navigationMatch) {
      return {
        type: 'navigation',
        confidence: navigationMatch.confidence,
        entities: navigationMatch.entities,
        query,
      };
    }

    // PRIORITY 3: Quick action intent
    const actionMatch = this.matchActionPattern(normalizedQuery);
    if (actionMatch) {
      return {
        type: 'quick_action',
        confidence: actionMatch.confidence,
        entities: actionMatch.entities,
        query,
      };
    }

    // PRIORITY 4: Troubleshooting
    if (this.isTroubleshooting(normalizedQuery)) {
      return {
        type: 'troubleshooting',
        confidence: 0.8,
        entities: this.extractEntities(normalizedQuery),
        query,
      };
    }

    // PRIORITY 5: Feature question
    if (this.isQuestion(normalizedQuery)) {
      return {
        type: 'feature_question',
        confidence: 0.7,
        entities: this.extractEntities(normalizedQuery),
        query,
      };
    }

    // DEFAULT: General help
    return {
      type: 'general_help',
      confidence: 0.5,
      entities: [],
      query,
    };
  }

  // Check if query is medical
  private isMedicalQuery(query: string): boolean {
    return this.medicalKeywords.some(keyword =>
      query.includes(keyword)
    );
  }

  // Match navigation pattern
  private matchNavigationPattern(query: string) {
    for (const pattern of this.navigationPatterns) {
      const match = query.match(pattern);
      if (match) {
        const target = match[1] || match[0];
        return {
          confidence: 0.9,
          entities: [
            {
              type: 'page' as const,
              value: target.trim(),
              confidence: 0.9,
            },
          ],
        };
      }
    }
    return null;
  }

  // Match action pattern
  private matchActionPattern(query: string) {
    for (const pattern of this.actionPatterns) {
      const match = query.match(pattern);
      if (match) {
        const action = match[0].split(' ')[0]; // create, add, new, etc.
        const target = match[1];
        return {
          confidence: 0.85,
          entities: [
            {
              type: 'action' as const,
              value: action.trim(),
              confidence: 0.85,
            },
            {
              type: 'feature' as const,
              value: target.trim(),
              confidence: 0.8,
            },
          ],
        };
      }
    }
    return null;
  }

  // Check if troubleshooting
  private isTroubleshooting(query: string): boolean {
    return this.troubleshootingPatterns.some(pattern =>
      pattern.test(query)
    );
  }

  // Check if question
  private isQuestion(query: string): boolean {
    return this.questionPatterns.some(pattern =>
      pattern.test(query)
    ) || query.includes('?');
  }

  // Extract entities from query
  private extractEntities(query: string): Entity[] {
    const entities: Entity[] = [];
    const words = query.split(/\s+/);

    // Simple entity extraction (can be enhanced)
    const pageKeywords = ['patient', 'appointment', 'pharmacy', 'billing', 'dashboard'];

    for (const word of words) {
      if (pageKeywords.includes(word.toLowerCase())) {
        entities.push({
          type: 'page',
          value: word,
          confidence: 0.7,
        });
      }
    }

    return entities;
  }
}

export const intentClassifier = new IntentClassifier();
```

---

## ⚡ Quick Actions Implementation

### File to Create: `src/features/organization/components/QuickActionsGrid.tsx`

```tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as LucideIcons from 'lucide-react';

interface QuickAction {
  id: string;
  label: string;
  icon: keyof typeof LucideIcons;
  type: 'navigate' | 'scroll' | 'modal' | 'external';
  target: string;
  description?: string;
}

interface QuickActionsGridProps {
  actions: QuickAction[];
  onAction?: (action: QuickAction) => void;
}

export const QuickActionsGrid: React.FC<QuickActionsGridProps> = ({
  actions,
  onAction,
}) => {
  const navigate = useNavigate();

  const handleAction = (action: QuickAction) => {
    switch (action.type) {
      case 'navigate':
        navigate(action.target);
        if (onAction) onAction(action);
        break;

      case 'scroll':
        const element = document.querySelector(action.target);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        if (onAction) onAction(action);
        break;

      case 'modal':
        // Dispatch custom event to open modal
        window.dispatchEvent(
          new CustomEvent('open-modal', {
            detail: { modalId: action.target },
          })
        );
        if (onAction) onAction(action);
        break;

      case 'external':
        window.open(action.target, '_blank');
        if (onAction) onAction(action);
        break;
    }
  };

  if (actions.length === 0) return null;

  return (
    <div className="border-t border-gray-200 p-4 bg-gray-50">
      <p className="text-xs font-semibold text-gray-500 uppercase mb-3">
        Quick Actions
      </p>
      <div className="grid grid-cols-2 gap-2">
        {actions.map((action) => {
          const Icon = LucideIcons[action.icon] as React.FC<{ size: number }>;

          return (
            <button
              key={action.id}
              onClick={() => handleAction(action)}
              className="flex items-center gap-2 px-3 py-2 bg-white
                border border-gray-200 rounded-lg hover:bg-blue-50
                hover:border-blue-300 transition-colors text-left"
            >
              {Icon && <Icon size={16} className="text-blue-600 flex-shrink-0" />}
              <span className="text-sm font-medium text-gray-700 truncate">
                {action.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
```

---

## 🗺️ Implementation Roadmap

### Phase 1: RAG Foundation (Week 1-2)
- [ ] Set up LLM API (OpenAI/Anthropic)
- [ ] Create knowledge base JSON
- [ ] Implement RAG service with embeddings
- [ ] Test basic query and response
- [ ] Integrate into useChatbotState.ts

### Phase 2: Navigation System (Week 2-3)
- [ ] Create navigation service
- [ ] Build navigation map with all pages
- [ ] Implement intent classifier
- [ ] Add navigation card component
- [ ] Test navigation from chat

### Phase 3: Rich Interactions (Week 3-4)
- [ ] Create suggested prompts component
- [ ] Implement quick actions grid
- [ ] Add tutorial card component
- [ ] Build page context detection
- [ ] Test contextual suggestions

### Phase 4: Advanced Features (Week 4-5)
- [ ] Medical query detection and redirect
- [ ] Troubleshooting system
- [ ] Voice input support
- [ ] Chat history export
- [ ] Analytics tracking

### Phase 5: Testing & Optimization (Week 5-6)
- [ ] User acceptance testing
- [ ] Performance optimization
- [ ] Mobile responsiveness testing
- [ ] Accessibility audit
- [ ] Documentation completion

---

## 💻 Code Examples

### Example: Complete Navigation Flow

```typescript
// User types: "show me patients page"

// 1. Intent detected as "navigation"
const intent = await intentClassifier.detectIntent(
  "show me patients page",
  "/organization/dashboard"
);
// Result: { type: 'navigation', entities: [{ type: 'page', value: 'patients' }] }

// 2. Find target page
const targetPage = navigationService.findPage("patients");
// Result: { label: 'Patients', path: '/organization/patients', ... }

// 3. Generate navigation message
const message = {
  type: 'navigation',
  title: 'Patients',
  description: 'Register and manage patient records',
  path: '/organization/patients',
  quickActions: [
    { label: 'Register Patient', target: '/organization/patients/new' },
    { label: 'View Admissions', target: '/organization/patients/admissions' },
  ],
};

// 4. User clicks "Go to Patients" button
navigate('/organization/patients');

// 5. Chatbot shows confirmation
addMessage({
  text: "✓ Navigated to Patients page. You can now register patients or view records.",
  type: 'success',
});
```

### Example: Feature Question with RAG

```typescript
// User asks: "How do I register a new patient?"

// 1. Intent detected as "feature_question"
const intent = await intentClassifier.detectIntent(
  "How do I register a new patient?",
  "/organization/dashboard"
);

// 2. RAG retrieval
const context = await ragService.retrieveContext("register new patient", {
  currentPage: "/organization/dashboard",
});
// Result: [{ title: "Patient Registration Process", content: "To register..." }]

// 3. Generate response with LLM
const response = await llm.query({
  query: "How do I register a new patient?",
  context: context,
});
// Result: "To register a new patient:\n1. Navigate to Patients > New Patient\n2. Fill in required information..."

// 4. Show response with quick action
const message = {
  text: response,
  quickActions: [
    { label: 'Go to Patient Registration', target: '/organization/patients/new' },
  ],
};
```

---

## 🎯 Success Metrics

### User Engagement
- Chat open rate per session
- Average messages per conversation
- Navigation clicks from chat
- Quick action usage rate

### Effectiveness
- Query resolution rate
- Navigation success rate
- Time to complete tasks (with vs without chatbot)
- User satisfaction score

### Technical
- Average response time
- RAG retrieval accuracy
- Intent classification accuracy
- Error rate

---

## 📝 Final Notes

This chatbot system is designed to be:

1. **Modular**: Each service can be developed and tested independently
2. **Scalable**: Easy to add new features and pages to knowledge base
3. **Maintainable**: Clear separation of concerns
4. **User-Friendly**: Intuitive navigation and helpful responses
5. **Extensible**: Ready for voice input, multi-language, and more

The current implementation provides the UI foundation. The next steps involve:
- Integrating RAG for intelligent responses
- Building navigation logic for seamless page transitions
- Creating rich knowledge base with all system features
- Implementing intent detection for smart query handling

Start with Phase 1 (RAG Foundation) and progressively add capabilities as you test and refine the system.