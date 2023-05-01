import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View, Text, StyleSheet, SafeAreaView, Image, FlatList, RootTagContext, ScrollView, ImageBackground } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import suggestedPlansData from '../assets/data/suggestedPlansData';
import colors from '../assets/colors/colors';
import exploreCategories from '../assets/data/exploreCategories';

Feather.loadFont ();
MaterialCommunityIcons.loadFont();

export default Explore = () => {

    const renderSuggestedItem = ({ item }) => {
        return (
        <View style={styles.suggestedItemWrapper}>
            <Image source={item.image} style={styles.suggestedItemImage}/>
            <View style={styles.suggestedItemTitleWrapper}>
                <Text style={styles.suggestedItemTitle}>{item.title}</Text>
                <Text style={styles.suggestedItemLocation}>{item.location}</Text>
            </View>
            {item.categories.map((item2) => (
                <View style={styles.suggestedItemCategoryWrapper}>
                    <Text style={styles.SuggestedItemCategoryText}>{item2.category}</Text>
                </View>
            ))}
            <View style={styles.suggestedItemDescriptionWrapper}>
                <Text style={styles.suggestedItemDescriptionText}>{item.description}</Text>
            </View>
        </View>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <ImageBackground source={require('../assets/images/user.jpeg')} style={styles.cardImage}>
                    <View style={styles.cardTextWrapper}>
                        <Text style={styles.cardTitle}>Gym Event</Text>
                        <Text style={styles.cardDescription}>
                            The best sport gym event in the entire world now in Chicago!!!!
                        </Text>
                    </View>
                </ImageBackground>
            </View>
        </View>
    );

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    
    card: {
        backgroundColor: 'red',
        width: '95%',
        height: '70%',
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,
        
        elevation: 11,
    },

    cardImage: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
        overflow: 'hidden',
        justifyContent: 'flex-end',

    },

    cardTextWrapper: {
        padding: 10,
        backgroundColor: 'red',
    },

    cardTitle: {
        fontSize: 30,
        color: 'white',
        fontWeight: 'bold',
    },

    cardDescription: {
        fontSize: 18,
        color: 'white',
        lineHeight: 25,
    },

    });
