import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'expo-router'
import WishCardFeed from './WishCardFeed'

export default function WishListFeed({ wishes, feed, profile }) {
  const router = useRouter()

  return (
    <View className="flex-1">

      {/* change flatlist to scrollview to try to match width with nav btn */}

      <FlatList
        // gap={100}
        // columnGap={100}
        data={wishes}
        // data={wishes}
        horizontal={false}
        // contentContainerStyle={{ flex: 1 }}
        keyExtractor={item => Math.random()}
        // showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) =>
          <WishCardFeed
            lastItem={index + 1 == wishes.length}
            first={index == 0 && feed}
            feed={feed}
            profile={profile}
            router={router}
            item={item}
            index={index}
          ></WishCardFeed>}
      ></FlatList>
    </View>
  )
}