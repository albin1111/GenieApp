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
import { BlurView } from 'expo-blur';

// nasa scrollview yung hide header on scroll stickyHeaderHiddenOnScroll

const BecomeGenie = () => {

  const { user } = useAuth();
  // console.log("feed userID: ", user?.userID);

  const [wishes, setWishes] = useState([])
  const [loading, setLoading] = useState(true);
  const [isTyping, setIsTyping] = useState(false)

  useEffect(() => {
    if (user?.userID) getWishes()
    // console.log("feed userID: ", user?.userID);
  }, [user?.userID])

  const getWishes = async () => {
    // console.log("feed userID: ", user?.userID);
    try {
      const q = query(wishesRef);
      const querySnapshot = await getDocs(q);
      const data = [];
      querySnapshot.forEach(doc => {
        // console.log("feed data: ", doc.data());
        data.push({ ...doc.data() });
      });
      setWishes(data);
      // console.log(data);
    } catch (error) {
      console.error('Error fetching wishes:', error);
    } finally {
      setLoading(false);
    }
  }

  // const { user } = useAuth();
  // // console.log("feed userID: ", user?.userID);
  // const [wishes, setwishes] = useState([])
  // const [isTyping, setIsTyping] = useState(false)

  // useEffect(() => {
  //   if (user?.userID) getWishes()
  //   // console.log("feed userID: ", user?.userID);
  // }, [])

  // const getWishes = async () => {
  //   const q = query(wishesRef)

  //   const querySnapshot = await getDocs(q)
  //   let data = []
  //   querySnapshot.forEach(doc => {
  //     data.push({ ...doc.data() })
  //     console.log(data);
  //     console.log("++++++++++++++");
  //   })

  //   setwishes(data)
  // }

  const handleTextChange = () => {
    setIsTyping(true)
  }

  return (
    <>
      <View className="flex-1 mb-20">

        {/* <View className="flex-1 mx-5"> */}
        {/* <FormField2
          title="Search"
          // value={form.password}
          height=''
          rounded="rounded-full"
          placeholder="Search here..."
          search={true}
          // handleTextChange={(e) => setForm({ ...form, password: e })}
          // handleTextChange={value => wishName.current = value}
          addStyles="flex-1 mx-5"
        ></FormField2> */}



        {/* <Categories></Categories> */}
        {/* </View> */}

        <View className="flex-1">

          <View className="absolute z-10 w-full mt-2 rounded-full px-7 h-14">
            <View className="relative flex-row items-center w-full h-full mb-2 overflow-hidden border rounded-full shadow-sm border-primary-light focus:bg-newWhite">
              <Image source={icons.search} className="w-6 h-full ml-3" resizeMode='contain'></Image>

              <TextInput
                className="flex-1 w-full h-full mx-3 text-xl text-primary-dark font-mRegular"
                // value={value}
                placeholder='Search here...'
                placeholderTextColor="#ACB4B3"
                // textAlign='center'
                onChangeText={handleTextChange}
                // onChangeText={handleTextChange}
                style={{ alignSelf: 'center' }}
              // autoCapitalize={autoCap}
              // includeFontPadding:false
              />

              {isTyping && (
                <TouchableOpacity className="pr-3">
                  <Image source={icons.close} className="w-6 h-full" resizeMode='contain'></Image>
                </TouchableOpacity>
              )}

              <BlurView intensity={70} tint='prominent' className="absolute h-full w-full -z-[9]"></BlurView>
              {/* <View className="absolute w-full h-full rounded-full opacity-75 bg-newWhite -z-10"></View> */}
            </View>
          </View>

          {/* <ScrollView
                className=""
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              > */}

          {/* {wishes.length > 0 ? (
            <View className="items-center justify-center flex-1">
              <Loading></Loading>
            </View>
          ) : (
            <WishListFeed wishes={wishes}></WishListFeed>
          )} */}

          {loading ? (
            <View className="items-center justify-center flex-1">
              <Loading height="h-20"></Loading>
            </View>
          ) : (
            <WishListFeed wishes={wishes} feed={true}></WishListFeed>
          )}
          {/* </ScrollView> */}
        </View>

      </View>
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

export default BecomeGenie