import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  FlatList,
} from 'react-native';
import {
  TextInput,
  Button,
  Divider,
  Avatar,
  Card,
  Title,
  Paragraph,
  Provider,
} from 'react-native-paper';
import {create} from 'react-test-renderer';
import api from '../../api/posts';
import TaskBoxUnFinished from '../../subcomponents/TaskBoxUnFinished';
import SInfo from 'react-native-sensitive-info';
import {useFocusEffect} from '@react-navigation/native';

export default UnFinishedTasksScreen = () => {
  const [showTasks, setShowTasks] = useState(true);
  const [myTodoItems, setMyTodoItems] = useState(undefined);

  const flipShowTasks = async () => {
    if (!showTasks) {
      await fetchUnFinishedTasks(); //if you are going to show tasks, then get updated info
    }
    setShowTasks(!showTasks);
  };
  const fetchUnFinishedTasks = async () => {
    const currUsername = await SInfo.getItem('username', {});
    try {
      const response = await api.get(
        '/api/unfinishedtodoitems' + '/' + currUsername,
      );
      setMyTodoItems(response.data);
    } catch (err) {
      console.log('GOT ERROR WHEN FETCHING TASKS ' + err);
    }
  };

  const refreshTasks = async () => {
    await fetchUnFinishedTasks();
  };

  const [isVisible, setIsVisible] = useState(false);
  const [taskName, setTaskName] = useState('Empty title');
  const [assignee, setAssignee] = useState('Empty assignee');
  const [createdDate, setCreatedDate] = useState('Unknown date');
  const [createdBy, setCreatedBy] = useState('Unknown creator');

  const provideDetails = async (taskName, assignee) => {
    await setTaskName(taskName);
    await setAssignee(assignee);
    await setIsVisible(true);
  };

  useFocusEffect(
    useCallback(() => {
      fetchUnFinishedTasks();
      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, []),
  );

  if (!showTasks) {
    return (
      <>
        <Button onPress={flipShowTasks}>
          <Text style={{textAlign: 'center', fontSize: 15, fontWeight: 'bold'}}>
            Your tasks - click to
            {showTasks ? <Text> hide</Text> : <Text> show</Text>}
          </Text>
        </Button>
      </>
    );
  }

  return (
    <>
      <Provider>
        <Button onPress={flipShowTasks}>
          <Text style={{textAlign: 'center', fontSize: 15, fontWeight: 'bold'}}>
            Your tasks - click to
            {showTasks ? <Text> hide</Text> : <Text> show</Text>}
          </Text>
        </Button>
        {typeof myTodoItems !== 'undefined' &&
        showTasks &&
        myTodoItems.length > 0 ? (
          <View style={styles.container}>
            <FlatList
              data={Object.keys(myTodoItems)}
              renderItem={({item}) => (
                <TaskBoxUnFinished
                  taskID={myTodoItems[item].id}
                  taskName={myTodoItems[item].title}
                  assignee={myTodoItems[item].assignee}
                  refreshTasks={refreshTasks}
                  provideDetails={provideDetails}
                />
              )}
            />
          </View>
        ) : (
          <Text
            style={{
              textAlign: 'center',
              fontSize: 20,
              fontWeight: 'bold',
              top: '10%',
            }}>
            You have no TODO items
          </Text>
        )}
        <DetailedTaskView
          isVisible={isVisible}
          taskName={taskName}
          assignee={assignee}
          setIsVisible={setIsVisible}></DetailedTaskView>
      </Provider>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});
