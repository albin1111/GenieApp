import { Text, View, Image, Alert, Pressable, Platform, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useRouter } from 'expo-router'
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from 'expo-linear-gradient';
import icons from "../../constants/icons";
import images from "../../constants/images";
import CustomBtn from "../../components/CustomBtn";
import FormField from "../../components/FormField";
import CustomKeybView from "../../components/CustomKeybView";
import { useState } from "react";
import { useRef } from "react";
import Loading from "../../components/Loading";
import { useAuth } from "../../context/authContext";

import Animated, { FadeInDown } from "react-native-reanimated";

// const auth = getAuth(app);

// export default funtion SignIn() {
//   // const [form, setForm] = useState({
//   //   email: "",
//   //   password: "",
//   // })

//   // const [isSubmitting, setIsSubmitting] = useState(false)

//   // const submit = async () => {
//   //   setIsSubmitting(true)

//   //   if (form.email === "" || form.password === "") {
//   //     setForm({
//   //       ...form,
//   //       error: "Please fill in all the fields.",
//   //     });
//   //     setIsSubmitting(false)
//   //     return;
//   //   }

//   //   try {
//   //     await signInWithEmailAndPassword(auth, form.email, form.password);
//   //     setIsSubmitting(false)
//   //     Alert.alert('success')
//   //   } catch (error) {
//   //     setForm({
//   //       ...form,
//   //       error: error.message,
//   //     });
//   //     setIsSubmitting(false)
//   //   }
//   // }

//   return (

//   )
// }

// export default SignIn

const ios = Platform.OS == 'ios';

export default function SignIn() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  // const [shouldResend, setShouldResend] = useState(false)
  const { login } = useAuth()
  const { resend } = useAuth()
  // const { isVerified } = useAuth()

  const emailRef = useRef("");
  const passwordRef = useRef("");

  const handleLogin = async () => {
    // if (isVerified) {
    if (!emailRef.current || !passwordRef.current) {
      Alert.alert('Error in Sign-In', 'Please fill in all the fields.')
      return;
    }

    setIsLoading(true)
    const response = await login(emailRef.current, passwordRef.current)
    setIsLoading(false)

    // console.log("login response: ", response);
    if (!response.success) {
      Alert.alert("Error in Sign-In", response.msg);
      // try to refresh screen
      // try to use usestate isntead of useref (try rin ng usetate sa pass only)
    } else if (response.msg == "Email is Not Verified.") {
      Alert.alert("Error in Sign-In", response.msg);
      // setShouldResend(true)
    }
    // else {
    //   Alert.alert("Error in Sign-In (Main) isverified statement", response.msg);
    // }
  }

  // const handleResend = async () => {
  //   const response = await resend()
  //   if (!response.success) {
  //     Alert.alert("Error in Sign-In (Resend Email Verification)", response.msg);
  //   }
  // }

  return (
    <>
      <SafeAreaView className="h-full">
        <CustomKeybView>
          <View className={`items-center flex-1 h-screen px-5 ${ios ? "" : "h-screen"}`}>

            <Image
              source={icons.logoDark}
              className="w-full h-[10%] mt-10 shrink"
              resizeMode="contain"
            ></Image>

            <View className="justify-center w-full my-10">
              <Text className="text-3xl text-center font-mRegular text-primary-dark">Welcome Back</Text>
              <Text className="text-sm text-center font-mRegular text-primary-dark">Log in to your account.</Text>
            </View>

            <View className="justify-between flex-1 w-full">
              <View className="w-full">
                <FormField
                  title="Email"
                  // value={form.email}
                  placeholder="Enter your Email"
                  // handleTextChange={(e) => setForm({ ...form, email: e })}
                  handleTextChange={value => emailRef.current = value}
                  addStyles=""
                  keyboardType="email-address"
                ></FormField>

                <FormField
                  title="Password"
                  // value={form.password}
                  placeholder="Enter your Password"
                  // handleTextChange={(e) => setForm({ ...form, password: e })}
                  handleTextChange={value => passwordRef.current = value}
                  addStyles="mt-7"
                ></FormField>

                <TouchableOpacity className="w-full px-5 my-2">
                  <Text className="ml-auto text-sm text-primary-dark font-mSemiBold">Forgot Password?</Text>
                </TouchableOpacity>

                {/* <TouchableOpacity onPress={handleResend} className="justify-center px-5 py-2 mt-5">
                  <Text className="mx-auto text-base text-center border-b font-mSemiBold text-primary-dark border-primary-dark" >Resend Email Verification</Text>
                </TouchableOpacity> */}
              </View>

              <View className="w-full">
                <View className={`flex-row items-center justify-center mb-3 space-x-2 mt-7 ${ios ? "hidden" : "inline"}`}>
                  <Text className="font-mRegular text-primary-dark">Don't have an account?</Text>
                  <TouchableOpacity onPress={() => router.replace('sign-up')}>
                    <Text className="text-sm font-mSemiBold text-primary-dark">Sign Up</Text>
                  </TouchableOpacity>
                </View>

                <View className={`items-center justify-center w-full h-20 ${ios ? "mb-3 mt-5" : "mb-5"}`}>
                  {
                    isLoading ? (
                      <View className="flex-1">
                        <Loading ></Loading>
                      </View>
                    ) : (
                      <CustomBtn
                        title="Login"
                        // handlePress={submit}
                        handlePress={handleLogin}
                        containerStyles="w-full"
                        // isLoading={isSubmitting}
                        textStyles=""
                      ></CustomBtn>
                    )
                  }
                </View>

                <View className={`flex-row items-center justify-center mb-3 space-x-2 ${ios ? "inline" : "hidden"}`}>
                  <Text className="font-mRegular text-primary-dark">Don't have an account?</Text>
                  <Pressable onPress={() => router.replace('sign-up')}>
                    <Text className="text-sm font-mSemiBold text-primary-dark">Sign Up</Text>
                  </Pressable>
                </View>
              </View>

            </View>

          </View>
          <StatusBar backgroundColor="#F6F7F7" style="dark"></StatusBar>
        </CustomKeybView>
      </SafeAreaView >
      <Image
        source={images.genie1}
        className="w-full h-[400] absolute -z-[1] -bottom-16 -left-16 opacity-40"
        resizeMode="contain"
      ></Image>
      <LinearGradient
        className="absolute w-full h-full -z-10"
        colors={['#F6F7F7', '#C1CEC5']}
        start={{ x: 0, y: 0 }} end={{ x: 0, y: 1.75 }}
      ></LinearGradient>
    </>
  );
}