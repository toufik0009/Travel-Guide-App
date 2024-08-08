import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import HeartIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const WishList = ({ route }) => {
  const navigation = useNavigation()
  const { response } = route.params || {};
  console.log("WishList", response);

  const [wishData, setWishData] = useState([]);
  const [hearts, setHearts] = useState([]);
  const [currentItem, setCurrentItem] = useState(null);

  useEffect(() => {
    if (response) {
      setWishData((previous) => [...previous, response]);
      setHearts((previous) => [...previous, true]);
    }
  }, [response]);

  if (!response) {
    return (
      <View>
        <Text>No data available</Text>
      </View>
    );
  }

  const toggleHeart = (index) => {
    setWishData((previous) => previous.filter((_, i) => i !== index));
  };

  const currentPress = (response, id) => {
    setCurrentItem(id);
    navigation.navigate('Details', { response });
  };

  return (
    <ScrollView style={styles.container}>
      {wishData.map((res, index) => (
        <SafeAreaView key={index}>
          <TouchableOpacity onPress={() => currentPress(res, index)}>
            <View style={styles.item} >
              <Image source={{ uri: res.image }} style={styles.image} />
              <View style={styles.bottomDetails}>
                <Text style={styles.heading}>{res.headline}</Text>
                <TouchableOpacity style={styles.heart} onPress={() => toggleHeart(index)}>
                  <HeartIcon name="cards-heart" style={{ color: 'tomato', fontSize: 28 }} />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        </SafeAreaView>
      ))}
    </ScrollView>
  );
};

export default WishList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  noDataText: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 20,
  },
  item: {
    marginBottom: 20,
    backgroundColor: '#ffff',
    paddingTop: 0,
    paddingHorizontal: 15,
    paddingBottom: 0,
    borderRadius: 20,
  },
  image: {
    height: 200,
    width: '100%',
    marginTop: 10,
    borderRadius: 20,
  },
  bottomDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  heading: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    fontSize: 20,
  },
  heart: {
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
});
