import {View, Text} from 'react-native';
import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {Login, Signup} from '../screens';

export type AuthStackParamList = {
 Login: undefined,
 Signup: undefined,
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthStack = () => {
  return (
    <Stack.Navigator
    screenOptions={{
        headerTitleAlign: 'center',
        headerBackTitleVisible: false,
    }}
    >
      <Stack.Screen name='Login' component={Login}>Login</Text>
      <Stack.Screen name='Signup' component={Signup}>Signup</Text>
    </Stack.Navigator>
  );
};

export default AuthStack;
