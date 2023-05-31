import React, {useEffect, useState, useContext, useCallback} from 'react';
import {View, Text, ScrollView, SafeAreaView, StyleSheet} from 'react-native';
import {
  TextInput,
  Button,
  Modal,
  Portal,
  Provider,
  Snackbar,
} from 'react-native-paper';

import CreateGroupForm from '../../forms/CreateGroupForm';
import AddUserToGroupForm from '../../forms/AddUserToGroupForm';
import SnackbarComponent from '../../SnackbarComponent';
import AppContext from '../../AppContext';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {useFocusEffect} from '@react-navigation/native';
import ThemedButton from 'react-native-really-awesome-button';

export default GroupScreen = () => {
  const {snackbarState, setSnackbarState} = useContext(AppContext);

  const [showCreateGroup, setShowCreateGroup] = useState(false);

  const hideCreateGroupModal = () => setShowCreateGroup(false);

  const [showAddUserToGroup, setShowAddUserToGroup] = useState(false);

  const hideAddUserToGroupModal = () => setShowAddUserToGroup(false);

  useFocusEffect(
    useCallback(() => {
      return () => {
        setShowCreateGroup(false);
        setShowAddUserToGroup(false);
      };
    }, []),
  );

  if (showCreateGroup) {
    // show the modal of making a group
    return (
      <Provider>
        <Portal>
          <Modal
            visible={showCreateGroup}
            onDismiss={hideCreateGroupModal}
            contentContainerStyle={styles.containerStyle}>
            <Text style={{textAlign: 'center'}}>
              Click anywhere else to dismiss
            </Text>
            <CreateGroupForm
              hideCreateGroupModal={hideCreateGroupModal}></CreateGroupForm>
          </Modal>
        </Portal>
      </Provider>
    );
  }
  if (showAddUserToGroup) {
    // show the modal of adding users to group
    return (
      <Provider>
        <Portal>
          <Modal
            visible={showAddUserToGroup}
            onDismiss={hideAddUserToGroupModal}
            contentContainerStyle={styles.containerStyle}>
            <Text style={{textAlign: 'center'}}>
              Click anywhere else to dismiss
            </Text>
            <AddUserToGroupForm
              hideAddUserToGroupModal={
                hideAddUserToGroupModal
              }></AddUserToGroupForm>
          </Modal>
        </Portal>
      </Provider>
    );
  }
  return (
    <>
      <SafeAreaView>
        <View style={{backgroundColor: '#5F9EA0', height: '100%'}}>
          <ScrollView contentInsetAdjustmentBehavior="automatic">
            <Text></Text>

            <Text></Text>

            <View>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: '5%',
                }}>
                <ThemedButton
                  name="cartman"
                  type="primary"
                  backgroundColor="#36FCF6"
                  width={150}
                  borderRadius={30}
                  borderWidth={1}
                  borderColor="blue"
                  onPress={() => setShowCreateGroup(true)}>
                  <Text>Create a group </Text>
                  <Icon name={'user'} size={30} color={'green'}></Icon>
                </ThemedButton>
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
                  backgroundColor="#36FCF6"
                  width={180}
                  borderRadius={30}
                  borderWidth={1}
                  borderColor="blue"
                  onPress={() => setShowAddUserToGroup(true)}>
                  <Text>Add user to a group</Text>
                  <Icon name={'user'} size={30} color={'green'}></Icon>
                </ThemedButton>
              </View>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
      <SnackbarComponent></SnackbarComponent>
    </>
  );
};

const styles = StyleSheet.create({
  containerStyle: {backgroundColor: '#5F9EA0', padding: 20},
});
