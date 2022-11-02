import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {View, Text, StyleSheet} from 'react-native';

// Screens
import AdministrativeScreen from './screens/AdministrativeScreen';
import UnFinishedTasksScreen from './screens/UnFinishedTasksScreen';
import FinishedTasksScreen from './screens/FinishedTasksScreen';
import CreateTaskScreen from './screens/CreateTaskScreen';

//Screen names
const Administrative = 'Administrative';
const ShowTasks = 'Your tasks';
const FinishedTasks = 'Finished tasks';
const CreateTask = 'Create task';

const Tab = createBottomTabNavigator();

function MainContainer() {
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
              iconName = focused ? 'home-outline' : 'home-outline';
            } else if (rn === ShowTasks) {
              iconName = focused ? 'earth' : 'earth';
            } else if (rn === FinishedTasks) {
              iconName = focused ? 'earth-outline' : 'earth-outline';
            } else if (rn === CreateTask) {
              iconName = focused ? 'add-circle' : 'add-circle-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={30} />;
          },
        })}>
        <Tab.Screen name={Administrative} component={AdministrativeScreen} />
        <Tab.Screen name={ShowTasks} component={UnFinishedTasksScreen} />
        <Tab.Screen name={FinishedTasks} component={FinishedTasksScreen} />
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
