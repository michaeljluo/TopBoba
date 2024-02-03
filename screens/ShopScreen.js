import React from 'react';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';

const shopDetails = {
  id: '1',
  name: 'Bubble Tea Haven',
  address: '123 Bubble Street, Tea City',
  image: require('./images/mi_tea.png'),
  popularDrinks: [
    { id: '1', name: 'Classic Milk Tea' },
    { id: '2', name: 'Taro Slush' },
    { id: '3', name: 'Passion Fruit Green Tea' },
  ],
  reviews: [
    { id: '1', user: 'Alice', rating: 5, comment: 'Great boba, loved the atmosphere!' },
    { id: '2', user: 'Bob', rating: 3, comment: 'Nice variety of drinks, friendly staff.' },
    // Add more reviews as needed
  ],
};

const ShopScreen = () => {
  const averageRating = calculateAverageRating(shopDetails.reviews);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={shopDetails.image} style={styles.shopImage} />
        <View style={styles.shopInfo}>
          <Text style={styles.shopName}>{shopDetails.name}</Text>
          <Text style={styles.shopRating}>Overall Rating: {averageRating.toFixed(1)}</Text>
          <Text style={styles.shopAddress}>{shopDetails.address}</Text>
        </View>
      </View>

      <View style={styles.popularDrinksContainer}>
        <Text style={styles.sectionTitle}>Most Popular Drinks</Text>
        <FlatList
          data={shopDetails.popularDrinks}
          keyExtractor={(item) => item.id}
          horizontal
          renderItem={({ item }) => (
            <View style={styles.popularDrinkCard}>
              <Text>{item.name}</Text>
            </View>
          )}
        />
      </View>

      <View style={styles.reviewsContainer}>
        <Text style={styles.sectionTitle}>User Reviews</Text>
        <FlatList
          data={shopDetails.reviews}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.reviewCard}>
              <Text style={styles.reviewUser}>{item.user}</Text>
              <Text style={styles.reviewRating}>Rating: {item.rating}</Text>
              <Text style={styles.reviewComment}>{item.comment}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  shopImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  shopInfo: {
    marginLeft: 16,
  },
  shopName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  shopRating: {
    fontSize: 16,
    marginTop: 4,
  },
  shopAddress: {
    fontSize: 16,
    marginTop: 4,
  },
  popularDrinksContainer: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  popularDrinkCard: {
    backgroundColor: '#e0e0e0',
    padding: 8,
    borderRadius: 8,
    marginRight: 8,
  },
  reviewsContainer: {},
  reviewCard: {
    backgroundColor: '#f5f5f5',
    padding: 8,
    borderRadius: 8,
    marginBottom: 8,
  },
  reviewUser: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  reviewRating: {
    fontSize: 16,
    marginTop: 4,
  },
  reviewComment: {
    fontSize: 16,
    marginTop: 4,
  },
});

const calculateAverageRating = (reviews) => {
    if (reviews.length === 0) {
        return '';
    }

    const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
    return totalRating / reviews.length;
};


export default ShopScreen;
