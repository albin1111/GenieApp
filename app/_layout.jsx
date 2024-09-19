// import React, { useEffect } from 'react';

// import { useFonts } from 'expo-font';
// import { SplashScreen, Stack } from 'expo-router';
// import { AuthContextProvider } from '../context/authContext';

// SplashScreen.preventAutoHideAsync();

// const RootLayout = () => {

//   const [fontsLoaded, error] = useFonts({
//     "Montserrat-Black": require("../assets/fonts/Montserrat/static/Montserrat-Black.ttf"),
//     "Montserrat-BlackItalic": require("../assets/fonts/Montserrat/static/Montserrat-BlackItalic.ttf"),
//     "Montserrat-Bold": require("../assets/fonts/Montserrat/static/Montserrat-Bold.ttf"),
//     "Montserrat-BoldItalic": require("../assets/fonts/Montserrat/static/Montserrat-BoldItalic.ttf"),
//     "Montserrat-ExtraBold": require("../assets/fonts/Montserrat/static/Montserrat-ExtraBold.ttf"),
//     "Montserrat-ExtraBoldItalic": require("../assets/fonts/Montserrat/static/Montserrat-ExtraBoldItalic.ttf"),
//     "Montserrat-ExtraLight": require("../assets/fonts/Montserrat/static/Montserrat-ExtraLight.ttf"),
//     "Montserrat-ExtraLightItalic": require("../assets/fonts/Montserrat/static/Montserrat-ExtraLightItalic.ttf"),
//     "Montserrat-Italic": require("../assets/fonts/Montserrat/static/Montserrat-Italic.ttf"),
//     "Montserrat-Light": require("../assets/fonts/Montserrat/static/Montserrat-Light.ttf"),
//     "Montserrat-LightItalic": require("../assets/fonts/Montserrat/static/Montserrat-LightItalic.ttf"),
//     "Montserrat-Medium": require("../assets/fonts/Montserrat/static/Montserrat-Medium.ttf"),
//     "Montserrat-MediumItalic": require("../assets/fonts/Montserrat/static/Montserrat-MediumItalic.ttf"),
//     "Montserrat-Regular": require("../assets/fonts/Montserrat/static/Montserrat-Regular.ttf"),
//     "Montserrat-SemiBold": require("../assets/fonts/Montserrat/static/Montserrat-SemiBold.ttf"),
//     "Montserrat-SemiBoldItalic": require("../assets/fonts/Montserrat/static/Montserrat-SemiBoldItalic.ttf"),
//     "Montserrat-Thin": require("../assets/fonts/Montserrat/static/Montserrat-Thin.ttf"),
//     "Montserrat-ThinItalic": require("../assets/fonts/Montserrat/static/Montserrat-ThinItalic.ttf"),

//     "Whisper": require("../assets/fonts/Whisper/Whisper-Regular.ttf"),
//   })

//   useEffect(() => {
//     if (error) throw error;

//     if (fontsLoaded) {
//       SplashScreen.hideAsync();
//     }
//   }, [fontsLoaded, error]);

//   if (!fontsLoaded) {
//     return null;
//   }

//   if (!fontsLoaded && !error) {
//     return null;
//   }

//   return (
//     <AuthContextProvider>
//       <Stack>
//         <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
//         <Stack.Screen name="(auth)" options={{ headerShown: false }} />
//         <Stack.Screen name="index" options={{ headerShown: false }} />
//         {/* <Stack.Screen name="search/[query]" options={{ headerShown: false }} /> */}
//       </Stack>
//     </AuthContextProvider>
//   );
// };

// export default RootLayout;







import { Text, View, ActivityIndicator, SafeAreaView } from 'react-native';
import React, { useEffect, useState } from 'react';

import { useFonts } from 'expo-font';
import { SplashScreen, useRouter, useSegments, Slot } from 'expo-router';
import { AuthContextProvider, useAuth } from '../context/authContext';
import { fontScale } from 'nativewind';

// SplashScreen.preventAutoHideAsync();

