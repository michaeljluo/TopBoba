
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native';

const IP_ADDRESS = process.env.IP_ADDRESS
// const bobaShops = [
//   {
//     id: '1',
//     name: 'Mi Tea',
//     description: 'By integrating eastern and western tea cultures through the unique flavors of our tea, we hope to provide exciting, innovative drink options for our customers.',
//     image: require('./images/mi_tea.png'),
//   },
//   {
//     id: '2',
//     name: 'Chihiro Tea',
//     description: 'Crafting Excellence with Organic and High Quality ingredients.',
//     image: require('./images/chihiro_tea.png'),
//   },
//   // Add more shops as needed
// ];

const HomeScreen = ({ navigation }) => {
  const [bobaShops, setBobaShops] = useState([]);

  useEffect(() => {
    fetchBobaShops();
  }, []);

  const fetchBobaShops = async () => {
    try {
      // console.log(`http://${IP_ADDRESS}:5000/api/shops`)
      const response = await fetch(`http://${process.env.IP_ADDRESS}:5000/api/shops`); // Change URL if needed
      const data = await response.json();
      setBobaShops(data);
      // console.log(data)
    } catch (error) {
      console.error('Error fetching boba shops:', error);
    }
  };

  // Import all the images from the assets/images folder
  // path: data
  const images = require.context('./', true, /\.png$/);

  return (
    <View style={styles.container}>
      <FlatList
        data={bobaShops}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate('Shop', { shop: item })}
          >
            <View style={styles.shopContainer}>
            <Image source={images(item.image)} style={styles.shopImage} />
              <Text style={styles.shopName}>{item.name}</Text>
              <Text style={styles.shopDescription}>{item.description}</Text>
            </View>
          </TouchableWithoutFeedback>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  shopContainer: {
    marginBottom: 20,
  },
  shopImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  shopName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 8,
  },
  shopDescription: {
    fontSize: 16,
    marginTop: 4,
  },
});

export default HomeScreen;
