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

  const [isVisible, setIsVisible] = useState(false);
  const [taskName, setTaskName] = useState('Empty title');
  const [assignee, setAssignee] = useState('Empty assignee');
  const [location, setLocation] = useState('Empty location');
  const [groupName, setGroupName] = useState('Empty group name');
  const [timeCreated, setTimeCreated] = useState('Unknown date');
  const [timeFinished, setTimeFinished] = useState('Unknown date');
  const [isShowProof, setIsShowProof] = useState('Uknown if show proof');
  const [price, setPrice] = useState('Unknown price');

  const provideDetails = async taskID => {
    //myTodoItems
    const currItem = myTodoItems.find(ele => {
      return ele.id == taskID;
    });
    setTaskName(currItem?.title);
    setAssignee(currItem?.assignee);
    setIsVisible(true);
    setLocation(currItem?.location);
    setIsShowProof(currItem?.isShowProof);
    setPrice(currItem?.price);

    setTimeCreated(
      'Date: ' +
        currItem?.timeCreated.slice(0, 10) +
        ' , time: ' +
        currItem?.timeCreated.slice(11, 19),
    );
    if (!currItem?.timeFinished) {
      setTimeFinished('Task not finished yet');
    } else {
      setTimeFinished(currItem?.timeFinished);
    }
    const response = await api.get('/api/groupnamefromid/' + currItem?.groupID);
    setGroupName(response.data);
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

  return (
    <>
      <Provider>
        <View style={{backgroundColor: '#5F9EA0', height: '100%'}}>
          {typeof myTodoItems !== 'undefined' && myTodoItems.length > 0 ? (
            <View style={styles.container}>
              <FlatList
                data={Object.keys(myTodoItems)}
                renderItem={({item}) => (
                  <TaskBoxFinished
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
              You have no finished TODO items
            </Text>
          )}
          <DetailedTaskView
            isVisible={isVisible}
            taskName={taskName}
            assignee={assignee}
            location={location}
            groupName={groupName}
            timeCreated={timeCreated}
            timeFinished={timeFinished}
            isShowProof={isShowProof}
            price={price}
            setIsVisible={setIsVisible}></DetailedTaskView>
        </View>
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
