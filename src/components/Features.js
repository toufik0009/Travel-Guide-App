import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState, useEffect } from 'react';

export const FeatureItem = [
  {
    headline: 'All',
  },
  {
    headline: 'Popular',
  },
  {
    headline: 'Recommended',
  },
  {
    headline: 'More',
  },
];

const Features = () => {
  // Find the index of the "All" item
  const initialIndex = FeatureItem.findIndex(item => item.headline === 'All');
  
  // Set the initial state to the index of the "All" item
  const [currentItem, setCurrentItem] = useState(initialIndex);

  const currentPress = (index) => {
    setCurrentItem(index);
  };

  return (
    <View style={styles.container}>
      {FeatureItem.map((res, index) => (
        <TouchableOpacity key={index} onPress={() => currentPress(index)}>
          <View style={[styles.item, index === currentItem && styles.selectedItem]}>

            <Text style={[styles.text, index === currentItem && styles.selectedText]}>{res.headline}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Features;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffff',
    paddingHorizontal: 5,
    paddingVertical: 8,
    width: '95%',
    alignSelf: 'center',
    borderRadius: 50,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
    alignItems: 'center',
    overflow: 'hidden'
  },
  item: {
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  selectedItem: {
    backgroundColor: 'orange',
    borderRadius: 50,
  },
  text: {
    fontSize: 15,
  },
  selectedText: {
    color: '#ffff',
  },
});
