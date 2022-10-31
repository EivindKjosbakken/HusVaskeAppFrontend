import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {View, Text} from 'react-native';

// Screens
import HomeScreen from './screens/HomeScreen';
import ShowTasksScreen from './screens/ShowTasksScreen';
import CreateTaskScreen from './screens/CreateTaskScreen';

//Screen names
const homeName = 'Home';
const ShowTasks = 'Your tasks';
const CreateTask = 'Create task';

const Tab = createBottomTabNavigator();

function MainContainer() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={homeName}
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;
            let rn = route.name;

            if (rn === homeName) {
              iconName = focused ? 'home-outline' : 'home-outline';
            } else if (rn === ShowTasks) {
              iconName = focused ? 'document' : 'bookmark';
            } else if (rn === CreateTask) {
              iconName = focused ? 'add-circle' : 'add-circle-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={30} />;
          },
        })}>
        <Tab.Screen name={homeName} component={HomeScreen} />
        <Tab.Screen name={ShowTasks} component={ShowTasksScreen} />
        <Tab.Screen name={CreateTask} component={CreateTaskScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default MainContainer;
