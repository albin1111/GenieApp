// import React from "react";
// import { useEffect } from "react";
// import { useState } from "react";
// import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
// import app from "../config/firebase";

// const auth = getAuth(app);

// export function useAuth() {
//   const [user, setUser] = useState(User);

//   useEffect(() => {
//     const unsubscribeFromAuthStateChanged = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         // User is signed in, see docs for a list of available properties
//         // https://firebase.google.com/docs/reference/js/firebase.User
//         setUser(user);
//       } else {
//         // User is signed out
//         setUser(undefined);
//       }
//     });

//     return unsubscribeFromAuthStateChanged;
//   }, []);

//   return {
//     user,
//   };
// }

// if dosent work use this VVV
// import { getAuth } from "firebase/auth";

// const auth = getAuth();
// const user = auth.currentUser;

// if (user) {
//   // User is signed in, see docs for a list of available properties
//   // https://firebase.google.com/docs/reference/js/auth.user
//   // ...
// } else {
//   // No user is signed in.
// }