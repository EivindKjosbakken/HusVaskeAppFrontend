import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView, SafeAreaView} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import {create} from 'react-test-renderer';
import api from '../../api/posts';

export default ShowTasksScreen = () => {
  const [showTasks, setShowTasks] = useState(false);
  const [myTodoItems, setMyTodoItems] = useState(undefined);

  const flipShowTasks = async () => {
    if (!showTasks) {
      await fetchTasks('/api/todoitems'); //if you are going to show tasks, then get updated info
    }
    setShowTasks(!showTasks);
  };
  const fetchTasks = async apiUrl => {
    try {
      const response = await api.get(apiUrl);
      setMyTodoItems(response.data);
      //console.log('RESP:' + JSON.stringify(response.data));
      //console.log(response.data);
    } catch (err) {
      console.log('GOT ERROR WHEN FETCHING TASKS ' + err);
    }
  };
  useEffect(() => {
    fetchTasks('/api/todoitems');
  }, []);
  return (
    <>
      <SafeAreaView>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Button onPress={flipShowTasks}>
            <Text
              style={{textAlign: 'center', fontSize: 15, fontWeight: 'bold'}}>
              Your tasks - click to
              {showTasks ? <Text> hide</Text> : <Text> show</Text>}
            </Text>
          </Button>
          {typeof myTodoItems !== 'undefined' &&
            showTasks &&
            myTodoItems.map((item, index) => {
              return (
                <View id={index}>
                  <Text>Task {index + 1}:</Text>
                  <Text id={index}>Task: {item.title}</Text>
                  <Text id={index}>Location: {item.location}</Text>
                  <Text id={index}>Assignee: {item.assignee}</Text>
                  <Text></Text>
                </View>
              );
            })}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};
