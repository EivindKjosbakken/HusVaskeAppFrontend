import axios from 'axios';
import React, {useEffect, useState} from 'react';
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

const App: () => Node = () => {
  return <MainContainer></MainContainer>;
};

export default App;
