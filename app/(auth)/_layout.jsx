import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

import { useAuth } from '../../context/authContext'

const AuthLayout = () => {

  // const { isAuthenticated } = useAuth();

  // if (isAuthenticated) return (
  //   <Redirect href="/home" />
  // );

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name='sign-in' ></Stack.Screen>
        <Stack.Screen name='sign-up' ></Stack.Screen>
        <Stack.Screen name='choose' ></Stack.Screen>
      </Stack>
      <StatusBar backgroundColor="#F6F7F7" style="dark"></StatusBar>
    </>
  );
}

export default AuthLayout