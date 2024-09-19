import { View, Text, Button, Pressable, TouchableOpacity, Alert, ScrollView } from 'react-native'
import { Image } from 'expo-image';
import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/authContext'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../../components/Header'
import blurhash from "../../constants/blurhash"
import { StatusBar } from 'expo-status-bar'
import { LinearGradient } from 'expo-linear-gradient'
import icons from '../../constants/icons';
import NoGradientBtn from '../../components/NoGradientBtn';
import CustomBtn from '../../components/CustomBtn';
import { BlurView } from 'expo-blur';
import { formatDate } from '../../constants/common'
import { collection, doc, getDoc, getDocs, query } from 'firebase/firestore';
import { db, wishesRef } from '../../config/firebase';
import Loading from '../../components/Loading';
import WishListFeed from '../../components/WishListFeed';

const Profile = () => {

  const { logout, user, resetPass } = useAuth()
  // console.log(user.createdAt);
  const [wishes, setWishes] = useState([1])
  const [loading, setLoading] = useState(true);
  const [isProfileComplete, setIsProfileComplete] = useState(user.profileComplete)

  const handleLogout = async () => {
    await logout()
  }

  const handleResetPass = async () => {
    await resetPass()
    Alert.alert("Password Reset Sent.", "Please check your email to change password.")
  }

  const [myProfile, setMyProfile] = useState(true)

  useEffect(() => {
    getGrantedByMe()
    // console.log("nigga");
  }, [])

  const getGrantedByMe = async () => {
    try {
      const userDocRef = doc(db, 'users', user?.userID);

      const grantedByMeRef = collection(userDocRef, 'grantedByMe');

      const q = query(grantedByMeRef);
      const querySnapshot = await getDocs(q);
      const data = []

      for (const doc2 of querySnapshot.docs) {
        // data.push({ ...doc.data() });
        // console.log(doc2.id, " => ", doc2.data().wishId);
        const q = query(wishesRef);
        const querySnapshot = await getDocs(q);
        // const data = [];
        querySnapshot.forEach(doc => {
          // console.log("wishes bucket:", " => ", doc.data().wishId);
          if (doc2.data().wishId == doc.data().wishId) {
            // console.log("nigga: ", doc2.data().wishId, "+++", doc.data().wishId);
            data.push({ ...doc.data() });
            // console.log("data1: ", data);
          }
        });
      };
      setWishes(data)

      // console.log("data2: ", data);
      // console.log('wishes: ', wishes);
    } catch (error) {
      console.log("error granted by me: ", error);
    } finally {
      setLoading(false);
    }
  };

  const renderTime = () => {
    if (user && user.createdAt && user.createdAt.seconds) {
      const date = new Date(user.createdAt.seconds * 1000);

      const formattedDate = formatDate(date);

      return formattedDate;
    } else {
      console.error("Invalid timestamp format");
      return null;
    }
  };

  // const [wishesGranted, setWishesGranted] = useState(false)
  // console.log("user data in profile: ", user);

  return (
    <>
      {/* <SafeAreaView className="h-full"> */}
      {/* <Header></Header> */}

      {/* PROFILE PIC */}
      {/* <View className="h-fit">
          <Image
            className="w-full h-[5vh] mt-2"
            // style={styles.image}
            // source={user?.profilePic}
            source="https://picsum.photos/seed/696/3000/2000"
            placeholder={blurhash}
            contentFit="cover"
            transition={500}
          />
        </View> */}
      <View className="flex-1 mb-20">

        {/* <View className="flex-1 mb-20 space-y-3"> */}
        {/* <View className="w-full mb-2 border-b border-primary-light"></View> */}

        <View className="flex-row items-center justify-center mx-5 space-x-5">
          <Image className="w-[20vh] h-[20vh] rounded-2xl border border-primary-light" contentFit='cover' source={icons.profileActive}></Image>
          {/* <Image className="w-[20vh] h-[20vh] rounded-full" contentFit='cover' source={require("../../assets/images/sample.png")}></Image> */}
          <View className="flex-1">
            <View className="flex-row items-center">
              <Text className='text-2xl text-primary-dark font-mMedium'>{user?.username}</Text>
              {
                isProfileComplete ? (
                  <Image className="w-5 h-5" source={icons.complete}></Image>
                ) : (
                  <Image className="w-5 h-5" source={icons.incomplete}></Image>
                )
              }
            </View>
            <Text className='text-sm text-primary-dark font-mExtraLight'>{user?.email}</Text>
          </View>
        </View>

        <View className="flex-row mt-2 border-y border-primary-light">
          <TouchableOpacity className={`items-center flex-1 h-full p-3 ${myProfile ? 'bg-primary-light' : ''}`} onPress={() => { setMyProfile(true) }}>
            <Text className="text-lg font-mMedium">My Profile</Text>
          </TouchableOpacity>

          <View className="h-full border-r border-primary-light"></View>

          <TouchableOpacity className={`items-center flex-1 h-full p-3 ${myProfile ? '' : 'bg-primary-light'}`} onPress={() => { setMyProfile(false) }}>
            <Text className="text-lg font-mMedium">Granted by Me</Text>
          </TouchableOpacity>
        </View>

        {
          myProfile ? (
            <View className="flex-1">
              <ScrollView
                // className="mb-20"
                stickyHeaderHiddenOnScroll={true}
                showsVerticalScrollIndicator={false}
              >
                <View className="py-5 mx-5 mt-2 mb-10 border border-primary-light rounded-2xl">
                  {/* <View className="w-[70%] mx-auto mt-5 border-b border-primary-light"></View> */}

                  <Text className="pb-5 text-lg text-center border-b border-primary-light text-primary-dark font-mMedium">My Info</Text>

                  <View className="flex-row flex-wrap items-center justify-center py-2 mb-3 space-x-5 border-b border-primary-light">
                    <TouchableOpacity>
                      <Image className="w-7 h-7" source={icons.fb}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <Image className="w-7 h-7" source={icons.dc}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <Image className="w-7 h-7" source={icons.x}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <Image className="w-7 h-7" source={icons.tktk}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <Image className="w-7 h-7" source={icons.gm}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <Image className="w-7 h-7" source={icons.ig}></Image>
                    </TouchableOpacity>
                  </View>
                  <View className="flex-1 px-5">

                    <View className="flex-1 mx-2 mt-1 mb-3">
                      <Text className="text-sm text-primary font-mRegular">Full Name</Text>
                      <Text className="ml-5 text-2xl text-primary-dark font-mMedium">{user.fullName}</Text>
                    </View>

                    <View className="flex-row flex-1">
                      <View className="flex-1 mx-2 mt-1">
                        <Text className="text-sm text-primary font-mRegular">Username</Text>
                        <Text className="ml-5 text-lg text-primary-dark font-mMedium">{user.username}</Text>
                      </View>
                      <View className="flex-1 mx-2 mt-1">
                        <Text className="text-sm text-primary font-mRegular">Remaining Wishes</Text>
                        <Text className="ml-5 text-lg text-primary-dark font-mMedium">{user.remainingWishes}</Text>
                      </View>

                    </View>

                    <View className="flex-row flex-1">
                      <View className="flex-1 mx-2 mt-1">
                        <Text className="text-sm text-primary font-mRegular">Date Joined</Text>
                        <Text className="ml-5 text-lg text-primary-dark font-mMedium">{renderTime()}</Text>
                      </View>
                      <View className="flex-1 mx-2 mt-1">
                        <Text className="text-sm text-primary font-mRegular">Gender</Text>
                        <Text className="ml-5 text-lg text-primary-dark font-mMedium">{user.gender}</Text>
                      </View>
                    </View>

                    <View className="flex-row flex-1">
                      <View className="flex-1 mx-2 mt-1">
                        <Text className="text-sm text-primary font-mRegular">Birth Date</Text>
                        <Text className="ml-5 text-lg text-primary-dark font-mMedium">{user.birthDate}</Text>
                      </View>
                      <View className="flex-1 mx-2 mt-1">
                        <Text className="text-sm text-primary font-mRegular">Mobile</Text>
                        <Text className="ml-5 text-lg text-primary-dark font-mMedium">{user.contactNo}</Text>
                      </View>
                    </View>

                    <View className="flex-1 mx-2 mt-1">
                      <Text className="text-sm text-primary font-mRegular">Address</Text>
                      <Text className="ml-5 text-lg text-primary-dark font-mMedium">{user.address}</Text>
                    </View>
                  </View>
                </View>

                <View className="flex-1 mx-5 mb-10">
                  {
                    isProfileComplete ? (
                      <CustomBtn
                        title="Update my Profile"
                        // handlePress={saveWish}
                        containerStyles="w-full"
                        // isLoading={isSubmitting}
                        textStyles=""
                      >
                      </CustomBtn>
                    ) : (
                      <CustomBtn
                        title="Get Verified"
                        // handlePress={saveWish}
                        containerStyles="w-full"
                        // isLoading={isSubmitting}
                        textStyles=""
                      >
                        <Image className="w-8 h-8 ml-auto" source={icons.complete2}></Image>
                      </CustomBtn>
                    )
                  }
                </View>

                <View className="w-full border-b border-primary-light"></View>

                <View className="w-full px-5">
                  <NoGradientBtn
                    title="Reset Password"
                    handlePress={handleResetPass}
                    containerStyles="w-full my-5"
                    textStyles=""
                  >
                    <Image className="ml-auto w-7 h-7" source={icons.arrowRightMain}></Image>
                  </NoGradientBtn>
                </View>

                <TouchableOpacity className="relative flex-row items-center justify-center mx-5 mb-5 space-x-2 overflow-hidden rounded-full" onPress={handleLogout}>
                  <LinearGradient className="flex-row items-center justify-center w-full px-10 py-5" start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }} colors={['#670606', '#BB0808']}>
                    <Text className="text-lg text-white font-mMedium">Logout</Text>
                    <Image className="ml-auto w-7 h-7" source={icons.logout}></Image>
                  </LinearGradient>
                  {/* <BlurView intensity={65} tint='prominent' className="absolute h-full w-full -z-[9]"></BlurView> */}
                </TouchableOpacity>
              </ScrollView>
            </View>
          ) : (
            <View className="flex-1">
              {loading ? (
                <View className="items-center justify-center flex-1">
                  <Loading height="h-20"></Loading>
                </View>
              ) : (
                <WishListFeed wishes={wishes} profile={true}></WishListFeed>
              )}
            </View>
          )
        }


        <View className="w-full border-b border-primary-light"></View>

        {/* </View> */}
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

export default Profile