import React, {useEffect, useState, useContext} from 'react';
import {View} from 'react-native';
import {TextInput, Button, Modal, Portal, Provider} from 'react-native-paper';
import api from '../api/posts';
import {PaperSelect} from 'react-native-paper-select';
import SInfo from 'react-native-sensitive-info';
import SnackbarComponent from '../SnackbarComponent';
import AppContext from '../AppContext';

export default AddUserToGroupForm = () => {
  const {snackbarState, setSnackbarState} = useContext(AppContext);

  const [userEmail, setUserEmail] = useState('');
  const [userRole, setUserRole] = useState('');

  const [groupsOwnerOf, setGroupsOwnerOf] = useState({
    value: '',
    list: [],
    selectedList: [],
    error: '',
  });

  const addUserToGroup = async () => {
    const groupid =
      (await groupsOwnerOf?.selectedList[0]['groupID']) || undefined;
    if (groupid === undefined) {
      setSnackbarState({
        active: true,
        text: 'Group not found',
        textColor: 'red',
      });
      return;
    }
    body = {
      UserEmail: userEmail,
      GroupID: groupid,
      Role: userRole,
    };

    try {
      const response = await api.post('api/addusertogroup', body);
      setSnackbarState({
        active: true,
        text:
          'USER WITH EMAIL ' +
          userEmail +
          ' WAS ADDED WITH ROLE: ' +
          userRole +
          ' TO GROUP: ' +
          groupsOwnerOf?.selectedList[0]['value'],
        textColor: 'green',
      });
    } catch (err) {
      setSnackbarState({
        active: true,
        text: 'User already in group',
        textColor: 'red',
      });
      console.log('ERROR WHEN ADDING USER TO A GROUP: ' + err);
    }
  };

  const fetchGroupsUserIsOwnerOf = async () => {
    const currUserID = await SInfo.getItem('userid', {});
    const currUsername = await SInfo.getItem('username', {});
    if (
      currUserID === undefined ||
      currUsername === undefined ||
      currUsername === ''
    ) {
      setSnackbarState({
        active: true,
        text: 'Must log in to create group',
        textColor: 'red',
      });
    }
    try {
      const response = await api.get('/api/groupsownerof/' + currUserID); //get the groups the user is owner of

      response.data.map(obj => {
        //TODO bad solution, had to change name of key to get the PaperSelect to work (only accepted key "value" for some reason)
        obj['value'] = obj['groupName'];
        delete obj['groupName'];
      });

      await setGroupsOwnerOf({
        value: '',
        list: response.data || [{value: 'You own no groups'}],
        selectedList: [],
        error: '',
      });
    } catch (err) {
      console.log('GOT ERROR WHEN FETCHING TASKS ' + err);
    }
  };

  useEffect(() => {
    fetchGroupsUserIsOwnerOf();
  }, []);

  return (
    <>
      <View>
        <View>
          <PaperSelect
            label="Select group"
            value={groupsOwnerOf?.value || ''}
            onSelection={value => {
              setGroupsOwnerOf({
                ...groupsOwnerOf,
                value: value?.selectedList[0]?.value || '', // TODO nå er det feil med icon her som gjør at du ikke ser at du unselecter (må typ trykke to ganger for å selecte en group)  buggen, annahver gang får jeg empty group
                selectedList: value?.selectedList || [],
                error: '',
              });
            }}
            arrayList={groupsOwnerOf?.list || []}
            selectedArrayList={groupsOwnerOf?.selectedList || []}
            errorText={''}
            multiEnable={false}
          />
        </View>
        <View>
          <TextInput
            id="email"
            label="The user's email"
            value={userEmail}
            onChangeText={text => setUserEmail(text)}
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
              addUserToGroup();
            }}
            outlined>
            Add user to group
          </Button>
        </View>
        <SnackbarComponent></SnackbarComponent>
      </View>
    </>
  );
};
