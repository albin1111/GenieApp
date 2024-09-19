import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { BlurView } from 'expo-blur'
import icons from '../constants/icons'

const FormField = ({
  title,
  // value,
  placeholder,
  handleTextChange,
  addStyles,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const [autoCap, setAutoCap] = useState('sentences');

  useEffect(() => {

    if (title == 'Email') {
      setAutoCap('none')
    } else if (title == 'Password') {
      setAutoCap('none')
    } else if (title == 'Username') {
      setAutoCap('words')
    }
    else {
      setAutoCap('sentences')
    }

  }, [])


  // const iconSrc = title && "Password" ? { eyeActive: icons.eyeActive } : { eye: icons.eye };

  return (
    <View className={`space-y-2 ${addStyles}`}>
      <Text className="w-full px-5 text-primary-dark font-mRegular">{title}</Text>

      <View className="flex-row items-center w-full h-16 border rounded-full shadow-sm border-primary-light focus:border-primary-dark focus:border">
        <TextInput
          className="flex-1 h-full px-5 text-lg text-primary-dark font-mRegular"
          // value={value}
          placeholder={placeholder}
          placeholderTextColor="#ACB4B3"
          onChangeText={handleTextChange}
          secureTextEntry={title === "Password" && !showPassword}
          {...props}
          style={{ alignSelf: 'center' }}
          autoCapitalize={autoCap}
        // includeFontPadding:false
        />

        {title === 'Password' && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image source={!showPassword ? icons.eye : icons.eyeActive} className="w-6 h-full mr-5" resizeMode='contain'></Image>
          </TouchableOpacity>
        )}


        <View className="absolute w-full h-full rounded-full bg-newWhite opacity-80 -z-10"></View>
        {/* <BlurView intensity={100} tint='dark' className="">
          <Text>asds</Text>
        </BlurView> */}
      </View>
    </View>

  )
}

export default FormField