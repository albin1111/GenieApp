import { View, Text, Button, Pressable, TouchableOpacity, Alert } from 'react-native'
import { Image } from 'expo-image';
import React, { useEffect, useRef, useState } from 'react'
import { useAuth } from '../../context/authContext'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../../components/Header'
import blurhash from "../../constants/blurhash"
import { StatusBar } from 'expo-status-bar'
import { LinearGradient } from 'expo-linear-gradient'
import icons from '../../constants/icons';
// import Svg, { Defs, RadialGradient, Stop, Rect } from 'react-native-svg';
import SmallBanner from '../../components/SmallBanner';
import images from '../../constants/images';
import FormField from '../../components/FormField';
import FormField2 from '../../components/FormField2';
import CustomBtn from '../../components/CustomBtn';
import CustomBtn2 from '../../components/CustomBtn2';
import CustomKeybView from '../../components/CustomKeybView';
import { getWishId } from '../../constants/common';
import { Timestamp, collection, doc, getDoc, getDocs, query, setDoc, updateDoc } from 'firebase/firestore';
import { db, storageFb } from '../../config/firebase';
import Loading from '../../components/Loading';
import NoGradientBtn from '../../components/NoGradientBtn';
import * as ImagePicker from 'expo-image-picker';
import { ref, uploadBytes, getDownloadURL, getBlob } from 'firebase/storage';
import * as FileSystem from 'expo-file-system';

