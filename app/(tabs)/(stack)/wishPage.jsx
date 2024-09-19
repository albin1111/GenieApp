import { View, Text, Pressable, TouchableOpacity, Image, ScrollView, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useGlobalSearchParams, useLocalSearchParams, useRouter } from 'expo-router'

import { LinearGradient } from 'expo-linear-gradient'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import WishHeader from '../../../components/WishHeader'
import icons from '../../../constants/icons'
import CustomBtn from '../../../components/CustomBtn'
import { BlurView } from 'expo-blur'
import { useAuth } from '../../../context/authContext'
import { Timestamp, addDoc, collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";
import { db } from '../../../config/firebase'
import { formatDate } from '../../../constants/common'
import Loading from '../../../components/Loading'

export default function WishPage() {

  const { user } = useAuth()
  // console.log(user);
  const item = useLocalSearchParams(item)
  // console.log(item);
  // console.log(item.wisherID, user?.userID);
  const router = useRouter()
  const [isGranted, setIsGranted] = useState(false)
  const [date, setDate] = useState()

  const [isMyWish, setIsMyWish] = useState(false)
  useEffect(() => {
    renderTime()
    if (item.wisherID === user?.userID) {
      setIsMyWish(true)
      // console.log("nigga");
    }
    else setIsMyWish(false)
  }, [item.wisherID])

  const [isStatusGranted, setIsStatusGranted] = useState(false)
  useEffect(() => {
    if (item.wishStatus == 'Wish Granted!') setIsStatusGranted(true)
    else setIsStatusGranted(false)
  }, [item.wishStatus])

  const handleGrantWish = async () => {
    try {
      const docRef = doc(db, 'wishes', item.wishId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        await updateDoc(docRef, { grantedBy: user?.userID });
        await updateDoc(docRef, { wishStatus: "Wish Granted!" });
        setIsGranted(true);
      } else {
        setIsGranted(false);
      }

      const docRef2 = doc(db, 'users', user?.userID);
      const grantedByMeRef = collection(docRef2, "grantedByMe")
      const newDoc = await addDoc(grantedByMeRef, {
        grantedBy: user?.userID,
        wishId: item.wishId,
        wisherID: item.wisherID,
        grantedAt: Timestamp.fromDate(new Date()),
      })

      Alert.alert("Wish Granted!", "")
    } catch (error) {
      console.log("error: ", error);
    }

    // try {

    //   // await setDoc(doc(db, "users", user?.userID, ))

    //   // const docRef = doc(db, 'users', user?.userID);
    //   // const querySnapshot = await getDocs(query(collection(db, "users")));
    //   // console.log("+++TRY2+++");
    //   // console.log("docref: ", docRef);
    //   // console.log("querySnapshot: ", querySnapshot);
    //   // // for (const doc of querySnapshot.docs) {
    //   //   if (doc.id === user?.userID) {
    //   //     const response = await addDoc(docRef, "grantedByMe")
    //   //     console.log("reopnse adddoc:", response);
    //   //     // const docSnap2 = await getDoc(docRef, "grantedByMe");
    //   //     const querySnapshot2 = await getDocs(query(collection(db, "users", "grantedByMe")));
    //   //     if (querySnapshot2.exists()) {
    //   //       console.log("nigga exixts", querySnapshot2);
    //   //     }
    //   //   }
    //   // }
    // } catch (error) {
    //   console.log("error: ", error);
    // }
  }

  // useEffect(() => {
  const renderTime = async () => {
    try {
      const querySnapshot = await getDocs(query(collection(db, "wishes")));
      const docRef = doc(db, 'wishes', item.wishId);

      // console.log(querySnapshot);
      for (const doc of querySnapshot.docs) {
        if (doc.id == item.wishId) {
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            // console.log(doc.data().dateUploaded.seconds);
            const date = new Date(doc.data().dateUploaded.seconds * 1000);
            const formattedDate = formatDate(date);
            setDate(formattedDate)
            // console.log(formattedDate, "___", doc.id, "<=");
            return formattedDate;
          }
        }
      }
    } catch (error) {
      console.log("error: ", error);
      // console.error("Invalid timestamp format");
      isLoading(false)
      return "error";
    }

    // if (item.dateUploaded && item.dateUploaded.seconds) {
    //   // Extract the seconds and create a Date object
    //   const date = new Date(item.dateUploaded.seconds * 1000);

    //   // Format the date to get only the year, month, and day
    //   const formattedDate = formatDate(date);

    //   // console.log(formattedDate);

    //   return formattedDate;
    // } else {
    //   console.log("Invalid timestamp format");
    //   return null;
    // }
  };

  // }, [item.wishId])


  return (
    <>
      {/* <SafeAreaView> */}
      <StatusBar backgroundColor="transparent" style="dark"></StatusBar>
      <View className="h-full bg-newWhite">
        {/* <TouchableOpacity onPress={renderTime} className="absolute z-40 w-full bg-black  h-[20vh]">
          <Text>ajksdahs</Text>
        </TouchableOpacity> */}
        <ScrollView
          // className=""
          showsVerticalScrollIndicator={false}
        // bounces={false}
        // bouncesZoom={false}
        // stickyHeaderHiddenOnScroll={true}
        // onScroll={}
        >

          {/* <LinearGradient
              className="absolute h-full w-full -z-[8]"
              colors={['transparent', '#F6F7F7']}
              start={{ x: 0, y: 0.5 }} end={{ x: 0, y: 0.8 }}
            ></LinearGradient>
            <BlurView intensity={50} tint='light' experimentalBlurMethod='dimezisBlurView' className="absolute h-full w-full -z-[9]"></BlurView>
            <Image
              className="absolute h-full w-full -z-[10]"
              source={require('../../../assets/images/sample2.png')}
              resizeMode='cover'
            ></Image> */}

          <LinearGradient
            className="absolute h-[65vh] w-full -z-[8]"
            colors={['transparent', '#F6F7F7']}
            start={{ x: 0, y: 0.5 }} end={{ x: 0, y: 0.99 }}
          ></LinearGradient>
          <BlurView intensity={60} tint='prominent' experimentalBlurMethod='dimezisBlurView' className="absolute h-[65vh] w-full -z-[9]"></BlurView>
          <Image
            className="absolute h-[65vh] w-full -z-[10]"
            source={require('../../../assets/images/sample.png')}
            resizeMode='cover'
          ></Image>

          <WishHeader></WishHeader>

          <View className="mx-5">
            {/* <TouchableOpacity className="absolute" onPress={() => router.back()}>
              <Image className="w-10 h-10" source={icons.arrowLeftDark}></Image>
            </TouchableOpacity> */}
            <View className="h-[20vh] mx-12 mt-14">
              <Image
                className="w-full h-full shadow"
                source={require('../../../assets/images/sample.png')}
                resizeMode='contain'
              ></Image>
            </View>
          </View>

          <View className={`items-center mx-2 mt-4 mb-3 overflow-hidden border rounded-3xl ${isStatusGranted ? "border-secondary-gradeintDark" : "border-primary-dark"}`}>

            <View className="absolute w-full h-full">
              <BlurView intensity={60} tint='systemChromeMaterialLight' experimentalBlurMethod='dimezisBlurView' className="w-full h-full"></BlurView>
            </View>

            <View className="py-3">

              <Text className="px-8 py-2 pb-0 text-center text-7xl text-primary-dark font-whisper"> {item.wishName} </Text>
              <Text className="px-4 text-sm text-center text-primary-dark font-mRegular">({item.wishName})</Text>


              <View className="relative flex-row items-center justify-center my-4 shadow shadow-black">
                {isStatusGranted ? (
                  <LinearGradient
                    className="absolute w-full h-full"
                    colors={['#6E5B1D', '#D4AF37', '#D4AF37', '#D4AF37', '#6E5B1D']}
                    start={{ x: 1, y: 0 }} end={{ x: 0, y: 0 }}
                  ></LinearGradient>
                ) : (
                  <LinearGradient
                    className="absolute w-full h-full"
                    colors={['#485b50', '#99C1AA', '#99C1AA', '#99C1AA', '#485b50']}
                    start={{ x: 1, y: 0 }} end={{ x: 0, y: 0 }}
                  ></LinearGradient>
                )}
                <Text className="py-1 text-xl text-center text-primary-dark font-mMedium"> {item.wishStatus} </Text>
                {/* {isStatusGranted ? (
                    <Image className="w-5 h-5" resizeMode='contain' source={icons.becomeGenieActive}></Image>
                  ) : (
                    <Image className="w-5 h-5" resizeMode='contain' source={icons.myWishesActive}></Image>
                  )} */}
              </View>

              <View className="flex-row items-end justify-between w-full px-4 mb-2">

                <Text className="text-xs text-center text-primary-dark font-mRegular"> {date} </Text>
                {/* <Text className="text-xs text-center text-primary-dark font-mRegular"> {item.dateUploaded} </Text> */}

                <TouchableOpacity className="flex-row items-center">
                  <Text className="text-base text-center text-primary-dark font-mMedium"> {item.wisherName} </Text>
                  <Image className="w-5 h-5" resizeMode='contain' source={icons.profileActive}></Image>
                </TouchableOpacity>

              </View>

            </View>
          </View>

          <Text className="p-1 pb-0 mx-6 mb-24 text-lg text-justify text-primary-dark font-mRegular"> {item.wishDesc} </Text>

        </ScrollView>
      </View>

      {/* </SafeAreaView> */}
      {!isMyWish && (
        <View className="absolute bottom-0 left-0 z-10 w-full">
          {isStatusGranted ? (
            <CustomBtn
              title='See other Wishes'
              handlePress={() => router.push('/becomeGenie')}
              containerStyles='mt-auto my-5 mx-5 shadow'
              textStyles=''
            >
              <Image className="ml-auto h-7 w-7" source={icons.arrowRight}></Image>
            </CustomBtn>
          ) : (
            <CustomBtn
              title='Grant Wish!'
              handlePress={handleGrantWish}
              containerStyles='mt-auto my-5 mx-5 shadow'
              textStyles=''
            >
              <Image className="ml-auto h-7 w-7" source={icons.becomeGenieActive}></Image>
            </CustomBtn>
          )}
        </View>
      )}

      {/* <View className="absolute shadow w-[100vw] h-[100vw] bottom-[5vh] -z-[9] -left-[110]">
        <Image className='w-full h-full opacity-5 -z-[9]' source={icons.myWishes}></Image>
      </View> */}

      {/* <LinearGradient
        className="absolute w-full h-full -z-10"
        // colors={['#C1CEC5', '#F6F7F7']}
        colors={['#F6F7F7', '#C1CEC5']}
        // start={{ x: 0, y: 0 }} end={{ x: 0, y: 2 }}
        start={{ x: 0, y: 0 }} end={{ x: 0, y: 1.75 }}
      ></LinearGradient> */}
    </>
  )
}