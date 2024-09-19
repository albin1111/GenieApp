import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db, usersRef } from "../config/firebase";
import { Timestamp, collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";
import { firebase } from "@react-native-firebase/auth";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// const tryAuth = getAuth()

export const AuthContext = createContext();

const actionCodeSettings = {
  url: 'https://genieapp-8bf5d.firebaseapp.com',
  handleCodeInApp: true,
  // iOS: {
  //   bundleId: 'com.genie.app'
  // },
  // android: {
  //   packageName: 'com.genie.app',
  //   installApp: true,
  //   minimumVersion: '12'
  // },
  // dynamicLinkDomain: 'com.genie.app'
}

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(undefined);
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    // signOut(auth)

    const unsub = onAuthStateChanged(auth, (user) => {
      // console.log("__________");
      // console.log("got user: ", user)
      // console.log("__________");

      if (user) {
        setIsAuthenticated(true)
        setUser(user)
        updateUserData(user.uid)
        if (user.emailVerified == true) {
          setIsVerified(true)
        } else setIsVerified(false)
      }
      else {
        setIsAuthenticated(false)
        setUser(null)
        setIsVerified(false)
      }
    });
    return unsub
  }, [])

  const updateUserData = async (userID) => {
    const docRef = doc(db, 'users', userID);
    // console.log("updateuserdata: ", docRef); 
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      let data = docSnap.data();
      setUser({
        ...user,
        username: data.username,
        userID: data.userID,
        email: data.email,
        address: data.address,
        contactNo: data.contactNo,
        fullName: data.fullName,
        profilePic: data.profilePic,
        emailVerified: data.emailVerified,
        remainingWishes: data.remainingWishes,
        profileComplete: data.profileComplete,
        createdAt: data.createdAt,
        gender: data.gender,
      })
    }
  }

  const login = async (email, password) => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);

      // console.log("+++++++++++++++");
      // console.log("login response: ", response);
      // console.log("+++++++++++++++");

      const docRef = doc(db, 'users', auth.currentUser.uid);
      const querySnapshot = await getDocs(query(collection(db, "users")));

      for (const doc of querySnapshot.docs) {
        if (doc.id === auth.currentUser.uid) {

          if (doc.data().emailVerified && auth.currentUser.emailVerified) {
            setIsVerified(true);
            // console.log("Verified: ", doc.data().emailVerified, "+", auth.currentUser.emailVerified, "+", isVerified);
            return { success: true };

          } else if (!doc.data().emailVerified && auth.currentUser.emailVerified) {
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
              await updateDoc(docRef, { emailVerified: true });
              setIsVerified(true);
              // console.log("Data updated: ", doc.data().emailVerified, "+", auth.currentUser.emailVerified, "+", isVerified);
              return { success: true };

            } else {
              setIsVerified(false);
              return { success: false, msg: "Email Not Verified." };
            }

          } else if (!doc.data().emailVerified && !auth.currentUser.emailVerified) {
            setIsVerified(false);
            // console.log("Not verified: ", doc.data().emailVerified, "+", auth.currentUser.emailVerified, "+", isVerified);
            return { success: false, msg: "Email Not Verified." };

          } else {
            setIsVerified(false);
            return { success: false };
          }
        }
      }

      setIsVerified(false);
      return { success: false, msg: "Email Does Not Exist." };

    } catch (e) {
      let msg = e.message;
      if (msg.includes('(auth/invalid-email)')) msg = 'Invalid Email.';
      if (msg.includes('(auth/invalid-credential)')) msg = 'Wrong Credentials.';
      return { success: false, msg };
    }
  };

  const logout = async () => {
    // console.log(auth.currentUser);
    try {
      await signOut(auth);
      return { success: true }
    } catch (e) {
      console.log(e);
      return { success: false, msg: e.message, error: e }
    }
  }

  const resend = async () => {
    try {
      const sendEmailResponse = await sendEmailVerification(auth.currentUser, actionCodeSettings).then(() => {
        Alert.alert("Email Verification Sent.", "Please check your email.")
      }).catch((error) => {
        Alert.alert("Error in Sign-Up (Send Verfication).", error.message)
        console.log(error.message);
      })
      return { success: true }
    } catch (e) {
      let msg = e.message;
      if (msg.includes("Cannot read property 'getIdToken' of null")) msg = 'Cannot Find Email.';
      return { success: false, msg };
    }
  }

  const register = async (email, password, username) => {

    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);

      const sendEmailResponse = await sendEmailVerification(auth.currentUser, actionCodeSettings).then(() => {
        Alert.alert("Email Verification Sent.", "Please verify your email first before logging in.")
      }).catch((error) => {
        Alert.alert("Error in Sign-Up (Send Verfication).", error.message)
        console.log(error.message);
      })
      // console.log("response.user: ", response?.user)

      // setUser(response?.user)
      // setIsAuthenticated(true)

      await setDoc(doc(db, "users", response?.user?.uid), {
        username,
        profilePic: "N/A",
        email: email,
        address: "N/A",
        fullName: "N/A",
        contactNo: "N/A",
        profileComplete: false,
        emailVerified: false,
        gender: 'N/A',
        birthDate: 'N/A',
        // socialLinks: "",
        // wishesList: "",
        remainingWishes: 3,
        userID: response?.user?.uid,
        createdAt: Timestamp.fromDate(new Date())
      });
      return { success: true, data: response?.user };
    } catch (e) {
      let msg = e.message;
      if (msg.includes('(auth/invalid-email)')) msg = 'Invalid Email.';
      if (msg.includes('(auth/email-already-in-use)')) msg = 'Email is already used.';
      return { success: false, msg };
    }
  }

  const resetPass = async (email) => {
    try {
      // const response = await sendPasswordResetEmail(auth, auth.currentUser.email)
      console.log("reset pass: ", auth.currentUser.email);
      // console.log("reset pass: ", response);
    } catch (error) {
      console.log("reset pass: ", error);
    }
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isVerified, login, logout, register, resend, resetPass }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const value = useContext(AuthContext);

  if (!value) {
    throw new Error('useAuth must be wrapped inside AuthContextProvider')
  }

  return value;
}