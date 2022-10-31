import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Button} from 'react-native-paper';
import {DisplayBoard} from './components/DisplayBoard';
import CreateTaskPage from './components/pages/CreateTaskPage';
import ShowTasksPage from './components/pages/ShowTasksPage';
import {Users} from './components/Users';
import api from './components/api/posts';
import LoginPage from './components/pages/LoginPage';

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
        <View>
          <LoginPage></LoginPage>
        </View>
        {/*
        <View className="col-md-8">
          <CreateTaskPage></CreateTaskPage>
        </View>
        <View>
          <ShowTasksPage />
        </View>
    */}
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
