import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Recommendation } from '../../types/chat';

export interface CardProps {
  item: Recommendation;
  onPress: (item: Recommendation) => void;
}

// 💎 Gemstone Card
export const GemstoneCard: React.FC<CardProps> = ({ item, onPress }) => (
  <Pressable style={[styles.cardBase, styles.gemstoneBorder]} onPress={() => onPress(item)}>
    <View style={[styles.iconContainer, { backgroundColor: '#EEF2FF' }]}>
      <Ionicons name="diamond-outline" size={20} color="#4F46E5" />
    </View>
    <Text numberOfLines={1} style={styles.cardTitle}>{item.title}</Text>
    {item.subtitle && <Text numberOfLines={1} style={styles.cardSubtitle}>{item.subtitle}</Text>}
    <View style={styles.tagBadge}>
      <Text style={styles.tagText}>Gemstone</Text>
    </View>
  </Pressable>
);

// 🔮 Tarot Card
export const TarotCard: React.FC<CardProps> = ({ item, onPress }) => (
  <Pressable style={[styles.cardBase, styles.tarotBorder]} onPress={() => onPress(item)}>
    <View style={[styles.iconContainer, { backgroundColor: '#FDF4FF' }]}>
      <Ionicons name="sparkles-outline" size={20} color="#9333EA" />
    </View>
    <Text numberOfLines={1} style={styles.cardTitle}>{item.title}</Text>
    {item.subtitle && <Text numberOfLines={1} style={styles.cardSubtitle}>{item.subtitle}</Text>}
    <View style={[styles.tagBadge, { backgroundColor: '#F3E8FF' }]}>
      <Text style={[styles.tagText, { color: '#7E22CE' }]}>Tarot</Text>
    </View>
  </Pressable>
);

// 👨‍🏫 Consultation Card
export const ConsultationCard: React.FC<CardProps> = ({ item, onPress }) => (
  <Pressable style={[styles.cardBase, styles.consultationBorder]} onPress={() => onPress(item)}>
    <View style={[styles.iconContainer, { backgroundColor: '#ECFDF5' }]}>
      <Ionicons name="chatbubbles-outline" size={20} color="#059669" />
    </View>
    <Text numberOfLines={1} style={styles.cardTitle}>{item.title}</Text>
    {item.subtitle && <Text numberOfLines={1} style={styles.cardSubtitle}>{item.subtitle}</Text>}
    <View style={[styles.tagBadge, { backgroundColor: '#D1FAE5' }]}>
      <Text style={[styles.tagText, { color: '#047857' }]}>Consult</Text>
    </View>
  </Pressable>
);

// 📰 Article Card
export const ArticleCard: React.FC<CardProps> = ({ item, onPress }) => (
  <Pressable style={[styles.cardBase, styles.articleBorder]} onPress={() => onPress(item)}>
    <View style={[styles.iconContainer, { backgroundColor: '#FEF3C7' }]}>
      <Ionicons name="book-outline" size={20} color="#D97706" />
    </View>
    <Text numberOfLines={1} style={styles.cardTitle}>{item.title}</Text>
    {item.subtitle && <Text numberOfLines={1} style={styles.cardSubtitle}>{item.subtitle}</Text>}
    <View style={[styles.tagBadge, { backgroundColor: '#FDE68A' }]}>
      <Text style={[styles.tagText, { color: '#B45309' }]}>Read</Text>
    </View>
  </Pressable>
);

// 🪔 Remedy / Fallback Generic Card
export const DefaultRecommendationCard: React.FC<CardProps> = ({ item, onPress }) => (
  <Pressable style={[styles.cardBase, styles.defaultBorder]} onPress={() => onPress(item)}>
    <View style={[styles.iconContainer, { backgroundColor: '#F3F4F6' }]}>
      <Ionicons name="cube-outline" size={20} color="#4B5563" />
    </View>
    <Text numberOfLines={1} style={styles.cardTitle}>{item.title}</Text>
    {item.subtitle && <Text numberOfLines={1} style={styles.cardSubtitle}>{item.subtitle}</Text>}
    <View style={[styles.tagBadge, { backgroundColor: '#E5E7EB' }]}>
      <Text style={[styles.tagText, { color: '#374151' }]}>{item.type.toUpperCase()}</Text>
    </View>
  </Pressable>
);

const styles = StyleSheet.create({
  cardBase: {
    width: 145,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 10,
    marginRight: 10,
    borderWidth: 1,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    justifyContent: 'space-between',
  },
  gemstoneBorder: { borderColor: '#C7D2FE' },
  tarotBorder: { borderColor: '#E9D5FF' },
  consultationBorder: { borderColor: '#A7F3D0' },
  articleBorder: { borderColor: '#FDE68A' },
  defaultBorder: { borderColor: '#E5E7EB' },
  iconContainer: {
    width: 34,
    height: 34,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  cardSubtitle: {
    fontSize: 11,
    color: '#6B7280',
    marginBottom: 6,
  },
  tagBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#E0E7FF',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginTop: 4,
  },
  tagText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#4338CA',
    textTransform: 'uppercase',
  },
});