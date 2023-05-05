import React from 'react';
import {View, Text, StyleSheet, SafeAreaView, Image, ScrollView} from 'react-native';
import activities from '../../assets/data/suggestedPlansData';

const MatchesScreen = () => {
  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.container}>
        <Text style={{fontWeight: 'bold', fontSize: 24, color: '#F2681B'}}>
          New Matches
        </Text>
        <View style={styles.activities}>
          {activities.map(activity => (
            <View style={styles.activity} key={activity.id}>
              <Image source={{uri: activity.image}} style={styles.image} />
              <Text style={styles.activityTitle}>{activity.title}</Text>
            </View>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({

  root: {
    width: '100%',
    flex: 1,
    padding: 10,
  },

  container: {
    padding: 10,
  },

  activities: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'red',
  },

  activity: {
    width: 80,
    height: 80,
    margin: 10,
    borderRadius: 50,

    borderWidth: 2,
    padding: 3,
    borderColor: '#F2681B',
  },

  image: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },

  activityTitle: {
    marginTop: 10,
  },

});

export default MatchesScreen;