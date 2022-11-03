import React, {useEffect, useState, useContext} from 'react';
import {View, Text, ScrollView, SafeAreaView, StyleSheet} from 'react-native';
import {
  TextInput,
  Button,
  Modal,
  Portal,
  Provider,
  Snackbar,
} from 'react-native-paper';
import api from '../../api/posts';
import SInfo from 'react-native-sensitive-info';
import CreateGroupForm from '../../CreateGroupForm';
import AddUserToGroupForm from '../../AddUserToGroupForm';
import SnackbarComponent from '../../SnackbarComponent';
import AppContext from '../../AppContext';

export default GroupScreen = () => {
  const {snackbarState, setSnackbarState} = useContext(AppContext);

  const [showCreateGroup, setShowCreateGroup] = useState(false);

  const hideCreateGroupModal = () => setShowCreateGroup(false);

  const [showAddUserToGroup, setShowAddUserToGroup] = useState(false);

  const hideAddUserToGroupModal = () => setShowAddUserToGroup(false);

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
            <CreateGroupForm></CreateGroupForm>
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
            <AddUserToGroupForm></AddUserToGroupForm>
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
              Create a group!
            </Button>
            <Text></Text>
            <Text></Text>
            <Button
              style={{marginTop: 30}}
              onPress={() => setShowAddUserToGroup(true)}>
              Add user to a group!
            </Button>
            <Text></Text>
            <Text></Text>
          </View>
        </ScrollView>
        <SnackbarComponent></SnackbarComponent>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  containerStyle: {backgroundColor: 'white', padding: 20},
});
