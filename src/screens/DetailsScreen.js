import {
    Image,
    Linking,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as Animatable from "react-native-animatable";
import LeftIcon from "react-native-vector-icons/FontAwesome5";
import LocationIcon from "react-native-vector-icons/FontAwesome6";
import ArrowRight from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const DetailsScreen = ({ route }) => {
    const navigation = useNavigation();
    const { response } = route.params;
    const [currentItem, setCurrentItem] = useState(null);
    const [countryData, setCountryData] = useState(null);

    const currentPress = (res, id) => {
        setCurrentItem(res);
    };

    const fetchData = async () => {
        try {
            const res = await axios.get(
                `https://restcountries.com/v3.1/name/${response.headline.toLowerCase()}`
            );
            setCountryData(res.data[0]);
        } catch (error) {
            console.error("Failed to fetch country data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [response.headline]);

    return (
        <View style={styles.container}>
            <StatusBar barStyle={"light-content"} backgroundColor={"#fff1"} translucent />

            <TouchableOpacity
                onPress={() => {
                    // navigation.navigate("Main", { screen: "HomeScreen" });
                    navigation.goBack();
                }}
            >
                <LeftIcon name="angle-left" style={styles.LeftIcon} />
            </TouchableOpacity>

            <Animatable.Image
                animation={"zoomInRight"}
                duration={2000}
                source={{ uri: currentItem ? currentItem.Img : response.image }}
                style={styles.img}
            />

            <View style={styles.content}>
                <ScrollView>
                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Animatable.Text
                            animation={"fadeInLeft"}
                            duration={2000}
                            style={[styles.txt, { paddingTop: 10, paddingBottom: 5, fontSize: 26 }]}
                        >
                            {currentItem ? currentItem.ImgName : response.headline}
                        </Animatable.Text>
                        {
                            countryData &&
                            (
                                <Image source={{ uri: countryData.flags.png }} height={60} width={100} style={{ borderRadius: 12 }} resizeMode="stretch" />
                            )

                        }
                    </View>

                    <Animatable.Text
                        animation={"fadeInUp"}
                        duration={2000}
                        style={styles.txt}
                        numberOfLines={6}
                    >
                        {response.slogan}
                    </Animatable.Text>

                    <View style={styles.location}>
                        <LocationIcon name="location-crosshairs" style={styles.locationIcon} />
                        <Text style={[styles.txt, { color: "#ffff", fontWeight: "500" }]}>
                            {response.distance}
                        </Text>
                    </View>

                    {countryData && (
                        <View style={{ padding: 12, gap: 10 }}>
                            <Text style={{ fontSize: 18 }}>Population: {countryData.population}</Text>
                            <View>
                                {Object.entries(countryData.currencies).map(([key, currency]) => (
                                    <Text style={{ fontSize: 17 }} key={key}>Currency: {currency.name} ({currency.symbol})</Text>
                                ))}
                            </View>
                            <Text style={{ fontSize: 17 }}>Language: {Object.keys(countryData.languages).join(',').toUpperCase()}</Text>
                            <Text style={{ fontSize: 17 }}>Capital: {countryData.capital}</Text>

                        </View>
                    )}

                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <View style={styles.scrol}>
                            {response.otherImgs.map((res, index) => (
                                <TouchableOpacity key={index} onPress={() => currentPress(res, index)}>
                                    <View key={index} style={styles.otherImgContainer}>
                                        <Image source={{ uri: res.Img }} style={styles.otherImg} />
                                        <Text>{res.ImgName}</Text>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </ScrollView>

                </ScrollView>

                <TouchableOpacity style={styles.visit} onPress={() => Linking.openURL(countryData.maps.googleMaps)}>
                    <Text style={styles.visitTxt}>
                        Visit Now <ArrowRight name="arrow-up-right" style={{ fontSize: 16 }} />
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default DetailsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    LeftIcon: {
        position: "absolute",
        top: 40,
        left: 30,
        fontSize: 35,
        alignItems: "flex-start",
        color: "white",
        backgroundColor: "#fff6",
        paddingHorizontal: 10,
        paddingVertical: 2,
        borderRadius: 12,
    },
    img: {
        height: 350,
        width: "100%",
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 50,
        shadowColor: "red",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 1,
        shadowRadius: 5,
        elevation: 8,
        zIndex: -1,
    },
    content: {
        flex: 1,
        width: "100%",
        paddingTop: 10,
        paddingLeft: 15,
        paddingRight: 8,
    },
    txt: {
        fontSize: 16,
        flexWrap: "wrap",
        letterSpacing: 0.5,
        lineHeight: 22,
        padding: 5,
    },
    otherImgContainer: {
        marginTop: 20,
        alignItems: "center",
        gap: 10,
    },
    location: {
        backgroundColor: "orange",
        padding: 5,
        marginTop: 15,
        borderRadius: 25,
        width: 250,
        textAlign: "center",
        color: "#ffff",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
        gap: 5,
    },
    locationIcon: {
        fontSize: 25,
        color: "black",
    },
    otherImg: {
        height: 80,
        width: 100,
        borderRadius: 10,
        marginTop: 2,
    },
    scrol: {
        flexDirection: "row",
        gap: 20,
    },
    visit: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        backgroundColor: "steelblue",
        borderRadius: 50,
        padding: 12,
        alignContent: 'center'
    },
    visitTxt: {
        textAlign: "center",
        fontSize: 16,
        color: "#ffff",
    },

});
