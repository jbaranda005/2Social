import React from 'react';
import { View, StyleSheet, Text, Pressable} from 'react-native';
import Card from '../components/Card';
import activities from '../assets/data/suggestedPlansData';
import Animated, { useSharedValue, useAnimatedStyle } from 'react-native-reanimated'

export default Explore = () => {

    const sharedValue = useSharedValue(1);

    const cardStyle = useAnimatedStyle(() => ({
        opacity: sharedValue.value,
    }));

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.animatedCard, cardStyle]}>
                <Card activity={activities[0]}/>
            </Animated.View>
            <Pressable onPress={() => (sharedValue.value = Math.random())}>
                <Text>Change Value</Text>
            </Pressable>
        </View>
    );

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    animatedCard: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },

});
