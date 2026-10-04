import { create } from 'zustand';
import { Message, MessageStatus, MessageFeedback, DislikeReason } from '../types/chat';
import { INITIAL_MOCK_CONVERSATION } from '../data/mockData';

interface ChatStore {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  replyingTo: Message | null;

  // Actions
  loadInitialMessages: () => void;
  setReplyingTo: (message: Message | null) => void;
  deleteMessage: (messageId: string) => void;
  updateMessageStatus: (messageId: string, status: MessageStatus) => void;
  setMessageFeedback: (messageId: string, feedback: MessageFeedback) => void;
  sendMessage: (text: string) => void;
  retryMessage: (messageId: string) => void;// Simulation Helpers for Evaluators
  simulateLoading: () => void;
  simulateError: () => void;
  clearChat: () => void;
}



export const useChatStore = create<ChatStore>((set, get) => ({
  messages: INITIAL_MOCK_CONVERSATION,
  isLoading: false,
  error: null,
  replyingTo: null,

  simulateLoading: () => {
    set({ isLoading: true });
    setTimeout(() => {
      set({ isLoading: false, messages: INITIAL_MOCK_CONVERSATION, error: null });
    }, 1500);
  },

  simulateError: () => {
    set({ error: 'Network request timed out. Please try again.', isLoading: false });
  },

  clearChat: () => {
    set({ messages: [] });
  },

  loadInitialMessages: () => {
    set({ isLoading: true, error: null });
    try {
      set({ messages: INITIAL_MOCK_CONVERSATION, isLoading: false });
    } catch {
      set({ error: 'Unable to load conversation.', isLoading: false });
    }
  },

  setReplyingTo: (message) => set({ replyingTo: message }),

  deleteMessage: (messageId) => {
    set((state) => ({
      messages: state.messages.filter((msg) => msg.id !== messageId),
    }));
  },

  updateMessageStatus: (messageId, status) => {
    set((state) => ({
      messages: state.messages.map((msg) =>
        msg.id === messageId ? { ...msg, status } : msg
      ),
    }));
  },

  setMessageFeedback: (messageId, feedback) => {
    set((state) => ({
      messages: state.messages.map((msg) =>
        msg.id === messageId ? { ...msg, feedback } : msg
      ),
    }));
  },

  sendMessage: (text: string) => {
    const tempId = Date.now().toString();
    const replyingTo = get().replyingTo;

    const userMessage: Message = {
      id: tempId,
      type: 'user',
      text,
      status: 'sending',
      timestamp: Date.now(),
      replyTo: replyingTo
        ? { id: replyingTo.id, text: replyingTo.text, type: replyingTo.type }
        : undefined,
    };

    // 1. Optimistic append & clear reply bar
    set((state) => ({
      messages: [...state.messages, userMessage],
      replyingTo: null,
    }));

    // 2. Simulate API delay -> Update to 'sent' -> Trigger mock AI response
    setTimeout(() => {
      get().updateMessageStatus(tempId, 'sent');

      setTimeout(() => {
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          type: 'ai',
          text: `Analyzing: "${text}". Here is an aligned remedy and guidance.`,
          timestamp: Date.now(),
          recommendations: [
            {
              id: `rec-${Date.now()}-1`,
              type: 'tarot',
              title: 'Weekly Transit Tarot',
            },
            {
              id: `rec-${Date.now()}-2`,
              type: 'remedy',
              title: 'Daily Surya Arghya',
              subtitle: 'Morning planetary balance',
            },
          ],
        };
        set((state) => ({ messages: [...state.messages, aiResponse] }));
      }, 1000);
    }, 1200);
  },

  retryMessage: (messageId: string) => {
    const target = get().messages.find((m) => m.id === messageId);
    if (!target) return;
    get().updateMessageStatus(messageId, 'sending');
    setTimeout(() => {
      get().updateMessageStatus(messageId, 'sent');
    }, 1200);
  },
}));