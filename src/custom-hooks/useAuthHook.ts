import React, { Dispatch, SetStateAction } from "react";
import { googleProvider, auth, facebookProvider } from "../config/firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import {useNavigate} from 'react-router-dom';
import Cookies from "universal-cookie/es6";
const cookies = new Cookies();
export const useAuthHook = (
  setIsAuth: Dispatch<SetStateAction<boolean>> | undefined
) => {
const navigate = useNavigate();

  const signInWgoogle = async () => {
    try {
      const googleLogin = await signInWithPopup(auth, googleProvider);
      // console.log('added')
      cookies.set("auth-token", googleLogin.user.refreshToken);
      if (setIsAuth) {
        setIsAuth(true);
      }
    } catch (e) {
      console.log("error");
    }
  };

  const signInWfacebook = async () => {
    try {
      const facebookeLogin = await signInWithPopup(auth, facebookProvider);
      // console.log('added')
      cookies.set("auth-token", facebookeLogin.user.refreshToken);
      if (setIsAuth) {
        setIsAuth(true);
      }
    } catch (e) {
      console.log("error");
    }
  };

 const signUserOut = async () => {
   await signOut(auth);
   cookies.remove("auth-token");
   if (setIsAuth) {
     setIsAuth(false);
   }
   navigate("/");
 };



  return { signInWgoogle, signInWfacebook, signUserOut };
};
