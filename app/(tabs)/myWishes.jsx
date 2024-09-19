import { View, Text, Button, Image, ActivityIndicator, ScrollView, TouchableOpacity, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link, usePathname, useSegments } from 'expo-router'
import HomeBanner from '../../components/HomeBanner'
import NavCardGradient from '../../components/NavCardGradient';
import { LinearGradient } from 'expo-linear-gradient';
import images from '../../constants/images';
import icons from '../../constants/icons';
import WishCard from '../../components/WishCard';
import { StatusBar } from 'expo-status-bar'
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/Header';
import { useAuth } from '../../context/authContext';
import WishList from '../../components/WishList';
import Loading from '../../components/Loading';
import LottieView from 'lottie-react-native';
import { doc, getDocs, query } from 'firebase/firestore';
import { wishesRef } from '../../config/firebase';
import FormField2 from '../../components/FormField2';
import Categories from '../../components/Categories';
import WishListFeed from '../../components/WishListFeed';
import SmallBanner from '../../components/SmallBanner';
import CustomKeybView from '../../components/CustomKeybView';

const MyWishes = () => {

  const { user } = useAuth();
  // console.log("feed userID: ", user?.userID);

  const [wishCount, setWishCount] = useState()
  useEffect(() => {
    setWishCount(user?.remainingWishes)
  }, [])


  const [wishes, setWishes] = useState([])
  const [loading, setLoading] = useState(true);
  const [isTyping, setIsTyping] = useState(false)

  useEffect(() => {
    if (user?.userID) getWishes()
    // console.log("feed userID: ", user?.userID);
  }, [user?.userID])

  const getWishes = async () => {
    try {
      const q = query(wishesRef);
      const querySnapshot = await getDocs(q);
      const data = [];

      querySnapshot.forEach(doc => {
        const docId = doc.id;

        // Check if the docId contains the userID
        if (docId.includes(user?.userID)) {
          // console.log("Matching doc ID:", docId);

          // works without the ", docId"
          data.push({ ...doc.data(), docId });
        }
      });

      setWishes(data);
    } catch (error) {
      console.error('Error fetching wishes:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <View className="flex-1 mb-20">
        {/* <View className="flex-1"> */}

        {/* <View className="h-screen"> */}
        <View className="h-[15vh] space-x-5 flex-row mx-5">
          <View className="relative items-center justify-center flex-1 max-w-[40%] bg-transparent">

            <LinearGradient
              className="absolute w-[55%] h-[55%] top-[16%] rounded-full -z-10 "
              // className="absolute w-[16vw] h-[16vw] top-[17%] rounded-full -z-10 "
              colors={['transparent', 'transparent', '#C1CEC5', 'transparent', 'transparent']}
              start={{ x: 0, y: 2.5 }} end={{ x: 0.5, y: 0 }}
            ></LinearGradient>

            <Text className="text-8xl font-whisper text-primary-dark"> {wishCount} </Text>
            <Text className="text-xs font-mLight">Remaining Wishes</Text>
          </View>
          <SmallBanner container="shadow"></SmallBanner>
        </View>

        <View className="flex-1">

          <View className="flex-row items-start justify-center mt-8 mb-1">
            <Text className="text-2xl font-mLight text-primary-dark">My</Text>
            <Text className="text-4xl font-whisper text-primary-dark"> Wishes </Text>
          </View>

          {loading ? (
            <View className="items-center justify-center flex-1">
              <Loading height="h-20"></Loading>
            </View>
          ) : (
            <WishListFeed wishes={wishes} screen="feed"></WishListFeed>
          )}
          {/* </ScrollView> */}
        </View>
      </View >

      {/* </View > */}
      {/* </View > */}
      <StatusBar backgroundColor="#F6F7F7" style="dark"></StatusBar>
      {/* </SafeAreaView> */}
      <LinearGradient
        className="absolute w-full h-full -z-10"
        colors={['#F6F7F7', '#C1CEC5']}
        start={{ x: 0, y: 0 }} end={{ x: 0, y: 1.75 }}
      ></LinearGradient>
    </>
  )
}

export default MyWishes