import React from 'react';
import {View, Text} from 'react-native';
import {Button} from 'react-native-paper';

export const DisplayBoard = ({numberOfUsers, getAllUsers}) => {
  return (
    <View>
      <Text>Users Created</Text>
      <Text>Number of users: {numberOfUsers}</Text>
      <Button onPress={e => getAllUsers()}>Get all users</Button>
    </View>
  );
};