const MainLayout = () => {
  const { isAuthenticated } = useAuth();
  const { isVerified } = useAuth();
  const { user } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  const [fontsLoaded, error] = useFonts({
    "Montserrat-Black": require("../assets/fonts/Montserrat/static/Montserrat-Black.ttf"),
    "Montserrat-BlackItalic": require("../assets/fonts/Montserrat/static/Montserrat-BlackItalic.ttf"),
    "Montserrat-Bold": require("../assets/fonts/Montserrat/static/Montserrat-Bold.ttf"),
    "Montserrat-BoldItalic": require("../assets/fonts/Montserrat/static/Montserrat-BoldItalic.ttf"),
    "Montserrat-ExtraBold": require("../assets/fonts/Montserrat/static/Montserrat-ExtraBold.ttf"),
    "Montserrat-ExtraBoldItalic": require("../assets/fonts/Montserrat/static/Montserrat-ExtraBoldItalic.ttf"),
    "Montserrat-ExtraLight": require("../assets/fonts/Montserrat/static/Montserrat-ExtraLight.ttf"),
    "Montserrat-ExtraLightItalic": require("../assets/fonts/Montserrat/static/Montserrat-ExtraLightItalic.ttf"),
    "Montserrat-Italic": require("../assets/fonts/Montserrat/static/Montserrat-Italic.ttf"),
    "Montserrat-Light": require("../assets/fonts/Montserrat/static/Montserrat-Light.ttf"),
    "Montserrat-LightItalic": require("../assets/fonts/Montserrat/static/Montserrat-LightItalic.ttf"),
    "Montserrat-Medium": require("../assets/fonts/Montserrat/static/Montserrat-Medium.ttf"),
    "Montserrat-MediumItalic": require("../assets/fonts/Montserrat/static/Montserrat-MediumItalic.ttf"),
    "Montserrat-Regular": require("../assets/fonts/Montserrat/static/Montserrat-Regular.ttf"),
    "Montserrat-SemiBold": require("../assets/fonts/Montserrat/static/Montserrat-SemiBold.ttf"),
    "Montserrat-SemiBoldItalic": require("../assets/fonts/Montserrat/static/Montserrat-SemiBoldItalic.ttf"),
    "Montserrat-Thin": require("../assets/fonts/Montserrat/static/Montserrat-Thin.ttf"),
    "Montserrat-ThinItalic": require("../assets/fonts/Montserrat/static/Montserrat-ThinItalic.ttf"),

    "Whisper": require("../assets/fonts/Whisper/Whisper-Regular.ttf"),
  });

  // console.log("1", fontsLoaded);

  // TODO: paste useeffect from gpt
  // useEffect(() => {
  //   if (!fontsLoaded) {
  //     console.log("Fonts not loaded yet");
  //     return;
  //   }

  //   console.log("Fonts loaded:", fontsLoaded);

  //   if (error) {
  //     console.log("Fonts error:", error);
  //     return;
  //   }

  //   if (typeof isAuthenticated == 'undefined') {
  //     console.log("Auth state undefined");
  //     return;
  //   }

  //   console.log("Auth state:", isAuthenticated);

  //   const inApp = segments[0] == '(tabs)';
  //   console.log("In App:", inApp);

  //   if (isAuthenticated && !inApp) {
  //     console.log("Navigating to home");
  //     router.replace('home');
  //   } else if (!isAuthenticated) {
  //     console.log("Navigating to choose");
  //     router.replace('choose');
  //   }
  // }, [isAuthenticated, fontsLoaded, error, segments]);

  useEffect(() => {
    // if (fontsLoaded) SplashScreen.hideAsync();
    if (!fontsLoaded) return

    if (error) {
      console.log("Fonts error:", error);
      return;
    }

    // _retrieveData = async () => {
    //   try {
    //     const value = await AsyncStorage.getItem('TASKS');
    //     if (value !== null) {
    //       // We have data!!
    //       console.log(value);
    //     }
    //   } catch (error) {
    //     console.log("async error _layout:", error);
    //     return;
    //   }
    // };

    // console.log(fontsLoaded);

    // console.log("layout user: ", user);

    if (typeof isAuthenticated == 'undefined') return
    // console.log("layout authed: ", isAuthenticated);

    const inApp = segments[0] == '(tabs)';
    // console.log('inapp: ', inApp);
    // console.log('inapp: ', segments);

    if (isAuthenticated && !inApp && isVerified) {
      // if (isAuthenticated && !inApp) {
      router.replace('home');
      // console.log("_layout emailVerified: ", isVerified);
    }
    else if (!isAuthenticated) {
      router.replace('choose');
    }
    else if (!isVerified && !isAuthenticated) {
      router.replace('sign-in');
    }
  }, [isAuthenticated, isVerified, fontsLoaded, error])


  // if (fontsLoaded) {
  // }

  return <Slot />;
}

