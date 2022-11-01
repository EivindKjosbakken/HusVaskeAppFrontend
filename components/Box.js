import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView, SafeAreaView, StyleSheet} from 'react-native';
import {TextInput, Button, Card} from 'react-native-paper';

export default Box = ({taskName, assignee}) => {
  const fullTaskName = 'Task: ' + taskName;
  const fullAssignee = 'Assignee: ' + assignee;
  return (
    <>
      <View style={styles.parent}>
        <View style={styles.bigChild}>
          <Card>
            <Card.Title
              title={fullTaskName}
              subtitle={fullAssignee}></Card.Title>
          </Card>
        </View>
        <View style={styles.smallChild}>
          <Button>Done</Button>
        </View>
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
  bigChild: {flexBasis: '70%', width: '70%'},
});
