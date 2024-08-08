import { StyleSheet } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeIcon from 'react-native-vector-icons/AntDesign'

import WelComeScreen from '../screens/WelComeScreen'
import HomeScreen from '../screens/HomeScreen';
import WishList from '../screens/WishList';
import DetailsScreen from '../screens/DetailsScreen';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigationScreens = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        tabBarActiveTintColor: 'orange',
        tabBarInactiveTintColor: 'gray',
        tabBarIcon: ({ color, size, focused }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = 'home';
            return <HomeIcon name={iconName} size={size} color={color} />;
          } else if (route.name === 'WishList') {
            iconName = 'heart';
            return (
              <HomeIcon
                name={iconName}
                size={size}
                color={focused ? 'tomato' : 'gray'}
              />
            );
          }
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeNested}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="WishList"
        component={WishList}
        options={{ headerShown: true }}
      />
    </Tab.Navigator>
  );
};


const HomeNested = () => {
  return (
    <Stack.Navigator initialRouteName='HomeScreen'>
      <Stack.Screen name='HomeScreen' component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name='Details' component={DetailsScreen} options={{ headerShown: false }} />
      <Stack.Screen name='Wishlist' component={WishList} options={{ headerShown: true, title: 'My Wish Items' }} />
    </Stack.Navigator> 
  );
};

const FirstLookScreen = () => {
  return (
    <Stack.Navigator initialRouteName='Welcome'>
      <Stack.Screen name='Welcome' component={WelComeScreen} options={{ headerShown: false }} />
      <Stack.Screen name='Main' component={TabNavigationScreens} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <FirstLookScreen />
    </NavigationContainer>
  );
};

export default AppNavigation;

const styles = StyleSheet.create({});
