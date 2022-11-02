import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView, SafeAreaView} from 'react-native';
import {TextInput, Button, Modal, Portal, Provider} from 'react-native-paper';
import {create} from 'react-test-renderer';
import api from './api/posts';
import SInfo from 'react-native-sensitive-info';

export default AddUserToGroupForm = () => {
  const [userEmail, setUserEmail] = useState('');
  const [group, setGroup] = useState('');
  const [userRole, setUserRole] = useState('');

  const addUserToGroup = async (email, groupName, role) => {
    body = {UserEmail: email, GroupName: groupName, Role: role};
    try {
      const response = await api.post('api/addusertogroup', body);
      alert(
        'USER WITH EMAIL ' +
          email +
          ' WAS ADDED WITH ROLE: ' +
          role +
          ' TO GROUP: ' +
          groupName,
      );
    } catch (err) {
      console.log('ERROR WHEN ADDING USER TO A GROUP: ' + err);
    }
  };

  return (
    <>
      <View>
        <View>
          <TextInput
            id="userEmail"
            label="The user's email"
            value={userEmail}
            onChangeText={text => setUserEmail(text)}
          />
        </View>
        <View>
          <TextInput
            id="group"
            label="Group name"
            value={group}
            onChangeText={text => setGroup(text)}
          />
        </View>
        <View>
          <TextInput
            id="role"
            label="The user's role"
            value={userRole}
            onChangeText={text => setUserRole(text)}
          />
        </View>
        <View>
          <Button
            onPress={() => {
              addUserToGroup(userEmail, group, userRole);
            }}
            outlined>
            Add user to group
          </Button>
        </View>
      </View>
    </>
  );
};
