import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useChatStore } from './src/store/chatStore';
import { ChatTimeline } from './src/components/chat/ChatTimeline';
import { StatusBar } from 'expo-status-bar';
import { MessageComposer } from './src/components/chat/MessageComposer';

export default function App() {
  // const messages = useChatStore((state) => state.messages);
  const {
    messages,
    sendMessage,
    replyingTo,
    setReplyingTo,
    retryMessage,
  } = useChatStore();

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={['top', 'left', 'right', 'bottom']}>
        <StatusBar style="dark" />
        <ChatTimeline
          messages={messages}
          onLongPressMessage={(msg) => console.log('Long pressed message:', msg.id)}
          onRetryMessage={retryMessage}
        />
        <MessageComposer
            onSendMessage={sendMessage}
            replyingTo={replyingTo}
            onCancelReply={() => setReplyingTo(null)}
          />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
});