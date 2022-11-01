import React, {useEffect, useState} from 'react';
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
} from 'react-native-paper';
import {create} from 'react-test-renderer';
import api from '../../api/posts';
import Box from '../../Box';

export default ShowTasksScreen = () => {
  const [showTasks, setShowTasks] = useState(true);
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
      <Text></Text>

      <Button onPress={flipShowTasks}>
        <Text style={{textAlign: 'center', fontSize: 15, fontWeight: 'bold'}}>
          Your tasks - click to
          {showTasks ? <Text> hide</Text> : <Text> show</Text>}
        </Text>
      </Button>
      {typeof myTodoItems !== 'undefined' && showTasks && (
        <View style={styles.container}>
          <FlatList
            data={Object.keys(myTodoItems)}
            renderItem={({item}) => (
              <Box
                taskName={myTodoItems[item].title}
                assignee={myTodoItems[item].assignee}
              />
            )}
          />
        </View>
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
