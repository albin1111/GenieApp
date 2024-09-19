import { ScrollView, Text, View, Image, Dimensions } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Redirect, router } from 'expo-router'
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from 'expo-linear-gradient';
import icons from "../../constants/icons";
import images from "../../constants/images";
import CustomBtn from "../../components/CustomBtn";
import NoGradientBtn from "../../components/NoGradientBtn";
import Animated, { FadeInDown } from "react-native-reanimated";

export default function Choose() {
  return (
    <>
      {/* <SafeAreaView> */}
      <SafeAreaView className="h-full">
        {/* <ScrollView> */}
        {/* <ScrollView contentContainerStyle={{ height: '100%' }}> */}
        {/* <View
            className="items-center w-full h-screen px-5"
            style={{
              minHeight: Dimensions.get("window").height - 100,
            }}
          > */}
        {/* <View className="items-center w-full h-full px-5"> */}
        <View className="items-center flex-1 h-screen px-5">

          <Animated.View
            className="w-full h-[10%] mt-10 relative"
            entering={FadeInDown.delay(500).springify()}
          >
            <Image
              source={icons.logoDark}
              className="w-full h-full"
              resizeMode="contain"
            ></Image>
          </Animated.View>

          <Animated.View
            className="relative flex-1 w-full"
            entering={FadeInDown.delay(700).springify()}
          >
            <Image
              source={images.genie1}
              className="w-full h-full"
              resizeMode="contain"
            ></Image>
          </Animated.View>

          <Animated.View
            entering={FadeInDown.delay(900).springify()}
            className="relative my-12">
            <View className="flex-row items-center justify-center">
              <Text className="text-base font-mRegular text-primary-dark">
                Welcome to {' '}
              </Text>
              <Image
                className="w-16 h-14"
                resizeMode="contain"
                source={icons.logoDark}
              ></Image>
              <Text className="text-lg font-mRegular text-primary-dark">
                ,
              </Text>
            </View>
            <Text className="text-base font-mRegular text-primary-dark">where wishes bloom into reality.</Text>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(1100).springify()} className="w-full">
            <CustomBtn
              title="Login"
              handlePress={() => router.push('/sign-in')}
              containerStyles="w-full"
              textStyles=""
            ></CustomBtn>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(1300).springify()} className="w-full">
            <NoGradientBtn
              title="Create an Account"
              handlePress={() => router.push('/sign-up')}
              containerStyles="w-full my-5"
              textStyles=""
            ></NoGradientBtn>
          </Animated.View>

        </View>
        {/* </ScrollView> */}
        <StatusBar backgroundColor="#F6F7F7" style="dark"></StatusBar>
      </SafeAreaView>
      <LinearGradient
        className="absolute w-full h-full -z-10"
        colors={['#F6F7F7', '#C1CEC5']}
        start={{ x: 0, y: 0 }} end={{ x: 0, y: 1.75 }}
      ></LinearGradient>
    </>
    // <View style={styles.container}>
    // <View className="items-center justify-center flex-1">
    //   <View className="items-center">
    //     <Text className="text-5xl">Hello Wodsrld</Text>
    //     <Text>This is the first page of your app.</Text>
    //     <Link href="/home" className="text-purple-600">Go to Home</Link>
    //   </View>
    // </View >
    // <Stack>
    //   <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    // </Stack>
  );
}