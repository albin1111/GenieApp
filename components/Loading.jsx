import { View, Text } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native';

export default function Loading() {
  return (
    <View style={{ aspectRatio: 1 }} className={`h-20`}>
      <LottieView style={{ flex: 1 }} source={require("../assets/images/loading.json")} autoPlay loop></LottieView>
    </View>
  )
}