import { ScrollView, Text, View, Image, Dimensions, Alert, Pressable, Platform } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Link, Redirect, router, useRouter } from 'expo-router'
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from 'expo-linear-gradient';
import icons from "../../constants/icons";
import images from "../../constants/images";
import CustomBtn from "../../components/CustomBtn";
import FormField from "../../components/FormField";
import CustomKeybView from "../../components/CustomKeybView";
import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import app from "../../config/firebase";
import { useRef } from "react";
import Loading from "../../components/Loading";
import LottieView from "lottie-react-native";
import { useAuth } from "../../context/authContext";

const ios = Platform.OS == 'ios';

export default function SignIn() {
  const router = useRouter();
  const { register } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const emailRef = useRef("");
  const passwordRef = useRef("");
  const usernameRef = useRef("");

  const handleRegister = async () => {
    if (!emailRef.current || !passwordRef.current || !usernameRef.current) {
      Alert.alert('Error in Sign-Up', 'Please fill in all the fields.')
      return;
    }

    setIsLoading(true)

    let response = await register(emailRef.current, passwordRef.current, usernameRef.current)
    setIsLoading(false)

    router.replace('sign-in')
    // console.log("result of register", response);
    if (!response.success) {
      Alert.alert("Error in Sign-Up", response.msg);
    }
  }

  return (
    <>
      <SafeAreaView className="h-full">
        <CustomKeybView>
          <View className={`items-center flex-1 px-5 ${ios ? "" : "h-screen"}`}>

            <Image
              source={icons.logoDark}
              className="w-full h-[10%] mt-10 shrink"
              resizeMode="contain"
            ></Image>

            <View className="justify-center w-full my-10">
              <Text className="text-3xl text-center font-mRegular text-primary-dark">Hello, New User</Text>
              <Text className="text-sm text-center font-mRegular text-primary-dark">Create a new account.</Text>
            </View>

            <View className="justify-between flex-1 w-full">
              <View className="w-full">

                <FormField
                  title="Username"
                  // value={form.email}
                  placeholder="Enter your Username"
                  // handleTextChange={(e) => setForm({ ...form, email: e })}
                  handleTextChange={value => usernameRef.current = value}
                  addStyles=""
                ></FormField>

                <FormField
                  title="Email"
                  // value={form.email}
                  placeholder="Enter your Email"
                  // handleTextChange={(e) => setForm({ ...form, email: e })}
                  handleTextChange={value => emailRef.current = value}
                  addStyles="mt-7"
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
              </View>

              <View className="w-full">
                <View className={`flex-row items-center justify-center mb-3 space-x-2 mt-7 ${ios ? "hidden" : "inline"}`}>
                  <Text className="font-mRegular text-primary-dark">Already have an account?</Text>
                  <Pressable onPress={() => router.push('sign-in')}>
                    <Text className="text-sm font-mSemiBold text-primary-dark">Sign In</Text>
                  </Pressable>
                </View>

                <View className={`items-center justify-center w-full h-20 ${ios ? "mb-3 mt-5" : "mb-5"}`}>
                  {
                    isLoading ? (
                      <View className="flex-1">
                        <Loading ></Loading>
                      </View>
                    ) : (
                      <CustomBtn
                        title="Create Account"
                        // handlePress={submit}
                        handlePress={handleRegister}
                        containerStyles="w-full"
                        // isLoading={isSubmitting}
                        textStyles=""
                      ></CustomBtn>
                    )
                  }
                </View>

                <View className={`flex-row items-center justify-center mb-3 space-x-2 ${ios ? "inilne" : "hidden"}`}>
                  <Text className="font-mRegular text-primary-dark">Already have an account?</Text>
                  <Pressable onPress={() => router.replace('sign-in')}>
                    <Text className="text-sm font-mSemiBold text-primary-dark">Sign In</Text>
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







// import { ScrollView, Text, View, Image, Dimensions } from "react-native";
// import { StatusBar } from "expo-status-bar";
// import { Link, Redirect, router } from 'expo-router'
// import { SafeAreaView } from "react-native-safe-area-context";
// import { LinearGradient } from 'expo-linear-gradient';
// import icons from "../../constants/icons";
// import images from "../../constants/images";
// import CustomBtn from "../../components/CustomBtn";
// import FormField from "../../components/FormField";
// import { useState } from "react";
// import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// import app from "../../config/firebase";

// const auth = getAuth(app);

// const SignUp = () => {
//   const [form, setForm] = useState({
//     username: '',
//     email: '',
//     password: '',
//   })

//   const [isSubmitting, setIsSubmitting] = useState(false)

//   const submit = async () => {
//     setIsSubmitting(true)

//     if (form.email === "" || form.password === "") {
//       setForm({
//         ...form,
//         error: "Please fill in all the fields.",
//       });
//       setIsSubmitting(false)
//       return;
//     }

//     try {
//       await createUserWithEmailAndPassword(auth, form.email, form.password);
//       setIsSubmitting(false)
//       navigation.navigate('Sign In');
//     } catch (error) {
//       setForm({
//         ...form,
//         error: error.message,
//       })
//       setIsSubmitting(false)
//     }
//   }

//   return (
//     <>
//       <SafeAreaView>
//         {/* <SafeAreaView className="h-full"> */}
//         <ScrollView>
//           {/* <ScrollView contentContainerStyle={{ height: '100%' }}> */}
//           {/* <View
//             className="items-center w-full h-screen px-5"
//             style={{
//               minHeight: Dimensions.get("window").height - 100,
//             }}
//           > */}
//           <View className="items-center w-full h-screen px-5">

//             <Image
//               source={icons.logoDark}
//               className="w-40 h-20"
//               resizeMode="contain"
//             ></Image>

//             <Image
//               source={images.genie1}
//               className="w-full h-[400] absolute -z-[1] -bottom-16 -left-16 opacity-40"
//               resizeMode="contain"
//             ></Image>

//             <View className="justify-center w-full my-10">
//               <Text className="text-3xl text-center font-mRegular text-primary-dark">Hello, New User</Text>
//               <Text className="text-sm text-center font-mRegular text-primary-dark">Create a new account.</Text>
//             </View>

//             <View className="w-full">
//               <FormField
//                 title="Username"
//                 value={form.username}
//                 placeholder="Enter your Username"
//                 handleTextChange={(e) => setForm({ ...form, username: e })}
//                 addStyles=""
//               ></FormField>

//               <FormField
//                 title="Email"
//                 value={form.email}
//                 placeholder="Enter your Email"
//                 handleTextChange={(e) => setForm({ ...form, email: e })}
//                 addStyles="mt-7"
//                 keyboardType="email-address"
//               ></FormField>

//               <FormField
//                 title="Password"
//                 value={form.password}
//                 placeholder="Enter your Password"
//                 handleTextChange={(e) => setForm({ ...form, password: e })}
//                 addStyles="mt-7"
//               ></FormField>
//             </View>

//             <View className="flex-row items-center justify-center mt-auto space-x-2">
//               <Text className="font-mRegular text-primary-dark">Already have an account?</Text>
//               <Link href={'/sign-in'} className="text-base font-mSemiBold text-primary-dark">Sign In</Link>
//             </View>

//             <CustomBtn
//               title="Create Account"
//               handlePress={submit}
//               containerStyles="w-full my-5"
//               isLoading={isSubmitting}
//               textStyles=""
//             ></CustomBtn>

//           </View>
//         </ScrollView>
//         <StatusBar backgroundColor="#F6F7F7" style="dark"></StatusBar>
//       </SafeAreaView >
//       <LinearGradient
//         className="absolute w-full h-full -z-10"
//         colors={['#F6F7F7', '#C1CEC5']}
//         start={{ x: 0, y: 0 }} end={{ x: 0, y: 1.75 }}
//       ></LinearGradient>
//     </>
//   )
// }

// export default SignUp