import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Message } from '../../types/chat';
import { Ionicons } from '@expo/vector-icons';

interface MessageBubbleProps {
  message: Message;
  onLongPress?: (message: Message) => void;
  renderRecommendations?: (message: Message) => React.ReactNode;
  renderFeedback?: (message: Message) => React.ReactNode;
  onRetry?: (messageId: string) => void;
}

export const MessageItem: React.FC<MessageBubbleProps> = ({
  message,
  onLongPress,
  renderRecommendations,
  renderFeedback,
  onRetry,
}) => {
  if (message.type === 'system') {
    return (
      <View style={styles.systemContainer}>
        <View style={styles.systemPill}>
          <Text style={styles.systemText}>{message.text}</Text>
        </View>
      </View>
    );
  }

  const isUser = message.type === 'user';
  const isHuman = message.type === 'human';
  const isAI = message.type === 'ai';

  return (
    <Pressable
      onLongPress={() => onLongPress && onLongPress(message)}
      delayLongPress={300}
      style={[
        styles.rowContainer,
        isUser ? styles.rowUser : styles.rowOther,
      ]}
    >
      {/* Sender Avatar / Icon badge */}
      {!isUser && (
        <View
          style={[
            styles.avatar,
            isHuman ? styles.humanAvatar : styles.aiAvatar,
          ]}
        >
          <Ionicons
            name={isHuman ? 'person' : 'sparkles'}
            size={14}
            color="#FFFFFF"
          />
        </View>
      )}

      <View
        style={[
          styles.bubble,
          isUser
            ? styles.userBubble
            : isHuman
            ? styles.humanBubble
            : styles.aiBubble,
        ]}
      >
        {/* Author Label for Human/AI */}
        {!isUser && (
          <Text style={styles.authorLabel}>
            {isHuman ? 'Astrologer (Human)' : 'Naksh AI'}
          </Text>
        )}

        {/* Quoted Reply context if any */}
        {message.replyTo && (
          <View style={styles.replyContext}>
            <Text style={styles.replyContextLabel}>
              Replying to {message.replyTo.type.toUpperCase()}:
            </Text>
            <Text numberOfLines={1} style={styles.replyContextText}>
              {message.replyTo.text}
            </Text>
          </View>
        )}

        <Text
          style={[styles.messageText, isUser ? styles.userText : styles.otherText]}
        >
          {message.text}
        </Text>

        {/* Message Delivery Status for User */}
        {isUser && message.status && (
          <View style={styles.statusRow}>
            {message.status === 'failed' ? (
              <Pressable
                onPress={() => onRetry && onRetry(message.id)}
                style={styles.retryBadge}
              >
                <Text style={styles.retryText}>Failed • Tap to Retry</Text>
                <Ionicons name="refresh" size={12} color="#EF4444" />
              </Pressable>
            ) : (
              <>
                <Text style={styles.statusText}>
                  {message.status === 'sending' ? 'Sending...' : 'Sent'}
                </Text>
                {message.status === 'sent' && (
                  <Ionicons name="checkmark-done" size={13} color="#E0E7FF" />
                )}
              </>
            )}
          </View>
        )}

        {/* Recommendations Slot for AI messages */}
        {isAI && renderRecommendations && renderRecommendations(message)}

        {/* Feedback Slot for AI messages */}
        {isAI && renderFeedback && renderFeedback(message)}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  systemContainer: {
    alignItems: 'center',
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  systemPill: {
    backgroundColor: '#F3F4F6',
    paddingVertical: 5,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  systemText: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
    textAlign: 'center',
  },
  rowContainer: {
    flexDirection: 'row',
    marginVertical: 6,
    paddingHorizontal: 12,
    alignItems: 'flex-end',
  },
  rowUser: {
    justifyContent: 'flex-end',
  },
  rowOther: {
    justifyContent: 'flex-start',
  },
  avatar: {
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
    marginBottom: 4,
  },
  aiAvatar: {
    backgroundColor: '#6366F1',
  },
  humanAvatar: {
    backgroundColor: '#F59E0B',
  },
  bubble: {
    maxWidth: '82%',
    padding: 12,
    borderRadius: 16,
  },
  userBubble: {
    backgroundColor: '#4F46E5',
    borderBottomRightRadius: 4,
  },
  aiBubble: {
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    maxWidth: '92%', // Gives space for carousel cards
    width: '92%',
  },
  humanBubble: {
    backgroundColor: '#FFFBEB',
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  authorLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#4B5563',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  messageText: {
    fontSize: 15,
    lineHeight: 21,
  },
  userText: {
    color: '#FFFFFF',
  },
  otherText: {
    color: '#1F2937',
  },
  replyContext: {
    borderLeftWidth: 3,
    borderLeftColor: '#6366F1',
    paddingLeft: 8,
    marginBottom: 6,
    opacity: 0.85,
  },
  replyContextLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: '#9CA3AF',
  },
  replyContextText: {
    fontSize: 12,
    color: '#4B5563',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 4,
    gap: 4,
  },
  statusText: {
    fontSize: 10,
    color: '#E0E7FF',
  },
  retryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEE2E2',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    gap: 4,
  },
  retryText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#DC2626',
  },
});