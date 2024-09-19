import { View, Text, ActivityIndicator, Platform } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import icons from "../constants/icons";
import { Image } from 'react-native';
import Loading from '../components/Loading';
import Animated, { FadeInDown } from 'react-native-reanimated';

const ios = Platform.OS == 'ios';

const Sample = () => {
  return (
    <>
      <View className="items-center justify-around flex-1">
        <Animated.Image
          entering={FadeInDown.delay(400).springify()}
          source={icons.logoDark}
          className="w-screen h-[15%] max-h-[90vw] shrink"
          resizeMode="contain"
        ></Animated.Image>
        {/* <ActivityIndicator size='large' color='#1E2D24' /> */}
        <Loading></Loading>
      </View>
      <LinearGradient
        className={`absolute w-full -z-10 ${ios ? "h-screen" : "h-full"}`}
        colors={['#F6F7F7', '#C1CEC5']}
        start={{ x: 0, y: 0 }} end={{ x: 0, y: 1.75 }}
      ></LinearGradient>
    </>
  )
}

export default Sample