import React, {useEffect, useState, useContext} from 'react';
import {View, Text, ScrollView, SafeAreaView} from 'react-native';
import {TextInput, Button, Modal, Portal, Provider} from 'react-native-paper';
import {create} from 'react-test-renderer';
import api from '../api/posts';
import SInfo from 'react-native-sensitive-info';
import SnackbarComponent from '../SnackbarComponent';
import AppContext from '../AppContext';

export default CreateGroupForm = () => {
  const {snackbarState, setSnackbarState} = useContext(AppContext);

  const [groupName, setGroupName] = useState('');
  const [role, setRole] = useState('');

  const createGroup = async (groupName, role) => {
    const userID = await SInfo.getItem('userid', {});
    const username = await SInfo.getItem('username', {});
    if (userID == undefined || username == '' || username == undefined) {
      setSnackbarState({
        active: true,
        text: 'You are not logged in, log in to create groups',
        textColor: 'red',
      });
      return;
    }
    body = {UserID: userID, GroupName: groupName, Role: role};
    try {
      const response = await api.post('api/creategroup', body);

      setSnackbarState({
        active: true,
        text: 'Group ' + groupName + ' created!',
        textColor: 'green',
      });
    } catch (err) {
      setSnackbarState({
        active: true,
        text: 'Could not make group',
        textColor: 'red',
      });
      console.log('ERROR WHEN MAKING A GROUP: ' + err);
    }
  };

  return (
    <>
      <View>
        <View>
          <TextInput
            id="groupName"
            label="Group name"
            value={groupName}
            onChangeText={text => setGroupName(text)}
          />
        </View>
        <View>
          <TextInput
            id="role"
            label="Your role"
            value={role}
            onChangeText={text => setRole(text)}
          />
        </View>
        <View>
          <Button
            onPress={() => {
              createGroup(groupName, role);
            }}
            outlined>
            Create group
          </Button>
        </View>
        <SnackbarComponent></SnackbarComponent>
      </View>
    </>
  );
};
