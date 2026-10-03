import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DislikeReason, MessageFeedback } from '../../types/chat';

interface Props {
  feedback?: MessageFeedback;
  onSelectFeedback: (feedback: MessageFeedback) => void;
}

const DISLIKE_REASONS: DislikeReason[] = [
  'Inaccurate',
  'Too Generic',
  "Didn't Help",
  'Too Long',
];

export const FeedbackRow: React.FC<Props> = ({
  feedback,
  onSelectFeedback,
}) => {
  const [showChips, setShowChips] = useState(feedback?.type === 'dislike');

  const handleLike = () => {
    setShowChips(false);
    onSelectFeedback({ type: 'like' });
  };

  const handleDislike = () => {
    setShowChips(true);
    onSelectFeedback({ type: 'dislike', reason: feedback?.reason });
  };

  const handleSelectReason = (reason: DislikeReason) => {
    onSelectFeedback({ type: 'dislike', reason });
  };

  return (
    <View style={styles.container}>
      {/* Thumbs Up / Down Bar */}
      <View style={styles.thumbsBar}>
        <Text style={styles.helperText}>Was this helpful?</Text>
        <TouchableOpacity
          onPress={handleLike}
          style={[
            styles.iconButton,
            feedback?.type === 'like' && styles.iconButtonSelected,
          ]}
        >
          <Ionicons
            name={feedback?.type === 'like' ? 'thumbs-up' : 'thumbs-up-outline'}
            size={14}
            color={feedback?.type === 'like' ? '#4F46E5' : '#6B7280'}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleDislike}
          style={[
            styles.iconButton,
            feedback?.type === 'dislike' && styles.iconButtonSelected,
          ]}
        >
          <Ionicons
            name={
              feedback?.type === 'dislike'
                ? 'thumbs-down'
                : 'thumbs-down-outline'
            }
            size={14}
            color={feedback?.type === 'dislike' ? '#EF4444' : '#6B7280'}
          />
        </TouchableOpacity>
      </View>

      {/* Expandable Dislike Chips */}
      {showChips && (
        <View style={styles.chipsContainer}>
          <Text style={styles.chipsHeader}>Why wasn't this helpful?</Text>
          <View style={styles.chipsRow}>
            {DISLIKE_REASONS.map((reason) => {
              const isSelected = feedback?.reason === reason;
              return (
                <TouchableOpacity
                  key={reason}
                  onPress={() => handleSelectReason(reason)}
                  style={[
                    styles.chip,
                    isSelected ? styles.chipSelected : styles.chipUnselected,
                  ]}
                >
                  <Text
                    style={[
                      styles.chipText,
                      isSelected ? styles.chipTextSelected : styles.chipTextUnselected,
                    ]}
                  >
                    {reason}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  thumbsBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  helperText: {
    fontSize: 11,
    color: '#9CA3AF',
    marginRight: 4,
  },
  iconButton: {
    padding: 5,
    borderRadius: 6,
    backgroundColor: '#F9FAFB',
  },
  iconButtonSelected: {
    backgroundColor: '#EEF2FF',
  },
  chipsContainer: {
    marginTop: 8,
  },
  chipsHeader: {
    fontSize: 11,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 6,
  },
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  chip: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
  },
  chipUnselected: {
    backgroundColor: '#F9FAFB',
    borderColor: '#E5E7EB',
  },
  chipSelected: {
    backgroundColor: '#FEE2E2',
    borderColor: '#F87171',
  },
  chipText: {
    fontSize: 11,
    fontWeight: '500',
  },
  chipTextUnselected: {
    color: '#4B5563',
  },
  chipTextSelected: {
    color: '#B91C1C',
  },
});