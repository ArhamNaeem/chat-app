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
      <div className="text-slate-200 w-full h-screen bg-gradient-to-bl from-slate-800 via-gray-800 to-slate-900">
        <div className='p-4 text-center border h-2/3 w-4/5 m-auto translate-y-1/4'>
          <p className='font-semibold text-2xl'>Not signed up? No worries!</p>
          <button className='mt-10 text-xl' onClick={signInWgoogle}>Sign in with google</button>
        </div>
        {/* //TODO: also add signinwithfb */}
      </div>
    </>
  );
}
