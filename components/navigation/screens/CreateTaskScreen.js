import React, {useEffect, useState, useContext} from 'react';
import {View, Text, ScrollView, SafeAreaView} from 'react-native';
import {TextInput, Button, Snackbar} from 'react-native-paper';
import api from '../../api/posts';
import AppContext from '../../AppContext';
import SnackbarComponent from '../../SnackbarComponent';

export default CreateTaskScreen = () => {
  const [taskName, setTaskName] = useState('');
  const [location, setLocation] = useState('');
  const [assignee, setAssignee] = useState('');

  const [showAddTodoItem, setShowAddTodoItem] = useState(false);

  const flipShowAddTodoItem = () => {
    setShowAddTodoItem(!showAddTodoItem);
  };
  const {snackbarState, setSnackbarState} = useContext(AppContext);

  const createTask = async (apiUrl, body) => {
    try {
      if (body.title != '' && body.location != '' && body.assignee != '') {
        const response = await api.post(apiUrl, body);
        setSnackbarState({
          text: 'Task "' + taskName + '" added',
          active: true,
          textColor: 'green',
        });
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
                      id: 0,
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
        </ScrollView>
        <SnackbarComponent></SnackbarComponent>
      </SafeAreaView>
    </>
  );
};
