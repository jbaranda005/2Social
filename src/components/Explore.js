import React from 'react';
import { View, StyleSheet} from 'react-native';
import Card from './Card';
import activities from '../../assets/data/suggestedPlansData';
import AnimatedStack from './AnimatedStack';

const ROTATION = 60;
const SWIPE_VELOCITY = 800;

export default Explore = () => {

    const onSwipeLeft = (activity) => {
        console.warn("swipe left: ", activity.title);
    };

    const onSwipeRight = (activity) => {
        console.warn("swipe right: ", activity.title);
    };

    return (
        <View style={styles.container}>
            <AnimatedStack
                data={activities}
                renderItem={({ item }) => <Card activity={item} />}
                onSwipeLeft={onSwipeLeft}
                onSwipeRight={onSwipeRight}
            />
        </View>
    );

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
