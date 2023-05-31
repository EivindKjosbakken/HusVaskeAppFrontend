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
import {Dropdown} from 'react-native-element-dropdown';
import ThemedButton from 'react-native-really-awesome-button';

export default CreateTaskScreen = () => {
  const {snackbarState, setSnackbarState} = useContext(AppContext);

  const [taskName, setTaskName] = useState('');
  const [location, setLocation] = useState('');
  const [isShowProof, setIsShowProof] = useState(false);
  const [price, setPrice] = useState('0');

  const [groupsOwnerOf, setGroupsOwnerOf] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);

  const [usersInGroup, setUsersInGroup] = useState([]);
  const [selectedAssignee, setSelectedAssignee] = useState(null);

  const toggleIsShowProof = () => {
    setIsShowProof(!isShowProof);
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
      if (response.data.length === 0) {
        setSnackbarState({
          active: true,
          text: 'You are not owner of any groups, and can therefore not create a task',
          textColor: 'orange',
        });
      }

      response.data.map(obj => {
        //TODO bad solution, had to change name of key to get the PaperSelect to work (only accepted key "value" for some reason)
        obj['label'] = obj['groupName'];
        delete obj['groupName'];
      });

      await setGroupsOwnerOf(response.data || [{value: 'You own no groups'}]);
    } catch (err) {
      console.log('GOT ERROR WHEN FETCHING TASKS ' + err);
    }
  };

  const fetchUsersInChosenGroup = async () => {
    const groupid = (await selectedGroup?.groupID) || undefined;

    if (groupid === undefined) {
      return;
    }

    try {
      const response = await api.get('api/usersingroup/' + groupid);
      response.data.map(obj => {
        //TODO dette er shitty løsning, fiks det! Bug er fordi paper select funker tydeligvis bare med col "value" (fant ikke noen løsning på det)
        //TODO bad solution, had to change name of key to get the PaperSelect to work (only accepted key "value" for some reason)
        obj['label'] = obj['username'];
        delete obj['username'];
      });
      await setUsersInGroup(response.data || [{value: 'You own no groups'}]);
    } catch (err) {
      console.log('Fetch users in chosen group faila ' + err);
    }
  };

  const createTask = async () => {
    const groupid = selectedGroup.groupID || undefined;
    const CreatedByUserID = await SInfo.getItem('userid', {});
    if (groupid === undefined) {
      setSnackbarState({
        active: true,
        text: 'Group not found',
        textColor: 'red',
      });
      return;
    }

    const body = {
      title: taskName,
      AssigneeUserID: selectedAssignee?.id,
      groupID: groupid,
      assignee: selectedAssignee?.label, // == username
      location: location,
      CreatedByUserID: CreatedByUserID,
      IsShowProof: isShowProof,
      Price: Number(price),
    };
    try {
      if (
        body.title != '' &&
        body.location != '' &&
        body.assignee != '' &&
        body.AssigneeUserID !== undefined &&
        body.groupID !== undefined
      ) {
        const response = await api.post('/api/todoitem', body);
        setSnackbarState({
          text: 'Task "' + taskName + '" added',
          active: true,
          textColor: 'green',
        });
      } else {
        console.log('BODY WAS EMPTY');
        setSnackbarState({
          text: 'Have to fill in all fields',
          active: true,
          textColor: 'orange',
        });
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
  }, [selectedGroup]);

  return (
    <>
      <Provider>
        <SafeAreaView>
          <ScrollView contentInsetAdjustmentBehavior="automatic">
            <View style={{backgroundColor: '#5F9EA0', height: '100%'}}>
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={groupsOwnerOf}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Select group"
                searchPlaceholder="Search..."
                value={selectedGroup?.label || ''}
                onChange={item => {
                  setSelectedGroup(item);
                }}
                renderLeftIcon={() => (
                  <Icon color="black" name="group" size={20} />
                )}
              />

              <View>
                <View>
                  <Dropdown
                    style={styles.dropdown}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={usersInGroup}
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder="Select assignee"
                    searchPlaceholder="Search..."
                    value={selectedAssignee?.label || ''}
                    onChange={item => {
                      setSelectedAssignee(item);
                    }}
                    renderLeftIcon={() => (
                      <Icon color="black" name="user" size={20} />
                    )}
                  />

                  <View></View>
                  <TextInput
                    id="taskName"
                    label="Task name"
                    value={taskName}
                    onChangeText={text => setTaskName(text)}
                    style={styles.input}
                  />
                </View>

                <View>
                  <TextInput
                    id="location"
                    label="Task location"
                    value={location}
                    onChangeText={text => setLocation(text)}
                    style={styles.input}
                  />
                </View>
                <View>
                  <TextInput
                    id="price"
                    label="Task price in kr"
                    keyboardType="numeric"
                    value={price}
                    onChangeText={price => setPrice(price)}
                    style={styles.input}
                    maxLength={4}
                  />
                </View>

                <View style={styles.parent}>
                  <View style={styles.bigChild}>
                    <Text style={styles.requireProofText}>
                      Require proof to complete task
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
                      createTask();
                      console.log('creating');
                    }}>
                    Create task
                  </ThemedButton>
                </View>
              </View>

              <Text></Text>
              <Text></Text>
              <Text></Text>
            </View>
          </ScrollView>
        </SafeAreaView>
      </Provider>
      <SnackbarComponent></SnackbarComponent>
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
    justifyContent: 'center',
  },
  bigChild: {flexBasis: '70%', width: '70%'},
  requireProofText: {
    fontWeight: 'bold',
    fontSize: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dropdown: {
    margin: 16,
    height: 50,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
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
