import { View, Text } from 'react-native'
import React from 'react'
import { Image } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
// import { withExpoSnack } from 'nativewind';

import images from '../constants/images'
import icons from '../constants/icons';

const HomeBanner = ({
  container,
  // genie,
  lamp,
}) => {
  return (
    <LinearGradient
      className={`absolute w-full rounded-full overflow-hidden ${container}`}
      start={{ x: 0, y: 0.5 }}
      end={{ x: 1, y: 0.5 }}
      colors={['#1E2D24', '#485b50']}
    >
      <View className='items-center justify-center flex-1'>
        {/* <Image className={`w-[160] h-[160] -top-[18] shadow-lg ${genie}`} resizeMode='contain' source={images.genie2}></Image> */}
        <Image className={`w-[90%] h-[90%] -bottom-[45] -right-[23%] absolute shadow-lg ${lamp}`} resizeMode='contain' source={images.bannerLamp}></Image>
        <View className="items-center justify-center flex-1 text-center">
          <Text className="ml-16 text-lg text-white font-mExtraLight">Want more</Text>
          <Text className="ml-16 text-4xl text-white font-whisper"> Wishes? </Text>
        </View>
        <Image className="absolute w-7 h-7 right-6" source={icons.arrowRight}></Image>
      </View>
    </LinearGradient>
  )
}

export default HomeBanner