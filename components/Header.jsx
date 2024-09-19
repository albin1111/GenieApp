import { View, Text, Image } from 'react-native'
import React from 'react'
import icons from '../constants/icons'

export default function Header() {
  return (
    <>
      <View className="bg-newWhite">
        <Image className="w-full h-[5vh] shirnk mt-10 mb-2" resizeMode='contain' source={icons.logoDark}></Image>
        {/* <View className="w-full border-b border-primary-light"></View> */}
      </View >
    </>
  )
}