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
import api from '../../api/posts';
import TaskBoxFinished from '../../subcomponents/TaskBoxFinished';
import SInfo from 'react-native-sensitive-info';
import {useFocusEffect} from '@react-navigation/native';

export default FinishedTasksScreen = () => {
  const [showTasks, setShowTasks] = useState(true);
  const [myTodoItems, setMyTodoItems] = useState(undefined);

  const [myFinishedTodoItems, setFinishedMyTodoItems] = useState(undefined);

  const flipShowTasks = async () => {
    if (!showTasks) {
      await fetchFinishedTasks(); //if you are going to show tasks, then get updated info
    }
    setShowTasks(!showTasks);
  };
  const fetchFinishedTasks = async () => {
    const currUsername = await SInfo.getItem('username', {});
    try {
      const response = await api.get(
        '/api/finishedtodoitems' + '/' + currUsername,
      );
      setMyTodoItems(response.data);
    } catch (err) {
      console.log('GOT ERROR WHEN FETCHING TASKS ' + err);
    }
  };

  const refreshTasks = async () => {
    await fetchFinishedTasks();
  };

  useFocusEffect(
    useCallback(() => {
      fetchFinishedTasks();
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
            Your finished tasks - click to
            {showTasks ? <Text> hide</Text> : <Text> show</Text>}
          </Text>
        </Button>
      </>
    );
  }

  return (
    <>
      <Button onPress={flipShowTasks}>
        <Text style={{textAlign: 'center', fontSize: 15, fontWeight: 'bold'}}>
          Your finished tasks - click to
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
              <TaskBoxFinished
                taskID={myTodoItems[item].id}
                taskName={myTodoItems[item].title}
                assignee={myTodoItems[item].assignee}
                refreshTasks={refreshTasks}
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
          You have no finished TODO items
        </Text>
      )}
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
