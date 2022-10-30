import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Button} from 'react-native-paper';
import {useAxiosGet} from './components/api/useAxiosGet';
import {useAxiosPost} from './components/api/useAxiosPost';
import {DisplayBoard} from './components/DisplayBoard';
import CreateTaskPage from './components/CreateTaskPage';
import {Users} from './components/Users';
import api from './components/api/posts';

import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {Item} from 'react-native-paper/lib/typescript/components/List/List';

const Section = ({children, title}): Node => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const {getRequest, data} = useAxiosGet();

  const {postRequest} = useAxiosPost();

  const fetchTasks = async apiUrl => {
    try {
      const response = await api.get(apiUrl);
      //console.log('RESP:' + JSON.stringify(response.data));
      //console.log(response.data);
    } catch (err) {
      console.log('GOT ERROR ' + err);
    }
  };

  const sendPostRequest = async apiUrl => {
    //kanskje du må ha klammer rundt apiUrl og body? ? ?
    const body = {
      id: 10,
      title: 'Eivinds poste task',
      location: 'Nederland',
      assignee: 'Eivind',
    };
    try {
      const response = await api.post('/api/todoitem', body);
    } catch (err) {
      console.log('ERROR WHEN POSTING A TASK: ' + err);
    }
  };

  const headerStyle = {
    fontWeight: 'bold',
    fontSize: 25,
    textAlign: 'center',
    marginTop: 40,
    marginBottom: 100,
  };
  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View>
          <Text style={headerStyle}>Welcome to the TODO list app</Text>
        </View>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <View>
            <Button
              onPress={() => {
                fetchTasks('/api/users');
              }}
              outlined>
              FETCH
            </Button>
            <Button
              onPress={() => {
                sendPostRequest('/api/user', {
                  id: 1,
                  firstName: 'FUNKER BODY !? IIIIIIIIIIGJEN ',
                  lastName: 'string',
                  email: 'string',
                });
              }}
              outlined>
              POST
            </Button>
          </View>
        </View>
        <View className="col-md-8">
          <CreateTaskPage></CreateTaskPage>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
