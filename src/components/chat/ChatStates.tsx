import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// 1. Initial Loading State
export const LoadingState: React.FC = () => (
  <View style={styles.centerContainer}>
    <ActivityIndicator size="large" color="#4F46E5" />
    <Text style={styles.stateTitle}>Loading conversation...</Text>
    <Text style={styles.stateSubtitle}>Connecting with your personal AI astrologer</Text>
  </View>
);

// 2. Empty State
interface EmptyStateProps {
  onStartSuggested?: (text: string) => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ onStartSuggested }) => (
  <View style={styles.centerContainer}>
    <View style={styles.iconCircle}>
      <Ionicons name="sparkles" size={32} color="#6366F1" />
    </View>
    <Text style={styles.stateTitle}>Start your conversation.</Text>
    <Text style={styles.stateSubtitle}>
      Ask about your horoscope, transit remedies, or career path.
    </Text>

    {onStartSuggested && (
      <View style={styles.suggestedContainer}>
        <TouchableOpacity
          style={styles.suggestionPill}
          onPress={() => onStartSuggested('How is my career looking for 2026?')}
        >
          <Text style={styles.suggestionPillText}>🔮 How is my career looking?</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.suggestionPill}
          onPress={() => onStartSuggested('Recommend a gemstone for focus')}
        >
          <Text style={styles.suggestionPillText}>💎 Recommend a gemstone</Text>
        </TouchableOpacity>
      </View>
    )}
  </View>
);

// 3. Network Failure / Error State
interface ErrorStateProps {
  onRetry: () => void;
  error?: string | null;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ onRetry, error }) => (
  <View style={styles.centerContainer}>
    <View style={[styles.iconCircle, { backgroundColor: '#FEE2E2' }]}>
      <Ionicons name="cloud-offline-outline" size={32} color="#EF4444" />
    </View>
    <Text style={styles.stateTitle}>Unable to load conversation.</Text>
    <Text style={styles.stateSubtitle}>
      {error || 'Please check your connection and try again.'}
    </Text>
    <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
      <Ionicons name="refresh" size={16} color="#FFFFFF" />
      <Text style={styles.retryButtonText}>Retry</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    backgroundColor: '#F9FAFB',
  },
  iconCircle: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  stateTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginTop: 12,
    textAlign: 'center',
  },
  stateSubtitle: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 6,
    textAlign: 'center',
    lineHeight: 18,
  },
  suggestedContainer: {
    marginTop: 20,
    width: '100%',
    gap: 8,
  },
  suggestionPill: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'center',
  },
  suggestionPillText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#4F46E5',
  },
  retryButton: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4F46E5',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    gap: 6,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});