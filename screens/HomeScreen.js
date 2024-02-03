import React from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native';

const bobaShops = [
  {
    id: '1',
    name: 'Mi Tea',
    description: 'By integrating eastern and western tea cultures through the unique flavors of our tea, we hope to provide exciting, innovative drink options for our customers.',
    image: require('./images/mi_tea.png'),
  },
  {
    id: '2',
    name: 'Chihiro Tea',
    description: 'Crafting Excellence with Organic and High Quality ingredients.',
    image: require('./images/chihiro_tea.png'),
  },
  // Add more shops as needed
];

// ... (previous code)

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={bobaShops}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate('Shop', { shopId: item.id })}
          >
            <View style={styles.shopContainer}>
              <Image source={item.image} style={styles.shopImage} />
              <Text style={styles.shopName}>{item.name}</Text>
              <Text style={styles.shopDescription}>{item.description}</Text>
            </View>
          </TouchableWithoutFeedback>
        )}
      />
    </View>
  );
};

// ... (remaining code)

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
