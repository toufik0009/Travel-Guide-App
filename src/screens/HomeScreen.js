import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native';
import Icons from 'react-native-vector-icons/AntDesign';
import SearchIcon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';

import { Places } from '../dummyJson/Places';
import Features from '../components/Features';
import MainPortion from '../components/MainPortion';


const HomeScreen = () => {
  const navigation = useNavigation();
  const [places, setPlaces] = useState(Places);
  const [text, setText] = useState('');
  const [seeAll, setSeeAll] = useState(false);

  const close = () => {
    setText('');
  }

  const seeAllToggle = () => {
    setSeeAll(!seeAll);
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={"#fff"} barStyle={"dark-content"} translucent />

      <View style={styles.profile}>
        <Animatable.Text
          animation={"fadeInDownBig"}
          duration={2000}
          style={styles.profileText}>Let's Discover</Animatable.Text>
        <Icons name='user' style={styles.icons} />
      </View>
      <Animatable.View
        animation={"flipInY"}
        duration={3000}
        style={styles.searchBox}>
        <SearchIcon name='search1' style={styles.searchIcon} />
        
        <TextInput
          placeholder='Search Destination'
          style={styles.input}
          onChangeText={txt => setText(txt)}
          value={text}
        />
        {text ? <Icons name='close' style={[styles.searchIcon, { color: 'red' }]} onPress={close} /> : null}
      </Animatable.View>

      <View>
        <View style={styles.cateHeading}>
          <Text style={styles.categoryTitle}>Categories</Text>
          <TouchableOpacity onPress={seeAllToggle}>
            <Text style={styles.seeAll}>{seeAll ? 'Show less' : 'See all'}</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>

          <View style={seeAll ? styles.categoryContainerCol : styles.categoryContainer}>

            {places.filter((value) => {
              if (text === null) {
                return value;
              } else if (value.headline.toLowerCase().includes(text.toLowerCase())) {
                return value;
              }
            }).map((res, index) => (
              <Animatable.View
                animation={"fadeInRight"}
                duration={2000}
                key={index}
                style={styles.categoryItem}>
                <TouchableOpacity 
                  style={styles.colItem}
                >
                  <Image source={{ uri: res.image }} style={styles.cateImg} />
                  <Text style={styles.categoryText}>{res.headline}</Text>

                </TouchableOpacity>
              </Animatable.View>
            ))}
          </View>
        </ScrollView>
      </View>

      <Features />
      <MainPortion text={text} setText={setText} />
    </SafeAreaView>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff6',
  },
  profile: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingTop: 30,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  profileText: {
    fontSize: 28,
  },
  icons: {
    fontSize: 25,
    backgroundColor: 'orange',
    borderRadius: 50,
    padding: 3,
    color: 'white',
  },
  searchBox: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
    backgroundColor: '#fff',
    width: '80%',
    marginTop: 20,
    padding: 5,
    paddingLeft: 10,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  searchIcon: {
    fontSize: 18,
    padding: 5,
  },
  input: {
    flex: 1,
    padding: 2,
  },
  cateHeading: {
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 10,
    paddingBottom: 5,
    flexDirection: 'row',
  },
  categoryTitle: {
    fontSize: 20,
  },
  seeAll: {
    color: 'orange',
  },
  categoryContainer: {
    flexDirection: 'row',
  },
  categoryContainerCol: {
    flexDirection:'row',
    flexWrap:'wrap'
  },
  colItem:{
    
  },
  categoryItem: {
    alignItems: 'center',
    margin: 10,
  },
  cateImg: {
    height: 80,
    width: 90,
    borderRadius: 15,
  },
  categoryText: {
    textAlign: 'center',
  },
});
