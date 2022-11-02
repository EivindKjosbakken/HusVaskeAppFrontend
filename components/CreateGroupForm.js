import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView, SafeAreaView} from 'react-native';
import {TextInput, Button, Modal, Portal, Provider} from 'react-native-paper';
import {create} from 'react-test-renderer';
import api from './api/posts';
import SInfo from 'react-native-sensitive-info';

export default CreateGroupForm = () => {
  const [groupName, setGroupName] = useState('');
  const [role, setRole] = useState('');

  const createGroup = async (groupName, role) => {
    const userID = await SInfo.getItem('userid', {});
    const username = await SInfo.getItem('username', {});
    if (userID == undefined || username == '' || username == undefined) {
      alert('You are not logged in, log in to make groups');
      return;
    }
    body = {UserID: userID, GroupName: groupName, Role: role};
    try {
      const response = await api.post('api/creategroup', body);

      alert('Group ' + groupName + ' created!');
    } catch (err) {
      alert('Could not make group');
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
      </View>
    </>
  );
};
