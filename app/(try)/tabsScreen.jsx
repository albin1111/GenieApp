import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { Link, Tabs, useRouter } from 'expo-router'
import icons from '../../constants/icons';

const TabsScreen = () => {
  const router = useRouter()
  const open = () => {
    router.push({ pathname: '/inner' }) // from the vid

  }
  return (
    <View>
      <Text>asds</Text>
      <Pressable onPress={open}><Text>asdasd</Text></Pressable>
    </View>
  )
}

export default TabsScreen