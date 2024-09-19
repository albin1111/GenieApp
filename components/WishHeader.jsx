import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { Stack, router } from 'expo-router'
import icons from '../constants/icons'
import { useRouter } from 'expo-router'
import { BlurView } from 'expo-blur'

export default function WishHeader() {
  const router = useRouter()

  const handleBack = () => {
    router.back()
  }

  const openMore = () => {

  }
  // console.log(router);

  return (
    // <>
    //   <View>
    //     <TouchableOpacity onPress={() => router.back()}>
    //       <Image className="w-10 h-10" source={icons.arrowLeftDark}></Image>
    //     </TouchableOpacity>
    //   </View>
    // </>

    <Stack.Screen options={{
      title: '',
      headerShadowVisible: false,
      headerTransparent: true,
      // headerBlurEffect: true,
      headerLeft: () => (
        <View className="">
          <TouchableOpacity className="items-center justify-center mt-4 overflow-hidden rounded-full shadow" onPress={handleBack}>
            <BlurView intensity={70} tint='light' experimentalBlurMethod='dimezisBlurView' className="absolute w-full h-full"></BlurView>
            <Image className="z-10 m-2 w-7 h-7" source={icons.arrowLeftDark}></Image>
          </TouchableOpacity>
        </View>
      ),
      headerRight: () => (
        <View className="">
          <TouchableOpacity className="items-center justify-center mt-4 overflow-hidden rounded-full shadow" onPress={openMore}>
            <BlurView intensity={70} tint='light' experimentalBlurMethod='dimezisBlurView' className="absolute w-full h-full"></BlurView>
            <Image className="z-10 m-2 w-7 h-7" source={icons.more}></Image>
          </TouchableOpacity>
        </View>
      ),
    }}></Stack.Screen>
  )
}