export default function RootLayout() {
  return (
    <AuthContextProvider>
      {/* <SafeAreaView className="flex-1"> */}
      <MainLayout />
      {/* </SafeAreaView> */}
    </AuthContextProvider>
  );
}








// import { Text, View } from 'react-native'
// import React, { useEffect } from 'react'

// import { useFonts } from 'expo-font'
// import { Slot, SplashScreen, useRouter, useSegments } from 'expo-router'
// import { AuthContextProvider, useAuth } from "../context/authContext";
// // import App from '.';

// import { ActivityIndicator } from 'react-native';
// // import { LinearGradient } from 'expo-linear-gradient';

// SplashScreen.preventAutoHideAsync();

// const MainLayout = () => {

//   const { isAuthenticated } = useAuth();
//   const segments = useSegments();
//   const router = useRouter();

//   const [fontsLoaded, error] = useFonts({
//     "Montserrat-Black": require("../assets/fonts/Montserrat/static/Montserrat-Black.ttf"),
//     "Montserrat-BlackItalic": require("../assets/fonts/Montserrat/static/Montserrat-BlackItalic.ttf"),
//     "Montserrat-Bold": require("../assets/fonts/Montserrat/static/Montserrat-Bold.ttf"),
//     "Montserrat-BoldItalic": require("../assets/fonts/Montserrat/static/Montserrat-BoldItalic.ttf"),
//     "Montserrat-ExtraBold": require("../assets/fonts/Montserrat/static/Montserrat-ExtraBold.ttf"),
//     "Montserrat-ExtraBoldItalic": require("../assets/fonts/Montserrat/static/Montserrat-ExtraBoldItalic.ttf"),
//     "Montserrat-ExtraLight": require("../assets/fonts/Montserrat/static/Montserrat-ExtraLight.ttf"),
//     "Montserrat-ExtraLightItalic": require("../assets/fonts/Montserrat/static/Montserrat-ExtraLightItalic.ttf"),
//     "Montserrat-Italic": require("../assets/fonts/Montserrat/static/Montserrat-Italic.ttf"),
//     "Montserrat-Light": require("../assets/fonts/Montserrat/static/Montserrat-Light.ttf"),
//     "Montserrat-LightItalic": require("../assets/fonts/Montserrat/static/Montserrat-LightItalic.ttf"),
//     "Montserrat-Medium": require("../assets/fonts/Montserrat/static/Montserrat-Medium.ttf"),
//     "Montserrat-MediumItalic": require("../assets/fonts/Montserrat/static/Montserrat-MediumItalic.ttf"),
//     "Montserrat-Regular": require("../assets/fonts/Montserrat/static/Montserrat-Regular.ttf"),
//     "Montserrat-SemiBold": require("../assets/fonts/Montserrat/static/Montserrat-SemiBold.ttf"),
//     "Montserrat-SemiBoldItalic": require("../assets/fonts/Montserrat/static/Montserrat-SemiBoldItalic.ttf"),
//     "Montserrat-Thin": require("../assets/fonts/Montserrat/static/Montserrat-Thin.ttf"),
//     "Montserrat-ThinItalic": require("../assets/fonts/Montserrat/static/Montserrat-ThinItalic.ttf"),

//     "Whisper": require("../assets/fonts/Whisper/Whisper-Regular.ttf"),
//   })

//   useEffect(() => {
//     if (error) throw error;


//     if (!fontsLoaded && !error) {
//       return (
//         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//           <ActivityIndicator size="large" color="#1E2D24" />
//         </View>
//       );
//     }

//     if (error) {
//       return (
//         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//           <Text>Error loading fonts: {error.message}</Text>
//         </View>
//       );
//     }

//     // if (fontsLoaded) SplashScreen.hideAsync();
//   }, [fontsLoaded, error]);

//   // if (!fontsLoaded && !error) return null;

//   // if (!fontsLoaded && !error) {
//   //   return (
//   //     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//   //       <ActivityIndicator size="large" color="#1E2D24" />
//   //       {/* <LinearGradient
//   //         className="absolute w-full h-full -z-10"
//   //         colors={['#F6F7F7', '#C1CEC5']}
//   //         start={{ x: 0, y: 0 }} end={{ x: 0, y: 1.75 }}
//   //       ></LinearGradient> */}
//   //     </View>
//   //   );
//   // }

