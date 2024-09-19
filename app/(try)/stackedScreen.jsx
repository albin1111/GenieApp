import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { Link, useRouter } from 'expo-router'

const StackedScreen = () => {
  const router = useRouter()
  const open = () => {
    router.push({ pathname: '/inner' }) // from the vid

  }

  return (
    <View>
      <Text>StackedScreen</Text>
      {/* <Link href='/inner'>asdssad</Link> */}
      <Pressable onPress={open}><Text>asdasd</Text></Pressable>

    </View>
  )
}

export default StackedScreen