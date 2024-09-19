import { View, Text } from 'react-native'
import React from 'react'
import { Stack, Tabs } from 'expo-router'

export default function TryLayout() {
  return (
    <Tabs
      screenOptions={{
        // tabBarActiveTintColor: "#1E2D24",
        tabBarInactiveTintColor: "#1E2D24",
        tabBarShowLabel: false,
        tabBarStyle: {
          // backgroundColor: "#00000000",
          backgroundColor: "transparent",
          position: 'absolute',
          elevation: 0,
          // borderTopWidth: 1,
          borderTopWidth: 0,
          // borderTopColor: "#9aaea1",
          height: 84,
        },

      }}
    >
      <Tabs.Screen name='tabsScreen'></Tabs.Screen>
      <Tabs.Screen name='empty'></Tabs.Screen>
      <Tabs.Screen name='(inner)' options={{ href: null, tabBarStyle: { display: 'none' }, headerShown: false }}></Tabs.Screen>
    </Tabs>
  )
}