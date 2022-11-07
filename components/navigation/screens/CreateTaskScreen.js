import React, {useEffect, useState, useContext, useCallback} from 'react';
import {View, Text, ScrollView, SafeAreaView, StyleSheet} from 'react-native';
import {TextInput, Button, Modal, Portal, Provider} from 'react-native-paper';
import api from '../../api/posts';
import {PaperSelect} from 'react-native-paper-select';
import SInfo from 'react-native-sensitive-info';
import {useFocusEffect} from '@react-navigation/native';
import SnackbarComponent from '../../SnackbarComponent';
import AppContext from '../../AppContext';
import {Switch} from 'react-native-switch';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

export default CreateTaskScreen = () => {
  const {snackbarState, setSnackbarState} = useContext(AppContext);

  const [taskName, setTaskName] = useState('');
  const [location, setLocation] = useState('');
  const [isShowProof, setIsShowProof] = useState(false);
  const [price, setPrice] = useState('0');

  const toggleIsShowProof = () => {
    setIsShowProof(!isShowProof);
  };

  const [groupsOwnerOf, setGroupsOwnerOf] = useState({
    value: '',
    list: [],
    selectedList: [],
    error: '',
  });

  const [usersInGroup, setUsersInGroup] = useState({
    value: '',
    list: [],
    selectedList: [],
    error: '',
  });

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

  const fetchUsersInChosenGroup = async () => {
    if (groupsOwnerOf?.selectedList.length === 0) {
      return;
    }
    const groupid =
      (await groupsOwnerOf?.selectedList[0]['groupID']) || undefined;

    if (groupid === undefined) {
      setSnackbarState({
        active: true,
        text: 'Users of group not found',
        textColor: 'red',
      });
      return;
    }

    try {
      const response = await api.get('api/usersingroup/' + groupid);
      response.data.map(obj => {
        //TODO dette er shitty løsning, fiks det! Bug er fordi paper select funker tydeligvis bare med col "value" (fant ikke noen løsning på det)
        //TODO bad solution, had to change name of key to get the PaperSelect to work (only accepted key "value" for some reason)
        obj['value'] = obj['username'];
        delete obj['username'];
      });
      await setUsersInGroup({
        value: '',
        list: response?.data || [{value: 'You own no groups'}],
        selectedList: [],
        error: '',
      });
    } catch (err) {
      console.log('Fetch users in chosen group faila ' + err);
    }
  };

  const createTask = async () => {
    const groupid =
      (await groupsOwnerOf?.selectedList[0]['groupID']) || undefined;

    const CreatedByUserID =
      (await groupsOwnerOf?.selectedList[0]['userID']) || undefined;

    if (groupid === undefined) {
      setSnackbarState({
        active: true,
        text: 'Group not found',
        textColor: 'red',
      });
      return;
    }

    body = {
      title: taskName,
      AssigneeUserID: usersInGroup?.selectedList[0]['id'],
      groupID: groupid,
      assignee: usersInGroup?.selectedList[0]['value'], // == username
      location: location,
      CreatedByUserID: CreatedByUserID,
      IsShowProof: isShowProof,
      Price: Number(price),
    };

    try {
      if (body.title != '' && body.location != '' && body.assignee != '') {
        const response = await api.post('/api/todoitem', body);
        setSnackbarState({
          text: 'Task "' + taskName + '" added',
          active: true,
          textColor: 'green',
        });
      } else {
        console.log('BODY WAS EMPTY');
      }
    } catch (err) {
      console.log('ERROR WHEN POSTING A TASK: ' + err);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchGroupsUserIsOwnerOf();
      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, []),
  );

  useEffect(() => {
    fetchUsersInChosenGroup(); //every time user chooses new group, get the users of that group
  }, [groupsOwnerOf]);

  return (
    <>
      <Provider>
        <SafeAreaView>
          <ScrollView contentInsetAdjustmentBehavior="automatic">
            <Text></Text>
            <Text></Text>
            <Text></Text>

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
                <View>
                  <PaperSelect
                    label="Select assignee"
                    value={usersInGroup?.value || ''}
                    onSelection={value => {
                      setUsersInGroup({
                        ...usersInGroup,
                        value: value?.selectedList[0]?.value || '', // TODO nå er det feil med icon her som gjør at du ikke ser at du unselecter (må typ trykke to ganger for å selecte en group)  buggen, annahver gang får jeg empty group
                        selectedList: value?.selectedList || [],
                        error: '',
                      });
                    }}
                    arrayList={usersInGroup?.list || []}
                    selectedArrayList={usersInGroup?.selectedList || []}
                    errorText={''}
                    multiEnable={false}
                  />
                </View>
                <TextInput
                  id="taskName"
                  label="Task name"
                  value={taskName}
                  onChangeText={text => setTaskName(text)}
                />
              </View>

              <View>
                <TextInput
                  id="location"
                  label="Task location"
                  value={location}
                  onChangeText={text => setLocation(text)}
                />
              </View>
              <View>
                <TextInput
                  id="price"
                  label="Task price in kr"
                  keyboardType="numeric"
                  value={price}
                  onChangeText={price => setPrice(price)}
                  maxLength={4}
                />
              </View>

              <View style={styles.parent}>
                <View style={styles.bigChild}>
                  <Text style={styles.requireProofText}>
                    Require proof to complete taks
                  </Text>
                </View>

                <View style={styles.smallChild}>
                  <Switch
                    value={isShowProof}
                    onValueChange={toggleIsShowProof}
                    disabled={false}
                    activeText={'Yes'}
                    inActiveText={'No'}
                    backgroundActive={'green'}
                    backgroundInactive={'gray'}
                    circleActiveColor={'#30a566'}
                    circleInActiveColor={'#000000'}
                  />
                </View>
              </View>
              <Text></Text>
              <Text></Text>
              <Text></Text>
              <View>
                <Button
                  onPress={() => {
                    createTask();
                  }}
                  outlined>
                  Create task
                </Button>
              </View>
            </View>

            <Text></Text>
            <Text></Text>
            <Text></Text>
          </ScrollView>
          <SnackbarComponent></SnackbarComponent>
        </SafeAreaView>
      </Provider>
    </>
  );
};

const styles = StyleSheet.create({
  IsShowProofParent: {},
  parent: {
    flex: 1,
    flexDirection: 'row',
    borderColor: '#000000',
    borderWidth: 2,
    outlineColor: 'black',
    outlineStyle: 'solid',
    paddingVertical: 5,
  },
  smallChild: {
    flexBasis: '30%',
    width: '30%',
  },
  bigChild: {flexBasis: '70%', width: '70%'},
  requireProofText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});
