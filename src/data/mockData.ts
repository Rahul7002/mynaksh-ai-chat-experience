import { Message } from '../types/chat';

export const INITIAL_MOCK_CONVERSATION: Message[] = [
  {
    id: '1',
    type: 'system',
    text: 'Your session with AI Astrologer has started.',
    timestamp: Date.now() - 300000,
  },
  {
    id: '2',
    type: 'user',
    text: 'Can you tell me about my career this year?',
    status: 'sent',
    timestamp: Date.now() - 240000,
  },
  {
    id: '3',
    type: 'ai',
    text: 'I can already see a strong Saturn influence in your chart. Based on this, here are a few recommendations that may help you.',
    timestamp: Date.now() - 180000,
    recommendations: [
      {
        id: '1',
        type: 'gemstone',
        title: 'Blue Sapphire',
        subtitle: 'Recommended for Saturn',
      },
      {
        id: '2',
        type: 'tarot',
        title: 'Career Tarot Reading',
      },
      {
        id: '3',
        type: 'consultation',
        title: 'Talk to an Astrologer',
      },
      {
        id: '4',
        type: 'article',
        title: 'Understanding Saturn Mahadasha',
      },
    ],
  },
  {
    id: '4',
    type: 'human',
    text: 'I also recommend focusing on your upcoming Jupiter transit.',
    status: 'sent',
    timestamp: Date.now() - 60000,
  },
];