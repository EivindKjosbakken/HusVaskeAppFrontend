import React, {useEffect, useState, useContext} from 'react';
import {View, Text, ScrollView, SafeAreaView, StyleSheet} from 'react-native';
import {Modal, Portal, Button, Provider} from 'react-native-paper';

export default DetailedTaskView = ({
  isVisible,
  taskName,
  assignee,
  location,
  groupName,
  timeCreated,
  timeFinished,
  setIsVisible,
}) => {
  const containerStyle = {backgroundColor: 'white', padding: 20};

  return (
    <>
      <Modal
        visible={isVisible}
        onDismiss={() => {
          setIsVisible(false);
        }}
        contentContainerStyle={containerStyle}>
        <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 25}}>
          Task: {taskName}
        </Text>
        <Text></Text>
        <Text>Assignee: {assignee}</Text>
        <Text>Task location: {location}</Text>
        <Text>Task created at: {timeCreated}</Text>
        <Text>Task finished at: {timeFinished}</Text>
        <Text>Group Name: {groupName}</Text>
      </Modal>
    </>
  );
};
