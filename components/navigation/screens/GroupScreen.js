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
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <Text></Text>

          <Text></Text>

          <View>
            <Text></Text>
            <Text></Text>
            <Text></Text>
            <Text></Text>
            <Button
              style={{marginTop: 30}}
              onPress={() => setShowCreateGroup(true)}>
              Create a group!{' '}
              <Icon name={'user'} size={30} color={'green'}></Icon>
            </Button>
            <Text></Text>
            <Text></Text>
            <Button
              style={{marginTop: 30}}
              onPress={() => setShowAddUserToGroup(true)}>
              Add user to a group!{' '}
              <Icon name={'user-plus'} size={30} color={'green'}></Icon>
            </Button>
            <Text></Text>
            <Text></Text>
          </View>
        </ScrollView>
      </SafeAreaView>
      <SnackbarComponent></SnackbarComponent>
    </>
  );
};

const styles = StyleSheet.create({
  containerStyle: {backgroundColor: 'white', padding: 20},
});
