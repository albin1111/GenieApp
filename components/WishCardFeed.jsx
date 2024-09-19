import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { Image } from 'expo-image'
import blurhash from '../constants/blurhash'
import { Link, usePathname, useSegments } from 'expo-router'
import icons from '../constants/icons'

export default function WishCardFeed({ item, router, lastItem, first, feed, profile }) {

  const path = useSegments()

  // console.log(first);

  const openWish = () => {
    router.push({ pathname: '/wishPage', params: item })
    // router.push({ pathname: '../(wish)/wishPage', params: item }) // this worked but the list does not load back
    // router.push({ pathname: '../wishPage', params: item })// from the vid
  }

  // const temporaryPicPath = item.wishPic.toString()
  // console.log(temporaryPicPath);
  const [noImg, setnoImg] = useState(true)
  useEffect(() => {
    if (item.wishPic === "") setnoImg(true)
    else setnoImg(false)
  }, [item.wishPic])

  const [isStatusGranted, setIsStatusGranted] = useState(false)
  useEffect(() => {
    if (item.wishStatus == 'Wish Granted!') setIsStatusGranted(true)
    else setIsStatusGranted(false)
  }, [item.wishStatus])

  return (
    <>
      {/* <View className={`items-center flex-1 ml-5 border overflow-hidden rounded-2xl ${lastItem ? 'mr-5' : ''} ${isStatusGranted ? 'border-secondary' : 'border-primary-dark'}`}> */}
      <View className={`items-center flex-1 relative mb-5 overflow-hidden rounded-2xl mx-5 ${first && 'mt-20'}  ${profile && 'mt-5'}`}>
        <TouchableOpacity onPress={openWish} className="flex-1">
          <View className="items-center w-[90vw] h-full flex-1">

            {noImg ? (
              <View className="flex-1 w-full h-[20vh] overflow-hidden">
                <Image className='w-full h-full opacity-10' contentFit='contain' source={icons.myWishes}></Image>
              </View>
            ) : (
              <View className="flex-1 w-full h-[20vh] relative overflow-hidden">
                <Image
                  className="absolute top-0 w-full h-full"
                  contentFit='cover'
                  placeholder={blurhash}
                  transition={500}
                  source={require('../assets/images/sample.png')}
                // source={item?.profilePic} only works for link pics
                ></Image>
              </View>
            )}

            <View className="relative w-full shadow">
              {isStatusGranted ? (
                <LinearGradient
                  className="absolute w-full h-full -z-[8]"
                  colors={['#6E5B1D', '#D4AF37', '#D4AF37', '#D4AF37', '#6E5B1D']}
                  start={{ x: 1, y: 0 }} end={{ x: 0, y: 0 }}
                ></LinearGradient>
              ) : (
                <LinearGradient
                  className="absolute w-full h-full -z-[8]"
                  colors={['#485b50', '#99C1AA', '#99C1AA', '#99C1AA', '#485b50']}
                  start={{ x: 1, y: 0 }} end={{ x: 0, y: 0 }}
                ></LinearGradient>
              )}
              <Text className="py-1 text-xs text-center font-mMedium text-newBlack">{item.wishStatus}</Text>
            </View>

            <View className="mx-4 mt-2 mb-4">
              <Text numberOfLines={1} className="text-base text-center font-mMedium text-primary-dark">{item.wishName}</Text>
              <Text numberOfLines={1} className="text-xs text-center font-mRegular text-primary-dark">{item.wisherName}</Text>
            </View>

          </View>
          <LinearGradient
            className="absolute w-full h-full -z-[9]"
            colors={['#F6F7F7', '#C1CEC5']}
            start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }}
          ></LinearGradient>
        </TouchableOpacity>
      </View>
      {
        feed && lastItem && (
          <View className="w-full h-2 border-b border-primary-light"></View>

        )
      }
    </>
  )
}