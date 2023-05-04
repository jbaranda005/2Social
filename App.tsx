import 'react-native-gesture-handler';
import React from 'react';
import {View, StyleSheet, Text, SafeAreaView} from 'react-native';


import HomeScreen from './src/screens/HomeScreen';
import MatchesScreen from './src/screens/NewMatchesScreen';
import ChatsScreen from './src/screens/ChatsScreen';
import ChatScreen from './src/screens/ChatScreen';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';



const App = () => {
  const color = "#b5b5b5";
  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.pageContainer}>
        <View style={styles.topNavigation}>
          <Fontisto name="tinder" size={30} color={color} />
          <MaterialCommunityIcons name="star-four-points" size={30} color={color} />
          <Ionicons name="ios-chatbubbles" size={30} color={color} />
          <FontAwesome name="user" size={30} color={color} />
        </View>
      </View>
      <ChatScreen/>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({


  root: {
    flex: 1,
  },

  pageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  topNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    padding: 10,

  }

  });

  export default App;