import React, {useEffect, useState, useContext} from 'react';
import {View, Text, ScrollView, SafeAreaView, StyleSheet} from 'react-native';
import {TextInput, Button, Modal, Portal, Provider} from 'react-native-paper';
import {create} from 'react-test-renderer';
import api from '../api/posts';
import SInfo from 'react-native-sensitive-info';
import SnackbarComponent from '../SnackbarComponent';
import AppContext from '../AppContext';
import ThemedButton from 'react-native-really-awesome-button';

export default CreateGroupForm = ({hideCreateGroupModal}) => {
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
    const body = {UserID: userID, GroupName: groupName, Role: role};
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
            style={styles.input}
          />
        </View>
        <View>
          <TextInput
            id="role"
            label="Your role"
            value={role}
            onChangeText={text => setRole(text)}
            style={styles.input}
          />
        </View>

        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '5%',
          }}>
          <ThemedButton
            name="cartman"
            type="primary"
            backgroundColor="green"
            width={150}
            borderRadius={30}
            borderWidth={1}
            borderColor="#f7dd58"
            onPress={() => {
              createGroup(groupName, role);
              hideCreateGroupModal();
            }}>
            Create group
          </ThemedButton>
        </View>
        <SnackbarComponent></SnackbarComponent>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  containerStyle: {backgroundColor: 'white', padding: 20},
  container: {
    paddingTop: 23,
  },
  input: {
    margin: 15,
    height: 50,
    borderColor: '#7a42f4',
    borderWidth: 1,
  },
});
