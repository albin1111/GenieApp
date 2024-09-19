import { View, Text, Button, Image } from 'react-native'
import React, { useEffect, useState } from 'react'

import { Tabs, initialRouteName, useFocusEffect, useNavigation } from 'expo-router'
import { SplashScreen } from 'expo-router'
import { Stack } from 'expo-router/stack';

import icons from '../../constants/icons';
import { useAuth } from '../../context/authContext';
import Header from '../../components/Header';
import WishHeader from '../../components/WishHeader';


const TabIcon = ({ icon, color, name, focused }) => {

  const focusedIcons = {
    makeWish: icons.makeWishActive,
    becomeGenie: icons.becomeGenieActive,
    myWishes: icons.myWishesActive,
    profile: icons.profileActive,
  };

  const iconSrc = focused && focusedIcons[name] ? focusedIcons[name] : icons[name];

  return (
    <View className="flex items-center justify-center">
      <Image
        source={iconSrc}
        resizeMode="contain"
        // tintColor={color}
        className="w-10 h-10"
      />
      {/* <Text
        className={`text-xs text-center ${focused ? "font-mSemiBold" : "font-mLight"}`}
        style={{ color: color }}
      >
        {name}
      </Text> */}
    </View>
  );
};

const TabsLayout = () => {

  // const { isAuthenticated } = useAuth();

  // if (!isAuthenticated) return (
  //   <Redirect href="/sign-in" />
  // );

  return (
    <>
      <Tabs
        screenOptions={{
          // tabBarActiveTintColor: "#1E2D24",
          tabBarInactiveTintColor: "#1E2D24",
          tabBarShowLabel: false,
          tabBarStyle: {
            // backgroundColor: "red",
            backgroundColor: "transparent",
            position: 'absolute',
            elevation: 0,
            // borderTopWidth: 1,
            borderTopWidth: 0,
            // borderTopColor: "#9aaea1",
            height: 84,
          },

        }}
      // backBehavior={{ initialRouteName: 'home' }}
      // initialRouteName="home"
      >

        <Tabs.Screen
          name="home"
          options={{
            tabBarStyle: { display: 'none' },
            title: "Home",
            // headerShown: false,
            header: () => <Header></Header>,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.home}
                // color={color}
                name="home"
                focused={focused}
              />
            ),
          }}
        ></Tabs.Screen>

        <Tabs.Screen
          name="myWishes"
          options={{
            title: "My Wishes",
            // headerShown: false,
            header: () => <Header></Header>,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.myWishes}
                // color={color}
                name="myWishes"
                focused={focused}
              />
            ),
          }}
        ></Tabs.Screen>

        <Tabs.Screen
          name="makeWish"
          options={{
            title: "Make A Wish",
            // headerShown: false,
            header: () => <Header></Header>,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.makeWish}
                // color={color}
                name="makeWish"
                focused={focused}
              />
            ),
          }}
        ></Tabs.Screen>

        <Tabs.Screen
          name="becomeGenie"
          options={{
            title: "Be A Genie",
            // headerShown: false,
            header: () => <Header></Header>,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.becomeGenie}
                // color={color}
                name="becomeGenie"
                focused={focused}
              />
            ),
          }}
        ></Tabs.Screen>

        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            // headerShown: false,
            header: () => <Header></Header>,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.profile}
                // color={color}
                name="profile"
                focused={focused}
              />
            ),
          }}
        ></Tabs.Screen>

        <Tabs.Screen
          name='(stack)'
          options={{
            // title: "stack",
            tabBarStyle: { display: 'none' },
            headerShown: false,
            // header: () => <WishHeader></WishHeader>,
            href: null,
            // tabBarIcon: ({ color, focused }) => (
            //   <TabIcon
            //     icon={icons.profile}
            //     // color={color}
            //     name="wishPage"
            //     focused={focused}
            //   />
            // ),
          }}
        ></Tabs.Screen>

      </Tabs >
    </>
  );
}

export default TabsLayout