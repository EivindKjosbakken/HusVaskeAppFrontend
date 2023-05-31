import React, {useEffect, useState, useContext, useCallback} from 'react';
import {View, StyleSheet, Text, SafeAreaView} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import api from '../api/posts';
import {PaperSelect} from 'react-native-paper-select';
import SInfo from 'react-native-sensitive-info';
import SnackbarComponent from '../SnackbarComponent';
import AppContext from '../AppContext';
import {Switch} from 'react-native-switch';
import {useFocusEffect} from '@react-navigation/native';
import {Dropdown} from 'react-native-element-dropdown';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {onChange} from 'react-native-reanimated';
import ThemedButton from 'react-native-really-awesome-button';

export default AddUserToGroupForm = ({hideAddUserToGroupModal}) => {
  const {snackbarState, setSnackbarState} = useContext(AppContext);

  const [userEmail, setUserEmail] = useState('');
  const [userRole, setUserRole] = useState('');

  const [groupsOwnerOf, setGroupsOwnerOf] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);

  const [isAdmin, setIsAdmin] = useState(false);

  const toggleIsAdmin = () => {
    setIsAdmin(!isAdmin);
  };

  const addUserToGroup = async () => {
    const groupid = (await selectedGroup?.groupID) || undefined;
    if (groupid === undefined) {
      setSnackbarState({
        active: true,
        text: 'Group not found',
        textColor: 'red',
      });
      return;
    }
    const body = {
      UserEmail: userEmail,
      GroupID: groupid,
      Role: userRole,
      IsAdmin: isAdmin,
    };

    try {
      const response = await api.post('api/addusertogroup', body);
      console.log('IS NOW . ' + selectedGroup);
      setSnackbarState({
        active: true,
        text:
          'USER WITH EMAIL ' +
          userEmail +
          ' WAS ADDED WITH ROLE: ' +
          userRole +
          ' TO GROUP: ' +
          selectedGroup?.label,
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

  const fetchGroupsUserIsOwnerOrAdminOf = async () => {
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
          text: 'You are not owner of any groups, and can therefore not add people to group',
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

  useFocusEffect(
    useCallback(() => {
      fetchGroupsUserIsOwnerOrAdminOf();
      return () => {};
    }, []),
  );

  return (
    <>
      <SafeAreaView>
        <View></View>
        <Text></Text>
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={groupsOwnerOf}
          search
          maxHeight={400}
          labelField="label"
          valueField="value"
          placeholder="Select group"
          searchPlaceholder="Search..."
          value={selectedGroup?.label || ''}
          onChange={item => {
            setSelectedGroup(item);
          }}
          renderLeftIcon={() => <Icon color="black" name="group" size={20} />}
        />
        <View>
          <TextInput
            id="email"
            label="The user's email"
            value={userEmail}
            onChangeText={text => setUserEmail(text)}
            style={styles.input}
          />
        </View>
        <View>
          <TextInput
            id="role"
            label="The user's role"
            value={userRole}
            onChangeText={text => setUserRole(text)}
            style={styles.input}
          />
        </View>

        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '5%',
          }}>
          <Text style={styles.requireProofText}>
            Have user be admin in group
          </Text>
        </View>

        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '5%',
          }}>
          <Switch
            value={isAdmin}
            onValueChange={toggleIsAdmin}
            disabled={false}
            activeText={'Yes'}
            inActiveText={'No'}
            backgroundActive={'green'}
            backgroundInactive={'gray'}
            circleActiveColor={'#30a566'}
            circleInActiveColor={'#000000'}
          />
        </View>

        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '15%',
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
              addUserToGroup();
              hideAddUserToGroupModal();
            }}>
            Add user to group
          </ThemedButton>
        </View>
      </SafeAreaView>
      <SnackbarComponent></SnackbarComponent>
    </>
  );
};

const styles = StyleSheet.create({
  parent: {
    flexDirection: 'row',
    borderColor: '#000000',
    borderWidth: 2,
    outlineColor: 'black',
    outlineStyle: 'solid',
    paddingVertical: 25,
    height: '25%',
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
    justifyContent: 'center',
    position: 'relative',
    top: '15%',
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
  containerStyle: {backgroundColor: '#5F9EA0', padding: 20},
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
