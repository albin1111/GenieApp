import { View, Text, ActivityIndicator, Platform } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import icons from "../constants/icons";
import { Image } from 'react-native';
import Loading from '../components/Loading';
import Animated, { FadeInDown } from 'react-native-reanimated';

const ios = Platform.OS == 'ios';

export default function StartPage() {
  return (
    <>
      <View className="items-center justify-around flex-1">
        <Animated.Image
          entering={FadeInDown.delay(400).springify()}
          source={icons.logoDark}
          className="w-screen h-[15%] max-h-[90vw] shrink"
          resizeMode="contain"
        ></Animated.Image>
        {/* <ActivityIndicator size='large' color='#1E2D24' /> */}
        <Loading height="h-20"></Loading>
      </View>
      <LinearGradient
        className={`absolute w-full -z-10 ${ios ? "h-screen" : "h-full"}`}
        colors={['#F6F7F7', '#C1CEC5']}
        start={{ x: 0, y: 0 }} end={{ x: 0, y: 1.75 }}
      ></LinearGradient>
    </>
  );
}








// import { ScrollView, Text, View, Image } from "react-native";
// import { StatusBar } from "expo-status-bar";
// import { router } from 'expo-router'
// import { SafeAreaView } from "react-native-safe-area-context";
// import { LinearGradient } from 'expo-linear-gradient';
// import icons from "../constants/icons";
// import images from "../constants/images";
// import CustomBtn from "../components/CustomBtn";
// import NoGradientBtn from "../components/NoGradientBtn";
// import { useAuth } from "../context/authContext";

// const Welcome = () => {

//   // const { isAuthenticated } = useAuth();

//   // if (isAuthenticated) return (
//   //   <Redirect href="/home" />
//   // );

//   return (
//     <>
//       {/* <SafeAreaView> */}
//       <SafeAreaView className="h-full">
//         {/* <ScrollView> */}
//         <ScrollView contentContainerStyle={{ height: '100%' }}>
//           {/* <View
//             className="items-center w-full h-screen px-5"
//             style={{
//               minHeight: Dimensions.get("window").height - 100,
//             }}
//           > */}
//           <View className="items-center w-full h-full px-5">

//             <Image
//               source={icons.logoDark}
//               className="h-40 w-60"
//               resizeMode="contain"
//             ></Image>

//             <Image
//               source={images.genie1}
//               className="flex-1 w-full shrink h-fit"
//               resizeMode="contain"
//             ></Image>

//             <View className="relative my-12">
//               <View className="flex-row items-center justify-center">
//                 <Text className="text-base font-mRegular text-primary-dark">
//                   Welcome to {' '}
//                 </Text>
//                 <Image
//                   className="w-16 h-14"
//                   resizeMode="contain"
//                   source={icons.logoDark}
//                 ></Image>
//                 <Text className="text-lg font-mRegular text-primary-dark">
//                   ,
//                 </Text>
//               </View>
//               <Text className="text-base font-mRegular text-primary-dark">where wishes bloom into reality.</Text>
//             </View>

//             <CustomBtn
//               title="Login"
//               handlePress={() => router.push('/sign-in')}
//               containerStyles="w-full"
//               textStyles=""
//             ></CustomBtn>

//             <NoGradientBtn
//               title="Create an Account"
//               handlePress={() => router.push('/sign-up')}
//               containerStyles="w-full my-5"
//               textStyles=""
//             ></NoGradientBtn>

//           </View>
//         </ScrollView>
//         <StatusBar backgroundColor="#F6F7F7" style="dark"></StatusBar>
//       </SafeAreaView>
//       <LinearGradient
//         className="absolute w-full h-full -z-10"
//         colors={['#F6F7F7', '#C1CEC5']}
//         start={{ x: 0, y: 0 }} end={{ x: 0, y: 1.75 }}
//       ></LinearGradient>
//     </>
//     // <View style={styles.container}>
//     // <View className="items-center justify-center flex-1">
//     //   <View className="items-center">
//     //     <Text className="text-5xl">Hello Wodsrld</Text>
//     //     <Text>This is the first page of your app.</Text>
//     //     <Link href="/home" className="text-purple-600">Go to Home</Link>
//     //   </View>
//     // </View >
//     // <Stack>
//     //   <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
//     // </Stack>
//   );
// };

// export default Welcome;