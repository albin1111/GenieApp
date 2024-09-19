import { View, Text, Button, Image, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link } from 'expo-router'
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

const Home = () => {

  const { user } = useAuth();
  // console.log("home userID: ", user?.userID);
  const [wishes, setWishes] = useState([])
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.userID) getWishes()
    // console.log("home userID: ", user?.userID);
  }, [user?.userID])

  const getWishes = async () => {
    try {
      const q = query(wishesRef);
      const querySnapshot = await getDocs(q);
      const data = [];
      querySnapshot.forEach(doc => {
        data.push({ ...doc.data() });
      });
      setWishes(data);
    } catch (error) {
      console.error('Error fetching wishes:', error);
    } finally {
      setLoading(false);
    }
  }

  // const { user } = useAuth();
  // // console.log("home userID: ", user?.userID);
  // // console.log("home user: ", user);
  // const [wishes, setwishes] = useState([])

  // useEffect(() => {
  //   if (user?.userID) getWishes()
  //   // console.log("home userID: ", user?.userID);
  // }, [user?.userID])

  // const getWishes = async () => {
  //   const q = query(wishesRef)

  //   const querySnapshot = await getDocs(q)
  //   let data = []
  //   querySnapshot.forEach(doc => {
  //     data.push({ ...doc.data() })
  //     // console.log("++++++++++++++");
  //     // console.log("home feed", data);
  //     // console.log("++++++++++++++");
  //   })

  //   setwishes(data)
  // }

  return (
    <>
      {/* <SafeAreaView className="h-full"> */}
      <View className="justify-center flex-1">
        <StatusBar backgroundColor="#F6F7F7" style="dark"></StatusBar>

        {/* <Header></Header> */}

        <View className="items-center justify-center flex-1 ">

          {/* pag malaki nav "h-[38%]" : "h-[18vh]"  */}
          <View className="relative items-center justify-center h-[38%] w-full px-5">
            <Image className="w-full h-[100%] shadow-lg z-[2] absolute -left-[20%]" resizeMode='contain' source={images.genie2}></Image>
            <HomeBanner container="h-[75%]" ></HomeBanner>
          </View>

          {/* basis-[30] */}
          <View className="flex-1 w-full mt-1">
            <View className="flex-row justify-between mx-5 mb-2">
              <Text className="my-auto text-primary-dark font-mRegular">Check out other people's Wishes</Text>
              <View className="my-auto">
                <Image className="w-5 h-5" source={icons.arrowRightDark} resizeMode='contain'>
                </Image>
                <Link className='absolute w-6 h-6' href={'/becomeGenie'}></Link >
              </View>
            </View>

            {/* basis-[60] */}
            <View className="flex-1">
              {/* <ScrollView
                className=""
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              > */}

              {loading ? (
                <View className="items-center justify-center flex-1">
                  <Loading height="h-20"></Loading>
                </View>
              ) : (
                <WishList wishes={wishes} screen="home"></WishList>
              )}

              {/* {wishes.length > 0 ? (
                <WishList wishes={wishes}></WishList>
              ) : (
                <View className="items-center justify-center flex-1">
                  <Loading></Loading>
                </View>
              )} */}

              {/* </ScrollView> */}
            </View>

          </View>
        </View>

        <View className="flex-1 m-5 space-y-5 shrink">
          <View className="flex-row flex-1 space-x-5">

            <TouchableOpacity className="flex-1">
              <NavCardGradient
                titleName="My Wishes"
                addStyles=""
                imagePosition="top-[45] -left-[20]"
                imageSource="myWishesActive"
                imageRotation=""
                gradientValueStart={0}
                gradientValueEnd={1}
                gradientColorStart="#1E2D24"
                gradientColorEnd="#485b50"
                href={'/myWishes'}
              ></NavCardGradient >
            </TouchableOpacity>

            <TouchableOpacity className="flex-1">
              <NavCardGradient
                titleName="Make A Wish"
                addStyles=""
                imagePosition="top-[35]"
                imageSource="makeWishActive"
                imageRotation="-rotate-12"
                gradientValueStart={1}
                gradientValueEnd={0}
                gradientColorStart="#1E2D24"
                gradientColorEnd="#485b50"
                href={'/makeWish'}
              ></NavCardGradient >
            </TouchableOpacity>
          </View>
          <View className="flex-row flex-1 space-x-5">

            <TouchableOpacity className="flex-1">
              <NavCardGradient
                titleName="Become a Genie"
                addStyles=""
                imagePosition="top-[50] -left-[20]"
                imageSource="becomeGenieActive"
                imageRotation=""
                gradientValueStart={0}
                gradientValueEnd={1}
                gradientColorStart="#1E2D24"
                gradientColorEnd="#485b50"
                href={'/becomeGenie'}
              ></NavCardGradient >
            </TouchableOpacity>

            <TouchableOpacity className="flex-1">
              <NavCardGradient
                titleName="My Profile"
                addStyles=""
                imagePosition="top-[35] -left-[20]"
                imageSource="profileActive"
                imageRotation=""
                gradientValueStart={1}
                gradientValueEnd={0}
                gradientColorStart="#1E2D24"
                gradientColorEnd="#485b50"
                href={'/profile'}
              ></NavCardGradient >
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {/* </SafeAreaView> */}
      <LinearGradient
        className="absolute w-full h-full -z-10"
        colors={['#F6F7F7', '#C1CEC5']}
        start={{ x: 0, y: 0 }} end={{ x: 0, y: 1.75 }}
      ></LinearGradient>
    </>
  )
}

export default Home