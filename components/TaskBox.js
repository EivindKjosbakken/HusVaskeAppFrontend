import {mdiToyBrickPlusOutline} from '@mdi/js';
import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView, SafeAreaView, StyleSheet} from 'react-native';
import {TextInput, Button, Card} from 'react-native-paper';

export default TaskBox = ({taskName, assignee}) => {
  const fullTaskName = 'Task: ' + taskName;
  const fullAssignee = 'Assignee: ' + assignee;
  return (
    <>
      <View style={styles.bigChild}>
        <Card mode="outlined">
          <Card.Title title={fullTaskName} subtitle={fullAssignee}></Card.Title>
          <View style={styles.buttonView}>
            <Button
              onPress={() => {
                console.log('trykker ferdig');
              }}>
              <Text style={styles.buttonText}>Done</Text>
            </Button>
          </View>
        </Card>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  parent: {flex: 1, flexWrap: 'wrap', flexDirection: 'row'},
  smallChild: {
    flexBasis: '30%',
    width: '30%',
  },
  bigChild: {flexBasis: '100%', width: '100%'},
  buttonView: {
    position: 'absolute',
    left: '70%',
    top: '20%',
  },
  buttonText: {
    color: '#4DD56C',
    fontSize: 20,
    fontFamily: 'Times New Roman',
    paddingLeft: 30,
    paddingRight: 30,
    textShadowColor: '#8B8484',
    textShadowOffset: {width: 5, height: 5},
    textShadowRadius: 12,
  },
});
