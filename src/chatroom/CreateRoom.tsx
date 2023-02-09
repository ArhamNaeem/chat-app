import React, { Dispatch, SetStateAction, useRef, useState } from 'react';
import Auth from './Auth';
import { db } from '../config/firebase';
import { auth } from '../config/firebase';
import { addDoc, collection } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
interface propType {
  userAuth: boolean;
  setIsAuth: Dispatch<SetStateAction<boolean>>;
}
export default function CreateRoom(props: propType) {
    const { userAuth , setIsAuth} = props;
    const colRef = collection(db, "chatroom");
    const [user] = useAuthState(auth);
  const roomID = useRef("");
  const navigate = useNavigate();
  
    const addRoom = async () => {
        if (roomID.current === "" || roomID.current === null) return;
        const room = roomID?.current + '-' + crypto.randomUUID().slice(0,3);
            try {
                await addDoc(colRef, {
                    userId: user?.uid,
                    room

                })
              console.log('room created!')
                navigate("/chat-room", { state: room });
              
            } catch (e) {
                console.log('Error')
            }
        
    }
   
    return userAuth ? (
      <>
        <div className="text-slate-200 w-full h-screen bg-gradient-to-bl from-slate-800 via-gray-800 to-slate-900">
          <h1 className="py-10 text-center text-3xl font-semibold">
            Create your own chatroom!
          </h1>
          <div className="h-1/2 flex flex-col items-center justify-center">
            <input
              className="text-lg h-10 w-4/5 mb-5 bg-transparent outline-none mt-12 p-10 rounded-lg border focus:border-slate-600"
              onChange={(e) => (roomID.current = e.target.value)}
              placeholder="Enter room id"
            />
            <button
              className="rounded-lg shadow-lg shadow-black mx-4 w-1/2 h-1/4 text-xl mt-10 ease-linear transition-all duration-200  hover:scale-110"
              onClick={addRoom}
            >
              Create room
            </button>
          </div>
        </div>
      </>
    ) : (
      <Auth setIsAuth={setIsAuth} />
    );
    
}
