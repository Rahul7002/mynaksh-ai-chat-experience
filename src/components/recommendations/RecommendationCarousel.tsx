import React from 'react';
import { View, Text, FlatList, StyleSheet, Alert } from 'react-native';
import { Recommendation } from '../../types/chat';
import {
  CardProps,
  GemstoneCard,
  TarotCard,
  ConsultationCard,
  ArticleCard,
  DefaultRecommendationCard,
} from './cards';

// Strategy / Registry mapping for OCP (Open-Closed Principle)
const REGISTRY: Record<string, React.FC<CardProps>> = {
  gemstone: GemstoneCard,
  tarot: TarotCard,
  consultation: ConsultationCard,
  article: ArticleCard,
};

interface Props {
  recommendations?: Recommendation[];
}

export const RecommendationCarousel: React.FC<Props> = ({ recommendations }) => {
  if (!recommendations || recommendations.length === 0) return null;

  const handleCardPress = (rec: Recommendation) => {
    Alert.alert(
      rec.title,
      `Recommendation type: ${rec.type}\nSubtitle: ${rec.subtitle || 'N/A'}`
    );
  };

  const renderCard = ({ item }: { item: Recommendation }) => {
    // Lookup in registry, or fallback to default card for unknown types
    const Component = REGISTRY[item.type] || DefaultRecommendationCard;
    return <Component item={item} onPress={handleCardPress} />;
  };

  return (
    <View style={styles.wrapper}>
      <Text style={styles.sectionHeader}>SUGGESTED EXPERIENCES</Text>
      <FlatList
        data={recommendations}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={renderCard}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 10,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  sectionHeader: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
    color: '#6B7280',
    marginBottom: 8,
  },
  listContainer: {
    paddingRight: 6,
  },
});