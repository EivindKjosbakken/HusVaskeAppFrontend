import React from 'react';
import {View, Text} from 'react-native';
export const Header = () => {
  const headerStyle = {
    width: '100%',
    padding: '2%',
    backgroundColor: 'yellowgreen',
    color: 'black',
    textAlign: 'center',
  };

  return (
    <View style={headerStyle}>
      <Text>React With .NET tutorial</Text>
    </View>
  );
};
