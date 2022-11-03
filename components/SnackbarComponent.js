import React, {useEffect, useState, useContext} from 'react';
import {View, Text, ScrollView, SafeAreaView} from 'react-native';
import {TextInput, Button, Snackbar} from 'react-native-paper';
import AppContext from './AppContext';

export default SnackbarComponent = () => {
  const {snackbarState, setSnackbarState} = useContext(AppContext);

  return (
    <Snackbar
      duration={2000}
      visible={snackbarState.active}
      onDismiss={() => {
        setSnackbarState({text: '', active: false, textColor: 'white'});
      }}>
      <Text style={{color: snackbarState.textColor}}>{snackbarState.text}</Text>
    </Snackbar>
  );
};
