import { useContext } from 'react';
import { AuthContext } from '../App';
import { useAuthHook } from '../custom-hooks/useAuthHook';
export default function Auth() {
  const setIsAuth = useContext(AuthContext)?.setUserAuth;
  const { signInWfacebook, signInWgoogle } = useAuthHook(setIsAuth)

  return (
    <>
      <div className="text-slate-200 w-full h-screen bg-gradient-to-bl from-slate-800 via-gray-800 to-slate-900">
        <div className="flex flex-col flex-wrap p-4 text-center border h-4/5 w-1/2 m-auto translate-y-12">
          <p className="font-semibold mt-10 text-2xl">Not signed up? No worries!</p>
          <div className='flex flex-col flex-wrap md:h-4/5 items-center justify-center'>
            <button
              className="rounded-lg shadow-lg shadow-black mx-4 w-1/2  h-20 text-sm md:text-2xl mt-10  mb-2 ease-linear transition-all duration-200 hover:scale-105"
              onClick={signInWgoogle}
            >
              Sign in with google
            </button>
            <button
              className="rounded-lg shadow-lg shadow-black mx-4 w-1/2 h-20 text-sm md:text-2xl  mt-10 ease-linear transition-all duration-200  hover:scale-105"
              onClick={signInWfacebook}
            >
              Sign in with facebook
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
