import React from "react";
import { Text, StyleSheet, ImageBackground, View } from "react-native";

const Card = (props) => {
    const {title, image, description} = props.activity;
    return (
        <View style={styles.card}>
            <ImageBackground source={{ uri: image }} style={styles.cardImage}>
                <View style={styles.cardTextWrapper}>
                    <Text style={styles.cardTitle}>{title}</Text>
                    <Text style={styles.cardDescription}>{description}</Text>
                </View>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({

    card: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
        backgroundColor: '#fefefe',
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


export default Card;