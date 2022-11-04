import React, {useContext} from 'react';
import {View, Text, ScrollView, SafeAreaView, StyleSheet} from 'react-native';
import {Button, Card} from 'react-native-paper';
import api from '../api/posts';
import DetailedTaskView from './DetailedTaskView';

export default TaskBoxUnFinished = ({
  taskID,
  taskName,
  assignee,
  refreshTasks,
  provideDetails,
}) => {
  const fullTaskName = 'Task: ' + taskName;
  const fullAssignee = 'Assignee: ' + assignee;

  const finishTask = async ID => {
    try {
      await api.put('/api/finishtodoitem/' + ID);
      await refreshTasks();
    } catch {
      alert('Could not finish task, something went wrong');
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
                finishTask(taskID);
              }}>
              <Text style={styles.doneButtonText}>Done </Text>
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
    color: '#4DD56C',
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