const MakeWish = () => {

  const [isLoading, setisLoading] = useState(false)
  const wishName = useRef('')
  const wishDesc = useRef('')
  const inputRef = useRef(null)
  const inputRef2 = useRef(null)
  const [img, setImg] = useState()
  const [imgUri, setImgUri] = useState()

  // const { user } = useAuth()
  const { user } = useAuth()
  const [wishCount, setWishCount] = useState()
  const [isSuccessful, setisSuccessful] = useState(false)
  // console.log(wishCount);

  useEffect(() => {
    setWishCount(user?.remainingWishes)
    // console.log("++++++++++++++");
    // updateUserData(user?.userID)
  }, [])


  const docRef = doc(db, 'users', user?.userID);

  // useEffect(() => {
  //   createWishId()
  // }, [])

  const saveWish = async () => {
    setisLoading(true)
    if (wishName == '' || img == '') {
      Alert.alert("Failed", "Please fill in all the required fields.")
    } else {
      try {
        const querySnapshot = await getDocs(query(collection(db, "users")));

        let wishId = getWishId(user?.userID, wishName.current, user?.remainingWishes)
        await setDoc(doc(db, "wishes", wishId), {
          wishId: wishId,
          wishName: wishName.current,
          wishDesc: wishDesc.current,
          wishStatus: "Not Granted",
          wishPic: img,
          wisherName: user?.username,
          wisherID: user?.userID,
          dateUploaded: Timestamp.fromDate(new Date()),
          grantedBy: "",
        })

        // console.log(wishId);
        // uploadImage(imgUri, wishId);

        for (const doc of querySnapshot.docs) {
          if (doc.id === user?.userID) {
            if (doc.data().remainingWishes > 0) {
              // console.log(doc.data().remainingWishes, "=>from forebase");
              const docSnap = await getDoc(docRef);
              if (docSnap.exists()) {
                let n = doc.data().remainingWishes - 1
                await updateDoc(docRef, { remainingWishes: n })
                setWishCount(doc.data().remainingWishes - 1)
                setisSuccessful(true)
                if (inputRef) inputRef?.current?.clear()
                if (inputRef2) inputRef2?.current?.clear()
                setImg()
              }
            }
            else {
              // console.log("bawal na idok");
              Alert.alert("Failed", "You have no more wishes. :(")
            }
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
    setisLoading(false)
  }

  // useEffect(() => {
  if (isSuccessful) {

    // !!! does not work !!!
    // console.log("user1: ", user);
    // updateUserData(user?.userID)
    // console.log("user2: ", user);

    // Try redux

    // !!!!!!!

    const msg = "Your remaining wishes: "
    Alert.alert("You successfully made a wish!", msg + wishCount)
    setisSuccessful(false)
  }
  // }, [])

  const handleImgUpload = async () => {
    // const result = {}
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert('Sorry, we need camera roll permissions to make this work!');
      return;
    };

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      // aspect: [1, 1],
      quality: 1,
    });


    if (!result.canceled) {
      const uri = result;
      // console.log("result1: ", result.assets[0].uri);
      setImg(result.assets[0].uri)
      setImgUri(uri)
      // console.log("++++++");
      // console.log(uri);
      // console.log(imgUri);
      // console.log("++++++");
    }
  }

  // const uploadImage = async (uri, wishId) => {
  //   // console.log("before: ", uri);
  //   try {
  //     // const response = await fetch(uri);
  //     // console.log("response: ", response);
  //     // const blob = await response.blob();
  //     // console.log("blob: ", blob);

  //     // const blob = await getBlob(uri);
  //     // console.log(blob);

  //     // const blob = await uriToBlob(uri);
  //     // console.log("blob: ", blob);

  //     // const { tryUri } = await FileSystem.getInfoAsync(img)
  //     // const blob = new Promise((resolve, reject) => {
  //     //   const xhr = new XMLHttpRequest();
  //     //   xhr.onload = function () {
  //     //     resolve(xhr.response);
  //     //   };
  //     //   xhr.onerror = function () {
  //     //     reject(new Error('Failed to convert URI to Blob'));
  //     //   };
  //     //   xhr.responseType = 'blob';
  //     //   xhr.open('GET', tryUri, true);
  //     //   xhr.send(null);
  //     // });
  //     // console.log("++++++");
  //     // console.log("blob: ", blob);
  //     // console.log("++++++");

  //     const storageRef = ref(storageFb, 'wishes/' + wishId);
  //     // console.log("storageref: ", storageRef);
  //     const snapshot = await uploadBytes(storageRef, uri, { contentType: 'image/jpeg' });
  //     console.log("snapshot: ", snapshot);
  //     console.log("snapshot ref: ", snapshot.ref);
  //     const downloadURL = await getDownloadURL(snapshot.ref);
  //     console.log("++++++");
  //     console.log('NIGGA!', downloadURL);
  //     console.log("++++++");
  //     // console.log(downloadURL);;

  //     return new Promise((resolve, reject) => {
  //       const xhr = new XMLHttpRequest();
  //       xhr.onload = function () {
  //         resolve(xhr.response);
  //       };
  //       xhr.onerror = function () {
  //         reject(new Error('Failed to convert URI to Blob'));
  //       };
  //       xhr.responseType = 'blob';
  //       xhr.open('GET', uri, true);
  //       xhr.send(null);
  //     });

  //   } catch (error) {
  //     console.error('Error uploading image: ', error);
  //     // return error
  //   }
  // };

  // const uriToBlob = (uri) => {
  //   return new Promise((resolve, reject) => {
  //     const xhr = new XMLHttpRequest();
  //     xhr.onload = function () {
  //       resolve(xhr.response);
  //     };
  //     xhr.onerror = function () {
  //       reject(new Error('Failed to convert URI to Blob'));
  //     };
  //     xhr.responseType = 'blob';
  //     xhr.open('GET', uri, true);
  //     xhr.send(null);
  //   });
  // };

  return (
    <>
      <View className="flex-1 mb-20">
        <CustomKeybView>
          <View className="h-screen">

            <View className="h-[15vh] space-x-5 flex-row mx-5">
              <View className="relative items-center justify-center flex-1 max-w-[40%]">

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

            <View className="flex-1 m-5">
              <View className="flex-row items-start justify-center mt-3 mb-1">
                <Text className="text-2xl font-mLight text-primary-dark">I</Text>
                <Text className="text-4xl font-whisper text-primary-dark"> Wish </Text>
                <Text className="text-2xl font-mLight text-primary-dark">to have...</Text>
              </View>

              <View className="flex-1 mx-5">
                <FormField2
                  title="Wish Name"
                  // value={form.password}
                  height='h-16 rounded-full'
                  rounded="rounded-full"
                  placeholder="Wish Name"
                  // handleTextChange={(e) => setForm({ ...form, password: e })}
                  handleTextChange={value => wishName.current = value}
                  addStyles=""
                  textAlign="center"
                  ref2={inputRef2}
                ></FormField2>

                <FormField2
                  title="Wish Description"
                  // value={form.password}
                  height='flex-1 rounded-3xl'
                  rounded="rounded-3xl"
                  placeholder="Description"
                  // handleTextChange={(e) => setForm({ ...form, password: e })}
                  handleTextChange={value => wishDesc.current = value}
                  addStyles="mt-5 flex-1"
                  // inputStyle="my-5"
                  multiline={true}
                  textAlign="center"
                  ref2={inputRef}
                ></FormField2>

                {img && (
                  <View className="flex-1 w-full mt-5 overflow-hidden rounded-2xl">
                    <Image contentFit='cover' className="flex-1" source={{ uri: img }}></Image>
                  </View>
                )}

                <NoGradientBtn
                  title="Upload Image"
                  // handlePress={submit}
                  handlePress={handleImgUpload}
                  containerStyles="w-full mt-5"
                  // isLoading={isSubmitting}
                  textStyles=""
                ></NoGradientBtn>

                <View className="items-center justify-center w-full">
                  {isLoading ? (
                    <View className="">
                      <Loading ></Loading>
                    </View>
                  ) : (
                    <CustomBtn
                      title="Post my Wish!"
                      handlePress={saveWish}
                      containerStyles="w-full mt-5 "
                      // isLoading={isSubmitting}
                      textStyles=""
                    >
                      <Image className="ml-auto h-7 w-7" source={icons.makeWishActive}></Image>
                    </CustomBtn>
                  )}
                </View>
              </View>
            </View>

          </View>
        </CustomKeybView>
      </View>
      <StatusBar backgroundColor="#F6F7F7" style="dark"></StatusBar>
      {/* </SafeAreaView> */}
      <LinearGradient
        className="absolute w-full h-full -z-10"
        colors={['#F6F7F7', '#C1CEC5']}
        start={{ x: 0, y: 0 }} end={{ x: 0, y: 1.75 }}
      ></LinearGradient>
      <Image
        source={images.genie3}
        className="w-full h-[30vh] absolute -z-[9] bottom-[26px] -left-[15%] opacity-50 -rotate-12"
        contentFit="contain"
      ></Image>
    </>
  )
}

export default MakeWish