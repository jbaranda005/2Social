import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View, Text, StyleSheet, SafeAreaView, Image, FlatList, RootTagContext, ScrollView } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import suggestedPlansData from '../assets/data/suggestedPlansData';
import categoriesPlansData from '../assets/data/categoriesPlansData';
import colors from '../assets/colors/colors';

Feather.loadFont ();
MaterialCommunityIcons.loadFont();

export default Home = () => {
    const renderSuggestedItem = ({ item }) => {
        return (
        <View 
            style={[
                styles.suggestedItemWrapper, 
                {
                    backgroundColor: item.selected ? colors.text : colors.object,
                    marginLeft: item.id == 1 ? 20 : 0,
                },
            ]}>
            <Image source={item.image} style={styles.suggestedItemImage}/>
            <Text style={styles.suggestedItemTitle}>{item.title}</Text>
            <View style={[
                styles.suggestedSelectWrapper, 
                {
                    backgroundColor: item.selected ? colors.object : colors.text,
                },
            ]}>
            <Feather 
                name="chevron-right" 
                size={8} 
                style={styles.suggestedSelectIcon}
                color={item.selected ? colors.text : colors.object}
            />
            </View>
        </View>
        );
    };


    return (
        <View style={styles.container}>
        <ScrollView contentInsetAdjustmentBehavior='automatic' showsVerticalScrollIndicator='false'>
        {/* Header */}
            <SafeAreaView>
                <View style={styles.headerWrapper}>
                    <Image
                        source={require('../assets/images/image.jpeg')}
                        style={styles.profileImage}
                    />
                    <Feather name="menu" size={24} color={colors.text} />
                </View>
            </SafeAreaView>
            {/* Titles */}
            <View style={styles.titlesWrapper}>
                <Text style={styles.titlesTitle}>Discover</Text>
                <Text style={styles.titlesSubtitle}>Fun Plans</Text>
            </View>

            {/* Search */}
            <View style={styles.searchWrapper}>
                <Feather name="search" size={17} color={colors.text} />
                <View style={styles.search}>
                    <Text style={styles.searchText}>Search</Text>
                </View>
            </View>

            {/* Suggested */}
            <View style={styles.suggestedWrapper}>
                <Text style={styles.suggestedTitle}>Suggestions</Text>
                <View style={styles.suggestedListWrapper}>
                    <FlatList
                        data={suggestedPlansData}
                        renderItem={renderSuggestedItem}
                        keyExtractor={(item) => item.id}
                        horizontal={true}
                    />
                </View>
            </View>

            {/* Popular */}
            <View style={styles.popularWrapper}>
                <Text style={styles.popularTitle}>Popular</Text>
                {categoriesPlansData.map((item) => (
                    <View style={[
                        styles.popularCardWrapper,
                        {
                        marginTop: item.id == 1 ? 10 : 20,
                        },
                        ]}>
                        <View>
                            <View>
                                <View style={styles.popularTopWrapper}>
                                    <MaterialCommunityIcons 
                                        name="crown" 
                                        size={12} 
                                        color={colors.text}
                                    />
                                    <Text style={styles.popularTopText}>Top of the week</Text>
                                </View>
                                <View style={styles.popularTitlesWrapper}>
                                    <Text style={styles.popularTitlesTitle}>{item.title}</Text>
                                    <Text style={styles.popularTitlesLocation}>Location: {item.location}</Text>
                                </View>
                            </View>
                            <View style={styles.popularCardBottom}>
                                <View style={styles.addPizzaButton}>
                                    <Feather 
                                    name="plus" 
                                    size={10} 
                                    color={colors.text}
                                    />  
                                </View>
                                <View style={styles.ratingWrapper}> 
                                    <MaterialCommunityIcons
                                        name="star"
                                        size={10}
                                        color={colors.text}
                                    />
                                    <Text style={styles.rating}>{item.rating}</Text>                               
                                </View>  
                            </View>
                        </View>
                        <View style={styles.popularCardRight}>
                            <Image style={styles.popularCardImage} source={item.image} />
                        </View>
                    </View>
                ))}
            </View>
         </ScrollView>
        </View>
        
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background
    },
    headerWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 20,
        alignItems: 'center',
    },
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 40,
    },
    titlesWrapper: {
        marginTop: 30,
        paddingHorizontal: 20,
     },
    titlesSubtitle: {
        fontFamily: 'Roboto-Regular',
        fontSize: 32,
        color: colors.text,
    },
    titlesTitle: {
        fontFamily: 'Roboto-Bold',
        fontSize: 40,
        color: colors.text,
        marginTop: 5,
    },
    searchWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginTop: 30,
    },
    search: {
        flex: 1,
        marginLeft: 10,
        borderBottomColor: colors.object,
        borderBottomWidth: 2,
    },
    searchText: {
        fontFamily: 'Roboto-Regular',
        fontSize: 14,
        marginBottom: 5,
        color: colors.text,
    },
    suggestedWrapper: {
        marginTop: 30,
    },
    suggestedTitle: {
        fontFamily: 'Roboto-Bold',
        fontSize: 16,
        paddingHorizontal: 20,
    },
    suggestedListWrapper: {
        paddingTop: 15,
        paddingBottom: 20,
    },
    suggestedItemWrapper: {
        backgroundColor: colors.object,
        marginRight: 20,
        borderRadius: 20,
        shadowColor: colors.text,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
    },

    suggestedItemImage: {
        width: 60,
        height: 60,
        marginTop: 24,
        alignSelf: 'center',
        marginHorizontal: 20,
    },

    suggestedItemTitle: {
        textAlign: 'center',
        fontFamily: 'Roboto-Regular',
        fontSize: 14,
        marginTop: 10,

    },

    suggestedSelectWrapper: {
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop: 20,
        width:26,
        height:20,
        borderRadius: 26,
        marginBottom: 20,
    },
        
    suggestedSelectIcon: {
        alignSelf: 'center',

    },

    popularWrapper: {
        paddingHorizontal: 20,
    },

    popularTitle: {
        fontFamily: 'Roboto-Bold',
        fontSize: 16
    },

    popularCardWrapper: {
        backgroundColor: colors.object,
        borderRadius: 25,
        paddingTop: 20,
        paddingLeft: 20,
        flexDirection: 'row',
        overflow: 'hidden',
        shadowColor: colors.text,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
    },

    popularTopWrapper: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    popularTopText: {
        marginLeft: 10,
        fontFamily: 'Roboto-Bold',
        fontSize: 14,
    },

    popularTitlesWrapper: {
        marginTop: 20,

    },

    popularTitlesTitle: {
        fontFamily: 'Roboto-Regular',
        fontSize: 14,
        color: colors.text,
    },

    popularTitlesLocation: {
        fontFamily: 'Roboto-Regular',
        fontSize: 12,
        color: colors.text,
        marginTop: 5,
    },

    popularCardBottom: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },

    addPizzaButton: {
        backgroundColor: colors.text,
        paddingHorizontal: 40,
        paddingVertical: 20,
        borderTopRightRadius: 25,
        borderBottomLeftRadius: 25,
        marginLeft: -20,
    },

    ratingWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 20,
    },

    rating: {
        fontFamily: 'Roboto-Regular',
        fontSize: 12,
        color: colors.text,
        marginLeft: 5,
    },

    popularCardRight: {
        marginLeft: 40,

    },

    popularCardImage: {
        width: 210,
        height: 125,
        resizeMode: 'contain',
    },


    });