//   useEffect(() => {
//     if (typeof isAuthenticated == 'undefined') return;

//     const inApp = segments[0] == '(tabs)';

//     if (isAuthenticated && !inApp) {
//       router.replace('home');
//     } else if (isAuthenticated == false) {
//       router.replace('choose');
//     }

//   }, [fontsLoaded, isAuthenticated])

//   // if (!fontsLoaded && !error) {
//   //   return (
//   //     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//   //       <ActivityIndicator size="large" color="#1E2D24" />
//   //     </View>
//   //   );
//   // }

//   // if (error) {
//   //   return (
//   //     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//   //       <Text>Error loading fonts: {error.message}</Text>
//   //     </View>
//   //   );
//   // }

//   return <Slot />;
// }
// //   const { user } = useAuth();

// //   const screenName = user ? "(tabs)" : "index";

// //   const [fontsLoaded, error] = useFonts({
// //     "Montserrat-Black": require("../assets/fonts/Montserrat/static/Montserrat-Black.ttf"),
// //     "Montserrat-BlackItalic": require("../assets/fonts/Montserrat/static/Montserrat-BlackItalic.ttf"),
// //     "Montserrat-Bold": require("../assets/fonts/Montserrat/static/Montserrat-Bold.ttf"),
// //     "Montserrat-BoldItalic": require("../assets/fonts/Montserrat/static/Montserrat-BoldItalic.ttf"),
// //     "Montserrat-ExtraBold": require("../assets/fonts/Montserrat/static/Montserrat-ExtraBold.ttf"),
// //     "Montserrat-ExtraBoldItalic": require("../assets/fonts/Montserrat/static/Montserrat-ExtraBoldItalic.ttf"),
// //     "Montserrat-ExtraLight": require("../assets/fonts/Montserrat/static/Montserrat-ExtraLight.ttf"),
// //     "Montserrat-ExtraLightItalic": require("../assets/fonts/Montserrat/static/Montserrat-ExtraLightItalic.ttf"),
// //     "Montserrat-Italic": require("../assets/fonts/Montserrat/static/Montserrat-Italic.ttf"),
// //     "Montserrat-Light": require("../assets/fonts/Montserrat/static/Montserrat-Light.ttf"),
// //     "Montserrat-LightItalic": require("../assets/fonts/Montserrat/static/Montserrat-LightItalic.ttf"),
// //     "Montserrat-Medium": require("../assets/fonts/Montserrat/static/Montserrat-Medium.ttf"),
// //     "Montserrat-MediumItalic": require("../assets/fonts/Montserrat/static/Montserrat-MediumItalic.ttf"),
// //     "Montserrat-Regular": require("../assets/fonts/Montserrat/static/Montserrat-Regular.ttf"),
// //     "Montserrat-SemiBold": require("../assets/fonts/Montserrat/static/Montserrat-SemiBold.ttf"),
// //     "Montserrat-SemiBoldItalic": require("../assets/fonts/Montserrat/static/Montserrat-SemiBoldItalic.ttf"),
// //     "Montserrat-Thin": require("../assets/fonts/Montserrat/static/Montserrat-Thin.ttf"),
// //     "Montserrat-ThinItalic": require("../assets/fonts/Montserrat/static/Montserrat-ThinItalic.ttf"),

// //     "Whisper": require("../assets/fonts/Whisper/Whisper-Regular.ttf"),
// //   })

// //   useEffect(() => {
// //     if (error) throw error;

// //     if (fontsLoaded) SplashScreen.hideAsync();
// //   }, [fontsLoaded, error])

// //   if (!fontsLoaded && !error) return null;

// //   return (
// //     <Stack screenOptions={{ headerShown: false }}>
// //       <Stack.Screen name={screenName} options={{ headerShown: false }} />
// //     </Stack>
// //     // <Stack>
// //     //   <Stack.Screen name="index" options={{ headerShown: false }} />
// //     // </Stack>
// //     // <App></App>
// //   )
// // }

// export default function RootLayout() {

//   return (
//     <AuthContextProvider>
//       <MainLayout />
//     </AuthContextProvider>
//   )
// }