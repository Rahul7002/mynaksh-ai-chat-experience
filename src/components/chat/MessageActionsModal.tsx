import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Message } from '../../types/chat';

interface Props {
  visible: boolean;
  message: Message | null;
  onClose: () => void;
  onReply: (message: Message) => void;
  onCopy: (message: Message) => void;
  onDelete: (messageId: string) => void;
}

export const MessageActionsModal: React.FC<Props> = ({
  visible,
  message,
  onClose,
  onReply,
  onCopy,
  onDelete,
}) => {
  if (!message) return null;

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose}>
        <View style={styles.sheetContainer}>
          <Text style={styles.sheetTitle}>Message Options</Text>

          <TouchableOpacity
            style={styles.actionBtn}
            onPress={() => {
              onReply(message);
              onClose();
            }}
          >
            <Ionicons name="return-up-back-outline" size={20} color="#4F46E5" />
            <Text style={styles.actionText}>Reply</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionBtn}
            onPress={() => {
              onCopy(message);
              onClose();
            }}
          >
            <Ionicons name="copy-outline" size={20} color="#374151" />
            <Text style={styles.actionText}>Copy Text</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionBtn, styles.deleteBtn]}
            onPress={() => {
              onDelete(message.id);
              onClose();
            }}
          >
            <Ionicons name="trash-outline" size={20} color="#EF4444" />
            <Text style={[styles.actionText, styles.deleteText]}>Delete Message</Text>
          </TouchableOpacity>
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  sheetContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 32,
  },
  sheetTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#9CA3AF',
    textTransform: 'uppercase',
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E5E7EB',
    gap: 12,
  },
  actionText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
  },
  deleteBtn: {
    borderBottomWidth: 0,
  },
  deleteText: {
    color: '#EF4444',
  },
});