import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import WishHeader from '../../../components/WishHeader'

export default function StackLayout() {
  return (
    <Stack>
      <Stack.Screen name='wishPage' options={{
        // header: () => <WishHeader></WishHeader>,
        // headerShown: false
      }}></Stack.Screen>
    </Stack>
  )
}