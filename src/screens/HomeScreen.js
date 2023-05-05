import React from 'react';
import { View, StyleSheet} from 'react-native';
import Card from '../components/Card';
import activities from '../../assets/data/suggestedPlansData';
import AnimatedStack from '../components/AnimatedStack';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const ROTATION = 60;
const SWIPE_VELOCITY = 800;

const HomeScreen = () => {

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
            <View style={styles.icons}>
                <View style={styles.buttons}>
                    <FontAwesome name="undo" size={24} color="#FBD88B" />
                </View>

                <View style={styles.buttons}>
                    <Entypo name="cross" size={24} color="#F76C6B" />
                </View>

                <View style={styles.buttons}>
                    <FontAwesome name="star" size={24} color="#3AB4CC" />
                </View>

                <View style={styles.buttons}>
                    <FontAwesome name="heart" size={24} color="#4FCC94" />
                </View>
                
                <View style={styles.buttons}>
                    <Ionicons name="flash" size={24} color="#A65CD2" />
                </View>
                
            </View>
        </View>
    );

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#ededed',
    },
    
    icons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        padding: 10,

    },
    buttons: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 50,

    },
});


export default HomeScreen;
