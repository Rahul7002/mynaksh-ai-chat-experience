import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import * as Clipboard from 'expo-clipboard';
import { StatusBar } from 'expo-status-bar';

import { useChatStore } from './src/store/chatStore';
import { ChatTimeline } from './src/components/chat/ChatTimeline';
import { MessageComposer } from './src/components/chat/MessageComposer';
import { MessageActionsModal } from './src/components/chat/MessageActionsModal';
import { Message } from './src/types/chat';

export default function App() {
  const {
    messages,
    sendMessage,
    replyingTo,
    setReplyingTo,
    deleteMessage,
    setMessageFeedback,
    retryMessage,
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
        <View style={styles.inner}>
          <ChatTimeline
            messages={messages}
            onLongPressMessage={(msg) => setActiveMessage(msg)}
            onRetryMessage={retryMessage}
            onFeedback={(id, fb) => setMessageFeedback(id, fb)}
          />

          <MessageComposer
            onSendMessage={sendMessage}
            replyingTo={replyingTo}
            onCancelReply={() => setReplyingTo(null)}
          />

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
    backgroundColor: '#F9FAFB',
  },
  inner: {
    flex: 1,
  },
});