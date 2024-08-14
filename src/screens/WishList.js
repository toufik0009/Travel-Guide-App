import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useContext } from 'react';
import { TouchableOpacity } from 'react-native';
import HeartIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import { MyContext } from '../contextApi/ContextApi';

const WishList = ({navigation}) => {
  const { wishItems, toggleWishItems } = useContext(MyContext);

  return (
    <ScrollView style={styles.container}>
      {wishItems.length === 0 ? (
        <Text style={styles.noDataText}>No items in your wishlist.</Text>
      ) : (
        wishItems.map((res) => (
          <SafeAreaView key={res.id}>
            <TouchableOpacity onPress={()=>{ navigation.navigate('Details', { response:res });}}>

            <View style={styles.item}>
              <Image source={{ uri: res.image }} style={styles.image} />
              <View style={styles.bottomDetails}>
                <Text style={styles.heading}>{res.headline}</Text>

                <TouchableOpacity style={styles.heart} onPress={() => toggleWishItems(res, res.id)}>
                  <HeartIcon name="cards-heart" style={{ color: 'tomato', fontSize: 28 }} />
                </TouchableOpacity>
              </View>
            </View>
            </TouchableOpacity>
          </SafeAreaView>
        ))
      )}
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
    paddingHorizontal: 15,
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
