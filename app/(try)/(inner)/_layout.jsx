import { View, Text } from 'react-native'
import React from 'react'
import Inner from './inner'
import { Stack } from 'expo-router'

export default function InnerLayout() {
  return (
    <Stack>
      <Stack.Screen name='inner' options={{
        headerShown: false
      }}></Stack.Screen>
    </Stack>
  )
}