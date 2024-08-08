import React, { useState } from 'react';
import { Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LottieView from 'lottie-react-native';
import * as Animatable from 'react-native-animatable';

const WelcomeScreen = ({ navigation }) => {

  
  return (
    <View style={styles.container}>

      <StatusBar backgroundColor={"#fff0"} translucent />

      {/* <LottieView style={styles.background} source={require('../assets/animation/LcL85V2jAP1.json')} autoPlay loop resizeMode='center'/> */}

      <Image source={{ uri: 'https://images.unsplash.com/photo-1524613032530-449a5d94c285?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGluZGlhfGVufDB8fDB8fHww' }} style={styles.background} resizeMode='cover' />

      <View style={styles.content}>
        <Animatable.Text
          animation={"bounceInLeft"}
          duration={3000}
          style={styles.text}>Traveling made easy!</Animatable.Text>

        <Animatable.Text
          animation='zoomIn'
          duration={2000}

          style={[styles.text, { fontSize: 15, width: "80%" }]}>Experience the world's best adventure around the world with us</Animatable.Text>
        <Animatable.View
          animation={"fadeInUpBig"} duration={2000}>
          <TouchableOpacity style={styles.btn} onPress={()=>{navigation.navigate('Main')}} >
            <Text style={[styles.text, { fontSize: 20 }]}>Let's Go</Text>
          </TouchableOpacity>
        </Animatable.View>

      </View>

    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  text: {
    fontSize: 30,
    color: 'white',
  },
  content: {
    position: 'absolute',
    bottom: 150,
    left: 25,
    gap: 15
  },
  btn: {
    backgroundColor: 'orange',
    width: '40%',
    paddingHorizontal: 1,
    paddingVertical: 8,
    borderRadius: 50,
    alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: 2,
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 5
  }
});
