import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import WelcomeScreen from '../(tabs)/index';
import LoginScreen from '../login';
import SignupScreen from '../signup';
import TabNavigator from './tabnavigation';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#ffffff' },
      }}
    >
      <Stack.Screen 
        name="Welcome" 
        component={WelcomeScreen}
        options={{
          gestureEnabled: false,
        }}
      />
      <Stack.Screen 
        name="Login" 
        component={LoginScreen}
        options={{
          gestureEnabled: true,
        }}
      />
      <Stack.Screen 
        name="Signup" 
        component={SignupScreen}
        options={{
          gestureEnabled: true,
        }}
      />
      <Stack.Screen 
        name="Dashboard" 
        component={TabNavigator}
        options={{
          gestureEnabled: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;