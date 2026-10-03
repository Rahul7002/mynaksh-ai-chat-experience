import React, { useRef, useEffect } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Message } from '../../types/chat';
import { MessageItem } from '../messages/MessageItem';
import { RecommendationCarousel } from '../recommendations/RecommendationCarousel';

interface ChatTimelineProps {
  messages: Message[];
  onLongPressMessage?: (message: Message) => void;
  renderFeedback?: (message: Message) => React.ReactNode;
}

export const ChatTimeline: React.FC<ChatTimelineProps> = ({
  messages,
  onLongPressMessage,
  renderFeedback,
}) => {
  const flatListRef = useRef<FlatList<Message>>(null);

  useEffect(() => {
    if (messages.length > 0) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages.length]);

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <MessageItem
            message={item}
            onLongPress={onLongPressMessage}
            renderRecommendations={(msg) => (
              <RecommendationCarousel recommendations={msg.recommendations} />
            )}
            renderFeedback={renderFeedback}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  listContent: {
    paddingVertical: 12,
  },
});