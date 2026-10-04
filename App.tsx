import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import * as Clipboard from 'expo-clipboard';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

import { useChatStore } from './src/store/chatStore';
import { ChatTimeline } from './src/components/chat/ChatTimeline';
import { MessageComposer } from './src/components/chat/MessageComposer';
import { MessageActionsModal } from './src/components/chat/MessageActionsModal';
import { LoadingState, EmptyState, ErrorState } from './src/components/chat/ChatStates';
import { Message } from './src/types/chat';

export default function App() {
  const {
    messages,
    isLoading,
    error,
    sendMessage,
    replyingTo,
    setReplyingTo,
    deleteMessage,
    setMessageFeedback,
    retryMessage,
    loadInitialMessages,
    simulateLoading,
    simulateError,
    clearChat,
  } = useChatStore();

  const [activeMessage, setActiveMessage] = useState<Message | null>(null);

  const handleCopy = async (message: Message) => {
    await Clipboard.setStringAsync(message.text);
    Alert.alert('Copied', 'Message copied to clipboard.');
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={['top', 'left', 'right', 'bottom']}>
        <StatusBar style="dark" />

        {/* Top Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>MyNaksh AI Astrologer</Text>
            <Text style={styles.headerSubtitle}>Saturn & Transit Guidance Active</Text>
          </View>
          {/* Quick Demo Controls */}
          <View style={styles.headerControls}>
            <TouchableOpacity
              onPress={simulateLoading}
              style={styles.demoBtn}
              accessibilityLabel="Test Loading State"
            >
              <Ionicons name="refresh-circle" size={24} color="#6366F1" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={simulateError}
              style={styles.demoBtn}
              accessibilityLabel="Test Error State"
            >
              <Ionicons name="alert-circle" size={24} color="#EF4444" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={clearChat}
              style={styles.demoBtn}
              accessibilityLabel="Test Empty State"
            >
              <Ionicons name="trash" size={20} color="#9CA3AF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Content based on state */}
        <View style={styles.inner}>
          {isLoading ? (
            <LoadingState />
          ) : error ? (
            <ErrorState onRetry={loadInitialMessages} error={error} />
          ) : messages.length === 0 ? (
            <EmptyState onStartSuggested={(text) => sendMessage(text)} />
          ) : (
            <ChatTimeline
              messages={messages}
              onLongPressMessage={(msg) => setActiveMessage(msg)}
              onRetryMessage={retryMessage}
              onFeedback={(id, fb) => setMessageFeedback(id, fb)}
            />
          )}

          {/* Composer is mounted when not in fatal error/loading */}
          {!isLoading && !error && (
            <MessageComposer
              onSendMessage={sendMessage}
              replyingTo={replyingTo}
              onCancelReply={() => setReplyingTo(null)}
            />
          )}

          <MessageActionsModal
            visible={!!activeMessage}
            message={activeMessage}
            onClose={() => setActiveMessage(null)}
            onReply={(msg) => setReplyingTo(msg)}
            onCopy={handleCopy}
            onDelete={(id) => deleteMessage(id)}
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
  headerSubtitle: {
    fontSize: 11,
    color: '#10B981',
    fontWeight: '500',
  },
  headerControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  demoBtn: {
    padding: 2,
  },
  inner: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
});