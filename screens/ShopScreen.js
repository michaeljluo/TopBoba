import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';

const IP_ADDRESS = process.env.IP_ADDRESS



const ShopScreen = ({route, navigation}) => {
  const [reviews, setReviews] = useState([]);
  const { shop } = route.params;
  const popularDrinks = [];

  // Import all the images from the assets/images folder
  // path: data
  const images = require.context('./', true, /\.png$/);

  useEffect(() => {
    fetchReviews();
  }, [])

  const fetchReviews = async () =>{
    try{
      const response = await fetch(`http:/${process.env.IP_ADDRESS}:5000/api/shop?id=${shop.id}`);
      const data = await response.json();
      setReviews(data);
    } catch(e){
      console.error("Error fetching reviews:", e)
    }
  }

  const calculateAverageRating = (reviews) => {
    if (reviews.length === 0) {
      return '';
    }
    const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
    return totalRating / reviews.length;
  };

  console.log(shop); 
  // const averageRating = calculateAverageRating(shopDetails.reviews);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={images(shop.image)} style={styles.shopImage} />
        <View style={styles.shopInfo}>
          <Text style={styles.shopName}>{shop.name}</Text>
          <Text style={styles.shopRating}>Overall Rating: {0}</Text>
          <Text style={styles.shopAddress}>{shop.address}</Text>
        </View>
      </View>

      <View style={styles.popularDrinksContainer}>
        <Text style={styles.sectionTitle}>Most Popular Drinks</Text>
        <FlatList
          data={popularDrinks}
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
          data={reviews}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.reviewCard}>
              <Text style={styles.reviewUser}>{item.user_name}</Text>
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


export default ShopScreen;
