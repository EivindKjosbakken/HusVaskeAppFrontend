import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView, SafeAreaView} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import {create} from 'react-test-renderer';
import {useAxiosPost} from './api/useAxiosPost';
import {useAxiosGet} from './api/useAxiosGet';
import api from './api/posts';

const CreateTaskPage = () => {
  const [taskName, setTaskName] = useState('');
  const [location, setLocation] = useState('');
  const [assignee, setAssignee] = useState('');

  const [myTodoItems, setMyTodoItems] = useState(undefined);
  const [showMyTodoItems, setShowMyTodoItems] = useState(false);
  const [showAddTodoItem, setShowAddTodoItem] = useState(false);

  const [showTasks, setShowTasks] = useState(false);

  const flipShowAddTodoItem = () => {
    setShowAddTodoItem(!showAddTodoItem);
  };

  const flipShowTasks = () => {
    setShowTasks(!showTasks);
  };

  const {postRequest} = useAxiosPost();
  const {getRequest, data} = useAxiosGet();

  useEffect(() => {
    const fetchTasks = async apiUrl => {
      try {
        const response = await api.get(apiUrl);
        setMyTodoItems(response.data);
        //console.log('RESP:' + JSON.stringify(response.data));
        //console.log(response.data);
      } catch (err) {
        console.log('GOT ERROR ' + err);
      }
    };
    fetchTasks('/api/todoitems');
  }, []);

  const createTask = async (apiUrl, body) => {
    //kanskje du må ha klammer rundt apiUrl og body? ? ?

    try {
      if (body.title != '' && body.location != '' && body.assignee != '') {
        const response = await api.post(apiUrl, body);
        console.log('POST WORKED:' + response.data);
      } else {
        console.log('BODY WAS EMPTY');
      }
    } catch (err) {
      console.log('ERROR WHEN POSTING A TASK: ' + err);
    }
  };

  return (
    <>
      <SafeAreaView>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <View>
            <Button onPress={flipShowAddTodoItem} outlined>
              <Text>{showAddTodoItem ? 'Done' : 'Add a todo item'}</Text>
            </Button>
          </View>
          {showAddTodoItem && (
            <View>
              <View>
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
                  id="assignee"
                  label="Task assignee"
                  value={assignee}
                  onChangeText={text => setAssignee(text)}
                />
              </View>
              <View>
                <Button
                  onPress={() => {
                    createTask('/api/todoitem', {
                      id: 1,
                      title: taskName,
                      location: location,
                      assignee: assignee,
                    });
                  }}
                  outlined>
                  Create task
                </Button>
              </View>
            </View>
          )}

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

export default CreateTaskPage;
