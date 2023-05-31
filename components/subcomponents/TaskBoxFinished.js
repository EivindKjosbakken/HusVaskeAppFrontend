import {mdiToyBrickPlusOutline} from '@mdi/js';
import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView, SafeAreaView, StyleSheet} from 'react-native';
import {TextInput, Button, Card} from 'react-native-paper';
import api from '../api/posts';

export default TaskBoxFinished = ({
  taskID,
  taskName,
  assignee,
  refreshTasks,
  provideDetails,
}) => {
  const fullTaskName = 'Task: ' + taskName;
  const fullAssignee = 'Assignee: ' + assignee;

  const unFinishTask = async ID => {
    try {
      await api.put('/api/unfinishtodoitem/' + ID);
      await refreshTasks();
    } catch {
      alert('Could not unfinish task, something went wrong');
    }
  };
  return (
    <>
      <View style={styles.bigChild}>
        <Card mode="outlined">
          <Card.Title title={fullTaskName} subtitle={fullAssignee}></Card.Title>
          <View style={styles.detailsButtonView}>
            <Button
              onPress={() => {
                provideDetails(taskID);
              }}>
              <Text style={styles.detailsButtonText}>Details </Text>
            </Button>
          </View>
          <View style={styles.doneButtonView}>
            <Button
              onPress={() => {
                unFinishTask(taskID);
              }}>
              <Text style={styles.doneButtonText}>Undo </Text>
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
  bigChild: {
    width: '90%',
    marginTop: '2%',
    marginBottom: '2%',
    marginLeft: '5%',
    marginRight: '5%',
    justifyContent: 'center',
    backgroundColor: '#e7622e',
    borderColor: 'green',
    borderWidth: 2,
    outlineColor: '#523009',
    outlineStyle: 'solid',
    outlineWidth: 3,
  },
  doneButtonView: {
    position: 'absolute',
    left: '75%',
    top: '20%',
  },
  detailsButtonView: {
    position: 'absolute',
    left: '52%',
    top: '20%',
  },
  doneButtonText: {
    color: '#F55B25',
    fontSize: 15,
    fontFamily: 'Times New Roman',
    paddingLeft: 30,
    paddingRight: 30,
    textShadowColor: '#8B8484',
    textShadowOffset: {width: 5, height: 5},
    textShadowRadius: 12,
  },
  detailsButtonText: {
    color: '#4BB4DF',
    fontSize: 15,
    fontFamily: 'Times New Roman',
    paddingLeft: 30,
    paddingRight: 30,
    textShadowColor: '#8B8484',
    textShadowOffset: {width: 5, height: 5},
    textShadowRadius: 12,
  },
});
