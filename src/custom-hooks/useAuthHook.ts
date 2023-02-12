import React, { Dispatch, SetStateAction } from "react";
import { googleProvider, auth, facebookProvider } from "../config/firebase";
import { signInWithPopup } from "firebase/auth";
import Cookies from "universal-cookie/es6";
const cookies = new Cookies();


export const useAuthHook = (
  setIsAuth: Dispatch<SetStateAction<boolean>> | undefined
) => {
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
  return [signInWgoogle, signInWfacebook];
};
