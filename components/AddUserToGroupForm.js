import React, {useEffect, useState} from 'react';
import {View, Picker} from 'react-native';
import {TextInput, Button, Modal, Portal, Provider} from 'react-native-paper';
import api from './api/posts';
import {PaperSelect} from 'react-native-paper-select';
import SInfo from 'react-native-sensitive-info';
import {mdiConsoleLine} from '@mdi/js';

export default AddUserToGroupForm = () => {
  const [userEmail, setUserEmail] = useState('');
  const [group, setGroup] = useState('');
  const [userRole, setUserRole] = useState('');

  const [groupsOwnerOf, setGroupsOwnerOf] = useState({
    value: '',
    list: [{_id: '1', value: 'Tester'}],
    selectedList: [],
    error: '',
  });

  const addUserToGroup = async () => {
    await console.log(groupsOwnerOf);
    const groupid =
      (await groupsOwnerOf?.selectedList[0]['groupID']) || undefined;
    await console.log(' _ _ _ NÅ SENDER VI GROUP ID: _ _ _  ' + groupid);
    if (groupid === undefined) {
      alert('Group not found');
      return;
    }
    body = {
      UserEmail: userEmail,
      GroupID: groupid,
      Role: userRole,
    };
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

  const fetchGroupsUserIsOwnerOf = async () => {
    const currUserID = await SInfo.getItem('userid', {});
    const currUsername = await SInfo.getItem('username', {});
    if (
      currUserID === undefined ||
      currUsername === undefined ||
      currUsername === ''
    ) {
      alert('Must log in to create group');
    }
    console.log('\n\n\n___FETCHER___\n\n\n');
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
          <Button onPress={fetchGroupsUserIsOwnerOf}>TESTING</Button>
          <PaperSelect
            label="Select group"
            value={groupsOwnerOf.value}
            onSelection={value => {
              //TODO feilen skjer nå denne kjører
              console.log('KJLRER ON SELECT\n\n\n');
              setGroupsOwnerOf({
                ...groupsOwnerOf,
                value: value.selectedList[0]['value'],
                selectedList: value.selectedList,
                error: '',
              });
            }}
            arrayList={groupsOwnerOf.list}
            selectedArrayList={groupsOwnerOf.selectedList}
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
      </View>
    </>
  );
};
