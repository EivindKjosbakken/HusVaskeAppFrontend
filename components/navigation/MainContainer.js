import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {View, Text, StyleSheet} from 'react-native';

// Screens
import LoginScreen from './screens/LoginScreen';
import ShowTasksScreen from './screens/ShowTasksScreen';
import CreateTaskScreen from './screens/CreateTaskScreen';

//Screen names
const loginName = 'Login/Register';
const ShowTasks = 'Your tasks';
const CreateTask = 'Create task';

const Tab = createBottomTabNavigator();

function MainContainer() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={ShowTasks}
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;
            let rn = route.name;

            if (rn === loginName) {
              iconName = focused ? 'home-outline' : 'home-outline';
            } else if (rn === ShowTasks) {
              iconName = focused ? 'earth' : 'earth';
            } else if (rn === CreateTask) {
              iconName = focused ? 'add-circle' : 'add-circle-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={30} />;
          },
        })}>
        <Tab.Screen name={loginName} component={LoginScreen} />
        <Tab.Screen name={ShowTasks} component={ShowTasksScreen} />
        <Tab.Screen name={CreateTask} component={CreateTaskScreen} />
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
