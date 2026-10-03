import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Message } from '../../types/chat';

interface Props {
  onSendMessage: (text: string) => void;
  replyingTo: Message | null;
  onCancelReply: () => void;
}

export const MessageComposer: React.FC<Props> = ({
  onSendMessage,
  replyingTo,
  onCancelReply,
}) => {
  const [inputText, setInputText] = useState('');

  const handleSend = () => {
    const trimmed = inputText.trim();
    if (!trimmed) return;
    onSendMessage(trimmed);
    setInputText('');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0}
    >
      {/* Reply Preview Bar */}
      {replyingTo && (
        <View style={styles.replyPreviewBar}>
          <View style={styles.replyBarIndicator} />
          <View style={styles.replyContent}>
            <Text style={styles.replyHeader}>
              Replying to {replyingTo.type.toUpperCase()}
            </Text>
            <Text numberOfLines={1} style={styles.replyText}>
              {replyingTo.text}
            </Text>
          </View>
          <TouchableOpacity onPress={onCancelReply} hitSlop={10} style={styles.closeReplyBtn}>
            <Ionicons name="close-circle" size={20} color="#9CA3AF" />
          </TouchableOpacity>
        </View>
      )}

      {/* Input Row */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Ask anything about astrology or remedies..."
          placeholderTextColor="#9CA3AF"
          value={inputText}
          onChangeText={setInputText}
          multiline
          maxLength={500}
        />
        <TouchableOpacity
          onPress={handleSend}
          disabled={!inputText.trim()}
          style={[
            styles.sendButton,
            inputText.trim() ? styles.sendButtonActive : styles.sendButtonDisabled,
          ]}
        >
          <Ionicons
            name="arrow-up"
            size={20}
            color={inputText.trim() ? '#FFFFFF' : '#9CA3AF'}
          />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  replyPreviewBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#E0E7FF',
  },
  replyBarIndicator: {
    width: 3,
    height: '100%',
    backgroundColor: '#6366F1',
    borderRadius: 2,
    marginRight: 8,
  },
  replyContent: {
    flex: 1,
  },
  replyHeader: {
    fontSize: 11,
    fontWeight: '700',
    color: '#4F46E5',
  },
  replyText: {
    fontSize: 12,
    color: '#4B5563',
  },
  closeReplyBtn: {
    padding: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  textInput: {
    flex: 1,
    minHeight: 40,
    maxHeight: 100,
    backgroundColor: '#F3F4F6',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 14,
    color: '#1F2937',
  },
  sendButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  sendButtonActive: {
    backgroundColor: '#4F46E5',
  },
  sendButtonDisabled: {
    backgroundColor: '#E5E7EB',
  },
});