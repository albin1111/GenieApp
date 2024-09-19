import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { BlurView } from 'expo-blur'
import icons from '../constants/icons'
import { LinearGradient } from 'expo-linear-gradient'

const FormField2 = ({
  title,
  // value,
  placeholder,
  handleTextChange,
  addStyles,
  inputStyle,
  height,
  rounded,
  search,
  ref2,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  //  const search = search;
  // const [autoCap, setAutoCap] = useState('sentences');

  // useEffect(() => {

  //   if (title == 'Email') {
  //     setAutoCap('none')
  //   } else if (title == 'Password') {
  //     setAutoCap('none')
  //   } else if (title == 'Wish Name') {
  //     setAutoCap('words')
  //   }
  //   else {
  //     setAutoCap('sentences')
  //   }

  // }, [])


  // const iconSrc = title && "Password" ? { eyeActive: icons.eyeActive } : { eye: icons.eye };

  return (
    <View className={` ${addStyles}`}>
      {/* <Text className="w-full px-5 text-primary-dark font-mRegular">{title}</Text> */}

      <View className={`flex-row items-center w-full border shadow-sm border-primary-light focus:border-primary-dark relative overflow-hidden ${height}`}>
        {/* {search === true && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image source={icons.search} className="w-6 h-full ml-5" resizeMode='contain'></Image>
          </TouchableOpacity>
        )} */}

        <TextInput
          className={`flex-1 w-full h-full px-5 text-xl text-primary-dark font-mRegular ${inputStyle}`}
          // value={value}
          ref={ref2}
          placeholder={placeholder}
          placeholderTextColor="#ACB4B3"
          // textAlign='center'
          onChangeText={handleTextChange}
          secureTextEntry={title === "Password" && !showPassword}
          {...props}
          style={{ alignSelf: 'center' }}
        // autoCapitalize={autoCap}
        // includeFontPadding:false
        />

        {/* {search === true && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image source={!showPassword && icons.close} className="w-6 h-full mr-5" resizeMode='contain'></Image>
          </TouchableOpacity>
        )} */}

        <View className={`absolute w-full h-full bg-newWhite opacity-75 -z-10 ${rounded}`}></View>
        {/* <BlurView intensity={60} tint='prominent' experimentalBlurMethod='dimezisBlurView' className="absolute h-full w-full -z-[9]"></BlurView> */}
        {/* <BlurView intensity={65} tint='ligth' className="absolute h-full w-full -z-[9]"></BlurView> */}

      </View>
    </View>

  )
}

export default FormField2