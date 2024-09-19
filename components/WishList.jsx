import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import WishCard from './WishCard'
import { useRouter } from 'expo-router'

export default function WishList({ wishes, }) {
  const router = useRouter()

  return (
    <View className="flex-1">

      {/* change flatlist to scrollview to try to match width with nav btn */}

      <FlatList
        // className="mr-5"
        // gap={100}
        // columnGap={100}
        data={wishes}
        // data={wishes}
        horizontal={true}
        // contentContainerStyle={{ flex: 1 }}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) =>
          <WishCard
            lastItem={index + 1 == wishes.length}
            router={router}
            item={item}
            index={index}
          ></WishCard>}
        keyExtractor={item => Math.random()}
      ></FlatList>
    </View>
  )
}