import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'

const CustomBtn = ({
  title,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
  children,
}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={`rounded-full overflow-hidden ${containerStyles} ${isLoading ? "opacity-50" : ""}`}
      disabled={isLoading}
    >
      <LinearGradient className="flex-row items-center justify-center px-10 py-5" start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }} colors={['#1E2D24', '#485b50']}>

        <Text className={`text-white font-mMedium text-lg ${textStyles}`}>{title}</Text>

        {children}

      </LinearGradient>
    </TouchableOpacity>
  )
}

export default CustomBtn