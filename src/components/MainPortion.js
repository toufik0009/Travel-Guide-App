import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { category } from '../dummyJson/Category';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import HeartIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import HeartIcon2 from 'react-native-vector-icons/MaterialCommunityIcons';

const MainPortion = ({ text, setText }) => {
    const navigation = useNavigation();
    const [categories, setCategories] = useState(category);
    const [currentItem, setCurrentItem] = useState(null);
    const [hearts, setHearts] = useState(Array(category.length).fill(false));

    const toggleHeart = (response, index) => {
        const updatedHearts = hearts.map((heart, i) => (i === index ? !heart : heart));
        setHearts(updatedHearts);
        if (!hearts[index]) {
            navigation.navigate('WishList', { response });
        }
    };

    const currentPress = (response, id) => {
        setCurrentItem(id);
        navigation.navigate('Details', { response });
    };

    return (
        <View style={{ flex: 1, marginBottom: 15 }}>
            <Text style={{ fontSize: 20, padding: 12 }}>Your Destination</Text>
            <ScrollView scrollIndicatorInsets={false}>
                <Animatable.View
                    animation={"fadeInUpBig"}
                    duration={2000}
                    style={styles.items}>
                    {categories
                        .filter((value) => {
                            if (text == null) {
                                return value;
                            } else if (value.headline.toLowerCase().includes(text.toLowerCase())) {
                                return value;
                            }
                        })
                        .map((res, index) => (
                            <TouchableOpacity key={index} onPress={() => currentPress(res, index)}>
                                <TouchableOpacity style={styles.heart} onPress={() => toggleHeart(res, index)}>
                                    {hearts[index] ? (
                                        <HeartIcon2 name='cards-heart' style={{ color: 'tomato', fontSize: 28 }} />
                                    ) : (
                                        <HeartIcon name='cards-heart-outline' style={{ color: 'tomato', fontSize: 28 }} />
                                    )}
                                </TouchableOpacity>
                                <View style={[styles.categoryItem, currentItem === index && styles.selectedCategoryItem]}>
                                    <Image source={{ uri: res.image }} style={styles.cateImg} />
                                    <Text style={styles.txt}>{res.headline}</Text>
                                    <Text numberOfLines={2} style={styles.txt1}>{res.slogan}</Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                </Animatable.View>
            </ScrollView>
        </View>
    );
};

export default MainPortion;

const styles = StyleSheet.create({
    cateImg: {
        height: 250,
        width: 350,
        marginVertical: 5,
        borderRadius: 20,
    },
    txt: {
        position: "absolute",
        fontSize: 25,
        color: "#fff",
        bottom: 75,
        left: 15,
        padding: 10,
    },
    txt1: {
        position: "absolute",
        fontSize: 13,
        color: "white",
        bottom: 30,
        left: 18,
        padding: 5,
        flexWrap: 'wrap',
        width: '80%',
        lineHeight: 18,
        backgroundColor: '#fff5',
        borderRadius: 12,
    },
    items: {
        alignItems: 'center',
    },
    categoryItem: {
        marginBottom: 5,
        padding: 10,
        borderRadius: 10,
    },
    selectedCategoryItem: {
        shadowColor: '#000',
        shadowOffset: 1,
        shadowOpacity: 1,
        shadowRadius: 5,
        elevation: 8,
    },
    heart: {
        position: 'absolute',
        top: 25,
        right: 25,
        zIndex: 1,
        backgroundColor: '#fff6',
        padding: 5,
        borderRadius: 50,
        alignItems: 'center',
    },
});
