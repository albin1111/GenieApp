import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { BlurView } from 'expo-blur'

const CustomBtn2 = ({
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
      className={`rounded-full border border-primary-light overflow-hidden ${containerStyles} ${isLoading ? "opacity-50" : ""}`}
      disabled={isLoading}
    >
      <View className="flex-row items-center justify-center w-full px-10 py-5">
        <Text className={`text-primary font-mMedium text-lg ${textStyles}`}>
          {title}
        </Text>
        {children}
      </View>

      {/* {isLoading && (
        <ActivityIndicator
          animating={isLoading}
          color="#fff"
          size="small"
          className="ml-2"
        />
      )} */}
      <BlurView intensity={65} tint='prominent' className="absolute h-full w-full -z-[9]"></BlurView>
    </TouchableOpacity>
  )
}

export default CustomBtn2