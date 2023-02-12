import  { useRef} from 'react'
import { useContext } from 'react';
import { AuthContext } from '../App';
import { useEnterChat } from '../custom-hooks/useEnterChat';
import Auth from './Auth';
import OnlineChatrooms from './OnlineChatrooms';

export default function EnterChat() {
  const userAuth = useContext(AuthContext)?.userAuth;
  const room = useRef("");
  const { validate,showPopup,statement } = useEnterChat();
    return userAuth ? (
      <>
        <div
          className={`fixed top-0 left-0 right-0 py-4 px-4 bg-slate-800 border border-slate-600 border-t-0 text-white text-center  ${
            showPopup ? "block" : "hidden"
          }`}
        >
          {statement}
        </div>
        <div className="flex text-slate-200 h-screen bg-gradient-to-bl from-slate-800 via-gray-800 to-slate-900">
          <div className="mt-10 w-4/6">
            <h1 className="py-10 text-center text-3xl font-semibold">
              Enter chatroom
            </h1>
            <div className="h-1/2 flex flex-col items-center justify-center">
              <input
                className="text-lg h-10 w-4/5 mb-5 bg-transparent outline-none mt-12 p-10 rounded-lg border focus:border-slate-600"
                onChange={(e) => (room.current = e.target.value)}
                type="text"
                placeholder="Enter room id"
              />
              <button
                className="rounded-lg shadow-lg shadow-black mx-4 w-1/2 h-1/4 text-xl mt-10 ease-linear transition-all duration-200  hover:scale-110"
                
                onClick={()=>{validate(room.current)}}
              >
                Enter chat
              </button>
            </div>
          </div>
          <OnlineChatrooms />
        </div>
      </>
    ) : (
      <Auth/>
    );
}