import React, { Dispatch, SetStateAction } from 'react'
import { googleProvider, auth, facebookProvider } from '../config/firebase'
import { signInWithPopup } from 'firebase/auth'
import Cookies from 'universal-cookie/es6';
const cookies = new Cookies();
interface propType{
    setIsAuth: Dispatch<SetStateAction<boolean>>;
}
export default function Auth(props:propType) {
    const signInWgoogle = async () => {
        try {
            const googleLogin = await signInWithPopup(auth, googleProvider);
            // console.log('added')
            cookies.set('auth-token', googleLogin.user.refreshToken)
            props.setIsAuth(true);
        } catch (e) {
            console.log('error')
        }
    }
  return (
    <>
      <button onClick={signInWgoogle}>Sign in with google</button>
      {/* //TODO: also add signinwithfb */}
    </>
  )
}
