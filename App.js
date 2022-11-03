import axios from 'axios';
import React, {useEffect, useState, createContext} from 'react';
import {Button} from 'react-native-paper';

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

import MainContainer from './components/navigation/MainContainer';
import AppContext from './components/AppContext';

const App: () => Node = () => {
  const [snackbarState, setSnackbarState] = useState({
    active: false,
    text: '',
    textColor: 'black',
  });
  const [userState, setUserState] = useState({isLoggedIn: true}); //TODO this has to be false if in production

  const state = {
    snackbarState,
    setSnackbarState,
    userState,
    setUserState,
  };

  return (
    <AppContext.Provider value={state}>
      <MainContainer></MainContainer>
    </AppContext.Provider>
  );
};

export default App;
