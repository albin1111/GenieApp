import { View, Text } from 'react-native'
import React from 'react'
import { Image } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
// import { withExpoSnack } from 'nativewind';
import images from '../constants/images'
import icons from '../constants/icons';

const SmallBanner = ({
  container,
  // genie,
  lamp,
}) => {
  return (
    <LinearGradient
      className={`flex-1 rounded-2xl overflow-hidden ${container}`}
      start={{ x: 0, y: 0.5 }}
      end={{ x: 1, y: 0.5 }}
      colors={['#1E2D24', '#485b50']}
    >
      <View className='flex-row items-center justify-between flex-1 px-3'>
        {/* <Image className={`w-[160] h-[160] -top-[18] shadow-lg ${genie}`} resizeMode='contain' source={images.genie2}></Image> */}
        <Image className={`w-[90%] h-[90%] -bottom-[35%] -right-[10%] absolute shadow-lg ${lamp}`} resizeMode='contain' source={images.bannerLamp}></Image>
        <View className="items-center justify-center">
          <Text className="text-lg text-white font-mExtraLight">Want more</Text>
          <Text className="text-4xl text-white font-whisper"> Wishes? </Text>
        </View>
        {/* <View className="flex-1"> */}
        <Image className="w-7 h-7" source={icons.arrowRight}></Image>
        {/* </View> */}
      </View>
    </LinearGradient>
  )
}

export default SmallBanner 