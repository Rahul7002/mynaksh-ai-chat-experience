export type MessageRole = 'system' | 'user' | 'ai' | 'human';
export type MessageStatus = 'sending' | 'sent' | 'failed';

export type RecommendationType =
  | 'gemstone'
  | 'tarot'
  | 'consultation'
  | 'article'
  | 'remedy'
  | 'promotion'
  | string; // Extensible for future experiences

export interface Recommendation {
  id: string;
  type: RecommendationType;
  title: string;
  subtitle?: string;
  payload?: Record<string, unknown>;
}

export type FeedbackType = 'like' | 'dislike';
export type DislikeReason =
  | 'Inaccurate'
  | 'Too Generic'
  | "Didn't Help"
  | 'Too Long';

export interface MessageFeedback {
  type: FeedbackType;
  reason?: DislikeReason;
}

export interface Message {
  id: string;
  type: MessageRole;
  text: string;
  timestamp?: number;
  status?: MessageStatus;
  recommendations?: Recommendation[];
  feedback?: MessageFeedback;
  replyTo?: {
    id: string;
    text: string;
    type: MessageRole;
  };
}