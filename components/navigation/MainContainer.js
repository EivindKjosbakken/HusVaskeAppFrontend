import * as React from 'react';
import {useEffect, useState, useContext} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

import {View, Text, StyleSheet} from 'react-native';
import SInfo from 'react-native-sensitive-info';
import SnackbarComponent from '../SnackbarComponent';
import AppContext from '../AppContext';

// Screens
import AdministrativeScreen from './screens/AdministrativeScreen';
import UnFinishedTasksScreen from './screens/UnFinishedTasksScreen';
import FinishedTasksScreen from './screens/FinishedTasksScreen';
import CreateTaskScreen from './screens/CreateTaskScreen';
import GroupScreen from './screens/GroupScreen';

//Screen names
const Administrative = 'Administrative';
const ShowTasks = 'Your tasks';
const FinishedTasks = 'Finished tasks';
const CreateTask = 'Create task';
const Group = 'Group';

const Tab = createBottomTabNavigator();

function MainContainer() {
  const {snackbarState, setSnackbarState, userState, setUserState} =
    useContext(AppContext);

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={Administrative}
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;
            let rn = route.name;
            {
            }
            if (rn === Administrative) {
              iconName = 'home';
              color = focused ? 'green' : 'grey';
            } else if (rn === ShowTasks) {
              iconName = 'tasks';
              color = focused ? 'green' : 'grey';
            } else if (rn === FinishedTasks) {
              iconName = 'check-square';
              color = focused ? 'green' : 'grey';
            } else if (rn === CreateTask) {
              iconName = 'plus-square';
              color = focused ? 'green' : 'grey';
            } else if (rn === Group) {
              iconName = 'group';
              color = focused ? 'green' : 'grey';
            }

            // You can return any component that you like here!
            return <Icon name={iconName} size={35} color={color} />;
          },
        })}>
        {userState.isLoggedIn ? (
          <>
            <Tab.Screen
              name={Administrative}
              component={AdministrativeScreen}
            />
            <Tab.Screen name={ShowTasks} component={UnFinishedTasksScreen} />
            <Tab.Screen name={FinishedTasks} component={FinishedTasksScreen} />
            <Tab.Screen name={CreateTask} component={CreateTaskScreen} />
            <Tab.Screen name={Group} component={GroupScreen} />
          </>
        ) : (
          <>
            <Tab.Screen
              name={Administrative}
              component={AdministrativeScreen}
            />
          </>
        )}
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  headerStyle: {
    fontWeight: 'bold',
    fontSize: 25,
    textAlign: 'center',
    marginTop: 40,
    marginBottom: 100,
  },
});
export default MainContainer;
