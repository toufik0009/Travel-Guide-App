import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useContext, useState } from 'react';
import { category } from '../dummyJson/Category';
import { useNavigation } from '@react-navigation/native';
import HeartIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { MyContext } from '../contextApi/ContextApi';

const MainPortion = ({ text }) => {
    const navigation = useNavigation();
    const { wishItems, toggleWishItems } = useContext(MyContext);
    const [categories] = useState(category);
    const [currentItem, setCurrentItem] = useState(null);

    const currentPress = (response, id) => {
        setCurrentItem(id);
        navigation.navigate('Details', { response });
    };

    const renderItems = ({ item }) => {
        const isWishlisted = wishItems.some((wishItem) => wishItem.id === item.id);

        return (
            <TouchableOpacity key={item.id} onPress={() => currentPress(item, item.id)}>
                <TouchableOpacity style={styles.heart} onPress={() => toggleWishItems(item, item.id)}>
                    <HeartIcon
                        name={isWishlisted ? 'cards-heart' : 'cards-heart-outline'}
                        style={{ color: 'tomato', fontSize: 28 }}
                    />
                </TouchableOpacity>

                <View style={[styles.categoryItem, currentItem === item.id && styles.selectedCategoryItem]}>
                    <Image source={{ uri: item.image }} style={styles.cateImg} />
                    <Text style={styles.txt}>{item.headline}</Text>
                    <Text numberOfLines={2} style={styles.txt1}>{item.slogan}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    const filteredCategories = categories.filter((value) => {
        if (!text) return value;
        return value.headline.toLowerCase().includes(text.toLowerCase());
    });

    return (
        <View style={{ flex: 1, marginBottom: 15 }}>
            <Text style={{ fontSize: 20, padding: 12 }}>Your Destination</Text>
            <FlatList
                data={filteredCategories}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItems}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

export default MainPortion;

const styles = StyleSheet.create({
    cateImg: {
        height: 250,
        width: 'auto',
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
